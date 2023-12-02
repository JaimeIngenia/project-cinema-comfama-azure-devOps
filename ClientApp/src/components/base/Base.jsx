import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import { Login } from '../../pages/login';
import { App } from 'antd';

const Base = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path='iniciarS' element={< Login />} />
                <Route element={<ProtectedRoute canActivate={true} />} >
                    
                    
                    <Route path='/app' element={<App/>} />
        
                </Route>
                    {/* <App /> */}
        
            </Routes>
    
    
    
        </BrowserRouter>
    );
}

export default Base;
