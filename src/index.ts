import style from './utils/stripeStyles';
import hasError from './utils/hasError';
import showError from './utils/showError';
import removeError from './utils/removeError';

// Create and Mount Stripe
//@ts-ignore
const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);
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

form.addEventListener('submit', async event => {
  event.preventDefault();
  const errors: string[] = [];
  const rawValues: any = {};

  const fields = form.querySelectorAll('.validate') as NodeListOf<
    HTMLInputElement
  >;

  fields.forEach(field => {
    // Validate the field
    const errorMessage = hasError(field);

    // If there's an error, show it and add to array
    if (errorMessage) {
      errors.push(errorMessage);
      showError(field, errorMessage);
      return;
    }
    // Otherwise, remove any existing error message
    removeError(field);
    rawValues[field.id] = field.value;
  });

  console.log(errors);
  console.log(rawValues);
  if (errors.length) return;

  const values = {
    amount: rawValues.amount,
    companyName: rawValues['company-name'],
    email: rawValues.email,
    invoiceNumber: rawValues['invoice-number'],
    description: `${rawValues['company-name']} - Invoice(s) ${rawValues['invoice-number']}`
  };

  console.log(values);

  // Submit to server and get the client secret
  const response = await fetch(
    'http://localhost:3000/customerpayment/paymentintent',
    {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: values.amount * 100 })
      //body: values -------- Add all values for metadata
    }
  );
  const json: any = await response.json();
  const secret = await json.intent.client_secret;

  const finalResponse = await stripe.confirmCardPayment(secret, {
    payment_method: {
      card
    }
  });

  console.log('Final:', finalResponse);
});
