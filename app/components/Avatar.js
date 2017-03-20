import React,{ Component } from 'react';
import './Avatar.css';
export default class Avator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user:this.props.data.user ? this.props.data.user : '2014',
			followers:this.props.data.followers ? this.props.data.followers : 0,
			following:this.props.data.following ? this.props.data.following : 0,
			followersCount:0,
			followingCount:0 
		};
	}
	componentDidMount() {
		var self = this;
		socket.on('addFans',function(data) {
	        if (data === globalUser.id) {
	 	            this.refs.followingSub.className = 'moveSub';
					setTimeout(function(){
						self.refs.followingSub.className = 'preSub';
					},1000);
	            self.setState({
	            	followers:++self.state.followers
	            });
	        }
	    });
	    socket.on('reduceFans',function(data) {
	        if (data === globalUser.id) {
	            self.setState({
	            	followers:--self.state.followers
	            });
	        }
	    });
	}
	componentWillReceiveProps(nextProps) {
		this.setState(nextProps.data);
	}
	render() {
		return (
			<div className='userInfor'>
                <span className='avatarSpan'>{`用户名 ${this.state.user}`}</span>
                <span className='avatarSpan'>
                    <a href='#'>{`我的关注 ${this.state.following}`}</a>
                    <sub ref='followingSub' className='preSub'>+1</sub>
                </span>
                <span className='avatarSpan'>
                    <a href='#'>{`我的粉丝 ${this.state.followers}`}</a>
                    <sub ref='followersSub' className='preSub'>+1</sub>
                </span>
			</div>
		)
	}
}