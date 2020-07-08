import React, { FC } from 'react';
import GlobalStyle from './styles/global'
import AppProvider from './hooks';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
const App: FC = () => (
    <BrowserRouter>
        <AppProvider>
            <Routes />
        </AppProvider>
        <GlobalStyle />
    </BrowserRouter>
);

export default App;
