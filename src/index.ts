import style from './utils/stripeStyles';
import hasError from './utils/hasError';
import showError from './utils/showError';
import removeError from './utils/removeError';

// Create and Mount Stripe
//@ts-ignore
const stripe = Stripe('pk_test_Ee9UhcHHJ4wwWXtjwnLMKmU300NEwIXvWS');
const elements = stripe.elements({
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Open+Sans'
    }
  ]
});
const card = elements.create('card', { style });
card.mount('#card-element');

// Validate Errors on Stripe Elemnent
card.addEventListener('change', ({ error }: any) => {
  const displayError = document.getElementById('card-errors') as HTMLElement;
  const button = document.querySelector('#submit') as HTMLButtonElement;

  if (error) {
    displayError.textContent = error.message;
    button.disabled = true;
  } else {
    displayError.textContent = '';
    button.disabled = false;
  }
});

// Validate Other Errors
document.addEventListener(
  'blur',
  event => {
    // Only run if the field is in a form to be validated
    const element = event.target as HTMLInputElement;
    if (!element.classList.contains('validate')) return;

    // Validate the field
    const errorMessage = hasError(element);

    // If there's an error, show it
    if (errorMessage) {
      showError(element, errorMessage);
      return;
    }

    // Otherwise, remove any existing error message
    removeError(element);
  },
  true
);

// Submit
const form = document.querySelector('#payment-form') as HTMLFormElement;
form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  console.log('SUBMITTED');
});
