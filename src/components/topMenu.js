import { useDispatch } from "react-redux";
import { generateCustomerToken, logout } from "../actions/auth";
import { fetchProducts } from "../actions/fetchProduct";
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import LoadingSpinner from "./loadingspinner";

Modal.setAppElement("#root");

export default function TopMenu() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("Customers");
  const { items } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if(items === null) {
  //   dispatch(fetchUsers());
  //   }
  // },[]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProducts(name));
  };
  const handleOnchange = (e) => {
    setName(e.target.value);
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleOpenModal = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSelect = (event) => {
    const customerID = event.target.value;
    setSelectedValue(event.target.value);
    const customerEmail = items.find((user) => user.id == customerID).email;
    dispatch(generateCustomerToken(customerEmail)).then(
      dispatch({ type: 'UPDATE_CUSTOMER_INFO', payload: {customerID, customerEmail}})
    );
    setTitle(customerEmail);
  };

  return (
    <div id="topmenu">
      <a href="/">Home</a>
      <a href="#" onClick={handleOpenModal}>
        {title}
      </a>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={{ overlay: { zIndex: 99 }, content: { inset: 345} }}
      >
        <h2>Select a customer:</h2>
        {items ? (
          <select className="dropdown-list" onChange={handleSelect}>
            {items.map((user) => (
              <option value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
        ) : (
          <LoadingSpinner />
        )} 
        <button onClick={handleCloseModal} style={{float: "right"}}>Close</button>
      </Modal>
      <a href="/" onClick={() => dispatch(logout())}>
        Log Out
      </a>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder=" Search Products"
            name="search"
            value={name}
            onChange={handleOnchange}
          />
          <button>
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
