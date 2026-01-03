export function calculatePasswordStrength(password) {
  if (!password) return 'weak';
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return 'weak';
  if (score <= 3) return 'medium';
  return 'strong';
}
export function getStrengthColor(strength) {
  switch (strength) {
    case 'weak':
      return `
        text-rose-700
        dark:text-rose-300
      `;
    case 'medium':
      return `
        text-amber-700
        dark:text-amber-300
      `;
    case 'strong':
      return `
        text-emerald-700
        dark:text-emerald-300
      `;
    default:
      return `
        text-gray-700
        dark:text-gray-300
      `;
  }
}


export function getStrengthBgColor(strength) {
  switch (strength) {
    case 'weak':
      return `
        bg-rose-100
        dark:bg-rose-800/40
      `;
    case 'medium':
      return `
        bg-amber-100
        dark:bg-amber-800/40
      `;
    case 'strong':
      return `
        bg-emerald-100
        dark:bg-emerald-800/40
      `;
    default:
      return `
        bg-gray-100
        dark:bg-gray-800/40
      `;
  }
}
