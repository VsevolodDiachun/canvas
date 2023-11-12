import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/bootstrap.scss';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const store = setupStore()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <ToastContainer />
      <App />
    </Provider>
);