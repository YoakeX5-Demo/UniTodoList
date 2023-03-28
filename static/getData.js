import { request } from './request.js';

export const getTodosData = (data)=>{
	return request({
		url:'/api/todos', 
		method:'GET',
		data:data
	})
}

export const addTodosData = (data)=>{
	return request({
		url:'/api/todos',
		method:'POST',
		data:data
	})
}

export const updateTodosData = (todoId, data)=>{
	return request({
		url:'/api/todos/' + todoId,
		method:'PUT',
		data:data
	})
}

export const deleteTodosData = (todoId, data)=>{
	return request({
		url:'/api/todos/' + todoId,
		method:'DELETE',
		data:data
	})
}