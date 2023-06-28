import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { customer } = useSelector((state) => state.auth);
  const navigate = useNavigate();
    const navigateToCheckout = () => {
        if(cart.items) {
            navigate('/checkout')
        }
    };

    // useEffect(() => {
  //   if(cart.cartID == null){
  //     if(customer == null){
  //       dispatch(createCart())
  //     } else {
  //       dispatch(createCart(customer));
  //     }
  //   }
  // }, [customer])
  return (
    <div className="cart">
      <h2>Cart</h2>
      <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          (cart.items && (cart.items != [])) ? cart.items.map(item => (
              <tr>
                <td>
                  <img src={item.product.image.url} alt={item.uid}/>
                  <span>{item.product.sku}</span>
                </td>
                <td>
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
                </td>
                <td>{item.product.price_range.minimum_price.regular_price.currency == 'USD' ? '$' : ''} {item.product.price_range.minimum_price.regular_price.value * item.quantity}</td>
                <td><button><i className="fas fa-trash-alt"></i></button></td>
              </tr>
          ))
          : <div>There is no items in cart</div>
        }
      </tbody>
      </table>
    <div className="buttons">
      <button className="cancel">Cancel</button>
      <button className="charge" onClick={navigateToCheckout}>Charge</button>
    </div>
    </div>
  );
}
