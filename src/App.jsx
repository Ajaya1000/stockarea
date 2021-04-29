import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core';

import Routes from './Routes';
import configureStore from './modules/store';

const initialState = window.REDUX_INITIAL_DATA;
console.log(initialState);
const reduxStore = configureStore(initialState);

const theme = createMuiTheme({
    primary: {
        text: '',
        textGray: '',
        background: '',
    },
});

function App() {
    return (
        <ReduxProvider store={reduxStore}>
            <ThemeProvider theme={theme}>
                <Routes />
            </ThemeProvider>
        </ReduxProvider>
    );
}

export default App;
