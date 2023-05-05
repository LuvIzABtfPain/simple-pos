import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../actions/fetchProduct";
import LoadingSpinner from "./loadingspinner";

export default function Products() {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.productList);
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts(''));
    }
  }, []);
    return(
      <div className="productList">
      { products.items ?
      products.items.map(item => (
          <div className="card">
        <div className="imgBox">
          <img
            src={item.image.url}
            alt={item.sku}
            className="mouse"
          />
        </div>
        <div className="contentBox">
          <h3>{item.name}</h3>
          <h2 className="price">
            <small>{item.price_range.minimum_price.regular_price.value} {item.price_range.minimum_price.regular_price.currency} </small> 
          </h2>
          <a href="#" className="buy">
            Buy Now
          </a>
        </div>
      </div>)) : 
      <LoadingSpinner/>
      }
      </div>
    );

}
