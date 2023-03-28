let baseUrl = 'https://s1.i-mc.cn:2222';

export const request = (options = {}) => {
	//异步封装接口，使用Promise处理异步请求
	return new Promise((resolve, reject) => {
		// 发送请求
		uni.request({
			url: baseUrl + options.url || '', //接收请求的API
			method: options.method || 'GET', //接收请求的方式,如果不传默认为GET
			data: options.data || {}, //接收请求的data,不传默认为空
			sslVerify: false
		}).then(data => {
			let [err, res] = data;
			resolve(res);
		}).catch(error => {
			reject(error);
		})
	})
}