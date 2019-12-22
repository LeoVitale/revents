import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from 'app/App.jsx';
import configureStore from './redux/storeConfig';
import * as serviceWorker from './serviceWorker';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
