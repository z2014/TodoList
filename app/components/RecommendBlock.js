import React,{ Component } from 'react';
import './RecommendBlock.css';
import UserPanel from './UserPanel.js';
import 'whatwg-fetch';
export default class RecommendBlock extends Component{
	constructor(props) {
		super(props);
	}
	render() {
		console.log(this.props.data);
		return (
			<div>
			    <p className='followhead'>热门大v</p>
			    {this.props.data.map((item) => {
			    	return <Item item={item} key={item.id} follow={this.props.follow} id={item.id}/>
			    })}
			</div>
		)
	}
}
class Item extends Component {
	constructor(props) {
		super(props);
		this.click = this.click.bind(this);
		this.showPanel = this.showPanel.bind(this);
		this.hidePanel = this.hidePanel.bind(this);
		this.state = {
			show:false,
			skills:null
		};
	}
	hidePanel() {
		this.setState({
			show:false
		});
	}
	showPanel() {
		const self = this;
        if (window.sessionStorage[self.props.id]) {
        	// console.log('session',JSON.parse(window.sessionStorage[this.props.id]);
            self.setState({
            	skills:JSON.parse(window.sessionStorage[this.props.id]),
            	show:true
            });
        } else {
        	fetch(`/api/getUser?id=${this.props.id}`,{
				method:'GET',
				headers: {
					'Content-Type':'application/json'
				},
				credentials:'include',
				mode:'cors',
			}).then(function(response) {
				return response.json()
			}).then(function(data) {
	            if (data.success) {
	            	sessionStorage[self.props.id] = JSON.stringify(data.data);
		            self.setState({
		            	skills:data.data,
		            	show:true
		            });
	            } else {
	            	alert('查找用户失败');
	            }
			}).catch(function(err) {
				console.log('RecommendBlock',err);
			})
        }
	}
	click() {
        if (this.refs.span.innerHTML === 'follow') {
        	this.props.follow(this.props.item.id,false);
        } else {
        	this.props.follow(this.props.item.id,true);
        }
	}
	render() {
		return (
			<li className='followli'>
			    {
			    	this.state.show
			    	  &&
			    	<UserPanel data={this.state.skills}/>
			    }
    	        <span className='user' onMouseOver={this.showPanel} 
    	            onMouseOut={this.hidePanel}>{this.props.item.name}</span>
    	        <span className='follow' 
    	        ref="span" onClick={this.click}>
    	            {this.props.item.follow ? 'unfollow' : 'follow'}
    	        </span>
    	    </li>
		)
	}
}