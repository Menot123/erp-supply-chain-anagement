import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './redux-toolkit/store'
import { Provider } from 'react-redux'
import Wrapper from './HOC/Wrapper'
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import axios from './axios/axiosCustom'
import { toast } from 'react-toastify'
import { logOut } from './redux-toolkit/slices/userSlice'
import { FormattedMessage } from 'react-intl'

let persisUser = persistStore(store)


ReactDOM.render(
  <Provider store={store}>
    <Wrapper>
      <React.StrictMode>
        <BrowserRouter>
          <PersistGate persistor={persisUser}>
            <App />
          </PersistGate>
        </BrowserRouter>

      </React.StrictMode>
    </Wrapper>
  </Provider>,
  document.getElementById('root')
);

const { dispatch } = store; // direct access to redux store.
axios.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response;
    if (+status === 401 && window.location.pathname !== '/' && window.location.pathname !== '/login' &&
      window.location.pathname !== '/forgot-password') {
      toast.warning(<FormattedMessage id="toast-Unauthorized" />)
      dispatch(logOut());
    }
    return error
  }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
