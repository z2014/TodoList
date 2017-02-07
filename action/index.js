export function addTodo(text) {
	return {type:'addTodo',text}
}
export function toggleTodo(id) {
	return {type:'toggleTodo',id}
}
export function filterList(filter) {
	return {type:'setFilter',filter}
}