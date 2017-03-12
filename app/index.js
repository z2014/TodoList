import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App.js';
import Login from './components/Login.js';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';
import { Router,Route,browserHistory } from 'react-router';
import 'whatwg-fetch';
fetch('/api/todo',{
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	},
	credentials: 'include',
	mode: 'cors'
}).then(function(response) {
	return response.json();
}).then(function(data) {
    const initialState = data.data;
    var roots = document.getElementById('root');
    const store = configureStore(initialState);
    ReactDOM.render(
	    <Provider store={store}>
	        <App/>
	    </Provider>,
        roots
    );
}).catch(function(err){
	console.log('todo',err);
});
