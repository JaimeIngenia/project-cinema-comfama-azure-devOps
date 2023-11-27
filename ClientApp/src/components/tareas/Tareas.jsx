import React, { useEffect, useRef, useState } from 'react';
import style from './Tareas.module.css'
import { Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Button } from 'antd';
import {  Form, Radio } from 'antd';
  //INPUT NORMAL *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
const { TextArea } = Input;
  //INPUT NORMAL *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
let index = 0;

// IMPUT VSELECT VARIADO*********************************************
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const options = [
  {
    label: 'China',
    value: 'china',
    emoji: '🇨🇳',
    desc: 'China (中国)',
  },
  {
    label: 'USA',
    value: 'usa',
    emoji: '🇺🇸',
    desc: 'USA (美国)',
  },
  {
    label: 'Japan',
    value: 'japan',
    emoji: '🇯🇵',
    desc: 'Japan (日本)',
  },
  {
    label: 'Korea',
    value: 'korea',
    emoji: '🇰🇷',
    desc: 'Korea (韩国)',
  },
];
// IMPUT SELECT VARIADO*********************************************
const Tareas = () => {

    // IMPUT SELECT NORMAL*********************************************

    const [items, setItems] = useState(['jack', 'lucy']);
    const [name, setName] = useState('');
    const inputRef = useRef(null);
    
    const onNameChangeA = (event) => {
      setName(event.target.value);
      alert("aqui ***"+event.target.value )
    };


    const addItem = (e) => {
      e.preventDefault();
      setItems([...items, name || `New item ${index++}`]);
      setName('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    };
    // IMPUT SELECT NORMAL*********************************************

    //INPUT NORMAL *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    const [valueAnt, setValueAnt] = useState('');
    //INPUT NORMAL *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    const [generos, setGeneros] = useState([])
    const [formatos, setFormatos] = useState([])
    const [peliculas, setPeliculas] = useState([])

    const mostrarGeneros = async () => {

        const response = await fetch("api/genero/VerGenero").then(response => response.json())
            .then(data => { console.log(JSON.stringify(data, null, 2)); setGeneros(data); })
            
            .catch(error => console.error('Error:', error));
    }
    const mostrarFormatos = async () => {

        const response = await fetch("api/formato/VerFormato").then(response => response.json())
            .then(data => { console.log(JSON.stringify(data, null, 2)); setFormatos(data); })

            .catch(error => console.error('Error:', error));
    }
    const mostrarPeliculas = async () => {

        const response = await fetch("api/pelicula/VerPelicula").then(response => response.json())
            .then(data => { console.log(JSON.stringify(data, null, 2)); setPeliculas(data); })

            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {

        mostrarGeneros();
        mostrarFormatos();
        mostrarPeliculas();

    }, [])


    function alerta() {
        alert("Usted presion� este bot�n")
    }
    function dilbani(e){
        e.preventDefault();

        // alert("Usted dilbani"+ selectedValue +" "+ setSelectedValue2)
        alert("cualquier cosa"+selectedValue+"formato:"+selectedValue2)
    }
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedValue2, setSelectedValue2] = useState(null);
    
    const onNameChange = (selectedOption) => {
        // Actualiza el estado con el nuevo valor seleccionado
        setSelectedValue(selectedOption);
    alert(selectedOption)
        // Paso 3: Muestra un alert con el valor actualizado
        //alert(`Valor seleccionado: ${selectedOption ? selectedOption.value : 'Ninguno'}`);
    };

    const onNameChange2 = (selectedOption) => {
        // Actualiza el estado con el nuevo valor seleccionado
        setSelectedValue2(selectedOption);
        alert(selectedOption)
        // Paso 3: Muestra un alert con el valor actualizado
        //alert(`Valor seleccionado: ${selectedOption ? selectedOption.value : 'Ninguno'}`);
    };

      // Estado para almacenar los valores del formulario
      const [formData, setFormData] = useState({
        valor: '',
        sinopsis: '',
        imagen: '',
        titulo: '',
      });
    // Función para manejar el envío del formulario
    const handleGuardar = () => {
    // Acciones necesarias con los valores, como enviarlos a un servidor o almacenarlos localmente.
    console.log('Valores guardados:', formData);

    // Puedes reiniciar el estado después de guardar si es necesario
    setFormData({
        titulo: '',
        imagen: '',
        duracion:'',
        valor: '',
        sinopsis: '',
    });
    alert(` ${selectedValue}, ${selectedValue2} ${formData.titulo} , ${formData.imagen},${formData.duracion}, ${formData.sinopsis} , ${formData.valor}`);
    };

    // Función para manejar el cambio en los campos del formulario
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    };

  //FORMULARIO ANT/VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };
    const formItemLayout =
        formLayout === 'horizontal'
            ?
            {
                labelCol:
                {
                    span: 4,
                },
                wrapperCol:
                {
                    span: 14,
                },
            }
            : null;

    const buttonItemLayout = formLayout === 'horizontal'
            ?
            {
                wrapperCol:
                {
                    span: 14,
                    offset: 4,
                },
            }
            : null;

    //FORMULARIO ANT/VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

    const guardarPelicula = async (e) => {
        e.preventDefault();

        const response = await fetch("api/pelicula/GuardarPelicula", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                Titulo: formData.titulo,
                ImagenPromocional: formData.imagen,
                Duracion: formData.duracion,
                Valor: formData.valor,
                Sinopsis: formData.sinopsis,
                IdGenero: selectedValue,
                IdFormato: selectedValue2
                
            })
  
        })
        if (response.ok) {
            setFormData("");
            alert("La pelicula esta guardada");
            //await mostrarTareas();
        }
        else {
            alert(response.statusText)
        }
    }

    return (
        <>


            <div className="list-group" >
                <h2 className="text-white" > Lista de Generos </h2>

                {
                    generos.map(
                        (item) => (

                            <>


                                <div className="container bg-dark p-4 vh-10" >



                                    <div className="row" >

                                        <div className="col-sm-12" >

                                        </div>

                                    </div>

                                    <div className="row mt-4" >

                                        <div className="col-sm-12" >

                                            <div className="List-group-item list-group-item-action" >
                                                <h5 className="text-primary" > {item.nombreGenero} </h5>

                                                <div className="d-flex justify-content-between">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={alerta}
                                                    >
                                                        Ver
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>



                                </div>


                            </>

                        )

                    )
                }
                <hr />

                {
                    peliculas.map(
                        (item) => (

                            <>


                                <div className="container bg-dark p-4 vh-10" >



                                    <div className="row" >

                                        <div className="col-sm-12" >

                                        </div>

                                    </div>

                                    <div className="row mt-4" >

                                        <div className="col-sm-12" >

                                            <div className="List-group-item list-group-item-action" >
                                                <h5 className="text-primary" > {item.titulo} { console.log("Heyyyy" + item.generoId) } </h5>

                                                <div className="d-flex justify-content-between">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={alerta}
                                                    >
                                                        Ver
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>



                                </div>


                            </>

                        )

                    )
                }
            </div>   

            <div>
            <Form.Item label="Genero">
              <Select
                  
                  style={{
                      width: 300,
                  }}
                  //placeholder={generos[0]}
                  onChange={onNameChange}
                  options={generos.map((item) => ({
                      label: item.nombreGenero,
                      value: item.idGenero,
                  }))}
                  //value={selectedValue}
                  defaultValue={generos[0]}
              />
            </Form.Item>

            <Form.Item label="Formato">
              <Select
                  style={{
                      width: 300,
                  }}
                  placeholder="Escoge tu formato"
                  onChange={onNameChange2}
                  options={formatos.map((item) => ({
                      label: item.nombreFormato,
                      value: item.idFormato,
                  }))}
                  value={selectedValue2}
              />
            </Form.Item>
            <br /><br />

<Form
      layout="horizontal"
      form={form}
      // initialValues={{
      //   layout: formLayout,
      // }}
      onValuesChange={onFormLayoutChange}
      style={{
        maxWidth: formLayout === 'inline' ? 'none' : 600,
      }}
    >

      <Form.Item label="Titulo">
        <Input placeholder="input Titulo" name="titulo" value={formData.titulo}  onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Imagen" >
        <Input placeholder="input Imagen"  name="imagen" value={formData.imagen} onChange={handleChange}/>
      </Form.Item>
      <Form.Item label="Duracion">
        <Input placeholder="input Duracion" name="duracion" value={formData.duracion} onChange={handleChange}  />
      </Form.Item>
      <Form.Item label="Valor">
        <Input placeholder="input Valor" name="valor" value={formData.valor} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Sinopsis">
        <TextArea placeholder="Sinopsis"  name="sinopsis" value={formData.sinopsis} onChange={handleChange}  autoSize={{ minRows: 3, maxRows: 5 }} />
      </Form.Item>
      <Form.Item >
                        <Button type="primary" onClick={guardarPelicula}  >Submit</Button>
      </Form.Item>
    </Form>



    </div>

            <Button 
                type="primary"
                onClick={dilbani}
                >
                GuardarPrueba
            </Button>

            <Button 
                onClick={handleGuardar}
            >
                Guardar2
            </Button>

        </>
    );
}

export default Tareas;
