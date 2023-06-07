import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "./loadingspinner";
import { createCart } from "../actions/cart";

export default function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productList);
  const { customer } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if (!products.length) {
  //     dispatch(fetchProducts(''));
  //   }
  // }, []);
  const handleOnClick = () => {
    if(customer != null){
      const token = localStorage.getItem("customer");
      dispatch(createCart(token));
    } else {
      dispatch(createCart());
    }
  }
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
          <a href="#" onClick={() => handleOnClick()} className="buy">
            Buy Now
          </a>
        </div>
      </div>)) : 
      <LoadingSpinner/>
      }
      </div>
    );

}
