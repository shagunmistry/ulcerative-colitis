/**
 * Details about the person behind the site. Replace each TODO(owner) with the real value;
 * nothing here may be guessed.
 */
export const OWNER = {
  name: "Shagun Mistry",
  // In the owner's own words, from https://www.shagunmistry.com/about
  bio: "I'm an engineer, filmmaker and advocate for animals. By day I write code: machine learning, web tools and applied AI. On nights and weekends I'm behind a camera, making short films, documentary fragments and a podcast on climate and capital. I volunteer at the local shelter.",
  photoAlt: "Shagun Mistry, in red-tinted glasses and a clip-on microphone, speaking with open hands",
  // Paragraphs are separated by a blank line.
  why: [
    "I was diagnosed with ulcerative colitis in 2022. Since then I've been through several rounds of steroids, and gone from mesalamine to Remicade to Entyvio.",
    "Each change came with questions: what the drug does, how good the evidence is, and what I should be asking my doctors. I wanted one place that answers in plain language and shows its sources.",
    "I also want people like me to have a say in what happens to our health data. That's why this site has a journal that stays on your device, with terms you set yourself.",
    "I'm a patient and an engineer, not a clinician. This is my story, not advice about yours.",
  ].join("\n\n"),
  email: "ulcerative-colitis.grudge839@passmail.net",
  github: "https://github.com/shagunmistry",
  linkedin: "https://www.linkedin.com/in/shagun-mistry/",
};

export const isSet = (value: string) => value.trim() !== "" && !value.startsWith("TODO(owner)");
