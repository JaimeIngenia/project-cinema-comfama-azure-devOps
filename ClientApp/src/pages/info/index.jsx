import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SeatBooking.css";
import Cookies from "universal-cookie";
import { Modal } from "antd";
import axios from "axios";




const InfoPage = (
  // {horario}
  ) => {

  const [ultimoHorario, setUltimoHorario] = useState(null);
  const [idUltimoHorario, setIdUltimoHorario] = useState(null);


  const mostrarUltimoHorario = async () => {

    const response = await fetch("https://localhost:7240/api/Horario/VerUltimoHorario").then(response => response.json())
        .then(data => { 
          console.log(JSON.stringify(data, null, 2)); 
          setUltimoHorario(data);
          const { idHorario } = data;
          setIdUltimoHorario(idHorario);
          console.log('Id del último horario:', idHorario);
        })

        .catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    mostrarUltimoHorario();
  }, [])
  
  
  // const idHorario = 5

  let navigate = useNavigate();
  // navigate('/agregarPeliculas');

  // const {idHorario} = ultimoHorario



  // console.log("Jaime este es el IdHorario:");
  // console.log(idHorario);
  // console.log("Jaime este es el Usuario:");
  const cookies = new Cookies();
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {

    const idUsuarioCookie = cookies.get('idUsuario');
    console.log('Id de Usuario:', idUsuarioCookie);
    setIdUsuario(idUsuarioCookie);

  }, []);


  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };
  // const handleSeatClick = (seatNumber) => {
  //   // Convierte el número del asiento a entero
  //   const seatInt = parseInt(seatNumber, 10);
  
  //   if (selectedSeats.includes(seatInt)) {
  //     // Si está seleccionado, quítalo del array
  //     setSelectedSeats(selectedSeats.filter((seat) => seat !== seatInt));
  //   } else {
  //     // Si no está seleccionado, agrégalo al array
  //     setSelectedSeats([...selectedSeats, seatInt]);
  //   }
  // };

  const renderSeats = () => {
      const seatRows = [0, 1, 2, 3, 4, 5];
      const seatCols = [1, 2, 3, 4, 5, 6, 7, 8, 9];

     return (
      <div className="seat-layout" >
        <div 
        // style={{color:'black'}}
        >------------ Pantalla del cinema ------------</div>
        {seatRows.map((row) => (
          <div key={row} className="seat-row">
            {seatCols.map((col) => {
              const seatNumber = `${row}${col}`;
              const isSelected = selectedSeats.includes(seatNumber);
             

              return (
                <div
                  key={seatNumber}
                  className={`seat ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSeatClick(seatNumber)}
                >
                  {seatNumber}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

   //*************************** Modal */

   const agregarReserva = async (idUsuario, idHorario) => {
    try {
        const response = await fetch("https://localhost:7240/api/Reserva/GuardarReserva", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                IdUsuario: idUsuario,
                IdHorario: idHorario,
            })
        });

        if (response.ok) {
            alert("La Reserva se ha guardado correctamente");
            console.log(` Jaime este es la reserva: tipo 
            IdUsuario Tipo: ${typeof idUsuario} 
            IdHorario tipo: ${ typeof idHorario} 
            ${idUsuario},${idHorario},
            `);
            // await mostrarTareas();
            } 
        else{
              // alert(response.statusText);
            }
        }
        catch (error) {
            console.error("Error al guardar la reserva:", error);
            }
    }
 //************************* Esto es la parte de traer por id la reserva */

 const [ultimaReservaId, setUltimaReservaId] = useState(null);
 const [sillaReserva, setSillaReserva] = useState(null);

   const [isModalOpen, setIsModalOpen] = useState(false);
  
   const showModal = () => {

      setIsModalOpen(true);

      const obtenerUltimaReservaId = async () => {
        try {
          // Hacer la solicitud HTTP para obtener el Id de la última reserva
          const response = await axios.get('https://localhost:7240/api/Reserva/VerUltimaReservaId');

          // Extraer el Id de la respuesta
          const idUltimaReserva = response.data;

          // Almacenar el Id en el estado
          setUltimaReservaId(idUltimaReserva);
        } catch (error) {
          console.error('Error al obtener la última reserva:', error);
          // Manejar errores según tus necesidades
        }
    };

    // Llamar a la función para obtener la última reserva
    obtenerUltimaReservaId();
    agregarReserva(idUsuario,idUltimoHorario);

   };

   const handleOk = () => {

      setIsModalOpen(false);

      // const guardarSillaReserva = async () => {
      //   try {
      //     if (ultimaReservaId) {
      //       const NumeroSilla = selectedSeats.map(seat => parseInt(seat, 10));
      //       console.log("ESTE ES EL ARRAY DE NUMEROS DE SILLA:");
      //       console.log(NumeroSilla);
    
      //       if (NumeroSilla.length > 5) {
      //         // Muestra el modal de confirmación si hay más de 5 elementos
      //         Modal.confirm({
      //           title: 'Confirmación',
      //           content: 'El número de asientos seleccionados no puede ser mayor a 5. ¿Quieres continuar?',
      //           onOk: async () => {
      //             // Aquí puedes poner la lógica para continuar con la acción
      //             const datosSillaReserva = {
      //               IdReserva: parseInt(ultimaReservaId),
      //               NumeroSilla
      //             };
    
      //             const response = await axios.post('https://localhost:7240/api/SillaReserva/GuardarSillaReservaLista', datosSillaReserva);
    
      //             const sillaReservaGuardada = response.data;
      //             setSillaReserva(sillaReservaGuardada);
      //           },
      //           onCancel: () => {
      //             // Puedes agregar lógica adicional al cancelar
      //           },
      //         });
      //       } else {
      //         // No hay más de 5 elementos, continúa con la acción
      //         const datosSillaReserva = {
      //           IdReserva: parseInt(ultimaReservaId),
      //           NumeroSilla
      //         };
    
      //         const response = await axios.post('https://localhost:7240/api/SillaReserva/GuardarSillaReservaLista', datosSillaReserva);
    
      //         const sillaReservaGuardada = response.data;
      //         setSillaReserva(sillaReservaGuardada);
      //       }
      //     } else {
      //       console.error('No se pudo obtener el Id de la última reserva.');
      //     }
      //   } catch (error) {
      //     console.error('Error al guardar la silla de reserva:', error);
      //   }
      // };

      // const guardarSillaReserva = async () => {
      //   try {
      //     if (ultimaReservaId) {
      //       // Datos adicionales que deseas enviar
      //       const NumeroSilla = parseInt(selectedSeats); // Ejemplo, puedes obtenerlo de otro estado o fuente
      //       // const NumeroSilla = selectedSeats.map(seat => parseInt(seat, 10));
      //       console.log("EST EES EL SELECTEDSEATS: ");
      //       console.log(NumeroSilla);
      //       debugger
      //       // Objeto de datos para la solicitud POST
      //       const datosSillaReserva = {
      //         IdReserva: parseInt(ultimaReservaId),
      //         NumeroSilla
      //       };
        
      //       const response = await axios.post('https://localhost:7240/api/SillaReserva/GuardarSillaReserva', datosSillaReserva);
        
      //       const sillaReservaGuardada = response.data;
      //       setSillaReserva(sillaReservaGuardada);
      //       console.log("Silla guardada exitosamente");
    

      //     } else {
      //       console.error('No se pudo obtener el Id de la última reserva.');
      //     }
      //   } catch (error) {
      //     console.error('Error al guardar la silla de reserva:', error);
      //   }
      // };
//*********** este si funciona */
      // const guardarSillaReserva = async () => {
      //   try {
      //     if (ultimaReservaId) {
      //       // const NumeroSilla = parseInt(selectedSeats); // Ejemplo, puedes obtenerlo de otro estado o fuente
      //       const NumeroSillas = selectedSeats.map(seat => parseInt(seat, 10));
      //       console.log("EST EES EL SELECTEDSEATS: ");
      //       console.log(NumeroSillas);
      //       debugger
      //       // Objeto de datos para la solicitud POST
      //       const datosSillaReserva = {
      //         IdReserva: parseInt(ultimaReservaId),
      //         NumeroSillas
      //       };
        
      //       const response = await axios.post('https://localhost:7240/api/SillaReserva/GuardarSillaReservaLista', datosSillaReserva);
        
      //       const sillaReservaGuardada = response.data;
      //       setSillaReserva(sillaReservaGuardada);
      //       console.log("Silla guardada exitosamente");
    

      //     } else {
      //       console.error('No se pudo obtener el Id de la última reserva.');
      //     }
      //   } catch (error) {
      //     console.error('Error al guardar la silla de reserva:', error);
      //   }
      // };

      const guardarSillaReserva = async () => {
        try {
          if (ultimaReservaId) {
            const NumeroSillas = selectedSeats.map(seat => parseInt(seat, 10));
      
            // Validar que no haya más de 5 elementos en el array
            if (NumeroSillas.length > 5) {
              alert("No puedes seleccionar más de 5 sillas.");
              return; // Detener la ejecución si se excede el límite
            }
      
            // Objeto de datos para la solicitud POST
            const datosSillaReserva = {
              IdReserva: parseInt(ultimaReservaId),
              NumeroSillas
            };
      
            const response = await axios.post('https://localhost:7240/api/SillaReserva/GuardarSillaReservaLista', datosSillaReserva);
      
            const sillaReservaGuardada = response.data;
            setSillaReserva(sillaReservaGuardada);
            console.log("Silla guardada exitosamente");
          } else {
            console.error('No se pudo obtener el Id de la última reserva.');
          }
        } catch (error) {
          console.error('Error al guardar la silla de reserva:', error);
        }
      };
      
    
    
      guardarSillaReserva();
      // navigate(`/manejoReservasPage/${idUsuario}`);
      navigate(`/manejoReservasPage/${idUsuario}`);
      setIsModalOpen(false);
   };
   const handleCancel = () => {
     setIsModalOpen(false);
   };



  return (
    <div className="cinema-seat-booking" style={{background: '#050E12 '}}>
      <h2>Porfavor selecciona un puesto</h2>

      {renderSeats()}
      {selectedSeats.length > 0 && (
        <div className="selected-seat">
          <p>Haz seleccionado el puesto: {selectedSeats.join(", ")}</p>

          {/* <div className="payment">
            <Link to="/payment" className="payment-btn">
              Ir al carrito de compras
            </Link>
          </div> */}
     {/* {idUsuario}{idHorario} */}
          <Link 
          // to="/manejoReservasPage"
           className="go-back-link" onClick={showModal}>
            Reservar ahora!
          </Link>
        </div>
      )}
      <Modal title="Seguro que quiere reservar la silla...? "  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <h1>
          {selectedSeats}
       </h1> 
      </Modal>
    </div>
  );
};

export default InfoPage;
