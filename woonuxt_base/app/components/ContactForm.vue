<script setup>
import { ref } from 'vue';
const { t } = useI18n();

// State to handle the feedback message after submission
const formStatus = ref(null);
const feedbackMessage = ref('');
const isSubmitting = ref(false);

const handleSubmit = (event) => {
  event.preventDefault();
  isSubmitting.value = true;
  
  const myForm = event.target;
  const formData = new FormData(myForm);

  // Send the form data to Netlify's built-in form handler
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      formStatus.value = 'success';
      feedbackMessage.value = t('contactForm.successMsg');
      myForm.reset();
    })
    .catch((error) => {
      formStatus.value = 'error';
      feedbackMessage.value = t('contactForm.errorMsg');
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};
</script>

<template>
  <div class="alttari-form-container">
    <div 
      v-if="formStatus" 
      class="alttari-feedback"
      :class="formStatus === 'success' ? 'alttari-success' : 'alttari-error'"
    >
      {{ feedbackMessage }}
    </div>

    <form name="alttari-contact" method="POST" data-netlify="true" class="alttari-contact-form" @submit="handleSubmit">
      <input type="hidden" name="form-name" value="alttari-contact" />

      <h2 class="alttari-form-title">{{ $t('contactForm.title') }}</h2>
      
      <div class="alttari-form-group">
        <label for="alttari-name">{{ $t('contactForm.nameLabel') }}</label>
        <input type="text" id="alttari-name" name="name" :placeholder="$t('contactForm.namePlaceholder')" required>
      </div>
      
      <div class="alttari-form-group">
        <label for="alttari-email">{{ $t('contactForm.emailLabel') }}</label>
        <input type="email" id="alttari-email" name="email" :placeholder="$t('contactForm.emailPlaceholder')" required>
      </div>
      
      <div class="alttari-form-group">
        <label for="alttari-message">{{ $t('contactForm.messageLabel') }}</label>
        <textarea id="alttari-message" name="message" rows="5" :placeholder="$t('contactForm.messagePlaceholder')" required></textarea>
      </div>
      
      <button type="submit" class="alttari-button" :disabled="isSubmitting">
        {{ isSubmitting ? $t('contactForm.btnSending') : $t('contactForm.btnSend') }}
      </button>
    </form>
  </div>
</template>

<style scoped>
/* Paste your exact CSS here */
.alttari-form-container {
  --alttari-primary: #9B1003;
  --alttari-dark: #000000;
  --alttari-text: #e0e0e0;
  --alttari-input-bg: rgba(15, 15, 15, 0.85);
  --alttari-border: #222222;

  max-width: 600px;
  margin: 50px auto;
  padding: 40px 30px;
  background: var(--alttari-dark);
  border: 1px solid var(--alttari-border);
  border-top: 3px solid var(--alttari-primary);
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
  font-family: "Lato", sans-serif;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.alttari-form-container:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 1), 
    0 0 20px rgba(155, 16, 3, 0.2);
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

.alttari-form-group {
  margin-bottom: 25px;
}

.alttari-form-group label {
  display: block;
  color: #a0a0a0;
  margin-bottom: 8px;
  font-size: 0.85em;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.alttari-form-container .alttari-form-group input[type="text"],
.alttari-form-container .alttari-form-group input[type="email"],
.alttari-form-container .alttari-form-group textarea {
  width: 100% !important;
  padding: 12px 15px !important;
  background-color: var(--alttari-input-bg) !important;
  border: 1px solid var(--alttari-border) !important;
  color: var(--alttari-text) !important;
  font-family: "Lato", sans-serif;
  font-size: 1em;
  outline: none;
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

.alttari-form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.alttari-form-container .alttari-form-group input:focus,
.alttari-form-container .alttari-form-group textarea:focus {
  border-color: var(--alttari-primary) !important;
  box-shadow: 0 0 8px rgba(155, 16, 3, 0.4) !important;
}

.alttari-button {
  width: 100%;
  padding: 16px;
  background-color: var(--alttari-primary);
  border: 1px solid var(--alttari-primary);
  border-radius: 4px;
  color: #fff;
  font-size: 1.1em;
  font-family: "Lora", serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
  position: relative;
  overflow: hidden;
  z-index: 1;
  --bat-svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 72 72'%3E%3Cpath fill='rgba(255,255,255,0.7)' d='M68.78,23.01c-2.6,1.57-6.52,3.92-7.74,7.06c-1.02,2.61-1.11,7.42-1.04,9.14c0.03,0.72-0.53,1.29-1.21,1.29c-0.06,0-0.12,0-0.17-0.01c-1.48-0.2-3.32-0.64-5.47-0.64c-2.24,0-4.81,0.47-7.66,2.18c-4.6,2.74-7.16,8.02-8.43,10.33C36.83,52.79,36.41,53,36,53s-0.83-0.21-1.06-0.64c-1.27-2.31-3.83-7.59-8.43-10.33c-2.85-1.71-5.42-2.18-7.66-2.18c-2.15,0-3.99,0.44-5.47,0.64c-0.05,0.01-0.11,0.01-0.17,0.01c-0.68,0-1.24-0.57-1.21-1.29c0.07-1.72-0.02-6.53-1.04-9.14c-1.22-3.14-5.14-5.49-7.74-7.06c-1.09-0.65-0.66-2.34,0.6-2.34h19.59c0.55,0,1.03,0.38,1.17,0.93c0.42,1.57,1.29,2.91,1.71,3.75c0.15,0.3,0.41,0.53,0.73,0.62c0.56,0.16,2.91,0.49,2.97,0.49c0.59,0,1.11-0.43,1.21-1.04l0.77-2.64c0.1-0.58,0.31-0.86,0.61-0.86c0.22,0,0.49,0.15,0.79,0.46l0.78,0.8h3.7l0.78-0.8c0.3-0.31,0.57-0.46,0.79-0.46c0.3,0,0.51,0.28,0.61,0.86l0.77,2.64c0.1,0.61,0.62,1.04,1.21,1.04c0.06,0,2.41-0.33,2.97-0.49c0.32-0.09,0.58-0.32,0.73-0.62c0.42-0.84,1.29-2.18,1.71-3.75c0.14-0.55,0.62-0.93,1.17-0.93h19.59C69.44,20.67,69.87,22.36,68.78,23.01z'/%3E%3C/svg%3E");
}

.alttari-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: var(--bat-svg), var(--bat-svg), var(--bat-svg), var(--bat-svg), var(--bat-svg), var(--bat-svg);
  background-repeat: no-repeat;
  opacity: 0;
  pointer-events: none;
}

.alttari-button:hover:not(:disabled) {
  background-color: #7a0c02;
  border-color: #7a0c02;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.8);
}

.alttari-button:hover:not(:disabled)::before {
  animation: form-svg-bat-explosion 1s ease-out 1;
}

.alttari-button:disabled {
  background-color: #333;
  border-color: #333;
  color: #777;
  cursor: not-allowed;
  box-shadow: none;
}

@keyframes form-svg-bat-explosion {
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

.alttari-feedback {
  padding: 15px;
  margin-bottom: 25px;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.alttari-success {
  background-color: rgba(30, 80, 30, 0.15);
  border: 1px solid #2d6a2d;
  color: #81c784;
}

.alttari-error {
  background-color: rgba(155, 16, 3, 0.1);
  border: 1px solid var(--alttari-primary);
  color: #e57373;
}
</style>