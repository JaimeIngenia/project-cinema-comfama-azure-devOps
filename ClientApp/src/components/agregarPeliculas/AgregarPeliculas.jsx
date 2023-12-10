import React, { useState , createRef, useEffect } from 'react';
import styles from './AgregarPeliculas.module.css'
import { Button, Checkbox, Col, ConfigProvider, Form, Input, Radio, Row, Select, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import peliculaDark from '../../assets/cinema/peliculaDark.svg'
import peliculaLight from '../../assets/cinema/peliculaRoja.svg'
import { useNavigate, useParams } from 'react-router-dom';

// flux 
import storeProduct__api from "../../stores/productStore__api";


const {Item} = Form;
const { TextArea } = Input;

const AgregarPeliculas = () => {



    const [selectedGenero, setSelectedGenero] = useState(null);
    const [selectedFormato, setSelectedFormato] = useState(null);

    const onGeneroChange = (selectedOption) => {
        setSelectedGenero(selectedOption);
        // alert(selectedOption)
    };

    const onFormatoChange = (selectedOption) => {
        setSelectedFormato(selectedOption);
        // alert(selectedOption)
    };
    
    // ------------------------------ Selects -------------------------------

    const [currentTheme, setCurrentTheme] = useState('light');

    const lightTheme = {
        colorPrimary: 'rgb(58,15,18)',//'#B339ED',//green
        colorTextBase: 'rgb(58,15,18)',//'#B339ED',//green
        colorTextLightSolid: 'white',
        }
    const darkTheme = {
        colorPrimary: '#353434',//black
        colorTextBase: '#353434',//blak
        colorTextLightSolid: 'white',
        }
    
    
        /********************************* */
        /***********     DarkMode    ****** */
        /********************************* */



        

        const formRef = createRef();


        const formSuccess = (datos) => {
            console.log("Formulario enviado exitosamente: ", datos);
        }
        const formFailed = (error) => {
            console.log("Error: ", error);
        }
        const borrarCampos =()=>{
            formRef.current.resetFields();
        }
    
        const formItemLayout = {
        labelCol:{
            xs:{
                span: 12,
            },
            sm:{
                span:8,
            }
        },
        wrappercol:{
            xs:{
                span:4,
            },
            sm:{
                span:20,
            }
        }
    
        }
    
        const [formData, setFormData] = useState({
            idPelicula: null,
            valor: '',
            sinopsis: '',
            imagen: '',
            titulo: '',
        });

        
  
        const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        };

        // const guardarPelicula = async (e) => {
        //     e.preventDefault();
    
        //     const response = await fetch("api/pelicula/GuardarPelicula", {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json;charset=utf-8'
        //         },
        //         body: JSON.stringify({
        //             Titulo: formData.titulo,
        //             ImagenPromocional: formData.imagen,
        //             Duracion: formData.duracion,
        //             Valor: formData.valor,
        //             Sinopsis: formData.sinopsis,
        //             IdGenero: selectedGenero,
        //             IdFormato: selectedFormato
                    
        //         })
      
        //     })
        //     if (response.ok) {
        //         setFormData("");
        //         alert("La pelicula esta guardada");
                //await mostrarTareas();
        //     }
        //     else {
        //         alert(response.statusText)
        //     }
        // }
        const guardarPelicula = async (formValues) => {
            try {
                const response = await fetch("api/pelicula/GuardarPelicula", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        Titulo: formValues.titulo,
                        ImagenPromocional: formValues.imagen,
                        Duracion: formValues.duracion,
                        Valor: formValues.valor,
                        Sinopsis: formValues.sinopsis,
                        IdGenero: selectedGenero,
                        IdFormato: selectedFormato
                    })
                });
        
                if (response.ok) {
                    formRef.current.resetFields(); // Reinicia los campos del formulario
                    alert("La película se ha guardado correctamente");
                    console.log(` Jaime este es el pelicula: tipo 
                    titulo Tipo: ${typeof formData.titulo} 
                    imagen tipo: ${ typeof formData.imagen} 
                    duracion Tipo: ${typeof formData.duracion} 
                    valor Tipo: ${typeof formData.valor} 
                    sinopsis Tipo: ${typeof formData.sinopsis} 
                    `);
                    // await mostrarTareas();
                } else {
                    alert(response.statusText);
                }
            } catch (error) {
                console.error("Error al guardar la película:", error);
            }
        }

        // ---------------------------------------------------------------------------------------
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

    // ---------------------------------------------------------------------------------------
    
    // -------- slug flux: --------------

    let navigate = useNavigate();
    let {idPelicula} = useParams();

    // const [formData, setFormData] = useState({
    //     valor: '',
    //     sinopsis: '',
    //     imagen: '',
    //     titulo: '',
    // });


        useEffect( ()=>{
            if (idPelicula) {
                setFormData(storeProduct__api.getProductByidPelicula(idPelicula))
            }
        } , [ idPelicula ] )

    return (

        <div className={styles.containner__crearPeliculas} >
            {/* <h1>Mira: {idPelicula} </h1> */}
            <div className={styles.sub_container__form} >
                    
                <ConfigProvider 

                    className={styles.container}

                    theme={{
                    token: currentTheme==='light' ? lightTheme : darkTheme ,
                }} >
    
                        
                    <Radio.Group
                        value={currentTheme}
                        onChange={(e)=>{
                            setCurrentTheme(e.target.value)
                        }}
                    >

                        <Radio value={"light"} >Light</Radio>
                        <Radio value={"dark"} >Dark</Radio>

                    </Radio.Group>
                    <br /><br /><br />
    
    
    
                    <Row>

    
                        <Col xs={22} sm={20} md={12} lg={12} >
    
                    
                            <Form
                                className={styles.prueba__columnas} {...formItemLayout}
                                ref={formRef}
                                name="Formulario"
                                // onFinish={formSuccess}
                                // inFinishFailed={formFailed}
                                onFinish={guardarPelicula}  // Ejecutar la función guardarPelicula en onFinish
                                onFinishFailed={formFailed}
                                // onSubmit={guardarPelicula}
                            >

                                <Item 
                                    label="Genero"
                                    rules={[{
                                        required:true,
                                        message: "Por favor ingresa el genero "
                                    }]}
                                    name="genero"
                                >
                                    <Select
                                        
                                        style={{
                                            width: 300,
                                        }}
                                        placeholder="Escoge tu Genero"
                                        onChange={onGeneroChange}
                                        options={generos.map((item) => ({
                                            label: item.nombreGenero,
                                            value: item.idGenero,
                                        }))}
                                        name="genero"
                                    />

                                </Item>

                                <Item 
                                    label="Formato"
                                    rules={[{
                                        required:true,
                                        message: "Por favor ingresa el formato "
                                    }]}
                                    name="formato"
                                >
                                    <Select
                                        style={{
                                            width: 300,
                                        }}
                                        placeholder="Escoge tu formato"
                                        onChange={onFormatoChange}
                                        options={formatos.map((item) => ({
                                            label: item.nombreFormato,
                                            value: item.idFormato,
                                        }))}
                                        name = "formato"
                                    />
                                </Item>
    
                                <Item 
                                    label="Titulo"
                                    rules={[{
                                        required:true,
                                        message: "Por favor ingresa el titulo "
                                    }]}
                                    name="titulo"
                                    >
                                    <Input placeholder="input Titulo" name="titulo" value={formData.titulo}  onChange={handleChange} />
                                </Item>
            
                                <Item 
                                    label="Imagen" 
                                    rules={[{
                                        required:true,
                                        message: "Por favor ingresa la imagen "
                                    }]}
                                    name = "imagen"
                                    >
                                    <Input placeholder="input Imagen"  name="imagen" value={formData.imagen} onChange={handleChange}/>
                                </Item>
            
                                <Item 
                                    label="Duracion"
                                    rules={[{
                                        required:true,
                                        message: "Por favor ingresa la duracion "
                                    },
                                    {
                                        pattern: /^[1-9]\d*$/, 
                                        message: "Ingresa solo números enteros positivos en la duracion"
                                    }
                                ]}
                                    name="duracion"
                                    >
                                    <Input placeholder="input Duracion" name="duracion" value={formData.duracion} onChange={handleChange}  />
                                </Item>
            
                                <Item 
                                    label="Valor"
                                    rules={[{
                                        required:true,
                                        message: "Por favor ingresa el valor "
                                    },
                                    {
                                        pattern: /^[1-9]\d*$/,
                                        message: "Ingresa solo números enteros positivos en el valor"
                                    }
                                ]}
                                    name="valor"
                                    >
                                    <Input placeholder="input Valor" name="valor" value={formData.valor} onChange={handleChange} />
                                </Item>

                                <Item 
                                    label="Sinopsis"
                                    name="sinopsis"
                                    rules={[{
                                        required:true,
                                        message: "Por favor ingresa la sinopsis "
                                    }]}
                                    
                                    >
                                    <TextArea placeholder="Sinopsis"  name="sinopsis" value={formData.sinopsis} onChange={handleChange}  autoSize={{ minRows: 3, maxRows: 5 }} />
                                </Item>
    

                                <Item 
                                    style={{textAlign: 'center'}}
                                >
                                    <Button  type="primary" htmlType='submit'   >Submit</Button>
                                    {/* <Button  type="primary" htmlType='submit' onClick={guardarPelicula}  >Submit</Button> */}
                                </Item>

    
    

                            </Form>
    
                                    
    
    
                        </Col>
                            {/* <Col xs={1} sm={2} md={6} lg={7} >
                            </Col> */}
                    </Row>
    
                </ConfigProvider>
    
            </div>
            <div className={styles.sub_container__imagen} > 
            {
                currentTheme === 'light'
                ? <img src={peliculaLight} alt="" />  
                : <img src={peliculaDark} alt="" />
            }
            </div>
        </div>
    );
}

export default AgregarPeliculas;
