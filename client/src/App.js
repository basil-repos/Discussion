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
import Project from "./pages/project/Project"; 
import Team from "./pages/team/Team";
import Create from "./pages/team/Create";
import Overview from "./pages/team/Overview";
import Discussion from "./pages/team/Discussion";
import Members from "./pages/team/Members";
import TeamLayout from "./pages/team/TeamLayout";

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
                {
                    path: "/projects",
                    element: <Project />
                },
                {
                    path: "/teams",
                    element: <Team />
                },
                {
                    path: "/teams/create",
                    element: <Create />
                },
                {
                    path: "/teams/:id",
                    element: <TeamLayout />,
                    children: [
                        {
                            path: "/teams/:id",
                            element: <Overview />
                        },
                        {
                            path: "/teams/:id/discussions",
                            element: <Discussion />
                        },
                        {
                            path: "/teams/:id/members",
                            element: <Members />
                        },
                    ]
                }
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
