export function filterPasswords(passwords, searchQuery) {
  if (!searchQuery.trim()) return passwords;

  const query = searchQuery.toLowerCase();
  return passwords.filter(
    (pwd) =>
      pwd.title.toLowerCase().includes(query) ||
      pwd.username.toLowerCase().includes(query) ||
      pwd.tags.some((tag) => tag.toLowerCase().includes(query))
  );
}

export function sortPasswords(passwords, sortBy) {
  const sorted = [...passwords];

  switch (sortBy) {
    case 'created_newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    case 'created_oldest':
      return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    case 'title_asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case 'title_desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    case 'strength_high':
      const strengthOrder = { strong: 3, medium: 2, weak: 1 };
      return sorted.sort((a, b) => strengthOrder[b.strength] - strengthOrder[a.strength]);

    case 'strength_low':
      const strengthOrderLow = { strong: 3, medium: 2, weak: 1 };
      return sorted.sort((a, b) => strengthOrderLow[a.strength] - strengthOrderLow[b.strength]);

    case 'important_first':
      return sorted.sort((a, b) => (b.Important ? 1 : 0) - (a.Important ? 1 : 0));

    default:
      return sorted;
  }
}
