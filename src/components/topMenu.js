import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";
export default function TopMenu(){
    const dispatch = useDispatch();
    return(
        <div id="topmenu">
        <a href="/">Home</a>
        <a href="#">Our Products</a>
        <a href="/" onClick={() => dispatch(logout())}>Log Out</a>
        <div className="search">
            <form>
                <input type="text"
                    placeholder=" Search Products"
                    name="search"/>
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