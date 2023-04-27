import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { fetchProducts } from "../actions/fetchProduct";
import { useState } from "react";
export default function TopMenu(){
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchProducts(name));
    }
    const handleOnchange = (e) => {
        setName(e.target.value);
    }
    return(
        <div id="topmenu">
        <a href="/">Home</a>
        <a href="#">Our Products</a>
        <a href="/" onClick={() => dispatch(logout())}>Log Out</a>
        <div className="search">
            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder=" Search Products"
                    name="search"
                    value={name}
                    onChange={handleOnchange}/>
                <button>
                    <i className="fa fa-search"
                    >
                    </i>
                </button>
            </form>
        </div>
        </div>
    );
}