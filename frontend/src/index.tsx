import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from 'mobx-react';
import UserStore from './store/UserStore';



export const Context = createContext<Partial<store>>({});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Context.Provider value={{
        userStore: new UserStore()
    }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Context.Provider>

);