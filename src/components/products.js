import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "./loadingspinner";
import { addProductToCart, createCart } from "../actions/cart";

export default function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productList);
  const { cartID } = useSelector((state) => state.cart);
  const { customer } = useSelector((state) => state.auth);

  const handleOnClick = (sku) => {
    if(cartID != null) {
    dispatch(addProductToCart(cartID, sku));
    } else {
      if(customer == null){
        dispatch(createCart()).then(
          (newCartID) => dispatch(addProductToCart(newCartID, sku))
          )
      } else {
        const token = localStorage.getItem('customer');
        dispatch(createCart(token)).then(
          (newCartID) => dispatch(addProductToCart(newCartID, sku))
        );
      }
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
          <a href="#" onClick={() => handleOnClick(item.sku)} className="buy">
            Buy Now
          </a>
        </div>
      </div>)) : 
      <LoadingSpinner/>
      }
      </div>
    );

}
