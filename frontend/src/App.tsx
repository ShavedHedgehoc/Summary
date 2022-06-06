import { observer } from 'mobx-react-lite';
import React, { createContext, useContext } from 'react';
import { Context } from '.';
import AppRouter from "./components/AppRouter";
import UserStore from './store/UserStore';


const App = observer(() => {
    const { userStore }=useContext(Context)
    return (
        <div>
            {userStore && userStore._isAuth && <><nav className="navbar navbar-dark bg-dark">fsdfdsfsf</nav></>}
            <AppRouter />
        </div>
    )
});



export default App;
