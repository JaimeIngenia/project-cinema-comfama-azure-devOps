import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as productApi from '../../api/ProductsApi'
import styles from './styles/ReservaPage.module.css'
import iconMovie from '../../assets/iconMovie.svg'
// import { Select } from 'antd';
// const { Option  } = Select;
import { Button, ConfigProvider, Flex ,Form , Input} from 'antd';
import { Select, theme } from 'antd';
import Modal from 'antd/lib/modal/Modal';  // Importa el componente Modal de manera independiente
import styled from 'styled-components';
import InfoPage from '../info/index.jsx'
import axios from 'axios';
import Cookies from 'universal-cookie';

const { Option } = Select;
const {Item} = Form;

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

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: #050E12 !important;
    color: white;
  }
  .ant-modal-header {
    background-color: #050E12;
    border-bottom: 1px solid #050E12;
  }
  // Añade aquí más estilos si es necesario
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
    let idPeliculaInt = parseInt(idPelicula);

    //*********************  para filtros */

    // const guardarHorario = async (sala, hora, idPelicula) => {
 const [numerosSillasReserva, setNumerosSillasReserva] = useState([]);

   const FiltrarSillasReservadas = async(salaToFilter,horaToFilter,idPelicula) => {
    // const salaToFilter = 1;
    // const horaToFilter = 1;

    try {
      // const response = await axios.get(`https://localhost:7240/api/ReservaReal/GetReservasBySalaYHora/${salaToFilter}/${horaToFilter}`);
      const response = await axios.get(`https://localhost:7240/api/ReservaReal/GetReservasBySalaYHoraYPelicula/${salaToFilter}/${horaToFilter}/${idPelicula}`);
      const reservas = response.data;

      if (reservas.length > 0) {
        const numerosSillasReserva = reservas.map(reserva => reserva.numeroSillasReserva);
        setNumerosSillasReserva(numerosSillasReserva);
      } else {
        alert('El usuario o la contraseña no son correctos');
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };


    //*********************  para filtros */

    const cookies = new Cookies();

    //************************************** */

    const [pelicula, setPelicula] = useState(null);
    //************************************** */


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

        //console.log(pelicula);

//*******************  Modal del select horarios */
        const [selectedValue, setSelectedValue] = useState(null); // Nuevo estado para almacenar el valor seleccionado
        const [modalVisible, setModalVisible] = useState(false); // Nuevo estado para controlar la visibilidad del modal

        const handleChange = (value) => {
          setSelectedValue(value);
          setModalVisible(true); // Mostrar el modal cuando se realiza una selección
        };
      
        const handleModalOk = () => {
          setModalVisible(false); // Cerrar el modal cuando se hace clic en "Ok"
          // alert("Compa aqui debes ejecutar la función de guardar Horario con el id de Sala, Hora y Pelicula");

          const guardarHorario = async (sala, hora, idPelicula) => {
            try {
                const response = await fetch("https://localhost:7240/api/Horario/GuardarHorario", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                      IdPelicula: idPelicula,
                      IdSala: sala,
                      IdHora: hora
                    })
                });
        
                if (response.ok) {
                    // alert("El horario se ha guardado correctamente");
                } else {
                    // alert(response.statusText);
                }
            } catch (error) {
                console.error("Error al guardar el Horario:", error);
            }
          }

          
          //   const FiltrarSillasReservadas = async () => {

          //     const salaToFilter = 1;
          //     const horaToFilter = 1;
          //     debugger;
          //     await axios.get(`https://localhost:7240/api/ReservaReal/GetReservasBySalaYHora/${salaToFilter}/${horaToFilter}`)
              
          //     .then(response=>{
              
          //         return response.data;
          //         console.log("Jaime response.data: " + response.data);
              
          //     })
          //     .then(response=>{
      
                  
                  
                  
          //         if(response.length>0){

          //             var respuesta = response[0];
          //             console.log("Jaime esta es la respuesta" + respuesta);
          //             console.log(respuesta);
          //             //--COOKKIES
          //             cookies.set('idReservaReal', respuesta.idReservaReal , { path: '/' });
          //             cookies.set('nombres', respuesta.nombres , { path: '/' });
          //             cookies.set('correo', respuesta.correo , { path: '/' });
          //             cookies.set('titulo', respuesta.titulo , { path: '/' });
          //             cookies.set('imagenPromocional', respuesta.imagenPromocional , { path: '/' });
          //             cookies.set('nombreSala', respuesta.nombreSala , { path: '/' });
          //             cookies.set('hora', respuesta.hora , { path: '/' });
          //             cookies.set('numeroSillasReserva', respuesta.numeroSillasReserva , { path: '/' });
          //             alert("Bienvenido: " + respuesta.nombres + " " + respuesta.numeroSillasReserva);
          //             //setAutrizado(true)
          //             // dispatch( changeAuthorized() )
          //             // console.log("Jaime este es el authorizedStateRedux: ");
          //             // console.log(authorizedStateRedux);
                     
          //         }else{
          //             alert('El usuario o la contraseña no son correctos')
          //             //setAutrizado(false)
          //         }
          //     })
          //     .catch(error=>{
          //         console.log("Jaime este es el error" + error);
          //     })
      
          //     // if(cookies.get('idTipoRol')===1)
          //     // {
          //     //   dispatch( changeAdmin() )
          //     // }
      
          // };
