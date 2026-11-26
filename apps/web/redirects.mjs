const to = (destination, ...sources) => sources.map((source) => ({ source, destination, permanent: true }));

// Order matters: the first match wins.
export const REDIRECTS = [
  ...to("/understand", "/causes"),
  ...to("/treatments/other", "/alternatives"),
  ...to("/simulator/model", "/model", "/simulator/model-card"),
  ...to("/understand", "/learn", "/learn/about-uc", "/learn/living-with-uc"),
  ...to("/treatments", "/learn/treatments"),
  ...to("/disclaimer", "/terms", "/resources/emergency"),
  ...to("/", "/resources/:path*", "/tools/:path*"),
];
