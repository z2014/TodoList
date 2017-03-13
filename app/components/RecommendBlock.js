import React,{ Component } from 'react';
import './RecommendBlock.css';
export default class RecommendBlock extends Component{
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
			    <p className='followhead'>热门大v</p>
			    {this.props.data.map((item) => {
			    	return <Item item={item} key={item.id} follow={this.props.follow}/>
			    })}
			</div>
		)
	}
}
class Item extends Component {
	constructor(props) {
		super(props);
		this.click = this.click.bind(this);
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
    	        <span className='user'>{this.props.item.name}</span>
    	        <span className='follow' 
    	        ref="span" onClick={this.click}>
    	            {this.props.item.follow ? 'unfollow' : 'follow'}
    	        </span>
    	    </li>
		)
	}
}