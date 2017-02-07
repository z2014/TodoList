import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App.js';
import Login from './components/Login.js';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';
import { Router,Route,browserHistory } from 'react-router';
const initialState = {
	filter: 'show-all',
	todo:[{id:2,text:'bbbbbb',completed:true},
	    {id:1,text:'aaaaaa',completed:false}
	]
};
var roots = document.getElementById('root');
const store = configureStore(initialState);
const Root = () => {
	return (
		<Router history={browserHistory}>
		    <Route path="/" component={Login} />
		    <Route path="/todo" component={App} />
		</Router>
	)
};
ReactDOM.render(
	<Provider store={store}>
	    <Root/>
	</Provider>,
    roots
);