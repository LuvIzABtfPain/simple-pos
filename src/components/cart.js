import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createCart } from "../actions/cart";
export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { customer } = useSelector((state) => state.auth);
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
        <tr>
          <td>
            <img src="https://magento246.com/media/catalog/product/cache/848413c1849be34ae62ad85a67a8cff3/h/o/hot-girl_1.jpg" alt="Item 1"/>
            <span>Item 1</span>
          </td>
          <td>
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </td>
          <td>$10.00</td>
          <td><button><i className="fas fa-trash-alt"></i></button></td>
        </tr>
        <tr>
          <td>
            <img src="https://magento246.com/media/catalog/product/cache/848413c1849be34ae62ad85a67a8cff3/h/o/hot-girl_1.jpg" alt="Item 2"/>
            <span>Item 2</span>
          </td>
          <td>
            <button>-</button>
            <span>2</span>
            <button>+</button>
          </td>
          <td>$20.00</td>
          <td><button><i className="fas fa-trash-alt"></i></button></td>
        </tr>
        <tr>
          <td>
            <img src="https://magento246.com/media/catalog/product/cache/848413c1849be34ae62ad85a67a8cff3/h/o/hot-girl_1.jpg" alt="Item 3"/>
            <span>Item 3</span>
          </td>
          <td>
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </td>
          <td>$15.00</td>
          <td><button><i className="fas fa-trash-alt"></i></button></td>
        </tr>
      </tbody>
    </table>
    <div className="buttons">
      <button className="cancel">Cancel</button>
      <button className="charge">Charge</button>
    </div>
    </div>
  );
}
