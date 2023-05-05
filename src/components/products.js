import { useSelector } from "react-redux";
export default function Products() {
  const { loading, products } = useSelector((state) => state.productList);
  if(products.length !== 0){
    const listItems = products.items.map(item =>
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
            <small>{item.price_range.minimum_price.regular_price.value}</small> {item.price_range.minimum_price.regular_price.currency}
          </h2>
          <a href="#" className="buy">
            Buy Now
          </a>
        </div>
      </div>
    )
    return (
      <div className="productList">
      {listItems}
      </div>
    )
  } else {
  return (
    <div className="productList">
      <div className="card">
        <div className="imgBox">
          <img
            src="https://www.corsair.com/corsairmedia/sys_master/productcontent/CH-9300011-NA-M65_PRO_RGB_BLK_04.png"
            alt="mouse corsair"
            className="mouse"
          />
        </div>
        <div className="contentBox">
          <h3>Mouse Corsair M65</h3>
          <h2 className="price">
            61.<small>98</small> €
          </h2>
          <a href="#" className="buy">
            Buy Now
          </a>
        </div>
      </div>
      <div className="card">
        <div className="imgBox">
          <img
            src="https://www.corsair.com/corsairmedia/sys_master/productcontent/CH-9300011-NA-M65_PRO_RGB_BLK_04.png"
            alt="mouse corsair"
            className="mouse"
          />
        </div>
        <div className="contentBox">
          <h3>Mouse Corsair M65</h3>
          <h2 className="price">
            61.<small>98</small> €
          </h2>
          <a href="#" className="buy">
            Buy Now
          </a>
        </div>
      </div>
      <div className="card">
        <div className="imgBox">
          <img
            src="https://www.corsair.com/corsairmedia/sys_master/productcontent/CH-9300011-NA-M65_PRO_RGB_BLK_04.png"
            alt="mouse corsair"
            className="mouse"
          />
        </div>
        <div className="contentBox">
          <h3>Mouse Corsair M65</h3>
          <h2 className="price">
            61.<small>98</small> €
          </h2>
          <a href="#" className="buy">
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}
}
