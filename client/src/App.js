import { createBrowserRouter, Navigate, RouterProvider, Outlet } from "react-router-dom";
import Register from './pages/connection/Register';
import Login from './pages/connection/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import { AuthContext } from './context/authContext';

function App() {

    const { currentUser } = useContext(AuthContext);

    const Layout = () => {
        return (
            <>
                <Navbar />
                <Outlet />
            </>
        )
    };

    const PrivateRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to='/login' />
        }
        return children
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <PrivateRoute >
                    <Layout />
                </PrivateRoute>
            ),
            children: [
                {
                    path: "/",
                    element: <Home />
                }
            ]
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "*",
            element: <NotFound />
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;