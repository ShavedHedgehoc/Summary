import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RootStateProvider } from './store/RootStateContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <RootStateProvider>
        <App />
    </RootStateProvider>
);