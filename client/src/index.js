import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import { setAuthenticationHeader } from './utils/authenticate';
import BaseLayout from './components/BaseLayout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import requireAuth from './components/requireAuth';
import Journal from './components/Journal';
const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

setAuthenticationHeader(localStorage.getItem('jsonwebtoken'))

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <BaseLayout>
        <Switch>
            <Route path = "/" exact component = {App} /> 
            <Route path = "/journal" exact component = {requireAuth(Journal)} /> 
        </Switch>
        </BaseLayout>
    </BrowserRouter>
</Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();