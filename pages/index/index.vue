<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
<template>
	<view class="phone-content">
		<view class="status_bar" style="height: var(--status-bar-height); width: 100%;" />
		<view class="margin-0 layout"><text style="font-size:80rpx;font-weight:600;">TodoList</text></view>
		<view class="flex layout">
			<view class="margin-0 flex-treble"></view>
			<view class="margin-0 flex-twice"><button class="control" :type="btnAllType" @click="btn_all()">全部</button></view>
			<view class="margin-0 flex-twice"><button class="control" :type="btnNoType" @click="btn_no()">未完成</button></view>
			<view class="margin-0 flex-twice"><button class="control" :type="btnYesType" @click="btn_yes()">已完成</button></view>
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
		<view class="flex layout fixed" :style="{ bottom: inputHeight + 'px' }">
			<view class="margin-0 flex-five layout2">
				<input
					type="text"
					class="input1"
					style="background-color:rgba(213, 213, 213, 1);height:60rpx;padding:0rpx 20rpx 0rpx 20rpx;"
					placeholder="输入你的计划"
					v-model="newTodo"
					:adjust-position="false"
					:focus="focus"
					@focus="inputBindFocus"
					@blur="inputBindBlur"
					@input="input()"
				/>
			</view>
			<view class="margin-0 flex-sub layout2 "><button class="control" style="height:60rpx;" type="default" @click="addTodo">↑</button></view>
		</view>
	</view>
</template>
<script>
import { getTodosData, addTodosData, updateTodosData, deleteTodosData } from '@/static/getData.js';
export default {
	name: 'index',
	data() {
		return {
			show: 'all',
			btnAllType: 'warn',
			btnNoType: 'default',
			btnYesType: 'default',
			todos: [],
			inputHeight: 0,
			focus: 0,
			newTodo: ''
		};
	},
	mounted() {
		this.getTodos();
	},
	onLoad() {
		uni.onKeyboardHeightChange(res => {
			console.log('软键盘高度监听' + res.height);
			console.log(this.focus);
			if (res.height == 0) {
				this.focus = false;
			} else {
				this.focus = true;
			}
		});
	},
	methods: {
		inputBindFocus(e) {
			if (e.detail.height) {
				this.inputHeight = e.detail.height; //这个高度就是软键盘的高度
			}
		},
		inputBindBlur(e) {
			this.inputHeight = 0;
		},
		btn_all() {
			this.btnAllType = 'warn';
			this.btnNoType = 'default';
			this.btnYesType = 'default';
			this.show = 'all';
		},
		btn_no() {
			this.btnAllType = 'default';
			this.btnNoType = 'warn';
			this.btnYesType = 'default';
			this.show = 'no';
		},
		btn_yes() {
			this.btnAllType = 'default';
			this.btnNoType = 'default';
			this.btnYesType = 'warn';
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
		async getTodos() {
			await getTodosData().then(result => {
				this.todos = result.data;
			});
		},
		async addTodo() {
			if (this.newTodo === '') {
				return;
			}
			await addTodosData({
				title: this.newTodo,
				isDone: false
			}).then(result => {
				console.log(result);
				this.todos.push(result.data);
			});
		},
		async updateTodo(index) {
			var todo = this.todos[index];
			await updateTodosData(todo.id, {
				title: todo.title,
				isDone: todo.isDone
			});
		},
		async deleteTodo(index) {
			var todo = this.todos[index];
			await deleteTodosData(todo.id, {
				title: todo.title,
				isDone: todo.isDone
			}).then(result => {
				this.todos.splice(index, 1);
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

	bottom: 0rpx;
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
