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
import HomePage from "./pages/homePage"

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    //{
    //    path: '/reserva',
    //    element: <Reserva />
    //},
    {
       path: '/tareas',
       element: <Tareas />
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