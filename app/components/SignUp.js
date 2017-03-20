import React,{ Component,PropsType } from 'react';
import './SignIn.css';
import { browserHistory } from 'react-router';
import 'whatwg-fetch';
export default class SignUp extends Component{
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.blur = this.blur.bind(this);
	}
	submit() {
		const user = this.refs.user.value;
		const pass = this.refs.pass.value;
		fetch('/api/signUp',{
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
	}
	blur(ev) {
		const user = ev.target.value;
		const self = this;
		fetch('/api/signUp',{
			method:'PUT',
			headers: {
				'Content-Type':'application/json'
			},
			credentials:'include',
			mode:'cors',
			body:JSON.stringify({
				user:user
			})
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
            self.refs.text.innerHTML = data.data;
		})
	}
	render() {
		return (
			<div className="login-center">
			    <div className="login-block">
			        <label className="login-text">姓名:</label>
			        <input type="text" className="login-input" ref="user" onBlur={this.blur}/>
			        <label ref='text'></label>
			    </div>
			    <div className="login-block">
			        <label className="login-text">密码:</label>
			        <input type="password" className="login-input" ref="pass"/>
			    </div>
			    <span className="login-submit" onClick={this.submit}>sign up</span>
			</div>
		)
	}
}