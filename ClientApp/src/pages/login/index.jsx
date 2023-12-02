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

        await axios.get(`${baseUrl}/${form.correo}/${form.password}`)
        
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







                                        <Link to={"/registro"} >
                                            <Item 
                                                label="Quiere registrarse?" >
                                             </Item>     
                                        </Link>
                                        


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
                                            {/* <Button onClick={ () => dispatch( increment() )} >Counter</Button> */}

                                            {/* <Button onClick={ () => dispatch( changeAuthorized() )} >Autorized</Button> */}
                                            <Button onClick={ () =>  showModal() } >Show Modal</Button>


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
    </>
    );
}

