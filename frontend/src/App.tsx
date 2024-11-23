import React, {useEffect} from "react";
import "./index.css"

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login/index.tsx";
import Home from "./pages/Home/index.tsx";
import Header from "./components/Header/index.tsx";

import {useNavigate} from 'react-router-dom';
import Logout from "./pages/Logout/index.tsx";

export default function App() {

    const [token, setToken] = React.useState<string | false>(false);

    useEffect(() => {

        const cookies = {
            calendar_connect: false
        };

        document.cookie.split(';').forEach(cookie => {

            const [name, value] = cookie.split('=')
            cookies[name.trim()] = value;
        });

        setToken(cookies.calendar_connect)
    }, []);

    return (
        <BrowserRouter>
            <Header isAuth={token}/>
            <Routes>
                <Route element={<Login/>} path="/login"/>
                <Route path="*" element={<h1>404: page not found</h1>}/>
                <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                <Route path="/logout" element={<PrivateRoute><Logout/></PrivateRoute>}/>
            </Routes>
        </BrowserRouter>
    );
}

const PrivateRoute = ({children}) => {

    const navigate = useNavigate();

    const [token, setToken] = React.useState<string | false>(false);

    useEffect(() => {

        const cookies = {
            calendar_connect: false
        };

        document.cookie.split(';').forEach(cookie => {

            const [name, value] = cookie.split('=')
            cookies[name.trim()] = value;
        });

        setToken(cookies.calendar_connect)

    }, []);

    if (!token) {

        navigate("/login");

        return <Login/>;
    }


    return React.cloneElement(children, {token});
};