import React from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import { useRootStore } from './store/RootStateContext';


const App = observer(() => {

    const { userStore } = useRootStore();
    
    return (
        <BrowserRouter>        
            <div> <h1>{userStore.isAuth && 'dfdsfdsfs'}</h1></div>
            <AppRouter />        
        </BrowserRouter>
    )    
});

export default App;