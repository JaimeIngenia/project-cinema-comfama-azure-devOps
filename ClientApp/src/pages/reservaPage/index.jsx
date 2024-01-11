import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as productApi from '../../api/ProductsApi'
import styles from './styles/ReservaPage.module.css'
import iconMovie from '../../assets/iconMovie.svg'

const ReservaPage = () => {


    let navigate = useNavigate();
    let {idPelicula} = useParams();

    //************************************** */

    const [pelicula, setPelicula] = useState(null);
    //************************************** */

    // const [ pelicula, setPelicula ] = useState({
    //     id: null,
    //     titulo: "",
    //     imagenPromocional: "",
    //     sinopsis: "",
    //     valor: "",
    //     duracion: "",
    //     idFormato:"",
    //     idGenero:""
    
    //   })
    //**************************************** */

    // productApi.getCategoriaOracleBySlug(idPelicula).then( 
    //   _categoria => setPelicula(_categoria)
    // )
//********************************* */
    // productApi.getCategoriaOracleBySlug(idPelicula)
    // .then(_categoria => setPelicula(_categoria))
    // .catch(error => console.error("Error:", error));


    // console.log(pelicula);
//*********************************** */

// const obtenerPeliculaPorId = async (idPelicula) => {
//     try {
//       const response = await fetch(`https://localhost:7240/api/pelicula/VerPeliculaPorId/${idPelicula}`);
  
//       if (response.ok) {
//         const pelicula = await response.json();
 
//         console.log("Pelicula por ID:", pelicula);
//       } else {
//         alert(response.statusText);
//       }
//     } catch (error) {
//       console.error("Error al obtener la película por ID:", error);
//     }
//   };
  
  
//   const idPeliculaTest = 5; 
//   obtenerPeliculaPorId(idPeliculaTest);
  
//*********************************** */

      useEffect( () => {

          
        const obtenerPelicula = async () => {
            try {
              const response = await fetch(`https://localhost:7240/api/pelicula/VerPeliculaPorId/${idPelicula}`);
              if (response.ok) {
                const data = await response.json();
                setPelicula(data);
              } else {
                console.error("Error al obtener la película:", response.statusText);
              }
            } catch (error) {
              console.error("Error al obtener la película:", error);
            }
          };
      
          obtenerPelicula();
        
        },[  idPelicula ] )

        console.log(pelicula);
//************************************ */
if (!pelicula) {
    return <p>Cargando...</p>; // Otra lógica de carga si es necesario
  }


//************************************* */
    return (
        // <div>
        //     <h1>Hola soy reserva</h1>
        //     {idPelicula}

            <div className={styles.container}>

                <div className={styles.title}>

                    <div className={styles.image_product}>
                      
                      <img src={pelicula.imagenPromocional} alt="" />
                      <div className={styles.textoDescripcion} >
                        <p>{pelicula.titulo}</p>
                      </div>

                    </div>


                    <div className={styles.image_iconMovie}>
                      <img src={iconMovie} alt="" />
                    </div>

                </div>

                <div className={styles.cuerpo}>

                    <p>{pelicula.sinopsis}</p>
         
                </div>
            </div>


            
        // </div>
    );
}

export default ReservaPage;
