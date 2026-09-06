<script setup lang="ts">
useHead({
  title: 'Toimitus, vaihto -ja palautusehdot - Alttari',
  meta: [
    { name: 'description', content: 'Alttarin toimitus-, vaihto- ja palautusehdot.' }
  ]
})
</script>

<template>
  <div class="alttari-terms-page container max-w-4xl mx-auto px-4 py-16 bg-white min-h-screen">
    
    <h1 class="text-3xl font-bold mb-2">Toimitus, vaihto -ja palautusehdot</h1>
    <p class="terms-date text-sm mb-8">Kaikki sivun ehdot ovat voimassa alkaen: 04.08.2026</p>
    
    <p class="mb-12">Nämä toimitusehdot koskevat Alttari-verkkokaupasta tehtyjä tilauksia.</p>

    <!-- Shipping Info Section -->
    <div class="space-y-8 mb-12">
      <section>
        <h2 class="text-xl font-semibold mb-2">Toimitusalue</h2>
        <p>Alttari toimittaa tällä hetkellä vain Suomeen.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-2">Toimitustavat</h2>
        <p>Käytettävissä olevat toimitustavat ja niiden hinnat näkyvät kassalla ennen tilauksen vahvistamista.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-2">Toimitusaika</h2>
        <p class="mb-2">Varastossa olevat tuotteet pyritään lähettämään 1–3 arkipäivän kuluessa maksun vastaanottamisesta.</p>
        <p class="mb-2">Jos tilaus sisältää erikseen merkityn tilaustuotteen, annamme mahdollisimman tarkan arvion koko tilauksen toimitusajasta. Lähtökohtaisesti kaikki tilauksen tuotteet toimitetaan samassa lähetyksessä, ellei asiakkaan kanssa sovita toisin.</p>
        <p>Poikkeuksellisissa tilanteissa toimitus voi viivästyä. Mikäli viivästys on merkittävä, ilmoitamme siitä asiakkaalle mahdollisimman pian.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-2">Toimituskulut</h2>
        <p>Toimituskulut määräytyvät valitun toimitustavan mukaan ja näkyvät kassalla ennen tilauksen maksamista.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-2">Tilauksen seuranta</h2>
        <p>Mikäli valittuun toimitustapaan sisältyy seuranta, toimitamme seurantatunnuksen sähköpostitse lähetyksen jälkeen.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-2">Vastuu toimituksesta</h2>
        <p class="mb-2">Vastuu tuotteesta siirtyy asiakkaalle, kun asiakas tai hänen valtuuttamansa vastaanottaja on vastaanottanut lähetyksen.</p>
        <p>Asiakkaan pyydetään tarkistamaan lähetys sen vastaanottamisen jälkeen. Mikäli paketti tai sen sisältö on vaurioitunut kuljetuksessa, pyydämme ottamaan yhteyttä Alttariin mahdollisimman pian.</p>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-2">Virheelliset toimitustiedot</h2>
        <p class="mb-2">Asiakas vastaa antamiensa toimitustietojen oikeellisuudesta.</p>
        <p>Mikäli lähetys palautuu virheellisten tai puutteellisten toimitustietojen vuoksi, palautuksesta ja mahdollisesta uudelleenlähetyksestä aiheutuneet todelliset kustannukset voidaan veloittaa asiakkaalta.</p>
      </section>
    </div>

    <!-- Returns and Cancellations Section -->
    <hr class="border-gray-300 mb-12" />
    
    <div class="space-y-8">
      <section>
        <h2 class="text-2xl font-bold mb-4">Palautus- ja peruutusehdot</h2>
        <p class="mb-2">Jos et ole täysin tyytyväinen koruusi, voit palauttaa sen seuraavien ehtojen mukaisesti.</p>
        <p>Kuluttajansuojalain mukaisen 14 päivän peruuttamisoikeuden lisäksi Alttari tarjoaa vapaaehtoisen palautusoikeuden, jonka ansiosta tuotteen voi palauttaa yhteensä 30 vuorokauden kuluessa sen vastaanottamisesta.</p>
      </section>

      <section>
        <h3 class="text-lg font-semibold mb-2">1. Lakisääteinen 14 vuorokauden peruuttamisoikeus</h3>
        <p class="mb-2">Kuluttajalla on oikeus peruuttaa verkkokaupassa tehty tilaus ilman erityistä syytä 14 vuorokauden kuluessa tuotteen vastaanottamisesta.</p>
        <p class="mb-2">Peruuttamisesta on ilmoitettava Alttarille yksiselitteisesti 14 vuorokauden määräajan kuluessa. Ilmoituksen voi tehdä verkkokaupan peruuttamistoiminnolla tai sähköpostitse osoitteeseen <a href="mailto:info@alttari.shop" class="text-red-700 hover:underline">info@alttari.shop</a>.</p>
        <p class="mb-2">Pelkkä tuotteen palauttaminen tai lähetyksen noutamatta jättäminen ei ole peruuttamisilmoitus.</p>
        <p>Peruuttamisilmoituksen jälkeen tuote on lähetettävä takaisin viimeistään 14 vuorokauden kuluessa.</p>
      </section>

      <section>
        <h3 class="text-lg font-semibold mb-2">2. Alttarin vapaaehtoinen 30 päivän palautusoikeus</h3>
        <p class="mb-2">Lakisääteisen peruuttamisajan jälkeen tuotteen voi palauttaa Alttarin vapaaehtoisen palautusoikeuden perusteella siten, että palautuspyyntö tehdään viimeistään 30 vuorokauden kuluessa tuotteen vastaanottamisesta.</p>
        <p class="mb-2">Palautusoikeus säilyy myös silloin, kun korua on kokeiltu ja käytetty normaalisti palautusajan aikana. Palautusoikeus ei kuitenkaan kata tahallisesti vahingoitettua, kadotettua tai olennaisesti muunneltua tuotetta.</p>
        <p>Tuote tulee lähettää takaisin 14 vuorokauden kuluessa palautusohjeiden vastaanottamisesta.</p>
      </section>

      <section>
        <h3 class="text-lg font-semibold mb-2">3. Palautuksen tekeminen</h3>
        <p class="mb-2">Ennen palautuksen lähettämistä asiakkaan tulee tehdä peruuttamis- tai palautusilmoitus verkkokaupan peruuttamistoiminnolla tai ottaa yhteyttä asiakaspalveluun osoitteessa <a href="mailto:info@alttari.shop" class="text-red-700 hover:underline">info@alttari.shop</a>.</p>
        <p class="mb-2">Asiakaspalvelu toimittaa palautusohjeet ja palautusosoitteen. Palautusta ei tule lähettää ennen palautusohjeiden saamista.</p>
        <p>Asiakkaan tulee säilyttää palautuksesta saamansa kuitti tai muu lähettämisen osoittava tosite.</p>
      </section>

      <section>
        <h3 class="text-lg font-semibold mb-2">4. Palautuskulut</h3>
        <p class="mb-2">Asiakas vastaa tavallisen palautuksen välittömistä palautuskuluista sekä lakisääteisen 14 vuorokauden peruuttamisoikeuden että Alttarin vapaaehtoisen 30 päivän palautusoikeuden yhteydessä.</p>
        <p>Jos palautus johtuu virheellisestä, vaurioituneesta tai väärin toimitetusta tuotteesta, Alttari vastaa tarpeellisista ja kohtuullisista palautuskuluista.</p>
      </section>

      <section>
        <h3 class="text-lg font-semibold mb-2">5. Vaihdot</h3>
        <p class="mb-2">Tuotteen vaihtaminen on mahdollista.</p>
        <p class="mb-2">Ennen vaihtoa asiakkaan tulee ottaa yhteyttä asiakaspalveluun. Asiakas vastaa vaihdettavan tuotteen palautuskuluista, ellei vaihto johdu Alttarin virheestä.</p>
        <p class="mb-2">Alttari lähettää ensimmäisen vaihtotuotteen asiakkaalle ilman erillistä toimitusmaksua.</p>
        <p>Jos tuotteiden hinnoissa on eroa, asiakkaalta veloitetaan tai hänelle palautetaan tuotteiden hintojen välinen erotus. Jos haluttua vaihtotuotetta ei ole saatavilla, asiakkaalle tarjotaan muuta tuotetta tai rahojen palautusta.</p>
      </section>

      <section>
        <h3 class="text-lg font-semibold mb-2">6. Korvakorujen palautukset</h3>
        <p>Korvakorut kuuluvat normaalin 30 päivän palautusoikeuden piiriin.</p>
      </section>

      <section>
        <h3 class="text-lg font-semibold mb-2">7. Tilaus- ja alennustuotteet</h3>
        <p class="mb-2">Tilaustuotteilla ja alennustuotteilla on samat palautusoikeudet kuin muillakin tuotteilla.</p>
        <p>Palautusoikeutta ei kuitenkaan välttämättä ole tuotteella, joka on valmistettu tai muunneltu asiakkaan yksilöllisten vaatimusten mukaisesti. Tällaisesta rajoituksesta ilmoitetaan selkeästi ennen tilauksen tekemistä.</p>
      </section>

      <section>
        <h3 class="text-lg font-semibold mb-2">8. Hyvityksen maksaminen</h3>
        <p class="mb-2">Kun koko tilaus palautetaan, palautamme tuotteista maksetun hinnan sekä alkuperäiset toimituskulut Alttarin tarjoaman edullisimman vakiotoimitustavan mukaisesti.</p>
        <p class="mb-2">Jos asiakas on valinnut edullisinta vakiotoimitustapaa kalliimman toimitustavan, toimitustapojen välistä hintaeroa ei palauteta.</p>
        <p class="mb-2">Osapalautuksessa alkuperäisiä toimituskuluja ei palauteta.</p>
        <p class="mb-2">Lakisääteisen peruuttamisoikeuden perusteella palautettavat maksut hyvitetään viimeistään 14 vuorokauden kuluessa peruuttamisilmoituksen vastaanottamisesta. Alttari voi kuitenkin pidättäytyä hyvityksen maksamisesta, kunnes palautettu tuote on vastaanotettu tai asiakas on osoittanut lähettäneensä tuotteen takaisin.</p>
        <p class="mb-2">Alttarin vapaaehtoisen palautusoikeuden perusteella maksettava hyvitys tehdään viimeistään 14 vuorokauden kuluessa siitä, kun palautettu tuote on vastaanotettu.</p>
        <p>Hyvitys tehdään samalla maksutavalla, jota asiakas käytti tilauksen maksamiseen, ellei asiakkaan kanssa nimenomaisesti sovita toisesta maksutavasta.</p>
      </section>

      <section>
        <h3 class="text-lg font-semibold mb-2">9. Virheelliset tai vahingoittuneet tuotteet</h3>
        <p class="mb-2">Jos tuote on virheellinen, vaurioitunut tai toimitettu vääränä, asiakkaan tulee ottaa yhteyttä osoitteeseen <a href="mailto:info@alttari.shop" class="text-red-700 hover:underline">info@alttari.shop</a>.</p>
        <p class="mb-2">Pyydämme liittämään viestiin tilausnumeron, kuvauksen havaitusta virheestä sekä mahdollisuuksien mukaan valokuvan tuotteesta.</p>
        <p>Virhetilanteessa Alttari vastaa tarpeellisista ja kohtuullisista palautuskuluista. Alttarin tarjoama 30 päivän palautusoikeus ei rajoita asiakkaalle kuluttajansuojalain perusteella kuuluvia oikeuksia tai Alttarin lakisääteistä virhevastuuta.</p>
      </section>

      <section>
        <h3 class="text-lg font-semibold mb-2">10. Noutamatta jääneet lähetykset</h3>
        <p class="mb-2">Noutamatta jätetty lähetys ei ole sama asia kuin tilauksen peruuttaminen.</p>
        <p>Mikäli lähetys palautuu Alttarille noutamattomana, asiakkaalta voidaan periä toimituksesta ja palautuksesta aiheutuneet todelliset ja kohtuulliset kustannukset.</p>
      </section>

      <section>
        <h3 class="text-lg font-semibold mb-2">11. Yhteystiedot</h3>
        <ul class="list-none space-y-1">
          <li><strong>Alttari</strong></li>
          <li>Sähköposti: <a href="mailto:info@alttari.shop" class="text-red-700 hover:underline">info@alttari.shop</a></li>
          <li>Puhelin: +358 44 957 3133</li>
        </ul>
      </section>
    </div>

  </div>
</template>

<style scoped>
/* Force all text inside the terms page to be dark, overriding the global theme */
.alttari-terms-page,
.alttari-terms-page h1,
.alttari-terms-page h2,
.alttari-terms-page h3,
.alttari-terms-page p,
.alttari-terms-page ul,
.alttari-terms-page li {
  color: #111827 !important;
}

/* Lighter grey specifically for the date text */
.alttari-terms-page .terms-date {
  color: #4b5563 !important;
}

/* Ensure the links stay red but are exempt from the global white override */
.alttari-terms-page a.text-red-700 {
  color: #b91c1c !important;
}
</style>