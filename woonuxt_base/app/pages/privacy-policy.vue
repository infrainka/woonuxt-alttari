<script setup lang="ts">
useHead({
  title: 'Tietosuojalauseke - Alttari',
  meta: [
    { name: 'description', content: 'Alttarin tietosuojalauseke ja henkilötietojen käsittely.' }
  ]
})
</script>

<template>
  <!-- Added a custom class: alttari-privacy-page -->
  <div class="alttari-privacy-page container max-w-4xl mx-auto px-4 py-16 bg-white min-h-screen">
    
    <h1 class="text-3xl font-bold mb-2">Tietosuojalauseke</h1>
    <p class="privacy-date text-sm mb-8">Päivitetty: 31.07.2026</p>
    
    <p class="mb-8">Tässä tietosuojaselosteessa kerrotaan, miten Alttari käsittelee asiakkaiden ja verkkosivuston käyttäjien henkilötietoja.</p>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Rekisterinpitäjä</h2>
      <ul class="list-none space-y-1">
        <li><strong>Alttari</strong></li>
        <li>Y-tunnus: 3632094-6</li>
        <li>Sähköposti: <a href="mailto:info@alttari.shop" class="text-red-700 hover:underline">info@alttari.shop</a></li>
        <li>Puhelin: +358 44 957 3133</li>
        <li>Postiosoite: PL 999, 42011 Yrityslokero</li>
      </ul>
      <p class="mt-4">Tietosuojaa koskevat yhteydenotot voi lähettää osoitteeseen info@alttari.shop.</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Käsiteltävät henkilötiedot</h2>
      <p class="mb-2">Alttari voi käsitellä esimerkiksi seuraavia tietoja:</p>
      <ul class="list-disc pl-6 mb-4 space-y-1">
        <li>nimi ja yhteystiedot</li>
        <li>toimitus- ja laskutustiedot</li>
        <li>tilaus-, maksu-, palautus- ja reklamaatiotiedot</li>
        <li>asiakastilin tiedot</li>
        <li>asiakkaan lähettämät viestit</li>
        <li>uutiskirjeen tilaustiedot</li>
        <li>verkkosivuston käyttöön liittyvät tekniset, eväste- ja käyttötiedot.</li>
      </ul>
      <p>Alttari ei saa käyttöönsä asiakkaan täydellisiä maksukorttitietoja. Maksut käsittelee erillinen maksupalveluntarjoaja.</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Tietojen lähteet</h2>
      <p class="mb-2">Tiedot saadaan pääasiassa asiakkaalta itseltään tilauksen, asiakastilin, yhteydenoton, palautuksen, reklamaation, uutiskirjeen tilaamisen tai verkkosivuston käytön yhteydessä.</p>
      <p>Alttari voi saada maksun tilaa koskevia tietoja maksupalveluntarjoajalta sekä toimitukseen liittyviä tietoja kuljetuspalvelulta.</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Käsittelyn tarkoitukset ja oikeusperusteet</h2>
      <p class="mb-4">Henkilötietoja käsitellään seuraaviin tarkoituksiin:</p>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-[#000000] text-left text-sm md:text-base">
          <thead>
            <tr class="border-b border-[#000000]">
              <th class="p-3 border-r border-[#000000] font-bold">Tarkoitus</th>
              <th class="p-3 font-bold">Oikeusperuste</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-[#000000]">
              <td class="p-3 border-r border-[#000000]">Tilausten, maksujen ja toimitusten hoitaminen</td>
              <td class="p-3">Sopimus</td>
            </tr>
            <tr class="border-b border-[#000000]">
              <td class="p-3 border-r border-[#000000]">Asiakaspalvelu, palautukset ja reklamaatiot</td>
              <td class="p-3">Sopimus tai oikeutettu etu</td>
            </tr>
            <tr class="border-b border-[#000000]">
              <td class="p-3 border-r border-[#000000]">Kirjanpito ja muut lakisääteiset velvoitteet</td>
              <td class="p-3">Lakisääteinen velvoite</td>
            </tr>
            <tr class="border-b border-[#000000]">
              <td class="p-3 border-r border-[#000000]">Verkkokaupan ylläpito, tietoturva ja väärinkäytösten estäminen</td>
              <td class="p-3">Oikeutettu etu</td>
            </tr>
            <tr class="border-b border-[#000000]">
              <td class="p-3 border-r border-[#000000]">Uutiskirjeen lähettäminen</td>
              <td class="p-3">Suostumus</td>
            </tr>
            <tr>
              <td class="p-3 border-r border-[#000000]">Ei-välttämätön analytiikka ja markkinointi</td>
              <td class="p-3">Suostumus</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Tietojen vastaanottajat</h2>
      <p class="mb-2">Tietoja voidaan käsitellä tai luovuttaa tarpeellisessa laajuudessa esimerkiksi:</p>
      <ul class="list-disc pl-6 mb-4 space-y-1">
        <li>verkkokaupan, webhotellin ja teknisen ylläpidon palveluntarjoajille</li>
        <li>maksupalveluntarjoajille</li>
        <li>kuljetuspalveluille</li>
        <li>kirjanpidon palveluntarjoajille</li>
        <li>sähköposti-, uutiskirje-, analytiikka- ja markkinointipalveluille</li>
        <li>viranomaisille, jos laki sitä edellyttää.</li>
      </ul>
      <p>Alttari ei myy henkilötietoja kolmansille osapuolille.</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Siirrot EU:n tai ETA:n ulkopuolelle</h2>
      <p>Osa käytetyistä palveluntarjoajista voi käsitellä tietoja EU:n tai ETA:n ulkopuolella. Tällöin siirroissa käytetään soveltuvan tietosuojalainsäädännön mukaisia siirtoperusteita ja suojatoimia, kuten Euroopan komission hyväksymiä mallisopimuslausekkeita.</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Tietojen säilyttäminen</h2>
      <p class="mb-2">Henkilötietoja säilytetään vain niin kauan kuin niitä tarvitaan niiden käsittelytarkoitukseen tai lakisääteisten velvoitteiden täyttämiseen.</p>
      <p class="mb-2">Tilaus-, toimitus-, palautus-, reklamaatio- ja asiakaspalvelutietoja säilytetään asian käsittelemisen ja mahdollisten oikeudellisten vaateiden edellyttämän ajan.</p>
      <p class="mb-2">Kirjanpitoaineistoa säilytetään kirjanpitolainsäädännön mukaisesti. Tavallista kirjanpitoaineistoa säilytetään vähintään kuusi vuotta ja tiettyjä kirjanpidon asiakirjoja vähintään kymmenen vuotta.</p>
      <p class="mb-2">Uutiskirjeen tilaustietoja säilytetään, kunnes tilaus peruutetaan.</p>
      <p>Eväste- ja analytiikkatietojen säilytysajat määräytyvät käytettyjen palvelujen ja evästeasetusten mukaisesti.</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Tietojen antamisen välttämättömyys</h2>
      <p>Tilauksen käsittelyyn, maksamiseen ja toimittamiseen tarvittavat tiedot ovat välttämättömiä kaupan toteuttamiseksi. Uutiskirjeen tilaaminen ja ei-välttämättömien evästeiden hyväksyminen ovat vapaaehtoisia.</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Rekisteröidyn oikeudet</h2>
      <p class="mb-2">Rekisteröidyllä voi olla oikeus:</p>
      <ul class="list-disc pl-6 mb-4 space-y-1">
        <li>saada pääsy omiin tietoihinsa</li>
        <li>pyytää tietojen korjaamista tai poistamista</li>
        <li>pyytää käsittelyn rajoittamista</li>
        <li>vastustaa käsittelyä</li>
        <li>saada tietyt tiedot siirrettyä järjestelmästä toiseen</li>
        <li>peruuttaa antamansa suostumus</li>
        <li>tehdä valitus tietosuojavaltuutetun toimistolle.</li>
      </ul>
      <p class="mb-2">Oikeuksien soveltuminen riippuu käsittelyn tarkoituksesta ja oikeusperusteesta. Tietoja ei esimerkiksi voida poistaa, jos niiden säilyttäminen perustuu lakiin.</p>
      <p>Oikeuksia koskevat pyynnöt voi lähettää osoitteeseen info@alttari.shop.</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Evästeet</h2>
      <p class="mb-2">Alttarin verkkosivusto käyttää evästeitä.</p>
      <p class="mb-2">Välttämättömiä evästeitä käytetään esimerkiksi ostoskorin, kassatoimintojen, kirjautumisen, lomakkeiden ja tietoturvan toteuttamiseen.</p>
      <p class="mb-2">Analytiikka-, markkinointi- ja muita ei-välttämättömiä evästeitä käytetään vain käyttäjän suostumuksella silloin, kun laki edellyttää suostumusta.</p>
      <p>Käyttäjä voi muuttaa tai peruuttaa evästevalintansa verkkosivuston evästeasetuksista.</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Valitus valvontaviranomaiselle</h2>
      <p class="mb-2">Jos rekisteröity katsoo henkilötietojensa käsittelyn olevan lainvastaista, hänellä on oikeus tehdä valitus tietosuojavaltuutetun toimistolle.</p>
      <p>Tietosuojavaltuutetun toimisto<br>
      Verkkosivusto: <a href="https://tietosuoja.fi" target="_blank" rel="noopener noreferrer" class="text-red-700 hover:underline">tietosuoja.fi</a></p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-4">Selosteen muuttaminen</h2>
      <p>Alttari voi päivittää tätä selostetta, jos henkilötietojen käsittely, käytetyt palvelut tai lainsäädäntö muuttuvat. Ajantasainen versio julkaistaan Alttarin verkkosivustolla.</p>
    </section>

  </div>
</template>

<style scoped>
/* Force all text inside the privacy page to be dark, overriding the global theme */
.alttari-privacy-page,
.alttari-privacy-page h1,
.alttari-privacy-page h2,
.alttari-privacy-page p,
.alttari-privacy-page ul,
.alttari-privacy-page li,
.alttari-privacy-page td,
.alttari-privacy-page th {
  color: #111827 !important;
}

/* Lighter grey specifically for the date text */
.alttari-privacy-page .privacy-date {
  color: #4b5563 !important;
}

/* Ensure the links stay red but are exempt from the global white override */
.alttari-privacy-page a.text-red-700 {
  color: #b91c1c !important;
}
</style>