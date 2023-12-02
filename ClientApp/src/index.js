import React from 'react';
import ReactDOM from "react-dom/client"
import App from './App';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import { Login } from './pages/login';
import Base from './components/base/Base.jsx';
import { Provider } from 'react-redux';
import  {storeRedux}  from './storeRedux/storeRedux.js'


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Provider store= {storeRedux} >
                <App />
        </Provider>
    </React.StrictMode>
)