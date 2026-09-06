<template>
  <div class="container my-8">
    <section class="contact-intro grid gap-8 rounded-xl bg-white p-6 shadow-sm md:grid-cols-[256px_1fr] md:items-center md:p-8">
      <NuxtPicture
        src="/images/myyntikuva-editoitu.webp"
        alt="Joonas Alttari"
        width="512"
        height="512"
        loading="lazy"
        class="contact-image aspect-square w-full overflow-hidden rounded-xl" />
     <div class="prose max-w-none">
        <h1>{{ $t('aboutPage.title') }}</h1>
        <p>{{ $t('aboutPage.greeting') }}</p>
        <p>{{ $t('aboutPage.p1') }}</p>
        <p>{{ $t('aboutPage.p2') }}</p>
        <p>{{ $t('aboutPage.p3') }}</p>
        
        <!-- The <br /> is now safely hardcoded in the template -->
        <p><em>{{ $t('aboutPage.signoff1') }}<br />{{ $t('aboutPage.signoff2') }}</em></p>
      </div>
    </section>

    <div class="contact-faq">
            <h2 class="alttari-form-title">Tietoa Alttarista</h2>

      <FaqAccordion />
    </div>
  </div>
</template>

<style scoped>
.contact-intro,
.contact-intro h1,
.contact-intro p,
.contact-intro em {
  color: #111827 !important;
}

.contact-faq {
  margin-top: 2rem;
}

:deep(.contact-image),
:deep(.contact-image img) {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.75rem;
}

:deep(.contact-image img) {
  object-fit: cover;
}
.alttari-form-title {
  text-align: center;
  color: #ffffff;
  font-family: "Lora", serif;
  font-weight: 400;
  margin-bottom: 30px;
  letter-spacing: 2px;
  border-bottom: 1px solid var(--alttari-border);
  padding-bottom: 15px;
  font-size: 30px;
}
</style>
