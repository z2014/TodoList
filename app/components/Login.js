import React,{ Component,PropsType } from 'react';
import './Login.css';
import { browserHistory } from 'react-router';
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}
	submit() {
		const user = this.refs.user.value;
		const pass = this.refs.pass.value;
		// const req = new Request('http://localhost:8000/login',
		// 	{method:'POST',body:'{"user":"user","pass":"pass"}'});
		// fetch(req)
		//     .then(function(response){
  //               return response.json()
		//     }).then(function(data){
		//     	console.log(data);
		//     }).catch(function(err){
		//     	console.log(err);
		//     });
		if (user == 'zcl' && pass == '123') {
			const path = 'http://localhost:8080/todo';
            browserHistory.push(path);
		}else{
			alert('请输入默认姓名与密码')
		}
        
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