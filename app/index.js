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
    // const initialState = { 
    //     filter:'show-all',
    //     todo:[{
    //     	id:1,text:'learn react',completed:1
    //     },{
    //     	id:2,text:'learn vue',completed:0
    //     }],
    //     user:{user:'zcl',pwd:'123',followers:2,following:1},
    //     otherUser:[{user:'擎天柱',follow:1},{user:'大黄蜂',follow:0},{user:'张春林',follow:0}]
    // };
    // var roots = document.getElementById('root');
    // const store = configureStore(initialState);
    // ReactDOM.render(
	   //  <Provider store={store}>
	   //      <App/>
	   //  </Provider>,
    //     roots
    // );
// var ws = new WebSocket('ws://localhost:8080');
// ws.open = function() {
// 	console.log('websocket open');
// 	ws.send('hello');
// };
// ws.onmessage = function(evt) {
//     console.log('receive',evt.data);
// };
// ws.onerror = function(evt) {
// 	console.log('websocket err');
// }
