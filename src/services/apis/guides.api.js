export const fetchGuides = (params = {}) => ({
  url: `/article`,
  method: "GET",
  params,
});

export const fetchSingleArtile = (articleId) => ({
  url: `/article/${articleId}`,
  method: "GET",
});
