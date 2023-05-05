import { Navigate } from "react-router-dom";
import TopMenu from "../components/topMenu";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import Products from "../components/products";
import Cart from "../components/cart";

export default function HomePage() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    if(!isLoggedIn) {
        return <Navigate to='/' replace/>
    }
    return (
        <Layout>
            <TopMenu/>
            <div className="content">
            <Products/>
            <Cart/>
            </div>
        </Layout>
    );
}