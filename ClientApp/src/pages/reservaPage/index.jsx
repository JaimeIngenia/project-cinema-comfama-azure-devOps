import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as productApi from '../../api/ProductsApi'
import styles from './styles/ReservaPage.module.css'
import iconMovie from '../../assets/iconMovie.svg'
// import { Select } from 'antd';
// const { Option  } = Select;
import { Button, ConfigProvider } from 'antd';
import { Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';  // Importa el componente Modal de manera independiente
import styled from 'styled-components';

const { Option } = Select;

const StyledTitle = styled(Button)`
  // background-color: #050E12 !important;
  background-color: #3A0F12!important;

  color: white;
  height: 50px;
  width: 300px;
  margin-left:8.5%;

  &:hover {
    // background-color: #3A0F12 !important;
    background-color: #050E12!important;
    color: white;
  }
`;

const StyledButton = styled(Button)`
  background-color: #050E12 !important;
  color: white;

  &:hover {
    background-color: #3A0F12 !important;
    color: white;
  }
`;

const StyledSelect = styled(Select)`
  .ant-select-selector {
    background-color: #050E12 !important;
    color: white !important;
    border: none !important;
  }

  .ant-select-selector:hover{
    background-color:#3A0F12 !important;
  }


  .ant-select-selector:hover,
  .ant-select-selector:focus-within {
    //border: 1px solid red !important;
    color: white !important;
  }

`;

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

//*******************  Modal del select horarios */
        const [selectedValue, setSelectedValue] = useState(null); // Nuevo estado para almacenar el valor seleccionado
        const [modalVisible, setModalVisible] = useState(false); // Nuevo estado para controlar la visibilidad del modal

        const handleChange = (value) => {
          setSelectedValue(value);
          setModalVisible(true); // Mostrar el modal cuando se realiza una selección
        };
      
        const handleModalOk = () => {
          setModalVisible(false); // Cerrar el modal cuando se hace clic en "Ok"
        };
      
        const handleModalCancel = () => {
          setModalVisible(false); // Cerrar el modal cuando se hace clic en "Cancelar"
        };

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
                      <br />
                      <h6>Horarios Disponibles</h6>

                      <div className={styles.containner__horarios}>


                        <ConfigProvider
                          theme={{
                            token: {
                              // colorPrimary: '#050E12'
                              colorPrimary: '#050E12',
                              colorTextBase: 'white',
                              // colorTextLightSolid: 'red'
                            }
                          }}
                        >
                          <StyledButton
                            type="primary"
                          > 
                          {pelicula.idFormato === 1 ? <p>2D</p> : null}
                          {pelicula.idFormato === 2 ? <p>3D</p> : null}
                          {pelicula.idFormato === 3 ? <p>4D</p> : null}
                         
                          
                          </StyledButton> 

                          

                          <StyledSelect
                            defaultValue="12pm"
                            style={{ width: 120 }}
                            onChange={handleChange}
                            dropdownStyle={{ background: '#050E12', color: 'white' }}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                          >
                            <Option value="12pm">12pm</Option>
                            <Option value="3pm">3pm</Option>
                            <Option value="6pm">6pm</Option>
                            <Option value="9pm">9pm</Option>
                          </StyledSelect>

                        </ConfigProvider> 

                        <Modal
                          title="Valor Seleccionado"
                          visible={modalVisible}
                          onOk={handleModalOk}
                          onCancel={handleModalCancel}
                        >
                          <p>Seleccionaste: {selectedValue}</p>
                        </Modal>

                      </div>

                      <br />

                      <div>
                        <Button>

                        <h5>Precio: {pelicula.valor} $</h5>
                        </Button>
                      </div>

                    </div>

                    <div className={styles.textoDescripcion} >

                      <div className={styles.textoDescripcion__items}>
                        <div className={styles.lienado__cinema} ></div>
                        <br />
                        <h3>Genero</h3>
                        {pelicula.idGenero === 1 ? <p>Familiar</p> : null}
                        {pelicula.idGenero === 2 ? <p>Accion</p> : null}
                        {pelicula.idGenero === 3 ? <p>Comedia</p> : null}
                        {pelicula.idGenero === 4 ? <p>Drama</p> : null}
                        {/* <StyledButton
                            type="primary"
                          > 
                          
                          Drama
                          
                          </StyledButton>  */}

                      </div>

                      <div className={styles.textoDescripcion__items}>
                        <div className={styles.lienado__cinema} ></div>
                        <br />
                        <h3>Título Original</h3>
                        <p>{pelicula.titulo}</p>
                      </div>

                      <div className={styles.textoDescripcion__items}>
                        <div className={styles.lienado__cinema} ></div>
                        <br />
                        <h3>Sinopsis</h3>
                        <p>{pelicula.sinopsis}</p>
                      </div>

                      <div className={styles.textoDescripcion__items}>
                        <div className={styles.lienado__cinema} ></div>
                        <br />
                        <h3>Duración</h3>
                        <p>{pelicula.duracion} min</p>
                        {/* <StyledButton
                            type="primary"
                          > 
                          
                          1 HORA 25 MIN
                          
                          </StyledButton>  */}

                      </div>

                      

                      <br />
                      <div className={styles.lienado__cinema} ></div>

                      {/* <div className={styles.textoDescripcion__items}>
                        <div className={styles.lienado__cinema} ></div>
                        <br />
                        <h3>Horarios Disponibles</h3>


                        <div className={styles.containner__horarios}>


                        <ConfigProvider
                          theme={{
                            token: {
                              // colorPrimary: '#050E12'
                              colorPrimary: '#050E12',
                              colorTextBase: 'white',
                              // colorTextLightSolid: 'red'
                            }
                          }}
                        >
                          <StyledButton
                            type="primary"
                          > 
                          
                          2D 
                          
                          </StyledButton> 

                          

                          <StyledSelect
                            defaultValue="12pm"
                            style={{ width: 120 }}
                            onChange={handleChange}
                            dropdownStyle={{ background: '#050E12', color: 'white' }}
                            getPopupContainer={(triggerNode) => triggerNode.parentNode}
                          >
                            <Option value="12pm">12pm</Option>
                            <Option value="3pm">3pm</Option>
                            <Option value="6pm">6pm</Option>
                            <Option value="9pm">9pm</Option>
                          </StyledSelect>
                  
                        </ConfigProvider> 

                        <Modal
                          title="Valor Seleccionado"
                          visible={modalVisible}
                          onOk={handleModalOk}
                          onCancel={handleModalCancel}
                        >
                          <p>Seleccionaste: {selectedValue}</p>
                        </Modal>

                        </div>


                      </div> */}


                    </div>


                    <div className={styles.image_iconMovie}>
                      <img src={iconMovie} alt="" />
                    </div>

                </div>




                <div className={styles.cuerpo}>

                  <Link  to={"/info/"}>
                      <StyledTitle>Reserva</StyledTitle>
                  </Link>
         
                </div>
            </div>


            
        // </div>
    );
}

export default ReservaPage;
