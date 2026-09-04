<template>
<div class="relative mx-auto h-[600px] lg:h-[750px] xl:h-[850px]">    
<NuxtPicture
      width="1400"
      height="800"
      src="/images/hero-4.jpg"
      alt="Hero image"
      loading="eager"
      sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:1400px"
      :preload="{ fetchPriority: 'high' }"
:img-attrs="{ class: 'object-cover w-full h-full' }" />
<div class="container absolute inset-0 flex flex-col items-start justify-center text-white">
  
  <h1 class="text-3xl font-bold md:mb-4 md:text-4xl lg:text-6xl">Näyttäviä ja kestäviä <br> teräskoruja</h1>
  
  <h2 class="text-lg font-bold md:mb-4 lg:text-3xl"></h2>
  
  <div class="max-w-sm mb-8 text-md font-light lg:max-w-md text-balance">
    <p>Koruja tummanpuhuvan estetiikan ystäville. Kaikki metalliosat ovat ruostumatonta terästä. Tervetuloa tutustumaan!</p>
  </div>
  
  <!-- Kept the button dark so it stands out against the white text, but you can change this too -->
 <NuxtLink class="btn btn-primary px-6 py-3 font-bold text-white bg-red-800 rounded-xl hover:bg-red-700 transition-colors" to="/products">
  Kaikki korut
</NuxtLink>

</div>
  </div>
</template>

<style scoped>
.btn-primary {
  --bs-btn-hover-border-color: #fff !important;
  --bs-btn-active-border-color: #fff !important;
  --bat-svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 72 72'%3E%3Cpath fill='rgba(255,255,255,0.7)' d='M68.78,23.01c-2.6,1.57-6.52,3.92-7.74,7.06c-1.02,2.61-1.11,7.42-1.04,9.14c0.03,0.72-0.53,1.29-1.21,1.29c-0.06,0-0.12,0-0.17-0.01c-1.48-0.2-3.32-0.64-5.47-0.64c-2.24,0-4.81,0.47-7.66,2.18c-4.6,2.74-7.16,8.02-8.43,10.33C36.83,52.79,36.41,53,36,53s-0.83-0.21-1.06-0.64c-1.27-2.31-3.83-7.59-8.43-10.33c-2.85-1.71-5.42-2.18-7.66-2.18c-2.15,0-3.99,0.44-5.47,0.64c-0.05,0.01-0.11,0.01-0.17,0.01c-0.68,0-1.24-0.57-1.21-1.29c0.07-1.72-0.02-6.53-1.04-9.14c-1.22-3.14-5.14-5.49-7.74-7.06c-1.09-0.65-0.66-2.34,0.6-2.34h19.59c0.55,0,1.03,0.38,1.17,0.93c0.42,1.57,1.29,2.91,1.71,3.75c0.15,0.3,0.41,0.53,0.73,0.62c0.56,0.16,2.91,0.49,2.97,0.49c0.59,0,1.11-0.43,1.21-1.04l0.77-2.64c0.1-0.58,0.31-0.86,0.61-0.86c0.22,0,0.49,0.15,0.79,0.46l0.78,0.8h3.7l0.78-0.8c0.3-0.31,0.57-0.46,0.79-0.46c0.3,0,0.51,0.28,0.61,0.86l0.77,2.64c0.1,0.61,0.62,1.04,1.21,1.04c0.06,0,2.41-0.33,2.97-0.49c0.32-0.09,0.58-0.32,0.73-0.62c0.42-0.84,1.29-2.18,1.71-3.75c0.14-0.55,0.62-0.93,1.17-0.93h19.59C69.44,20.67,69.87,22.36,68.78,23.01z'/%3E%3C/svg%3E");
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* Lepakko SVG taustakuvina */
  background-image: var(--bat-svg), var(--bat-svg), var(--bat-svg), var(--bat-svg), var(--bat-svg), var(--bat-svg);
  background-repeat: no-repeat;
  opacity: 0;
  pointer-events: none;
}

.btn.btn-primary:hover::before {
  animation: svg-bat-explosion 1s ease-out 1;
}

@keyframes svg-bat-explosion {
  0% {
    opacity: 1;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    background-position: 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%;
  }
  100% {
    opacity: 0;
    background-size: 18px 18px, 22px 22px, 15px 15px, 20px 20px, 16px 16px, 24px 24px;
    background-position: -20% 120%, 30% -30%, 110% 115%, 70% -20%, 125% 40%, -15% 30%;
  }
}
</style>
