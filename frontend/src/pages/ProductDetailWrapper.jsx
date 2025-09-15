import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductDetail from "./ProductDetailsPage";
import { getProducts } from "../api/api";

export default function ProductDetailWrapper() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (state?.product) {
      setProduct(state.product);
    } else {
      getProducts().then((products) => {
        const found = products.find((p) => String(p.id) === String(id));
        setProduct(found);
      });
    }
  }, [id, state]);

  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return <ProductDetail product={product} />;
}
