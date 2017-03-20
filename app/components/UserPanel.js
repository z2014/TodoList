import React,{ Component } from 'react';
import './UserPanel.css';
export default class UserPanel extends Component{
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<ul className='userPanel'>
			    <p>已掌握技能</p>
                {
                	this.props.data.map(function(item) {
	                	return <li key={item.id} className='panelItem'>{item.text}</li>
	                })
                }
            </ul>
		)
	}
}