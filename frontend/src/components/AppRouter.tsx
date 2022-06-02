import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {publicRoutes} from '../router';

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(route =>
                <Route key={route.path}
                       path={route.path}
                       element={<route.element/>}
                />
            )}
        </Routes>
    )
};

export default AppRouter;