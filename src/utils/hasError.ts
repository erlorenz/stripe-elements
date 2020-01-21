// Get the Error
const hasError = (field: HTMLInputElement) => {
  // Don't validate submits, buttons, file and reset inputs, and disabled fields
  if (
    field.disabled ||
    field.type === 'file' ||
    field.type === 'reset' ||
    field.type === 'submit' ||
    field.type === 'button'
  )
    return;

  // Get validity
  var validity = field.validity;

  // Get field name
  const displayName = field.dataset.displayname;

  // If valid, return null
  if (validity.valid) return null;

  // If field is required and empty
  if (validity.tooShort || validity.typeMismatch)
    return `Please enter a valid ${displayName}.`;

  // If not the right type
  if (validity.valueMissing) return `Please enter a ${displayName}.`;

  // If too long
  if (validity.tooLong) return 'Please shorten this text.';

  // If number input isn't a number
  if (validity.badInput) return 'Please enter a number.';

  // If a number value doesn't match the step interval
  if (validity.stepMismatch) return 'Please select a valid value.';

  // If a number field is over the max
  if (validity.rangeOverflow)
    return 'This card amount is too high. Please contact us for instructions.';

  // If a number field is below the min
  if (validity.rangeUnderflow) return 'Please select a larger value.';

  // If pattern doesn't match
  if (validity.patternMismatch) return 'Please match the requested format.';

  // If all else fails, return a generic catchall error
  return 'The value you entered for this field is invalid.';
};

export default hasError;
