//@ts-ignore
const stripe = Stripe('pk_test_Ee9UhcHHJ4wwWXtjwnLMKmU300NEwIXvWS');
const elements = stripe.elements();

const style = {
  base: {
    iconColor: '#c4f0ff',
    color: '#000',
    fontWeight: 500,
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',

    ':-webkit-autofill': {
      color: '#fce883'
    },
    '::placeholder': {
      color: '#87BBFD'
    }
  },
  invalid: {
    iconColor: '#FFC7EE',
    color: '#FFC7EE'
  }
};

const card = elements.create('card', { style });
card.mount('#card-element');

card.addEventListener('change', ({ error }: any) => {
  const displayError = document.getElementById('card-errors') as HTMLElement;
  if (error) {
    displayError.textContent = error.message;
  } else {
    displayError.textContent = '';
  }
});
