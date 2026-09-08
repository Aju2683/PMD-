import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Barcode,
  Box,
  CalendarClock,
  CircleDollarSign,
  PackageCheck,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Weight,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import AppShell from "../components/layout/AppShell";

import RatingStars from "../components/products/RatingStars";
import StatePanel from "../components/products/StatePanel";
import StockBadge from "../components/products/StockBadge";

import {
  getProductById,
} from "../services/productApi";

import {
  currency,
  formatCategory,
} from "../utils/formatters";

function DetailSkeleton() {
  return (
    <div className="grid animate-pulse gap-5 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="aspect-square rounded-[30px] bg-white/[0.04]" />

      <div className="space-y-4 rounded-[30px] border border-white/7 bg-[#0a1710]/70 p-6">
        <div className="h-3 w-24 rounded-full bg-white/[0.05]" />

        <div className="h-8 w-4/5 rounded-xl bg-white/[0.06]" />

        <div className="h-4 w-full rounded-full bg-white/[0.045]" />

        <div className="h-4 w-4/5 rounded-full bg-white/[0.045]" />

        <div className="h-24 rounded-2xl bg-white/[0.035]" />
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const { productId } =
    useParams();

  const [
    product,
    setProduct,
  ] = useState(null);

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const loadProduct =
    async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getProductById(
            productId,
          );

        setProduct(response);
        setSelectedImage(0);
      } catch (err) {
        setError(
          err.message ||
            "Unable to load this product.",
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  return (
    <AppShell
      headerProps={{
        title:
          product?.title ||
          "Product Details",

        eyebrow:
          "Catalog inspection",

        hideSearch: true,
      }}
    >
      <div className="mx-auto w-full max-w-[1480px] px-4 py-5 sm:px-6 sm:py-7 xl:px-8 xl:py-8">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.025] px-3.5 py-2 text-xs font-semibold text-[#91a59a] transition hover:border-[#066839]/35 hover:bg-[#066839]/8 hover:text-white"
        >
          <ArrowLeft className="size-4" />

          Back to inventory
        </Link>

        {loading ? (
          <DetailSkeleton />
        ) : error ? (
          <StatePanel
            type="error"
            title="This product could not be loaded"
            message={error}
            onRetry={
              loadProduct
            }
          />
        ) : product ? (
          <>
            <section className="grid gap-5 xl:grid-cols-[1.03fr_0.97fr]">
              <div className="rounded-[30px] border border-white/7 bg-[#0a1710]/82 p-3 sm:p-4">
                <div className="relative grid aspect-[1.15/1] place-items-center overflow-hidden rounded-[24px] border border-white/6 bg-gradient-to-br from-[#102218] to-[#07110c] p-6 sm:p-10">
                  <div className="absolute left-4 top-4 rounded-full border border-[#066839]/25 bg-[#066839]/12 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6edc9e]">
                    {formatCategory(
                      product.category,
                    )}
                  </div>

                  <img
                    src={
                      product.images?.[
                        selectedImage
                      ] ||
                      product.thumbnail
                    }
                    alt={
                      product.title
                    }
                    className="h-full w-full object-contain"
                  />
                </div>

                {product.images
                  ?.length >
                  1 && (
                  <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
                    {product.images.map(
                      (
                        image,
                        index,
                      ) => (
                        <button
                          key={
                            image
                          }
                          type="button"
                          onClick={() =>
                            setSelectedImage(
                              index,
                            )
                          }
                          className={`aspect-square overflow-hidden rounded-2xl border p-1.5 transition ${
                            selectedImage ===
                            index
                              ? "border-[#0d8a4c] bg-[#066839]/10"
                              : "border-white/7 bg-white/[0.025] hover:border-white/15"
                          }`}
                        >
                          <img
                            src={
                              image
                            }
                            alt={`${product.title} view ${
                              index +
                              1
                            }`}
                            className="h-full w-full object-contain"
                          />
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>

              <article className="rounded-[30px] border border-white/7 bg-[#0a1710]/82 p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#698274]">
                      {product.brand ||
                        "Unbranded"}{" "}
                      · SKU{" "}
                      {product.sku ||
                        `PRD-${product.id}`}
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
                      {
                        product.title
                      }
                    </h2>
                  </div>

                  <StockBadge
                    stock={
                      product.stock
                    }
                  />
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4 border-y border-white/6 py-4">
                  <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                    {currency.format(
                      product.price,
                    )}
                  </p>

                  <div className="h-8 w-px bg-white/8" />

                  <RatingStars
                    rating={
                      product.rating
                    }
                  />

                  <span className="text-xs text-[#70877b]">
                    {product.reviews
                      ?.length ||
                      0}{" "}
                    recent reviews
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-[#95a79d]">
                  {
                    product.description
                  }
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <InfoTile
                    icon={Truck}
                    label="Shipping"
                    value={
                      product.shippingInformation ||
                      "Standard shipping"
                    }
                  />

                  <InfoTile
                    icon={
                      ShieldCheck
                    }
                    label="Warranty"
                    value={
                      product.warrantyInformation ||
                      "See product policy"
                    }
                  />

                  <InfoTile
                    icon={
                      ShoppingBag
                    }
                    label="Minimum order"
                    value={`${
                      product.minimumOrderQuantity ||
                      1
                    } units`}
                  />

                  <InfoTile
                    icon={
                      PackageCheck
                    }
                    label="Availability"
                    value={
                      product.availabilityStatus ||
                      `${product.stock} units`
                    }
                  />
                </div>

                <div className="mt-6 rounded-[22px] border border-[#f0b84b]/15 bg-[#f0b84b]/[0.045] p-4">
                  <div className="flex items-center gap-2 text-[#f0c66f]">
                    <CircleDollarSign className="size-4" />

                    <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                      Commercial snapshot
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
                    <div>
                      <p className="text-[#816f4d]">
                        Discount
                      </p>

                      <p className="mt-1 font-semibold text-[#f5e2b8]">
                        {
                          product.discountPercentage
                        }
                        %
                      </p>
                    </div>

                    <div>
                      <p className="text-[#816f4d]">
                        Stock value
                      </p>

                      <p className="mt-1 font-semibold text-[#f5e2b8]">
                        {currency.format(
                          product.price *
                            product.stock,
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-[#816f4d]">
                        Return policy
                      </p>

                      <p className="mt-1 font-semibold text-[#f5e2b8]">
                        {product.returnPolicy ||
                          "Standard"}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </section>

            <section className="mt-5 grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
              <article className="rounded-[28px] border border-white/7 bg-[#0a1710]/82 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#668071]">
                  Technical profile
                </p>

                <h3 className="mt-2 text-lg font-semibold text-white">
                  Product
                  specifications
                </h3>

                <div className="mt-5 divide-y divide-white/6">
                  <SpecRow
                    icon={Barcode}
                    label="Barcode"
                    value={
                      product.meta
                        ?.barcode ||
                      "Not listed"
                    }
                  />

                  <SpecRow
                    icon={Weight}
                    label="Weight"
                    value={`${
                      product.weight ||
                      "—"
                    } kg`}
                  />

                  <SpecRow
                    icon={Ruler}
                    label="Dimensions"
                    value={
                      product.dimensions
                        ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`
                        : "Not listed"
                    }
                  />

                  <SpecRow
                    icon={Box}
                    label="Category"
                    value={formatCategory(
                      product.category,
                    )}
                  />

                  <SpecRow
                    icon={
                      CalendarClock
                    }
                    label="API updated"
                    value={
                      product.meta
                        ?.updatedAt
                        ? new Date(
                            product.meta.updatedAt,
                          ).toLocaleDateString()
                        : "Not listed"
                    }
                  />
                </div>
              </article>

              <article className="rounded-[28px] border border-white/7 bg-[#0a1710]/82 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#668071]">
                      Customer signal
                    </p>

                    <h3 className="mt-2 text-lg font-semibold text-white">
                      Recent reviews
                    </h3>
                  </div>

                  <span className="grid size-10 place-items-center rounded-2xl bg-[#f0b84b]/10 text-[#f0b84b]">
                    <Star className="size-[18px] fill-current" />
                  </span>
                </div>

                <div className="mt-5 grid gap-3 lg:grid-cols-3">
                  {(product.reviews ||
                    []).map(
                    (
                      review,
                      index,
                    ) => (
                      <div
                        key={`${review.reviewerEmail}-${index}`}
                        className="rounded-[20px] border border-white/6 bg-white/[0.025] p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate text-xs font-semibold text-[#dce7e1]">
                            {
                              review.reviewerName
                            }
                          </p>

                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#f0c66f]">
                            <Star className="size-3 fill-current" />

                            {
                              review.rating
                            }
                          </span>
                        </div>

                        <p className="mt-3 text-xs leading-5 text-[#82978c]">
                          {
                            review.comment
                          }
                        </p>

                        <p className="mt-3 text-[10px] text-[#566e61]">
                          {review.date
                            ? new Date(
                                review.date,
                              ).toLocaleDateString()
                            : "Recent"}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </article>
            </section>
          </>
        ) : null}
      </div>
    </AppShell>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-[20px] border border-white/6 bg-white/[0.025] p-4">
      <div className="flex items-center gap-2 text-[#5dcc8a]">
        <Icon className="size-4" />

        <p className="text-[10px] font-semibold uppercase tracking-[0.13em]">
          {label}
        </p>
      </div>

      <p className="mt-2 text-xs font-medium leading-5 text-[#c9d6cf]">
        {value}
      </p>
    </div>
  );
}

function SpecRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/[0.035] text-[#6f8b7b]">
        <Icon className="size-4" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#5d7467]">
          {label}
        </p>

        <p className="mt-1 truncate text-xs font-medium text-[#cbd8d1]">
          {value}
        </p>
      </div>
    </div>
  );
}