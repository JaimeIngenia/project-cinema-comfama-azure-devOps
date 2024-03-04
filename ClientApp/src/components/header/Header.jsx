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

              <div  className= {styles.sud_sud_header}  >

              <Link to={"/"} style={{ color: 'black', textDecoration: 'none' }}>
                    <span>Home</span>
              </Link>

              <Link  to={`/manejoReservasPageReal/${idUsuario}`}style={{ color: 'black', textDecoration: 'none' }}>
                <span>Reservas Activas</span>
              </Link>
        
              {
                  adminStateRedux
                  ?
              <Link  to={"/agregarPeliculas/"}style={{ color: 'black', textDecoration: 'none' }}>
                <span>Agregar Peliculas</span>

              </Link>
              :
              null
              }
              
              {
                  adminStateRedux
                  ?
                  <Link  to={"/manejoPeliculas"}style={{ color: 'black', textDecoration: 'none' }}>
                    <span>Manejo Peliculas</span>
                  </Link>
                  :
                  null
                }

                {
                  adminStateRedux
                  ?
                  <Link  to={"/loginAdmin"}style={{ color: 'black', textDecoration: 'none' }}>
                    <span>Registro Admin</span>
                  </Link>
                  :
                  null
                }

                
              </div>
        </div>
      </>
    );
}

export default Header;
