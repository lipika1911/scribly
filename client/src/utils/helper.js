export const validateEmail= (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return '?'; 

  return name
    .trim()
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};