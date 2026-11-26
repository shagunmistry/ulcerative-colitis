/**
 * Details about the person behind the site. Replace each TODO(owner) with the real value;
 * nothing here may be guessed.
 */
export const OWNER = {
  name: "TODO(owner): name",
  bio: "TODO(owner): bio",
  why: "TODO(owner): personal motivation for building this site",
  email: "TODO(owner): contact email",
  github: "TODO(owner): GitHub profile URL",
  linkedin: "TODO(owner): LinkedIn URL",
};

export const isSet = (value: string) => value.trim() !== "" && !value.startsWith("TODO(owner)");
