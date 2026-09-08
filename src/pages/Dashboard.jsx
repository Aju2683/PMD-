import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CircleDollarSign,
  PackageCheck,
  Star,
  Tags,
  TriangleAlert,
} from "lucide-react";

import AppShell from "../components/layout/AppShell";

import InventoryPulse from "../components/dashboard/InventoryPulse";
import StatCard from "../components/dashboard/StatCard";

import FilterToolbar from "../components/products/FilterToolbar";
import Pagination from "../components/products/Pagination";
import ProductCard from "../components/products/ProductCard";
import ProductSkeleton from "../components/products/ProductSkeleton";
import StatePanel from "../components/products/StatePanel";

import useDebounce from "../hooks/useDebounce";
import useProducts from "../hooks/useProducts";

import {
  compactNumber,
  currency,
} from "../utils/formatters";

const PAGE_SIZE = 12;

export default function Dashboard() {
  const {
    products,
    categories,
    loading,
    refreshing,
    error,
    lastUpdated,
    refresh,
    retry,
  } = useProducts();

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("all");

  const [
    minPrice,
    setMinPrice,
  ] = useState("");

  const [
    maxPrice,
    setMaxPrice,
  ] = useState("");

  const [
    sort,
    setSort,
  ] = useState("default");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const debouncedSearch =
    useDebounce(search, 220);

  const stats = useMemo(() => {
    const total =
      products.length;

    const lowStock =
      products.filter(
        (product) =>
          product.stock <= 10,
      ).length;

    const inventoryValue =
      products.reduce(
        (sum, product) =>
          sum +
          product.price *
            product.stock,
        0,
      );

    const averageRating =
      total
        ? products.reduce(
            (sum, product) =>
              sum +
              Number(
                product.rating || 0,
              ),
            0,
          ) / total
        : 0;

    return {
      total,
      lowStock,
      inventoryValue,
      averageRating,

      categoryCount:
        new Set(
          products.map(
            (product) =>
              product.category,
          ),
        ).size,
    };
  }, [products]);

  const filteredProducts =
    useMemo(() => {
      const normalizedSearch =
        debouncedSearch
          .trim()
          .toLowerCase();

      const min =
        minPrice === ""
          ? null
          : Number(minPrice);

      const max =
        maxPrice === ""
          ? null
          : Number(maxPrice);

      const nextProducts =
        products.filter(
          (product) => {
            const matchesSearch =
              !normalizedSearch ||
              product.title
                .toLowerCase()
                .includes(
                  normalizedSearch,
                ) ||
              product.brand
                ?.toLowerCase()
                .includes(
                  normalizedSearch,
                ) ||
              String(
                product.id,
              ).includes(
                normalizedSearch,
              );

            const matchesCategory =
              category ===
                "all" ||
              product.category ===
                category;

            const matchesMin =
              min === null ||
              Number.isNaN(min) ||
              product.price >= min;

            const matchesMax =
              max === null ||
              Number.isNaN(max) ||
              product.price <= max;

            return (
              matchesSearch &&
              matchesCategory &&
              matchesMin &&
              matchesMax
            );
          },
        );

      const sortedProducts = [
        ...nextProducts,
      ];

      if (
        sort === "price-asc"
      ) {
        sortedProducts.sort(
          (a, b) =>
            a.price - b.price,
        );
      }

      if (
        sort === "price-desc"
      ) {
        sortedProducts.sort(
          (a, b) =>
            b.price - a.price,
        );
      }

      if (
        sort === "rating-desc"
      ) {
        sortedProducts.sort(
          (a, b) =>
            b.rating - a.rating,
        );
      }

      if (
        sort === "rating-asc"
      ) {
        sortedProducts.sort(
          (a, b) =>
            a.rating - b.rating,
        );
      }

      return sortedProducts;
    }, [
      products,
      debouncedSearch,
      category,
      minPrice,
      maxPrice,
      sort,
    ]);

  const totalPages = Math.max(
    Math.ceil(
      filteredProducts.length /
        PAGE_SIZE,
    ),
    1,
  );

  const paginatedProducts =
    filteredProducts.slice(
      (currentPage - 1) *
        PAGE_SIZE,

      currentPage * PAGE_SIZE,
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    category,
    minPrice,
    maxPrice,
    sort,
  ]);

  useEffect(() => {
    if (
      currentPage > totalPages
    ) {
      setCurrentPage(
        totalPages,
      );
    }
  }, [
    currentPage,
    totalPages,
  ]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSort("default");
  };

  return (
    <AppShell
      headerProps={{
        title:
          "Product Command Center",

        onRefresh:
          refresh,

        refreshing,

        searchValue:
          search,

        onSearchChange:
          setSearch,

        searchPlaceholder:
          "Search title, brand or product ID...",
      }}
    >
      <div className="mx-auto w-full max-w-[1680px] px-4 py-5 sm:px-6 sm:py-6 xl:px-8 xl:py-8">
        <section className="relative overflow-hidden rounded-[30px] border border-[#066839]/20 bg-gradient-to-br from-[#0d2117] via-[#0b1811] to-[#08110c] p-5 sm:p-7">
          <div className="absolute -right-16 -top-24 size-64 rounded-full bg-[#066839]/15 blur-[80px]" />

          <div className="absolute bottom-0 right-[18%] h-px w-48 bg-gradient-to-r from-transparent via-[#f0b84b]/35 to-transparent" />

          <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f0b84b]/15 bg-[#f0b84b]/[0.055] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f0c66f]">
                <span className="size-1.5 rounded-full bg-[#f0b84b] shadow-[0_0_10px_rgba(240,184,75,0.7)]" />

                Live inventory intelligence
              </div>

              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
                See the catalog like an
                operations team, not a
                storefront.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#8ea398]">
                Search, segment, rank,
                and inspect the complete
                DummyJSON product catalog
                from one responsive
                workspace.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <div className="rounded-2xl border border-white/7 bg-white/[0.035] px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#5e776a]">
                  Data source
                </p>

                <p className="mt-1 font-semibold text-[#dfe9e3]">
                  DummyJSON REST API
                </p>
              </div>

              <div className="rounded-2xl border border-white/7 bg-white/[0.035] px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#5e776a]">
                  Last sync
                </p>

                <p className="mt-1 font-semibold text-[#dfe9e3]">
                  {lastUpdated
                    ? lastUpdated.toLocaleTimeString(
                        [],
                        {
                          hour:
                            "2-digit",
                          minute:
                            "2-digit",
                        },
                      )
                    : "Waiting..."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {error && !loading ? (
          <div className="mt-5">
            <StatePanel
              type="error"
              title="Product data could not be loaded"
              message={error}
              onRetry={retry}
            />
          </div>
        ) : (
          <>
            <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              <StatCard
                label="Total products"
                value={
                  loading
                    ? "—"
                    : stats.total
                }
                helper="Live catalog size"
                icon={PackageCheck}
                accent="green"
              />

              <StatCard
                label="Inventory value"
                value={
                  loading
                    ? "—"
                    : compactNumber.format(
                        stats.inventoryValue,
                      )
                }
                helper={
                  loading
                    ? "Calculating"
                    : currency.format(
                        stats.inventoryValue,
                      )
                }
                icon={
                  CircleDollarSign
                }
                accent="gold"
              />

              <StatCard
                label="Average rating"
                value={
                  loading
                    ? "—"
                    : stats.averageRating.toFixed(
                        2,
                      )
                }
                helper="Across all products"
                icon={Star}
                accent="gold"
              />

              <StatCard
                label="Categories"
                value={
                  loading
                    ? "—"
                    : stats.categoryCount
                }
                helper="API-driven groups"
                icon={Tags}
                accent="mint"
              />

              <StatCard
                label="Critical stock"
                value={
                  loading
                    ? "—"
                    : stats.lowStock
                }
                helper="10 units or fewer"
                icon={TriangleAlert}
                accent="slate"
              />
            </section>

            {!loading &&
              products.length >
                0 && (
                <div className="mt-5">
                  <InventoryPulse
                    products={
                      products
                    }
                  />
                </div>
              )}

            <div className="mt-5">
              <FilterToolbar
                search={search}
                setSearch={setSearch}

                category={
                  category
                }
                setCategory={
                  setCategory
                }
                categories={
                  categories
                }

                minPrice={
                  minPrice
                }
                setMinPrice={
                  setMinPrice
                }

                maxPrice={
                  maxPrice
                }
                setMaxPrice={
                  setMaxPrice
                }

                sort={sort}
                setSort={setSort}

                resultCount={
                  filteredProducts.length
                }

                totalCount={
                  products.length
                }

                onReset={
                  resetFilters
                }
              />
            </div>

            <section className="mt-5">
              {loading ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {Array.from(
                    {
                      length: 8,
                    },
                    (_, index) => (
                      <ProductSkeleton
                        key={
                          index
                        }
                      />
                    ),
                  )}
                </div>
              ) : paginatedProducts.length ===
                0 ? (
                <StatePanel
                  title="No products match these filters"
                  message="Try another product name, broaden the price range, or reset the active filters."
                />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {paginatedProducts.map(
                    (
                      product,
                    ) => (
                      <ProductCard
                        key={
                          product.id
                        }
                        product={
                          product
                        }
                      />
                    ),
                  )}
                </div>
              )}
            </section>

            {!loading &&
              paginatedProducts.length >
                0 && (
                <div className="mt-5">
                  <Pagination
                    currentPage={
                      currentPage
                    }

                    totalPages={
                      totalPages
                    }

                    onPageChange={(
                      page,
                    ) => {
                      setCurrentPage(
                        page,
                      );

                      window.scrollTo(
                        {
                          top: 570,
                          behavior:
                            "smooth",
                        },
                      );
                    }}
                  />
                </div>
              )}
          </>
        )}
      </div>
    </AppShell>
  );
}