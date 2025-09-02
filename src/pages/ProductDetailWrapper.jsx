import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductDetail from "./ProductDetailsPage";
import products from "../data/products";


export default function ProductDetailWrapper() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = state?.product || products.find((p) => p.id === id);

  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return <ProductDetail product={product} />;
}
