#!/usr/bin/env python3
"""
Generate standardised ALT SKUs from a WooCommerce product export CSV.
Scheme: ALT-{TYPE}-{MODEL}-{FINISH}[-{VARIANT}]

Types : RI (ring), EA (earring), NE (necklace/pendant), BR (bracelet)
Finish: SS (plain steel), BK (black), AS (antique silver), SI (silver-plated)
Variants:
  Ring size  : US size zero-padded  e.g. -06 -07 -08 -09 -10 -11 -12
  Hook       : -OL -CL10 -CL12 -CL14 -FW -LB
  Chain/neck : -40 -45 -50 -55 -60 -65 -NP
  Bracelet   : -17 -19 -21 -23
"""

import csv, re, sys
from pathlib import Path

INPUT  = Path("wc-export.csv")
OUTPUT = Path("sku-import.csv")

# ── helpers ──────────

def detect_type(name: str, attrs: dict) -> str:
    n = name.lower()
    if "sormus" in n:            return "RI"
    if "korvakor" in n or "earcuff" in n:      return "EA"
    if ("kaulakoru" in n or "kaulaketju" in n
            or "riipus" in n):                 return "NE"
    if ("rannekoru" in n or "ranneketju" in n
            or "käsivarsikoru" in n):          return "BR"
    # fall back to attribute names
    if "sormuskoko" in attrs:           return "RI"
    if "Valitse koukku" in attrs:              return "EA"
    if "Kaulaketjun pituus" in attrs:         return "NE"
    if "Ranneketjun pituus" in attrs:         return "BR"
    return "NE"   # default for misc pendants / chains

def detect_finish(attrs: dict) -> str:
    color = attrs.get("värit", "").lower()
    if "musta" in color:        return "BK"
    if "antiik" in color:       return "AS"
    if "hopea" in color:        return "SI"
    return "SS"

HOOK_MAP = {
    "oletus (kuin kuvassa)":          "OL",
    "clicker: 10 mm sisämitta":       "CL10",
    "clicker: 12 mm sisämitta":       "CL12",
    "clicker: 14 mm sisämitta":       "CL14",
    "french wire: 15 x 12 mm sisämitta": "FW",
    "leverback: 13 x 10 mm sisämitta":  "LB",
}

def variant_suffix(attr_name: str, attr_value: str) -> str:
    an, av = attr_name.strip().lower(), attr_value.strip()
    if an == "sormuskoko":
        m = re.search(r"US\s*(\d+)", av)
        return f"-{int(m.group(1)):02d}" if m else ""
    if an == "valitse koukku":
        return "-" + HOOK_MAP.get(av.lower(), av[:4].upper())
    if an in ("kaulaketjun pituus", "ranneketjun pituus"):
        cm = re.search(r"(\d+)\s*cm", av)
        if cm:            return f"-{cm.group(1)}"
        if "ei ketjua" in av.lower(): return "-NP"
    return ""

# ── load rows ────────────────

rows = []
with open(INPUT, newline="", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        rows.append(row)

# collect attributes per row into a simple {name: value} dict
def row_attrs(row) -> dict:
    out = {}
    for i in (1, 2, 3):
        n = row.get(f"Ominaisuus {i} nimi", "").strip()
        v = row.get(f"Ominaisuus {i} arvo(t)", "").strip()
        if n:
            out[n] = v
    return out

# ── build parent index & assign model numbers ────────────

# parent_id → {"type", "finish", "model", "base_sku"}
parents = {}
type_counters = {}

# first pass: parents only (variable + simple that have no "Ylempi taso")
for row in rows:
    pid   = row["ID"].strip()
    kind  = row["Laji"].strip()
    upper = row.get("Ylempi taso", "").strip()
    if upper:   # it's a variation
        continue
    name  = row["Nimi"].strip()
    old_sku = row.get("Tuotetunnus (SKU)", "").strip()
    attrs = row_attrs(row)
    ptype  = detect_type(name, attrs)
    finish = detect_finish(attrs)
    type_counters[ptype] = type_counters.get(ptype, 0) + 1
    model  = f"{type_counters[ptype]:03d}"
    base   = f"ALT-{ptype}-{model}-{finish}"
    parents[pid] = {"type": ptype, "finish": finish, "model": model, "base": base, "name": name, "old_sku": old_sku}

# ── second pass: assign SKU to every row ─────────

results = []  # list of (ID, new_sku)
parent_seq: dict[str, int] = {}  # per-parent counter for attribute-less variations

for row in rows:
    pid   = row["ID"].strip()
    kind  = row["Laji"].strip()
    upper = row.get("Ylempi taso", "").strip()

    if not upper:
        # parent / standalone
        if pid in parents:
            results.append((pid, parents[pid]["base"]))
        continue

    # variation — resolve parent
    # "Ylempi taso" can be "id:154" or "ALT-R004-ANT" (SKU ref)
    parent_id = None
    m = re.match(r"id:(\d+)", upper)
    if m:
        parent_id = m.group(1)
    else:
        # SKU reference — find matching parent by its base sku
        for k, v in parents.items():
            if v["base"] == upper or upper == v.get("old_sku", ""):
                parent_id = k
                break

    if parent_id is None:
        # SKU reference — find matching parent by its OLD sku
        for k, v in parents.items():
            if upper == v.get("old_sku", ""):
                parent_id = k
                break

    if parent_id not in parents:
        # orphan — keep whatever SKU it has or flag it
        old = row.get("Tuotetunnus (SKU)", "").strip()
        results.append((pid, old or f"ORPHAN-{pid}"))
        continue

    p     = parents[parent_id]
    attrs = row_attrs(row)
    suffix = ""
    for i in (1, 2, 3):
        an = row.get(f"Ominaisuus {i} nimi", "").strip()
        av = row.get(f"Ominaisuus {i} arvo(t)", "").strip()
        if an and av:
            s = variant_suffix(an, av)
            if s:
                suffix = s
                break

    # Fallback: variation with no usable attribute (e.g. the Zihgir thumb rings,
    # rows 1732-1738, which have no attribute values in WooCommerce at all).
    # Give them a sequential -01, -02, ... per parent so SKUs stay unique.
    if not suffix:
        seq = parent_seq.get(parent_id, 1)
        parent_seq[parent_id] = seq + 1
        suffix = f"-{seq:02d}"

    results.append((pid, p["base"] + suffix))

# ── uniqueness check ────────────────

seen: dict[str, str] = {}
dupes = []
for pid, sku in results:
    if sku in seen:
        dupes.append(f"  ID {pid} and ID {seen[sku]} both → {sku}")
    else:
        seen[sku] = pid

if dupes:
    print("WARNING: duplicate SKUs detected:")
    for d in dupes:
        print(d)
else:
    print(f"All {len(results)} SKUs unique.")

# ── write importable CSV ────────────

id_to_sku = dict(results)

with open(OUTPUT, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f, quoting=csv.QUOTE_MINIMAL)
    writer.writerow(["ID", "Laji", "Nimi", "Tuotetunnus (SKU)", "Ylempi taso"])
    for row in rows:
        pid   = row["ID"].strip()
        kind  = row["Laji"].strip()
        name  = row["Nimi"].strip()
        upper = row.get("Ylempi taso", "").strip()
        new_sku = id_to_sku.get(pid, "")
        writer.writerow([pid, kind, name, new_sku, upper])

print(f"Written {OUTPUT}")

# ── summary ───────────
print("\nModel assignments (parents):")
for pid, info in parents.items():
    print(f"  {info['base']:30s}  {info['name']}")
