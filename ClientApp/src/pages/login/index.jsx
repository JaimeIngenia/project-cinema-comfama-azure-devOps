import React, { createRef, useState } from 'react';
import { Link } from "react-router-dom";
import styles from './styles/Login.module.css'
import { Button, Checkbox, Col, Form, Input, Row ,ConfigProvider, Radio } from 'antd';
// import Link from 'antd/es/typography/Link';
// import 'antd/dist/antd.css'

const {Item} = Form;
const {Password} = Input;

export const Login = () => {

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




    return (


<>

        {/* <div className={styles.container__login} >
                        <div className={styles.sub__container}>

                            <p className={styles.iniciar__sesion} > Iniciar sesion </p>   */}

<div className={styles.container__padre} >                          
                <div className={styles.container} >

                    {

currentTheme === 'light'
 ?  <p className={styles.iniciar__sesion} > Iniciar sesion </p> 
 :   <p className={styles.iniciar__sesion__dark} > Iniciar sesion </p> 
                    }
               
                </div> 


                <div className={styles.sub_container} >
                         

<ConfigProvider 

            className={styles.container}

            theme={{
            token: currentTheme==='light' ? lightTheme : darkTheme ,
            // components: {
            //     Checkbox:{
            //         colorPrimary: 'blue',
            //     }
            // }
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
                                inFinishFailed={formFailed}
                            >
                                <Item 
                                    label="Usuario" 
                                    name='username'
                                    rules={[{
                                        required:true,
                                        message: "Por favor ingresa tu nombre de usuario"
                                    }]}
                                    >
                                        <Input/>

                                </Item>

                                <Item 
                                    label="Contraseña"
                                    name="password"
                                    rules={[{
                                        required: true,
                                        message: "Por favor Ingresa tu Contraseña"
                                    }]} 
                                >
                                    <Password/>

                                </Item>


                                <Item
                                    name="recordar"
                                    valuePropName="checked"
                                >
                                    <Checkbox>Recordar Usuario</Checkbox>
                                </Item>

<Link to={"/registro"} >


                                <Item 
                                    label="Quiere registrarse?" >
                                        
                                </Item> 
</Link>


                                <Item 
                                    style={{textAlign: 'center'}}
                                >

                                    <Button type='primary' htmlType='submit' >Iniciar Sesión</Button>
                                    <Button htmlType='button' onClick={borrarCampos}>Borrar Campos</Button>
                                </Item>



                            </Form>



                </Col>
                <Col xs={1} sm={2} md={6} lg={7} >
                </Col>
            </Row>

</ConfigProvider>

</div>
</div>  
         
                        {/* </div>
                    </div>   */}
</>



    );
}

