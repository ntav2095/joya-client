export const tourApi = {
  get: (params = {}) => ({
    url: `/tour`,
    method: "GET",
    params: params,
  }),
  getSingleTour: (tourId) => ({
    url: `/tour/${tourId}`,
    method: "GET",
  }),
  book: (data) => ({
    method: "POST",
    url: "/tour/booking",
    data,
  }),
};

export const postsApi = {
  add: (formData) => ({
    url: "/article",
    method: "POST",
    data: formData,
  }),
  get: (params = {}) => ({
    url: `/article`,
    method: "GET",
    params,
  }),
  getSingleArticle: (articleId) => ({
    url: `/article/${articleId}`,
    method: "GET",
  }),
  edit: (formData) => ({
    url: "/article",
    method: "PUT",
    data: formData,
  }),
  delete: (articleId) => ({
    url: `/article/${articleId}`,
    method: "DELETE",
  }),
  getNewArticles: () => ({
    url: `/article/new-articles`,
    method: "GET",
  }),
};

export const visaApi = {
  addVisa: (data) => ({
    method: "POST",
    url: "/visa",
    data,
  }),
  editVisa: (data) => ({
    method: "PUT",
    url: "/visa",
    data,
  }),
  getVisas: () => ({
    method: "GET",
    url: "/visa",
  }),
  getSingleVisa: (visaId) => ({
    method: "GET",
    url: `/visa/${visaId}`,
  }),
  deleteVisa: (visaId) => ({
    method: "DELETE",
    url: "/visa",
    data: { visaId },
  }),
  getVisasCountries: () => ({
    method: "GET",
    url: "/visa",
  }),
};

export const categoryApi = {
  get: () => ({
    method: "GET",
    url: "/admin/categories",
  }),
  add: (formData) => ({
    method: "POST",
    url: "/admin/categories",
    formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
};

export const layoutApi = {
  get: () => ({
    url: `/layout`,
    method: "GET",
  }),
};

export const termApi = {
  getSingle: (type) => ({
    method: "GET",
    url: `/term/${type}`,
  }),
};
