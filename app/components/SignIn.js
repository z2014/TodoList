import React,{ Component,PropsType } from 'react';
import './SignIn.css';
import { browserHistory } from 'react-router';
import 'whatwg-fetch';
export default class SignIn extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}
	submit() {
		const user = this.refs.user.value;
		const pass = this.refs.pass.value;
		fetch('/api/signIn',{
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
			    <div className="login-block">
			        <label className="login-text">姓名:</label>
			        <input type="text" className="login-input" ref="user"/>
			    </div>
			    <div className="login-block">
			        <label className="login-text">密码:</label>
			        <input type="password" className="login-input" ref="pass"/>
			    </div>
			    <span className="login-submit" onClick={this.submit}>sign in</span>
			</div>
		)
	}
}