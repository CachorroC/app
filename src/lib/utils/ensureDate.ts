export function ensureDate(dateInput: string | Date): Date {
  try {
    if (!dateInput) {
      throw new Error('dateInput is required');
    }

    // If it's already a Date object, just check validity
    if (dateInput instanceof Date) {
      if (isNaN(dateInput.getTime())) {
        throw new Error('Invalid Date object');
      }

      return dateInput;
    }

    // If it is a string, we need to ensure it's treated as Colombia Time (-05:00)
    // unless it already has timezone information.
    let dateString = dateInput;

    // Check if the string already ends in Z or an offset (e.g., -05:00)
    const hasTimezone = /(Z|[+-]\d{2}:?\d{2})$/.test(dateString);

    if (!hasTimezone) {
      dateString = `${dateString}-05:00`;
    }

    const d = new Date(dateString);

    if (isNaN(d.getTime())) {
      throw new Error(`Invalid Date string: ${dateInput}`);
    }

    return d;
  } catch (error) {
    console.log(error);

    return new Date(dateInput);
  }
}
