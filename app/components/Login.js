import React,{ Component,PropsType } from 'react';
import { browserHistory } from 'react-router';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import './SignIn.css';
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show:true,
			index:0
		};
		this.toggle = this.toggle.bind(this);
	}
	toggle(boolean) {
		this.setState({
			show:boolean,
			index:!boolean
		});
	}
	render() {
		const index = this.state.index;
		if (!index) {
			var firstString = 'select-box chosen';
			var secondString = 'select-box';
		} else {
			var firstString = 'select-box';
			var secondString = 'select-box chosen';
		}
		return ( 
		    <div className="login-box">
			    <img src="https://facebook.github.io/react/img/logo.svg" className="login-img"/>
			    <div className='toggle-box'>
			        <span className={firstString} onClick={() => this.toggle(true)}>登陆</span>
			        <span className={secondString} onClick={() => this.toggle(false)}>注册</span>
			    </div>
			    {
			    	this.state.show ? <SignIn/> : <SignUp/>
			    }
			</div>	
		)
	}
}
