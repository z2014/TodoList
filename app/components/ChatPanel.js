import React,{ Component } from 'react';
import './ChatPanel.css';
export default class ChatPanel extends Component{
	constructor(props) {
		super(props);
		this.send = this.send.bind(this);
		this.state = {
			list:[]
		};
	}
	send() {
        const text = this.refs.content.innerHTML;
        const self = this;
        var { list } = this.state;
        socket.emit('speak',{user:globalUser.user,text:text});
        socket.on('receive',function(data) {
            list.push(data);
            self.setState({ list:list });
        });
	}
	render() {
		return (
			<div className='chatPanel'>
			    <div className='chat-header'>吐槽室</div>
			    <div id='chatPanel'>
			        {
			        	this.state.list.map(function(item,index) {
			            	if (item.user === globalUser.user) {
			            		return <li className='rightchatItem' key={index}><i className='chatUser'>{item.user}</i>
			                    <span className='chatContent'>{item.text}</span></li>;
			            	} else {
			            		return <li className='leftchatItem' key={index}><i className='chatUser'>{item.user}</i>
			                    <span className='chatContent'>{item.text}</span></li>;
			                }
			            })
			        }
			    </div>
			    <div contentEditable='true' className='inputDiv' ref='content'></div>
			    <div className='send' onClick={this.send}>send</div>
			</div>
		)
	}
}