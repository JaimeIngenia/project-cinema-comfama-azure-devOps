import styles from "../styles/ProductList.module.css";
import stock__active from "../../../assets/stock__active.svg";
import add from "../../../assets/add.svg";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from 'react-router-dom';
import { Space, Typography } from 'antd';


export const ProductList = ({ products, onAddCarProduct }) => {

  const { Text } = Typography;
  let navigate = useNavigate();

  console.log(products);


  return (
    <>
      {products.map((x) => {
        return (
          <>
  

            <div key={x.id} className={styles.container}>


              <div className={styles.title}>
                {/* <Link to={"/agregarPeliculas/" + products.idPelicula} >   */}

                  {/* <Link to={"/reserva/" + x.idPelicula } > */}
                     <p>{x.titulo}</p>
                     
                     
                       {/* </Link> */}

                {/* </Link>  */}
                {/* <img src={stock__active} alt="" /> */}
                <p> $ {x.valor}</p>
              </div>



              <div className={styles.cuerpo} >

                <div className={styles.image_product}>
                            <img src={x.imagenPromocional} alt="" />
                            {/* <Link to={"/reserva/" + x.imagenPromocional } > <img src={x.imagenPromocional} alt="" /> </Link> */}
                            {/*<img src="https://archivos-cms.cinecolombia.com/images/6/4/2/4/44246-1-esl-CO/deb991efcca6-poster_480x670.png" alt="" />*/}
                </div>

                <div className={styles.cuerpo_izq}>
                  <p> {x.sinopsis} </p>
                  

                  
                  <div className={styles.verAhora} >
                    <p>{x.duracion} min</p>
         
              
                    
                    {x.idFormato === 1 ? <p>2D</p> : null}
                    {x.idFormato === 2 ? <p>3D</p> : null}
                    {x.idFormato === 3 ? <p>4D</p> : null}

                    <button
                      // onClick={onAddCarProduct}
                      // name={x.id}
                    >
                            <Link to={"/reserva/" + x.idPelicula } >

                      <p>Reservar ➤</p>

                            </Link>
                    </button>


                  </div>
                </div>
              
              </div>




              
              
            </div>
          </>
        );
      })}
    </>
  );
};