//           const FiltrarSillasReservadas = async () => {
//             const salaToFilter = 1;
//             const horaToFilter = 1;

//             try {
//               const response = await axios.get(`https://localhost:7240/api/ReservaReal/GetReservasBySalaYHora/${salaToFilter}/${horaToFilter}`);
//               const reservas = response.data;

//               if (reservas.length > 0) {
//                 // Obtener solo el campo 'numeroSillasReserva' de cada reserva
//                 const numerosSillasReserva = reservas.map(reserva => reserva.numeroSillasReserva);
// debugger;
//                 // Ahora 'numerosSillasReserva' es un array que contiene solo los valores de 'numeroSillasReserva'
//                 console.log("Numeros de sillas reservadas:", numerosSillasReserva);

//                 // Puedes hacer lo que necesites con el nuevo array
//                 // Por ejemplo, podrías sumar los valores o realizar alguna operación específica.
//               } else {
//                 alert('El usuario o la contraseña no son correctos');
//               }
//             } catch (error) {
//               console.log("Error:", error);
//             }
//           };

          FiltrarSillasReservadas(selectedSala,selectedHora,idPeliculaInt);
          guardarHorario(selectedSala , selectedHora, idPeliculaInt)
        
        
        };
      
        const handleModalCancel = () => {
          setModalVisible(false); // Cerrar el modal cuando se hace clic en "Cancelar"
        };
//*******************  Salas Select */

const [selectedSala, setSelectedSala] = useState(null);

const onSalaChange = (selectedOption) => {
  setSelectedSala(selectedOption);
};

const [salas, setSalas] = useState([])

const mostrarSalas = async () => {

  const response = await fetch("https://localhost:7240/api/Sala/VerSala").then(response => response.json())
      .then(data => { console.log(JSON.stringify(data, null, 2)); setSalas(data); })

      .catch(error => console.error('Error:', error));
}


//*******************  Horas Select */
const [selectedHora, setSelectedHora] = useState(null);

const onHoraChange = (selectedOption) => {
  setSelectedHora(selectedOption);
  setModalVisible(true); 
  // alert(selectedOption)
};

const [horas, setHoras] = useState([])

const mostrarHoras = async () => {

  const response = await fetch("https://localhost:7240/api/Hora/VerHoras").then(response => response.json())
      .then(data => { console.log(JSON.stringify(data, null, 2)); setHoras(data); })

      .catch(error => console.error('Error:', error));
}

useEffect(() => {
  mostrarSalas();    
  mostrarHoras();
}, [])


//**********************************Boton reserva */

const [isModalOpenReserva, setIsModalOpenReserva] = useState(false);

