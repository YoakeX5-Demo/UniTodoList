<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
<template>
	<view class="phone-content">
		<view class="margin-0 layout"><text style="font-size:80rpx;font-weight:600;">TodoList</text></view>
		<view class="flex layout">
			<view class="margin-0 flex-treble"></view>
			<view class="margin-0 flex-twice"><button class="control" :type="btn_all_type" @click="btn_all()">全部</button></view>
			<view class="margin-0 flex-twice"><button class="control" :type="btn_no_type" @click="btn_no()">未完成</button></view>
			<view class="margin-0 flex-twice"><button class="control" :type="btn_yes_type" @click="btn_yes()">已完成</button></view>
			<view class="margin-0 flex-treble"></view>
		</view>

		<li v-for="(todo, index) in todos" :key="index" :style="{ display: ifShow(todo.isDone) }">
			<view class="flex layout">
				<view class="margin-0 flex-five layout2" style="display:flex;justify-content:flex-start;">
					<checkbox class="control" style="height:60rpx;font-size:30rpx;" color="red" :checked="todo.isDone" @click="ifisDone(index, todo.isDone)" />
					<input
						class="input1"
						:style="{ 'font-size': '30rpx', height: '60rpx', width: '100%', margin: '0rpx 0rpx 0rpx 10rpx', 'text-decoration': todo.isDone ? 'line-through' : '' }"
						v-model="todo.title"
					/>
				</view>
				<view class="margin-0 flex-sub layout2"><button class="control" style="height:60rpx;" type="default" @click="updateTodo(index)">更新</button></view>
				<view class="margin-0 flex-sub layout2"><button class="control" style="height:60rpx;" type="default" @click="deleteTodo(index)">删除</button></view>
			</view>
		</li>
		<view class="margin-0 layout" style="padding-bottom:100rpx;"></view>
		<view class="flex layout fixed">
			<view class="margin-0 flex-five layout2">
				<input
					type="text"
					class="input1"
					style="background-color:rgba(213, 213, 213, 1);height:60rpx;padding:0rpx 20rpx 0rpx 20rpx;"
					placeholder="输入你的计划"
					v-model="newTodo"
				/>
			</view>
			<view class="margin-0 flex-sub layout2 "><button class="control" style="height:60rpx;" type="default" @click="addTodo">↑</button></view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'index',
	data() {
		return {
			show: 'all',
			btn_all_type: 'warn',
			btn_no_type: 'default',
			btn_yes_type: 'default',
			todos: [],
			newTodo: ''
		};
	},
	mounted() {
		this.$axios.defaults.baseURL = 'https://s1.i-mc.cn:2222';
		this.getTodos();
	},
	methods: {
		btn_all() {
			this.btn_all_type = 'warn';
			this.btn_no_type = 'default';
			this.btn_yes_type = 'default';
			this.show = 'all';
		},
		btn_no() {
			this.btn_all_type = 'default';
			this.btn_no_type = 'warn';
			this.btn_yes_type = 'default';
			this.show = 'no';
		},
		btn_yes() {
			this.btn_all_type = 'default';
			this.btn_no_type = 'default';
			this.btn_yes_type = 'warn';
			this.show = 'yes';
		},
		ifShow(bool) {
			if (this.show == 'all') {
				return '';
			} else if ((this.show == 'no') & (bool == false)) {
				return '';
			} else if ((this.show == 'yes') & (bool == true)) {
				return '';
			} else {
				return 'none';
			}
		},
		ifisDone(index, bool) {
			if (bool == true) {
				this.todos[index].isDone = false;
			} else {
				this.todos[index].isDone = true;
			}
			this.updateTodo(index);
		},
		getTodos() {
			this.$axios
				.get('/api/todos')
				.then(response => {
					this.todos = response.data;
				})
				.catch(error => {
					console.log(error);
				});
		},
		addTodo() {
			if (this.newTodo === '') {
				return;
			}
			this.$axios
				.post('/api/todos', {
					title: this.newTodo,
					isDone: false
				})
				.then(response => {
					this.todos.push(response.data);
					this.newTodo = '';
				})
				.catch(error => {
					console.log(error);
				});
		},
		updateTodo(index) {
			var todo = this.todos[index];
			this.$axios
				.put('/api/todos/' + todo.id, {
					title: todo.title,
					isDone: todo.isDone
				})
				.catch(error => {
					console.log(error);
				});
		},
		deleteTodo(index) {
			var todo = this.todos[index];
			this.$axios
				.delete('/api/todos/' + todo.id)
				.then(response => {
					this.todos.splice(index, 1);
				})
				.catch(error => {
					console.log(error);
				});
		}
	},
	computed: {},
	components: {}
};
</script>

<style scoped>
.phone-content {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
.layout {
	text-align: center;
	padding: 20rpx;
}
.control {
	font-size: 30rpx;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
	border-radius: 5rpx;
	padding: 0rpx;
}
.input1 {
	font-size: 30rpx;
	border-radius: 5rpx;
	padding: 15rpx;
	text-align: left;
	background-color: #1123;
}
.layout2 {
	text-align: center;
	padding: 5rpx;
}
.fixed {
	position: fixed;
	left: 0rpx;
	bottom: 0rpx;
	width: 100%;
	height: 100rpx;
	z-index: 9999;
	background-color: rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(5px);
}
</style>
