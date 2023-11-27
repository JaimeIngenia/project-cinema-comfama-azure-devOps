import styles from './Header.module.css'
//images
import logo from "../../assets/cinema/popcorn.png"
import search from "../../assets/cinema/search.svg"
import { Link, NavLink } from 'react-router-dom';




const Header = () => {


    return (
        <>
        <div className={styles.container}>
            <a className={styles.container_links} href="/">
                <img src={logo} alt="" className={styles.container__nav__logo} />
            </a>
          
              <div className={styles.container__seach__image}>
  
                <img src={search} className={styles.search__image} alt="" />
              </div>
              <div  className= {`   ${styles.sud_sud_header} ` } >
  
  
                <a className={styles.container__izq} href="/reserva">
                  <span>Reservas</span>
                </a>
  
                <a className={styles.container__izq}  href="/tareas">
                  <span>TareasPaAle</span>
                </a>

                <a className={styles.container__izq} href="/">
                    <span>Home Page</span>
                </a>

                <a className={styles.container__izq} href="/">
                    <span>Iniciar Sesion</span>
                </a>
                  
  
              </div>       
  
  
        </div>
  
  
      </>
    );
}

export default Header;
