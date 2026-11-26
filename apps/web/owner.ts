/**
 * Details about the person behind the site. Replace each TODO(owner) with the real value;
 * nothing here may be guessed.
 */
export const OWNER = {
  name: "Shagun Mistry",
  // In the owner's own words, from https://www.shagunmistry.com/about
  bio: "I'm an engineer, filmmaker and advocate for animals. By day I write code: machine learning, web tools and applied AI. On nights and weekends I'm behind a camera, making short films, documentary fragments and a podcast on climate and capital. I volunteer at the local shelter.",
  photoAlt: "Shagun Mistry, in red-tinted glasses and a clip-on microphone, speaking with open hands",
  why: "TODO(owner): personal motivation for building this site",
  email: "ulcerative-colitis.grudge839@passmail.net",
  github: "https://github.com/shagunmistry",
  linkedin: "https://www.linkedin.com/in/shagun-mistry/",
};

export const isSet = (value: string) => value.trim() !== "" && !value.startsWith("TODO(owner)");
