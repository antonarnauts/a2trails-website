export function getAssetPath(path: string) {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    // Check if we are on GitHub Pages (username.github.io/repo-name/)
    if (hostname.includes('github.io')) {
      const pathSegments = pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        // The first segment is the repository name
        const repoName = pathSegments[0];
        return `/${repoName}/${cleanPath}`;
      }
    }
  }
  
  // Fallback for local development or custom domains
  return `/${cleanPath}`;
}
