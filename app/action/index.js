import 'whatwg-fetch';
export function addTodo(text) {
    return function(dispatch) {
    	fetch('/api/todo',{
	    	method: 'POST',
	    	headers: {
	    		'Content-Type': 'application/json'
	    	},
	    	credentials: 'include',
	    	mode: 'cors',
	    	body: JSON.stringify({
	    		text:text
	    	})
	    }).then(function(response) {
	    	return response.json();
	    }).then(function(data) {
	    	if (data.success) {
	    		dispatch({type:'addTodo',data:data.data});
	    	} else {
	    		alert('服务器插入失败');
	    	}
	    	
	    }).catch(function(err) {
	    	console.log('add',err);
	    })
    }
}

export function toggleTodo(id) {
	return function(dispatch) {
		fetch('/api/todo',{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			mode: 'cors',
			body: JSON.stringify({
				id:id
			})
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			if (data.success) {
				dispatch({type:'toggleTodo',id})
			} else {
				alert('更新数据异常');
			}
		}).catch(function(err) {
			console.log('update',err);
		})
	}
}

export function filterList(filter) {
	return {type:'setFilter',filter}
}

export function follow(id,isFollowing) {
	socket.emit('follow',{id:id,isFollowing,isFollowing});
	return function(dispatch) {
		fetch('/api/follow',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			credentials:'include',
			mode:'cors',
			body:JSON.stringify({
				id:id,
				isFollowing:isFollowing
			})
		}).then(function(response) {
			return response.json();
		}).then(function(data) {
			if (data.success) {
				if (isFollowing) {
					dispatch({type:'reduce',id:id});
					dispatch({type:'userReduceFollowing',id});
				} else {
					dispatch({type:'add',id:id});
					dispatch({type:'userAddFollowing',id});
				}
			} else {
				alert('关注操作异常');
			}
		}).catch(function(err) {
			console.log('关注',err);
		})
	}
}

export function userManage(isIncrease) {
    if (isIncrease) {
    	return {type:'addFans'};
    } else {
    	return {type:'reduceFans'};
    }
}
