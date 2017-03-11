import React,{ Component,PropsType } from 'react';
import './Login.css';
import { browserHistory } from 'react-router';
import 'whatwg-fetch';
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}
	submit() {
		const user = this.refs.user.value;
		const pass = this.refs.pass.value;
		fetch('/api/login',{
            method: 'POST',
            headers: {
		      'Content-Type': 'application/json'
		    },
		    credentials: 'include',
		    mode: 'cors',
		    body:JSON.stringify({
		    	user:user,
		    	pwd:pass
		    })
		}).then(function(response){
                return response.json()
	    }).then(function(data){
	    	if (data.success) {
	    	  console.log('cookie');
	    	  document.cookie = 'todo-online=' + data.data.token + 
	    	    ';expires=' + data.data.expires + 
	    	    ';domain=' + data.data.domain;
	    	  window.location.href = '/index';
	    	}else {
	    	  console.log("没有用户");
	    	}
	    }).catch(function(err){
	    	console.log(err);
	    });
        console.log(1);
	}
	render() {
		return (
			<div className="login-center">
			    <img src="https://facebook.github.io/react/img/logo.svg" className="login-img"/>
			    <div className="login-block">
			        <label className="login-text">姓名:</label>
			        <input type="text" className="login-input" placeholder="已有用户zcl" ref="user"/>
			    </div>
			    <div className="login-block">
			        <label className="login-text">密码:</label>
			        <input type="password" className="login-input" placeholder="密码123" ref="pass"/>
			    </div>
			    <span className="login-submit" onClick={this.submit}>login</span>
			</div>
		)
	}
}