import styles from './Header.module.css'
//images
import logo from "../../assets/cinema/popcorn.png"
import search from "../../assets/cinema/search.svg"
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import {  useNavigate } from "react-router-dom";



const Header = () => {

  let navigate = useNavigate();

  const cookies = new Cookies();
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {

    const idUsuarioCookie = cookies.get('idUsuario');
    console.log('Id de Usuario:', idUsuarioCookie);
    setIdUsuario(idUsuarioCookie);

  }, []);





  const { adminStateRedux } = useSelector( state => state.admin )

    return (
        <>
        <div className={styles.container}>
            <a className={styles.container_links} href="/">
                <img src={logo} alt="" className={styles.container__nav__logo} />
            </a>

              {/* <div className={styles.container__seach__image}>

                <img src={search} className={styles.search__image} alt="" />
              </div> */}
              <div  className= {styles.sud_sud_header}  >

              {/* <span>{adminStateRedux? <p>true</p>:<p>false</p>}</span> */}

              <Link  to={`/manejoReservasPage/${idUsuario}`}>
                <span>Reservas </span>
              </Link>
              {/* <Link  to={"/cliente"}>
                <span>Cliente</span>
              </Link> */}
              {/* <Link  to={"/info/"}>
                <span>Sillas Info</span>
              </Link> */}

              {/* <Link  to={"/shoppingCar/"}>
                <span>Carrito de Compras</span>
              </Link> */}

              

              {/* <a className={styles.container__izq} href="/shoppingCar">
                  <span>Carrito de Compras</span>
              </a> */}

              {
                  adminStateRedux
                  ?
              <Link  to={"/agregarPeliculas/"}>
                <span>Agregar Peliculas</span>

              </Link>
              :
              null
              // <p></p>
              }


{/*
              <a className={styles.container__izq} href="/agregarPeliculas">
                  <span>Agregar Peliculas</span>
                </a> */}

                {/* <a className={styles.container__izq} href="/registroE">
                  <span>Registro PeliE</span>
                </a>

                <a className={styles.container__izq}  href="/tareas">
                  <span>Tareas</span>
                </a> */}

                <Link  to={"/"}>
                  <span>Home Page</span>
                </Link>

                {/* <a className={styles.container__izq} href="/">
                    <span>Home Page</span>
                </a> */}
                {
                  adminStateRedux
                  ?
                  <Link  to={"/loginAdmin"}>
                    <span>Registro Admin</span>
                  </Link>
                  :
                  null
                  // <p></p>
                }

                {
                  adminStateRedux
                  ?
                  <Link  to={"/manejoPeliculas"}>
                    <span>Manejo Peliculas</span>
                  </Link>
                  :
                  null
                  // <p></p>
                }
{/*
                <a className={styles.container__izq} href="/iniciarSesion">
                    <span>Iniciar Sesion</span>
                </a> */}




              </div>


        </div>


      </>
    );
}

export default Header;
