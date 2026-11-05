/** Keep public assets under Vite's base path, including on GitHub project Pages. */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
