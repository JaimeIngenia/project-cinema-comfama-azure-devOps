import React, { useState } from 'react';
import { Button, Table , Input , Modal } from 'antd';
import style from './ManejoPeliculas.module.css'
import storeProduct__api from "../../stores/productStore__api";
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const ManejoPeliculas = () => {
    let navigate = useNavigate();
    const [peliculasManejo, setPeiculasManejo] = useState(storeProduct__api.getProducts());
    const [searchedText, setSearchedText] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [ editingPelicula , setEditingPelicula ] = useState();
  
    const columns = [
      {
        key: '1',
        title: 'IdPelicula',
        dataIndex: 'idPelicula', // Asegúrate de que estás usando el nombre correcto del campo
      },
      {
        key: '2',
        title: 'Titulo',
        dataIndex: 'titulo',
        filteredValue: [searchedText],
        onFilter: (value , record) => {
          return (
            
          String(record.titulo)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.imagenPromocional)
            .toLowerCase()
            .includes(value.toLowerCase()) || 
          String(record.duracion)
            .toLowerCase()
            .includes(value.toLowerCase()) || 
          String(record.valor)
            .toLowerCase()
            .includes(value.toLowerCase()) || 
          String(record.sinopsis)
            .toLowerCase()
            .includes(value.toLowerCase()) || 
          String(record.idGenero)
            .toLowerCase()
            .includes(value.toLowerCase()) || 
          String(record.idFormato)
            .toLowerCase()
            .includes(value.toLowerCase()) 
          )
        }
      },
      {
        key: '3',
        title: 'ImagenPromocional',
        dataIndex: 'imagenPromocional',
      },
      {
        key: '4',
        title: 'Duracion',
        dataIndex: 'duracion',
      },
      {
        key: '5',
        title: 'Valor',
        dataIndex: 'valor',
      },
      {
        key: '6',
        title: 'Sinopsis',
        dataIndex: 'sinopsis',
      },
      {
        key: '7',
        title: 'IdGenero',
        dataIndex: 'idGenero',
      },
      {
        key: '8',
        title: 'IdFormato',
        dataIndex: 'idFormato',
      },
      {
        key: '9',
        title: 'Acciones',
        render: (record)=>{
            return <>
                <EditOutlined  onClick={()=>{ onUpdatePelicula(record) }}/>
                {/* <DeleteOutlined style={{color: "blue", marginLeft: 12 }} onClick={()=>{ onDeletePelicula(record) }} /> */}
                <DeleteOutlined style={{ color: "blue", marginLeft: 12 }} onClick={() => onDeletePelicula(record)} />
            </>
        }
      },
    ];

    const funcionParaNavegar = () => {
        navigate('/agregarPeliculas');
      };


    const onUpdatePelicula = (record) => {
      setIsEditing(true)
      setEditingPelicula({...record})
    }

    const actualizarPelicula = async (formValues) => {
      try {
        const response = await fetch(`api/pelicula/EditarPelicula/${editingPelicula.idPelicula}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            Titulo: formValues.titulo,
            ImagenPromocional: formValues.imagen,
            Duracion: formValues.duracion,
            Valor: formValues.valor,
            Sinopsis: formValues.sinopsis,
            IdGenero: formValues.idGenero,
            IdFormato: formValues.idFormato
          })
        });
    
        if (response.ok) {
          setIsEditing(false);
          alert("La película se ha actualizado correctamente");
          // Puedes realizar acciones adicionales después de la actualización si es necesario
        } else {
          alert(response.statusText);
        }
      } catch (error) {
        console.error("Error al actualizar la película:", error);
      }
    };

    const handleInputChange = (campo, valor) => {
      setEditingPelicula((prevPelicula) => ({
        ...prevPelicula,
        [campo]: valor,
      }));
    };

    const resetEditing = () => {
      setIsEditing(false);
      setEditingPelicula(null)
    }
    //  ----------------- Eliminar Pelicula -------------------------------
    
//     const eliminarPelicula = async () => {
//   try {
//     const response = await fetch(`api/pelicula/EliminarPelicula/${editingPelicula.idPelicula}`, {
//       method: "DELETE",
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//     });

//     if (response.ok) {
//       setIsEditing(false);
//       alert("La película se ha eliminado correctamente");
//       // Puedes realizar acciones adicionales después de la eliminación si es necesario
//     } else {
//       alert(response.statusText);
//     }
//   } catch (error) {
//     console.error("Error al eliminar la película:", error);
//   }
// };

const eliminarPelicula = async (idPelicula) => {
  try {
    const response = await fetch(`api/pelicula/EliminarPelicula/${idPelicula}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    if (response.ok) {
      alert("La película se ha eliminado correctamente");
      // Puedes realizar acciones adicionales después de la eliminación si es necesario
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error("Error al eliminar la película:", error);
  }
};


// const onDeletePelicula = (record) => {
//   Modal.confirm({
//     title: 'Estas seguro de eliminar?',
//     onOk: () => {
//       setPeiculasManejo((pre) => {
//         return pre.filter((student) => student.id !== record.id );
//       })
//     }
//   })
// }

const onDeletePelicula = (record) => {
  Modal.confirm({
    title: '¿Estás seguro de eliminar?',
    onOk: async () => {
      try {
        if (record.idPelicula) {
          await eliminarPelicula(record.idPelicula);

          // Actualiza el estado para reflejar la eliminación
          setPeiculasManejo((pre) => pre.filter((pelicula) => pelicula.idPelicula !== record.idPelicula));
        } else {
          console.error("No se puede obtener el ID de la película a eliminar");
        }
      } catch (error) {
        console.error("Error al eliminar la película:", error);
      }
    }
  });
};



  
    return (
      <div>
        <Input.Search 
          placeholder = "Buscar aqui ..."
          style={{ marginBottom: 8 }}
          onSearch = {(value)=> {
            setSearchedText(value)
            alert(value)
          }}
          onChange={(e)=>{
            setSearchedText(e.target.value )
          }}
        />
        <Table columns={columns} dataSource={peliculasManejo} />

        <Modal
          title="Editar película"
          visible={isEditing}
          onCancel={() => {
            resetEditing()
            // setIsEditing(false);
          }}
          onOk={() => {
            // Llama a la función actualizarPelicula con los valores del formulario
            actualizarPelicula({
              titulo: editingPelicula?.titulo,
              imagen: editingPelicula?.imagenPromocional,
              duracion: editingPelicula?.duracion,
              valor: editingPelicula?.valor,
              sinopsis: editingPelicula?.sinopsis,
              idGenero: editingPelicula?.idGenero,
              idFormato: editingPelicula?.idFormato,
            });
            setPeiculasManejo(pre => {
              return pre.map(student=>{
                if (student.idPelicula === editingPelicula.idPelicula){
                  return editingPelicula
                }
                else{
                  return student
                }
              })
            })
            resetEditing()
          }}
          okText="Guardar"
        >

          {/* <Input value={editingPelicula?.titulo} /> */}

          <Input
            value={editingPelicula?.titulo}
            onChange={(e) => handleInputChange('titulo', e.target.value)}
          />

          {/* <Input value={editingPelicula?.imagenPromocional} /> */}

          <Input
            value={editingPelicula?.imagenPromocional}
            onChange={(e) => handleInputChange('imagenPromocional', e.target.value)}
          />


          <Input 
            value={editingPelicula?.duracion} 
            onChange={(e) => handleInputChange('duracion', e.target.value)}          
          />
          <Input 
            value={editingPelicula?.valor} 
            onChange={(e) => handleInputChange('valor', e.target.value)}                      
          />
          <Input 
            value={editingPelicula?.sinopsis} 
            onChange={(e) => handleInputChange('sinopsis', e.target.value)}                      
          />
          <Input 
            value={editingPelicula?.idGenero} 
            onChange={(e) => handleInputChange('idGenero', e.target.value)}                      

          />
          <Input 
            value={editingPelicula?.idFormato} 
            onChange={(e) => handleInputChange('idFormato', e.target.value)}                                  
          />


        </Modal>

        <Button onClick={funcionParaNavegar} >  Agregar Pelicula</Button>
      </div>
    );
  };
  
export default ManejoPeliculas;
