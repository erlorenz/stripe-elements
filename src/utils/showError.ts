const showError = (element: HTMLInputElement, error: string) => {
  element.classList.add('error');
  const id = element.id;

  // Check if error message field already exists
  // If not, create one
  var message = element?.form?.querySelector(
    '.error-message#error-for-' + id
  ) as HTMLParagraphElement;
  if (!message) {
    message = document.createElement('p');
    message.className = 'error-message';
    message.id = 'error-for-' + id;
    element?.parentNode?.insertBefore(message, element.nextSibling);
  }

  // Update error message
  message.innerHTML = error;

  // Show error message
  message.style.display = 'block';
  message.style.visibility = 'visible';

  // Disable submit
  const button = document.querySelector('#submit') as HTMLButtonElement;
  button.disabled = true;
};

export default showError;
