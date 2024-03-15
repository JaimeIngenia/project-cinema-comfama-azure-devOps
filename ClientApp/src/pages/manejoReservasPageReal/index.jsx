import { Modal, Table ,Input} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';



const ManejoReservasPageReal = () => {

    //************************************************************
    // ***************** Filtrar o buscar ************************
    //************************************************************

    const [searchedText, setSearchedText] = useState("")


    //************************************************************
    // ***************** Horario ************************
    //************************************************************
    
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

        const response = await fetch(`https://localhost:7240/api/ReservaReal/GetReservaRealPropertiesByUser/${idUsuario}`).then(response => response.json())
            .then(data => { console.log(JSON.stringify(data, null, 2)); setReservaOriginal(data); })
      
            .catch(error => console.error('Error:', error));
// debugger;
            console.log(reservaOriginal);
      }

    useEffect(() => {
        mostrarReservaOriginal();    
    }, [])

    
   

    //************************************************************
    // ***************** Tabla ************************
    //************************************************************

    const columns = [
        {
          key: 'NumeroSilla',
          title: 'Número de Silla',
          dataIndex: 'numeroSillasReserva',
          filteredValue: [searchedText],
          onFilter: (value , record) => {
            return (
              
            String(record.numeroSilla)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            String(record.nombres)
              .toLowerCase()
              .includes(value.toLowerCase()) || 
            String(record.correo)
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            String(record.titulo)
              .toLowerCase()
              .includes(value.toLowerCase()) || 
            String(record.imagenPromocional)
              .toLowerCase()
              .includes(value.toLowerCase()) || 
            String(record.nombreSala)
              .toLowerCase()
              .includes(value.toLowerCase()) || 
            String(record.hora)
              .toLowerCase()
              .includes(value.toLowerCase()) 
            
            )
          }
        },
        {
          key: 'idReservaReal',
          title: 'idReservaReal',
          dataIndex: 'idReservaReal',
        },
        {
          key: 'Nombres',
          title: 'Nombres',
          dataIndex: 'nombres',
        },
        {
          key: 'Correo',
          title: 'Correo Electrónico',
          dataIndex: 'correo',
        },
        {
          key: 'TituloPelicula',
          title: 'Título de la Película',
          dataIndex: 'titulo',
        },
        {
          key: 'ImagenPromocionalPelicula',
          title: 'Imagen Promocional de la Película',
          dataIndex: 'imagenPromocional',
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
          dataIndex: 'hora',
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
        // debugger;
        Modal.confirm({
          title: '¿Estás seguro de eliminar?',
          onOk: async () => {
            try {
              if (record.idReservaReal) { // Asegúrate de usar el nombre correcto de la propiedad
                // alert(record.idSillaReserva)
                // debugger;
                await eliminarSillaReserva(record.idReservaReal);
                // Actualiza el estado para reflejar la eliminación
                setReservaOriginal((pre) => pre.filter((_jardin) => _jardin.idReservaReal !== record.idReservaReal));
              } else {
                console.error("No se puede obtener el ID del jardin a eliminar");
              }
            } catch (error) {
              console.error("Error al eliminar el jardin:", error);
            }
          },
        });
      };


      const eliminarSillaReserva = async (IdReservaReal) => {
        try {
          // debugger;
          const response = await fetch(`https://localhost:7240/api/ReservaReal/EliminarReservaReal/${IdReservaReal}`, {
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
      console.log(formValues.numeroSillasReserva);
      console.log(formValues.numeroSillasReserva);
      try {
        // debugger;
        const response = await fetch(`https://localhost:7240/api/ReservaReal/EditarReservaReal/${valueInputEditingSillaReserva.idReservaReal}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            

            idReservaReal: formValues.idReservaReal,
            nombres: formValues.nombres,
            correo: formValues.correo,
            titulo: formValues.titulo,
            imagenPromocional: formValues.imagenPromocional,
            nombreSala: formValues.nombreSala,
            hora: formValues.hora,
            numeroSillasReserva: formValues.numeroSillasReserva,


          })
        });
    
        if (response.ok) {
          setIsEditing(false);
          alert("La reserva se ha actualizado correctamente");
          // Puedes realizar acciones adicionales después de la actualización si es necesario
        } else {
          // alert(response.statusText);
        }
      } catch (error) {
        console.error("Error al actualizar el la reserva:", error);
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


                    idReservaReal: valueInputEditingSillaReserva?.idReservaReal,
                    nombres: valueInputEditingSillaReserva?.nombres,
                    correo: valueInputEditingSillaReserva?.correo,
                    titulo: valueInputEditingSillaReserva?.titulo,
                    imagenPromocional: valueInputEditingSillaReserva?.imagenPromocional,
                    nombreSala: valueInputEditingSillaReserva?.nombreSala,
                    hora: valueInputEditingSillaReserva?.hora,
                    numeroSillasReserva: valueInputEditingSillaReserva?.numeroSillasReserva,

                  });
                  setReservaOriginal(pre => {
                    return pre.map(_jardin=>{
                      if (_jardin.idReservaReal === valueInputEditingSillaReserva.idReservaReal){
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
                  value={valueInputEditingSillaReserva?.idReservaReal}
                  onChange={(e) => handleInputChange('idReservaReal', e.target.value)}
                />
                <Input
                  value={valueInputEditingSillaReserva?.nombres}
                  onChange={(e) => handleInputChange('nombres', e.target.value)}
                />
                <Input 
                  value={valueInputEditingSillaReserva?.correo} 
                  onChange={(e) => handleInputChange('correo', e.target.value)}          
                />
                <Input 
                  value={valueInputEditingSillaReserva?.titulo} 
                  onChange={(e) => handleInputChange('titulo', e.target.value)}          
                />
                <Input 
                  value={valueInputEditingSillaReserva?.imagenPromocional} 
                  onChange={(e) => handleInputChange('imagenPromocional', e.target.value)}          
                />
                <Input 
                  value={valueInputEditingSillaReserva?.nombreSala} 
                  onChange={(e) => handleInputChange('nombreSala', e.target.value)}          
                />
                <Input 
                  value={valueInputEditingSillaReserva?.hora} 
                  onChange={(e) => handleInputChange('hora', e.target.value)}          
                />
                <Input 
                  value={valueInputEditingSillaReserva?.numeroSillasReserva} 
                  onChange={(e) => handleInputChange('numeroSillasReserva', e.target.value)}          
                />
 
              
            </Modal>
        </div>
    );
}

export default ManejoReservasPageReal;
