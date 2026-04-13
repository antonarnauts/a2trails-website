export function getAssetPath(path: string) {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // For GitHub Pages, we can force the base to be lowercase
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const base = `/${pathSegments[0].toLowerCase()}/`;
      return `${base}${cleanPath}`;
    }
  }
  
  return `./${cleanPath}`;
}
