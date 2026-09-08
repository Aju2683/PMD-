import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getAllProducts,
  getCategories,
} from "../services/productApi";

export default function useProducts() {
  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    categories,
    setCategories,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    lastUpdated,
    setLastUpdated,
  ] = useState(null);

  const loadDashboardData = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      try {
        const [
          productResponse,
          categoryResponse,
        ] = await Promise.all([
          getAllProducts(),
          getCategories(),
        ]);

        setProducts(
          productResponse.products || [],
        );

        setCategories(
          categoryResponse || [],
        );

        setLastUpdated(new Date());
      } catch (err) {
        setError(
          err.message ||
            "Something went wrong while loading products.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return {
    products,
    categories,
    loading,
    refreshing,
    error,
    lastUpdated,

    refresh: () =>
      loadDashboardData(true),

    retry: () =>
      loadDashboardData(false),
  };
}