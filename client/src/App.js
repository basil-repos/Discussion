import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import cookies from "js-cookies";
import { logout } from "./redux/userSlice";
import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
    const {currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const Layout = () => {
        if(!currentUser){
            return <Navigate to="/signin" />
        }
        if(!cookies.getItem("access_token")){
            dispatch(logout());
            return <Navigate to="/signin" />
        }

        return (
            <div className="app">
                <Navbar />
                <div className="layout">
                    <Sidebar />
                    <Outlet />
                </div>
            </div>
        );
    }

    const AuthRoute = () => {
        if(currentUser){
            return <Navigate to="/" />
        }

        return <Outlet />;
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
            ]
        },
        {
            path: "/",
            element: <AuthRoute />,
            children: [
                {
                    path: "/signin",
                    element: <Login />
                },
                {
                    path: "/signup",
                    element: <Register />
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
