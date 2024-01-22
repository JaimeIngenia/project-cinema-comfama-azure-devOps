import "bootstrap/dist/css/bootstrap.min.css"

import { useState, useEffect } from "react";

import {

    BrowserRouter,
    createBrowserRouter,
    Route,
    Router,
    RouterProvider,
    Routes,

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

import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import { useSelector } from "react-redux";


import ManejoPeliculas from "./components/manejoPeliculas/ManejoPeliculas.jsx";
import ReservaPage from "./pages/reservaPage/index.jsx";
import { LoginAdmin } from "./pages/loginAdmin/index.jsx";
import InfoPage from "./pages/info/index.jsx";
  

// const router = createBrowserRouter([

//     {
//         path: '/',
//         element: <HomePage />
//     },
//     {
//         path: '/registroE',
//         element: <RegistroEvento />
//     },
//     {
//         path: '/tareas',
//         element: <Tareas />
//     },

//     {
//         path: '/iniciarSesion',
//         element: <Login />
//     },
//     {
//          path: '/registro',
//          element: <Registro />
//     },
//     {
//         path: '/shoppingCar',
//         element: <ShoppingCar />
//     },
//     {
//         path: '/agregarPeliculas',
//         element: <AgregarPeliculas />
//     },
//     {
//         path: '/ruta-privada',
//         element: <ProtectedRoute element={<Login />} canActivate={true} />,
//     },
    
// ]);

  
const App = () => {

    //-------- redux

    const { counterJaime } = useSelector( state => state.counter )
    const { authorizedStateRedux } = useSelector( state => state.authorized )
    const { adminStateRedux } = useSelector( state => state.admin )
    // console.log("Jaime este es el authorizedStateRedux: ");
    // console.log(authorizedStateRedux);

    const [stateReduxAut , setStateReduxAut] = useState(authorizedStateRedux)

    useEffect(()=>{

        setStateReduxAut(authorizedStateRedux)

    } , [authorizedStateRedux])

    const stateReduxAut2 = true;
    
    return (
    <>  
        {/* <h1>
            {counterJaime}
            {authorizedStateRedux? <p>true</p> : <p>false</p> }
            {adminStateRedux?<p>true</p> : <p>false</p>}
        </h1>   */}



        <BrowserRouter>

            {stateReduxAut ? <Header  /> : null}
            {/* {true ? <Header  /> : null} */}


            <Routes>
                
                {
                    // !true ?  <Route exact path="/" element={<Login  />} /> : null
                    !stateReduxAut ?  <Route exact path="/" element={<Login  />} /> : null
                    
                }

   
                
                <Route element={<ProtectedRoute canActivate={stateReduxAut} />} > 
                {/* <Route element={<ProtectedRoute canActivate={true} />} >  */}

                    
                        <Route exact path="/" element={<HomePage />} />
                        <Route exact path="/loginAdmin" element={<LoginAdmin  />} />
                        <Route exact path="/registroE" element={<RegistroEvento />} />
                        <Route exact path="/tareas" element={<Tareas />} />         
                        <Route exact path="/registro" element={<Registro />} />
                        <Route exact path="/shoppingCar" element={<ShoppingCar />} />
                        <Route exact path="/agregarPeliculas" element={<AgregarPeliculas />} />

                        <Route exact path="/agregarPeliculas/:idPelicula" element={<AgregarPeliculas />} />
                        
                        <Route exact path="/iniciarSesion" element={<Login />} />         
                        <Route exact path="/manejoPeliculas" element={<ManejoPeliculas />} />  
                        <Route exact path="/reserva" element={<ReservaPage />} />  
                        <Route exact path="/reserva/:idPelicula" element={<ReservaPage />} />  
                        <Route exact path="/info" element={<InfoPage />} />  

                        

                </Route>


            </Routes>

            {stateReduxAut ? <Footer  /> : null}


        </BrowserRouter>
            
    </>
    )

}

  

export default App;
