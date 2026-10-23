/** An article photo served by the site itself from public/articles (1600x900 JPEG); CDN photos use `cdn()` instead. */
export const blogPhoto = (name: string) => `/articles/${name}.jpg`;
