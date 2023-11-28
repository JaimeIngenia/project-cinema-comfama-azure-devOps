import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react";
import {
    createBrowserRouter,
    Router,
    RouterProvider,
} from "react-router-dom";
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import Tareas from "./components/tareas/Tareas.jsx"
import {HomePage} from "./pages/homePage/index.js"
import {Login} from './pages/login'
import {Registro} from './pages/registro'
import {ShoppingCar} from './pages/ShoppingCard/index.js'
import {RegistroEvento} from './pages/registroEvento'
import AgregarPeliculas from "./components/agregarPeliculas/AgregarPeliculas.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
       path: '/registroE',
       element: <RegistroEvento />
    },
    {
       path: '/tareas',
       element: <Tareas />
    },
    {
        path: '/iniciarSesion',
        element: <Login />
    },
    {
        path: '/registro',
        element: <Registro />
    },
    {
        path: '/shoppingCar',
        element: <ShoppingCar />
    },
    {
        path: '/agregarPeliculas',
        element: <AgregarPeliculas />
    }
]);

 const App = () => {

    return (

        <>
            <Header />
            <RouterProvider router={router} />
            <Footer />
        </>


    )
}

export default App;