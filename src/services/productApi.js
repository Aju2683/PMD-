import axios from "axios";

const productClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

const normalizeApiError = (error) => {
  if (error.code === "ECONNABORTED") {
    return new Error(
      "The request took too long. Please try again.",
    );
  }

  if (!error.response) {
    return new Error(
      "Unable to reach the product service. Check your internet connection.",
    );
  }

  return new Error(
    error.response?.data?.message ||
      `Product service returned an error (${error.response.status}).`,
  );
};

export async function getAllProducts() {
  try {
    const { data } =
      await productClient.get(
        "/products",
        {
          params: {
            limit: 0,
          },
        },
      );

    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function getProductsPage({
  limit = 12,
  skip = 0,
  sortBy,
  order,
} = {}) {
  try {
    const { data } =
      await productClient.get(
        "/products",
        {
          params: {
            limit,
            skip,

            ...(sortBy
              ? {
                  sortBy,
                  order:
                    order || "asc",
                }
              : {}),
          },
        },
      );

    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function searchProducts(
  query,
) {
  try {
    const { data } =
      await productClient.get(
        "/products/search",
        {
          params: {
            q: query,
            limit: 0,
          },
        },
      );

    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function getCategories() {
  try {
    const { data } =
      await productClient.get(
        "/products/categories",
      );

    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function getProductsByCategory(
  category,
) {
  try {
    const { data } =
      await productClient.get(
        `/products/category/${category}`,
        {
          params: {
            limit: 0,
          },
        },
      );

    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}

export async function getProductById(
  productId,
) {
  try {
    const { data } =
      await productClient.get(
        `/products/${productId}`,
      );

    return data;
  } catch (error) {
    throw normalizeApiError(error);
  }
}