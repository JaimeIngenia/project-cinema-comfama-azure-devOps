import React, { useState,createRef } from 'react';
import styles from './styles/Registro.module.css'
import { Button, Checkbox, Col, Form, Input, Row ,ConfigProvider, Radio } from 'antd';

const {Item} = Form;
const {Password} = Input;

export const Registro = () => {


    const [currentTheme, setCurrentTheme] = useState('light');

    const lightTheme = {
        colorPrimary: '#B339ED',//green
        colorTextBase: '#B339ED',//green
        colorTextLightSolid: 'white',
        }
    const darkTheme = {
        colorPrimary: '#353434',//black
        colorTextBase: '#353434',//blak
        colorTextLightSolid: 'white',
        }


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

{currentTheme === 'light'
    ? <p className={styles.iniciar__sesion} > Registro </p> 
    :  <p className={styles.iniciar__sesion__dark} > Registro </p> 
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
                            label="Nombre" 
                            name='nombre'
                            rules={[{
                                required:true,
                                message: "Por favor ingresa tu nombre"
                            }]}
                            >
                                <Input/>

                        </Item>
                        
                        <Item
                            label="Correo" 
                            name='email'
                            rules={[{
                                required:true,
                                message: "Por favor ingresa tu nombre de correo"
                            }]}
                            >
                                <Input/>

                        </Item>

                        <Item
                            label="Telefono" 
                            name='telefono'
                            rules={[{
                                required:true,
                                message: "Por favor ingresa tu nombre de telefono"
                            }]}
                            >
                                <Input/>

                        </Item>

                        <Item 
                            label="Contraseña"
                            name="password"
                            rules={[{
                                required: true,
                                message: "Por favor ingresa tu contraseña"
                            }]} 
                        >
                            <Password/>

                        </Item>


                        <Item
                            name="recordar"
                            valuePropName="checked"
                        >
                            <Checkbox>Recibir coreos sobre eventos nuevos!</Checkbox>
                        </Item>

                       


                        <Item 
                            style={{textAlign: 'center'}}
                        >

                            <Button type='primary' htmlType='submit' >Enviar</Button>
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
