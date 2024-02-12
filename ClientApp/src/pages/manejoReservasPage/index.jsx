import { Modal, Table ,Input} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import style from './styles/ManejoReservasPage.module.css'


const ManejoReservasPage = () => {

    //************************************************************
    // ***************** Filtrar o buscar ************************
    //************************************************************

    const [searchedText, setSearchedText] = useState("")

    
    const [ultimoHorario, setUltimoHorario] = useState(null);


    const mostrarUltimoHorario = async () => {

      const response = await fetch("https://localhost:7240/api/Horario/VerUltimoHorario").then(response => response.json())
          .then(data => { console.log(JSON.stringify(data, null, 2)); setUltimoHorario(data); })

          .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
      mostrarUltimoHorario();
    }, [])

    console.log(ultimoHorario);

    //************************************************************
    // ***************** Reserva Modificada ************************
    //************************************************************

    let {idUsuario} = useParams();

    const [reservaOriginal, setReservaOriginal] = useState([])

    const mostrarReservaOriginal = async () => {

        // const response = await fetch(`https://localhost:7240/api/SillaReserva/VerSillasReservaPorUsuarioModificada/${idUsuario}`).then(response => response.json())
        const response = await fetch(`https://localhost:7240/api/SillaReserva/VerSillasReservaPorUsuarioModificada/${idUsuario}`).then(response => response.json())
            .then(data => { console.log(JSON.stringify(data, null, 2)); setReservaOriginal(data); })
      
            .catch(error => console.error('Error:', error));
      }

    useEffect(() => {
        mostrarReservaOriginal();    
    }, [])


    // const [reservaFiltrada, setReservaFiltrada] = useState({
    //   idSillaReserva: reservaOriginal.idSillaReserva,
    //   numeroSilla: reservaOriginal.numeroSilla,
    //   numeroDocumento: reservaOriginal.numeroDocumento,
    //   nombres: reservaOriginal.nombres,
    //   apellidos: reservaOriginal.apellidos,
    //   correo: reservaOriginal.correo,
    //   idPelicula: ultimoHorario.idPelicula,
    //   idSala: ultimoHorario.idSala,
    //   idHora: ultimoHorario.idHora,
    // });
    
    
   

    //************************************************************
    // ***************** Tabla ************************
    //************************************************************

    const columns = [
        {
          key: 'NumeroSilla',
          title: 'Número de Silla',
          dataIndex: 'numeroSilla',
          filteredValue: [searchedText],
          onFilter: (value , record) => {
            return (
              
            String(record.numeroSilla)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            String(record.numeroDocumento)
              .toLowerCase()
              .includes(value.toLowerCase()) || 
            String(record.nombres)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            String(record.apellidos)
              .toLowerCase()
              .includes(value.toLowerCase()) || 
            String(record.correo)
              .toLowerCase()
              .includes(value.toLowerCase()) || 
            String(record.tituloPelicula)
              .toLowerCase()
              .includes(value.toLowerCase()) || 
            String(record.imagenPromocionalPelicula)
              .toLowerCase()
              .includes(value.toLowerCase()) || 
            String(record.nombreSala)
              .toLowerCase()
              .includes(value.toLowerCase()) || 
            String(record.horaFuncion)
              .toLowerCase()
              .includes(value.toLowerCase()) 
            )
          }
        },
        {
          key: 'NumeroDocumento',
          title: 'Número de Documento',
          dataIndex: 'numeroDocumento',
        },
        {
          key: 'Nombres',
          title: 'Nombres',
          dataIndex: 'nombres',
        },
        {
          key: 'Apellidos',
          title: 'Apellidos',
          dataIndex: 'apellidos',
        },
        {
          key: 'Correo',
          title: 'Correo Electrónico',
          dataIndex: 'correo',
        },
        {
          key: 'TituloPelicula',
          title: 'Título de la Película',
          dataIndex: 'tituloPelicula',
        },
        {
          key: 'ImagenPromocionalPelicula',
          title: 'Imagen Promocional de la Película',
          dataIndex: 'imagenPromocionalPelicula',
          render: (text) => <img src={text} alt="Imagen de la Película" style={{ maxWidth: '100px' }} />,
        },
        {
          key: 'NombreSala',
          title: 'Nombre de la Sala',
          dataIndex: 'nombreSala',
        },
        {
          key: 'HoraFuncion',
          title: 'Hora de la Función',
          dataIndex: 'horaFuncion',
        },
        {
          key:'4',
          title:'Actions',
          render:(record)=>{
            return <>
              <EditOutlined onClick={()=>{onEditSillaReserva(record)}}/>
              <DeleteOutlined onClick={()=> {onDeleteSillaReserva(record)}}  style={{ color: "red", marginLeft: 12 }} />
            </>
          }
        }
      ];

      
    //************************************************************
    // ***************** Eliminar ************************
    //************************************************************
      
      const onDeleteSillaReserva = (record) => {
        console.log("Record:", record);
  
        Modal.confirm({
          title: '¿Estás seguro de eliminar?',
          onOk: async () => {
            try {
              if (record.idSillaReserva) { // Asegúrate de usar el nombre correcto de la propiedad
                // alert(record.idSillaReserva)
                await eliminarSillaReserva(record.idSillaReserva);
                // Actualiza el estado para reflejar la eliminación
                setReservaOriginal((pre) => pre.filter((_jardin) => _jardin.idSillaReserva !== record.idSillaReserva));
              } else {
                console.error("No se puede obtener el ID del jardin a eliminar");
              }
            } catch (error) {
              console.error("Error al eliminar el jardin:", error);
            }
          },
        });
      };


      const eliminarSillaReserva = async (idSillaReserva) => {
        try {
          const response = await fetch(`https://localhost:7240/api/SillaReserva/EliminarSillasReserva/${idSillaReserva}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
          });
      
          if (response.ok) {
            alert("La reserva se ha eliminado correctamente");
            // Puedes realizar acciones adicionales después de la eliminación si es necesario
          } else {
            // alert(response.statusText);
          }
        } catch (error) {
          console.error("Error al eliminar el jardín:", error);
        }
      };
  
        
    //************************************************************
    // ***************** Actualizar ************************
    //************************************************************
    const [isEditing, setIsEditing] = useState(false)
    const [ valueInputEditingSillaReserva, setValueInputEditingSillaReserva ]= useState();


    const handleInputChange = (campo, valor) => {
      setValueInputEditingSillaReserva((prevJardin) => ({
        ...prevJardin,
        [campo]: valor,
      }));
    };

    const onEditSillaReserva= (record) => {
      setIsEditing(true)
      setValueInputEditingSillaReserva({...record})
    }

    const resetEditing = () => {
      setIsEditing(false);
      setValueInputEditingSillaReserva(null)
    }

    const actualizarSillaReserva = async (formValues) => {
      // debugger;
      console.log(formValues.NumeroSilla);
      console.log(formValues.numeroSilla);
      try {
        const response = await fetch(`https://localhost:7240/api/SillaReserva/EditarSillaReserva/${valueInputEditingSillaReserva.idSillaReserva}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            

            NumeroSilla: formValues.NumeroSilla,
            NumeroDocumento: formValues.NumeroDocumento,
            Nombres: formValues.Nombres,
            Apellidos: formValues.Apellidos,
            Correo: formValues.Correo,
            TituloPelicula: formValues.TituloPelicula,
            ImagenPromocionalPelicula: formValues.ImagenPromocionalPelicula,
            NombreSala: formValues.NombreSala,
            HoraFuncion: formValues.HoraFuncion,


          })
        });
    
        if (response.ok) {
          setIsEditing(false);
          // alert("La reserca se ha actualizado correctamente");
          // Puedes realizar acciones adicionales después de la actualización si es necesario
        } else {
          // alert(response.statusText);
        }
      } catch (error) {
        console.error("Error al actualizar el jardin:", error);
      }
    };



    const onchangeTable=(pagination,filters,sorter,extra) =>{
      console.log('params', pagination,filters,sorter, extra);
    }

    return (
        <div>
          <Input.Search 
            placeholder= " Search here ..." 
            onSearch = {(value)=> {
              setSearchedText(value)
              // alert(value)
            }}
            onChange={(e)=>{
              setSearchedText(e.target.value )
            }}
          />

            <Table
                columns={columns}
                dataSource={reservaOriginal}
                onchangeTable={onchangeTable}
                pagination={{
                  // current: 1,
                  pageSize:3,
                }}
            ></Table>

            <Modal
                title="Editar Reserva"
                visible={isEditing}
                onCancel={() => {
                  resetEditing()
                }}
                onOk={() => {
                  // Llama a la función actualizarSillaReserva con los valores del formulario
                  actualizarSillaReserva({


                    NumeroSilla: valueInputEditingSillaReserva?.numeroSilla,
                    NumeroDocumento: valueInputEditingSillaReserva?.numeroDocumento,
                    Nombres: valueInputEditingSillaReserva?.nombres,
                    Apellidos: valueInputEditingSillaReserva?.apellidos,
                    Correo: valueInputEditingSillaReserva?.correo,
                    TituloPelicula: valueInputEditingSillaReserva?.tituloPelicula,
                    ImagenPromocionalPelicula: valueInputEditingSillaReserva?.imagenPromocionalPelicula,
                    NombreSala: valueInputEditingSillaReserva?.nombreSala,
                    HoraFuncion: valueInputEditingSillaReserva?.horaFuncion,

                  });
                  setReservaOriginal(pre => {
                    return pre.map(_jardin=>{
                      if (_jardin.idSillaReserva === valueInputEditingSillaReserva.idSillaReserva){
                        return valueInputEditingSillaReserva
                      }
                      else{
                        return _jardin
                      }
                    })
                  })
                  resetEditing()
                }}
                okText="Guardar"
              >

                <Input
                  value={valueInputEditingSillaReserva?.numeroSilla}
                  onChange={(e) => handleInputChange('numeroSilla', e.target.value)}
                />
                <Input
                  value={valueInputEditingSillaReserva?.numeroDocumento}
                  onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
                />
                <Input 
                  value={valueInputEditingSillaReserva?.nombres} 
                  onChange={(e) => handleInputChange('nombres', e.target.value)}          
                />
                <Input 
                  value={valueInputEditingSillaReserva?.apellidos} 
                  onChange={(e) => handleInputChange('apellidos', e.target.value)}          
                />
                <Input 
                  value={valueInputEditingSillaReserva?.correo} 
                  onChange={(e) => handleInputChange('correo', e.target.value)}          
                />
                <Input 
                  value={valueInputEditingSillaReserva?.tituloPelicula} 
                  onChange={(e) => handleInputChange('tituloPelicula', e.target.value)}          
                />
                <Input 
                  value={valueInputEditingSillaReserva?.imagenPromocionalPelicula} 
                  onChange={(e) => handleInputChange('imagenPromocionalPelicula', e.target.value)}          
                />
                <Input 
                  value={valueInputEditingSillaReserva?.nombreSala} 
                  onChange={(e) => handleInputChange('nombreSala', e.target.value)}          
                />
                <Input 
                  value={valueInputEditingSillaReserva?.horaFuncion} 
                  onChange={(e) => handleInputChange('horaFuncion', e.target.value)}          
                />
              
            </Modal>
        </div>
    );
}

export default ManejoReservasPage;
