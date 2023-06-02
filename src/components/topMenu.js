import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { fetchProducts } from "../actions/fetchProduct";
import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { fetchUsers } from "../actions/fetchUsers";
Modal.setAppElement("#root");

export default function TopMenu() {
  const [name, setName] = useState("");
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
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
    dispatch(fetchUsers());
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSelect = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value); // or do something else with the selected value
  };

  return (
    <div id="topmenu">
      <a href="/">Home</a>
      <a href="#" onClick={handleOpenModal}>
        Customers
      </a>
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} style={{overlay: {zIndex:99}}}>
        <h2>Select a customer:</h2>
        <select className="dropdown-list" onChange={handleSelect}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <button onClick={handleCloseModal}>Close</button>
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
