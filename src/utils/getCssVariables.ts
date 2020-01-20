const body = document.querySelector('body') as HTMLElement;

export const textColor = getComputedStyle(body).getPropertyValue(
  '--text-color-1'
);
export const placeholderColor = getComputedStyle(body).getPropertyValue(
  '--placeholder-color'
);
export const invalidColor = getComputedStyle(body).getPropertyValue(
  '--text-color-invalid'
);
