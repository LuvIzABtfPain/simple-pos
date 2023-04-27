import { Navigate } from "react-router-dom";
import Login from "../components/login";
import Layout from "./Layout";
import { useSelector } from "react-redux";

export default function LoginPage() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    if(isLoggedIn) {
        return <Navigate to='/dashboard' replace/>
    }
    else
    {
    return (
        <Layout>
            <Login/>
        </Layout>
    );
    }
}