const [ultimoHorario, setUltimoHorario] = useState(null);
const [idUltimoHorario, setIdUltimoHorario] = useState(null);

const mostrarUltimoHorario = async () => {

  const response = await fetch("https://localhost:7240/api/Horario/VerUltimoHorario").then(response => response.json())
      .then(data => { console.log(JSON.stringify(data, null, 2));
         setUltimoHorario(data); 
         console.log("Dilbani este es el ultimo horario");
        //  debugger;
         console.log(ultimoHorario);
         const { idHorario } = data;
          setIdUltimoHorario(idHorario);
          // debugger;
          console.log('Id del último horario:', idHorario);
        })

      .catch(error => console.error('Error:', error));
}

    useEffect(() => {
      mostrarUltimoHorario();
    }, [])



    const showModalReserva = () => {
      setIsModalOpenReserva(true);
      
      // alert("Claudia por aquí es...")
      // mostrarUltimoHorario();

      // console.log("Claudia este es el ultimo horario: "+{ultimoHorario})
      
    };
    const handleOkReserva = () => {
      setIsModalOpenReserva(false);
    };
    const handleCancelReserva = () => {
      setIsModalOpenReserva(false);
    };

// function openReservaSillas () {

//   Modal.confirm({
//     title: '¿Que sillas quiere elegir?',
//     onOk: async () => {
//       }
//   })
// }



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
                    
                            <StyledSelect
                                defaultValue="Sala General"
                                style={{ width: 120 }}
                                // placeholder="Escoge tu sala"
                                onChange={onSalaChange}
                                options={salas.map((item) => ({
                                    label: item.nombreSala,
                                    value: item.idSala,
                                }))}
                                name = "formato"
                                dropdownStyle={{ background: '#050E12', color: 'white' }}
                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            />


                          <StyledSelect
                                defaultValue="12 pm"
                                style={{ width: 120 }}
                                onChange={onHoraChange}
                                options={horas.map((item) => ({
                                    label: item.hora1,
                                    value: item.idHora,
                                }))}
                                name = "formato"
                                dropdownStyle={{ background: '#050E12', color: 'white' }}
                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                            />

                        </ConfigProvider> 

                        <Modal
                          title="Valor Seleccionado"
                          visible={modalVisible}
                          onOk={handleModalOk}
                          onCancel={handleModalCancel}
                        >
                          {/* <p>Seleccionaste: {selectedValue}</p> */}
                          <p>Seleccionaste: {selectedSala} y {selectedHora} </p> { console.log(selectedHora) }
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

                      <div className={styles.textoDescripcion__items} >
                        <div className={styles.lienado__cinema} ></div>
                        <br />
                        {/* <div style={{display: 'flex', flexDirection: 'row' }}> */}

                        <h3>Genero</h3>
                          {pelicula.idGenero === 1 ? <p>Familiar</p> : null}
                          {pelicula.idGenero === 2 ? <p>Accion</p> : null}
                          {pelicula.idGenero === 3 ? <p>Comedia</p> : null}
                          {pelicula.idGenero === 4 ? <p>Drama</p> : null}
                          
                          {pelicula.idFormato === 1 ? <p>2D</p> : null}
                          {pelicula.idFormato === 2 ? <p>3D</p> : null}
                          {pelicula.idFormato === 3 ? <p>4D</p> : null}
                        {/* </div> */}
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

                  {/* <Link  to={"/info/"}> */}
                      <StyledTitle onClick={showModalReserva}>Reserva</StyledTitle>
                  {/* </Link> */}
         
                </div>

                  <StyledModal 
                    // title="Eliga una silla" 
                    open={isModalOpenReserva} 
                    onOk={handleOkReserva} 
                    onCancel={handleCancelReserva}
                  >
                    <InfoPage 
                    idUltimoHorarioReal={idUltimoHorario}
                    numerosSillasReserva={numerosSillasReserva}
                    />
                  </StyledModal>


            </div>

            
        // </div>
    );
}

export default ReservaPage;
