import React, { createRef, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styles from './styles/Login.module.css'
import { Button, Checkbox, Col, Form, Input, Row ,ConfigProvider, Radio } from 'antd';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { increment } from        "../../storeRedux/slices/counter"
import { changeAuthorized } from "../../storeRedux/slices/authorized"
import md5 from 'md5';


const {Item} = Form;
const {Password} = Input;

export const Login = (  ) => {

    /********************************* */
    /***********     DarkMode    ****** */
    /********************************* */

    const [currentTheme, setCurrentTheme] = useState('light');

    const lightTheme = {
        colorPrimary: 'rgb(58,15,18)',//'#B339ED',//green
        colorTextBase: 'rgb(58,15,18)',//green
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


    /************************************* */
    /***********     Controlador    ****** */
    /************************************* */


    const baseUrl = "/api/usuario";

    const cookies = new Cookies();

    const iniciarSesion = async () => {

        setIsModalOpen(false);

        await axios.get(`${baseUrl}/${form.correo}/${md5(form.password)}`)
        
        .then(response=>{
        
            return response.data;
            // console.log("Jaime response.data: " + response.data);
        
        })
        .then(response=>{

            
            
            
            if(response.length>0){
                showModal();
                //showModal();
                var respuesta = response[0];
                console.log("Jaime esta es la respuesta" + respuesta);
                console.log(respuesta);
                //--COOKKIES
                cookies.set('idUsuario', respuesta.idUsuario , { path: '/' });
                cookies.set('idTipoDocumento', respuesta.idTipoDocumento , { path: '/' });
                cookies.set('numeroDocumento', respuesta.numeroDocumento , { path: '/' });
                cookies.set('nombres', respuesta.nombres , { path: '/' });
                cookies.set('apellidos', respuesta.apellidos , { path: '/' });
                cookies.set('contrasena', respuesta.contrasena , { path: '/' });
                cookies.set('correo', respuesta.correo , { path: '/' });
                //alert("Bienvenido: " + respuesta.nombres + " " + respuesta.apellidos);
                //setAutrizado(true)
                // dispatch( changeAuthorized() )
                console.log("Jaime este es el authorizedStateRedux: ");
                console.log(authorizedStateRedux);
            }else{
                alert('El usuario o la contraseña no son correctos')
                //setAutrizado(false)
            }
        })
        .catch(error=>{
            console.log("Jaime este es el error" + error);
        })

    };


        

// ...





    const [form, setForm]=useState({
        correo:'',
        password:''
    })
    const handleChange=e=>{
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
        console.log(form);
    }

    //-------------------------modal
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);

    };
  
    const handleOk = () => {
      setIsModalOpen(false);
      navigate('/');
      dispatch( changeAuthorized() )
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

     //-------------------------modalregistro

     const [isModalOpenRegistro, setIsModalOpenRegistro] = useState(false);
 
     const showModalRegistro = () => {
        setIsModalOpenRegistro(true);
 
     };
   
     const handleOkRegistro = () => {
        // guardarUsuario()
    
       setIsModalOpenRegistro(false);
       navigate('/');
       alert("bien Jaime");
       console.log(` Jaime este es el registro: tipoDocumento: ${formDataRegistro.idTipoDocumento} 
       numeroDocumento: ${formDataRegistro.numeroDocumento} 
       Nombres: ${formDataRegistro.nombres} 
       Apellidos: ${formDataRegistro.apellidos} 
       Correo: ${formDataRegistro.correo} 
       Contrasena: ${formDataRegistro.contrasena} 
       `);

       console.log(` Jaime este es el tipo: tipo 
       Documento Tipo: ${ typeof idTipoDocumento3} 
       numeroDocumento Tipo: ${typeof numeroDocumento3} 
       Nombres Tipo: ${typeof nombres3} 
       Apellidos Tipo: ${typeof apellidos3} 
       Correo Tipo: ${typeof correo3} 
       Contrasena Tipo: ${typeof contrasena3} 
       `);
    //    dispatch( changeAuthorized() )
     };

     const guardarUsuario = async (formValues) => {

        var idTipoDocumento2 = formValues.idTipoDocumento;
        var numeroDocumento2 = formValues.numeroDocumento;
        var nombres2 = formValues.nombres;
        var apellidos2 = formValues.apellidos;
        var correo2 = formValues.correo;
        var contrasena2 = formValues.contrasena;


        var idTipoDocumento3 = parseInt(formValues.idTipoDocumento);
        var numeroDocumento3 = formValues.numeroDocumento.toString();
        var nombres3 = formValues.nombres.toString();
        var apellidos3 = formValues.apellidos.toString();
        var correo3 = formValues.correo.toString();
        var contrasena3 = md5(formValues.contrasena.toString());
        // console.log("Tipo de IdTipoDocumento:", typeof idTipoDocumento);
        // console.log("Tipo de NumeroDocumento:", typeof numeroDocumento);
        // console.log("Tipo de Nombres:", typeof nombres);
        // console.log("Tipo de Apellidos:", typeof apellidos);
        // console.log("Tipo de Correo:", typeof correo);
        // console.log("Tipo de Contrasena:", typeof contrasena);


        console.log(` Jaime este es el registro: tipoDocumento: ${formDataRegistro.idTipoDocumento} 
        numeroDocumento: ${formDataRegistro.numeroDocumento} 
        Nombres: ${formDataRegistro.nombres} 
        Apellidos: ${formDataRegistro.apellidos} 
        Correo: ${formDataRegistro.correo} 
        Contrasena: ${formDataRegistro.contrasena} 
        `);

        try {
            const response = await fetch("api/usuario/GuardarUsuario", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    
                    IdTipoDocumento: idTipoDocumento3,
                    NumeroDocumento: numeroDocumento3,
                    Nombres: nombres3,
                    Apellidos: apellidos3,
                    Correo: correo3,
                    Contrasena: contrasena3,
         
                })
            });
    
            if (response.ok) {
                formRef.current.resetFields(); // Reinicia los campos del formulario
                //alert("El usuario se ha guardado correctamente");
                   // ULTIMO MODAL
                    showModalRegistroSucces()
                    // ULTIMO MODAL
                // await mostrarTareas();
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            console.error("Error al guardar el usuaario:", error);
        }
    }
   
     const handleCancelRegistro = () => {
        setIsModalOpenRegistro(false);

     };


    
     const [formDataRegistro, setFormDataRegistro] = useState({
        idTipoDocumento: '',
        numeroDocumento: '',
        nombres: '',
        apellidos: '',
        correo:'',
        contrasena:'',

    });

    const handleChangeRegistro = (e) => {
        const { name, value } = e.target;
        setFormDataRegistro((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        };

    // const formSuccessRegistro = (datos) => {
    //     console.log("FormularioRegistro enviado exitosamente Jaime Modal registro: ", datos);
    // }

    const formRefRegistro = createRef();

    //-------------------------modalregistron succes

    const [isModalOpenRegistroSucces, setIsModalOpenRegistroSucces] = useState(false);
 
    const showModalRegistroSucces = () => {
       setIsModalOpenRegistroSucces(true);

    };
  
    const handleOkRegistroSucces = () => {
        setIsModalOpenRegistroSucces(false);
        setIsModalOpenRegistro(false);
        navigate('/');
    }

    const handleCancelRegistroSucces = () => {
        setIsModalOpenRegistroSucces(false);
        setIsModalOpenRegistro(false);
      };
  

 
    // ---------------------- Redux  ---------------------

    // REDUX
    // import { useSelector, useDispatch } from "react-redux";
    // import { increment } from        "../../storeRedux/slices/counter"
    // import { changeAuthorized } from "../../storeRedux/slices/authorized"

    const { counterJaime } = useSelector( state => state.counter )
    const { authorizedStateRedux } = useSelector( state => state.authorized )

    const dispatch = useDispatch();

    const [stateReduxAut2 , setStateReduxAut2] = useState(authorizedStateRedux)

    useEffect(()=>{

        setStateReduxAut2(authorizedStateRedux)

    } , [authorizedStateRedux])

    return (


    <>   
        <div className={styles.container__padre} >                          
            <div className={styles.container} >

                {
                    currentTheme === 'light'
                    ?  <p className={styles.iniciar__sesion} > Iniciar sesion J </p> 
                    :   <p className={styles.iniciar__sesion__dark} > Iniciar sesion </p> 
                }
               
            </div> 

            <div className={styles.sub_container} >
                         
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

                    <Row>
                        <Col xs={1} sm={2} md={6} lg={7} >
                        </Col>

                        <Col xs={22} sm={20} md={12} lg={10} >

                
                                    <Form
                                        {...formItemLayout}
                                        ref={formRef}
                                        name="Formulario"
                                        initialValues={{
                                            recordar:true
                                        }}
                                        onFinish={formSuccess}
                                        // inFinishFailed={formFailed}
                                        // onFinish={} 
                                    >
                                        
                                        
                                        
                                        
                                        <Item 
                                            label="Correo" 
                                            // name='correo'
                                            rules={[{
                                                required:true,
                                                message: "Por favor ingresa tu correo "
                                            }]}
                                            >
                                                <Input 

                                                name='correo'
                                                onChange={handleChange}
                                                />

                                        </Item>

                                        <Item 
                                            label="Contraseña"
                                            //name="password"
                                            rules={[{
                                                required: true,
                                                message: "Por favor Ingresa tu Contraseña"
                                            }]} 
                                            >
                                                <Password

                                                name='password'
                                                onChange={handleChange}
                                                />

                                        </Item>







                                            <Item onClick={ () =>showModalRegistro() }
                                                label="Quiere registrarse?" >
                                             </Item>     
                                        


                                        <Item 
                                            style={{textAlign: 'center'}}
                                        >

                                            <Button type='primary' htmlType='submit' onClick={()=>iniciarSesion()} >Iniciar Sesión</Button>
                                            {/* <h1> mira el counter:
                                            {   counterJaime}

                                            </h1>   */}
                                            {/* <Button htmlType='button' onClick={borrarCampos}>Borrar Campos</Button> */}
                                        </Item>



                                    </Form>
                                            <Button onClick={ () => dispatch( increment() )} >Counter</Button>

                                            <Button onClick={ () => dispatch( changeAuthorized() )} >Autorized</Button>
                                            {/* <Button onClick={ () =>  showModal() } >Show Modal</Button> */}


                        </Col>
                        <Col xs={1} sm={2} md={6} lg={7} >
                        </Col>
                    </Row>

                </ConfigProvider>
            </div>
        </div> 
        <Modal title="Su registro ha sido exitoso!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>


        <a href="/">


        </a>
      </Modal>       
      <Modal title="Reistro!" open={isModalOpenRegistro} onOk={handleOkRegistro} onCancel={handleCancelRegistro}>
            <Form
                {...formItemLayout}
                ref={formRefRegistro}
                name="FormularioRegistro"
                onFinish={guardarUsuario}
                // onFinish={formSuccessRegistro}
                                            
            >
            
                <Item 
                    label="idTipoDocumento"
                    rules={[{
                        required:true,
                        message: "Por favor ingresa el idTipoDocumento "
                    },
                    {
                        pattern: /^[1-9]\d*$/, 
                        message: "Ingresa solo números enteros positivos en el idTipoDocumento"
                    }
                    ]}
                    name="idTipoDocumento"
                    >
                    <Input placeholder="input idTipoDocumento" name="idTipoDocumento" value={formDataRegistro.idTipoDocumento} onChange={handleChangeRegistro}  />
                </Item>

                <Item 
                    label="numeroDocumento"
                    rules={[{
                        required:true,
                        message: "Por favor ingresa la numeroDocumento "
                    },
                    {
                        pattern: /^[1-9]\d*$/, 
                        message: "Ingresa solo números enteros positivos en el numeroDocumento"
                    }
                    ]}
                    name="numeroDocumento"
                    >
                    <Input placeholder="input numeroDocumento" name="numeroDocumento" value={formDataRegistro.numeroDocumento} onChange={handleChangeRegistro}  />
                </Item>

                <Item 
                    label="nombres" 
                    rules={[{
                        required:true,
                        message: "Por favor ingresa los nombres "
                    }]}
                    name = "nombres"
                    >
                    <Input placeholder="input nombres"  name="nombres" value={formDataRegistro.nombres} onChange={handleChangeRegistro}/>
                </Item>

                
                <Item 
                    label="apellidos" 
                    rules={[{
                        required:true,
                        message: "Por favor ingresa los apellidos "
                    }]}
                    name = "apellidos"
                    >
                    <Input placeholder="input apellidos"  name="apellidos" value={formDataRegistro.apellidos} onChange={handleChangeRegistro}/>
                </Item>

                <Item 
                    label="correo" 
                    rules={[{
                        required:true,
                        message: "Por favor ingresa los correo "
                    }]}
                    name = "correo"
                    >
                    <Input placeholder="input correo"  name="correo" value={formDataRegistro.correo} onChange={handleChangeRegistro}/>
                </Item>

                <Item 
                    label="Contraseña"
                    //name="password"
                    rules={[{
                        required: true,
                        message: "Por favor Ingresa tu Contraseña"
                    }]} 
                    name="contrasena"
                    >
                        <Password

                        name='contrasena'
                        onChange={handleChangeRegistro}
                        />

                </Item>

                <Item 
                    style={{textAlign: 'center'}}
                >
                    <Button  type="primary" htmlType='submit'   >Submit Registro</Button>
                    {/* <Button  type="primary" htmlType='submit' onClick={guardarPelicula}  >Submit</Button> */}
                </Item>

           

            
            
            
            </Form>
      </Modal>

      <Modal title="El usuario se ha agregado correctamente!" open={isModalOpenRegistroSucces} onOk={handleOkRegistroSucces} onCancel={handleCancelRegistroSucces}  >
      </Modal>             
    </>
    );
}

