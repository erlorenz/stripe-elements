const removeError = (element: HTMLInputElement) => {
  // Remove error from input element
  element.classList.remove('error');

  // See if there is an error message currently
  const errorMessage = document.querySelector(
    '.error-message#error-for-' + element.id
  ) as HTMLParagraphElement | null;
  if (!errorMessage) return;

  // Hide it
  errorMessage.innerHTML = '';
  errorMessage.style.display = 'none';
};

export default removeError;
