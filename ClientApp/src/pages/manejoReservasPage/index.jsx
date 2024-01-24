import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const ManejoReservasPage = () => {

    //************************************************************
    // ***************** Reserva Modificada ************************
    //************************************************************

    let {idUsuario} = useParams();

    const [reservaOriginal, setReservaOriginal] = useState([])

    const mostrarReservaOriginal = async () => {

        const response = await fetch(`https://localhost:7240/api/SillaReserva/VerSillasReservaPorUsuarioModificada/${idUsuario}`).then(response => response.json())
            .then(data => { console.log(JSON.stringify(data, null, 2)); setReservaOriginal(data); })
      
            .catch(error => console.error('Error:', error));
      }

    useEffect(() => {
        mostrarReservaOriginal();    
    }, [])

    //************************************************************
    // ***************** Tabla ************************
    //************************************************************

    const columns = [
        {
          key: 'numeroSilla',
          title: 'Número de Silla',
          dataIndex: 'numeroSilla',
        },
        {
          key: 'numeroDocumento',
          title: 'Número de Documento',
          dataIndex: 'numeroDocumento',
        },
        {
          key: 'nombres',
          title: 'Nombres',
          dataIndex: 'nombres',
        },
        {
          key: 'apellidos',
          title: 'Apellidos',
          dataIndex: 'apellidos',
        },
        {
          key: 'correo',
          title: 'Correo Electrónico',
          dataIndex: 'correo',
        },
        {
          key: 'tituloPelicula',
          title: 'Título de la Película',
          dataIndex: 'tituloPelicula',
        },
        {
          key: 'imagenPromocionalPelicula',
          title: 'Imagen Promocional de la Película',
          dataIndex: 'imagenPromocionalPelicula',
          render: (text) => <img src={text} alt="Imagen de la Película" style={{ maxWidth: '100px' }} />,
        },
        {
          key: 'nombreSala',
          title: 'Nombre de la Sala',
          dataIndex: 'nombreSala',
        },
        {
          key: 'horaFuncion',
          title: 'Hora de la Función',
          dataIndex: 'horaFuncion',
        },
      ];
      


    return (
        <div>
            {/* <h1>Soy manejo de reservas y este es el usuario: { idUsuario }</h1> */}

            <Table
                columns={columns}
                dataSource={reservaOriginal}
            
            ></Table>
        </div>
    );
}

export default ManejoReservasPage;
