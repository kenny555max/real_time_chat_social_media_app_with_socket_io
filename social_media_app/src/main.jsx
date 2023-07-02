import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { applyMiddleware, compose, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './store';

const theme = createTheme({
   direction: 'rtl',
   // other theme properties
});

const initialState = {};

const middleware = thunk;

const actionSanitizer = (action) => (
  action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ?
  { ...action, data: '<<LONG_BLOB>>' } : action
);

const store = legacy_createStore(
  rootReducers,
  initialState,
  compose(
    applyMiddleware(middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
      actionSanitizer,
      stateSanitizer: (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
    })
  )
);

//const store = legacy_createStore(
  //rootReducers,
  //initialState, 
  //compose(
    //applyMiddleware(middleware),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //)
//);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
