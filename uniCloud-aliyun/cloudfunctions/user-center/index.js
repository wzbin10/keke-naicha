'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ' + event)
		
	let params = event.params || {}
	
	// 登录记录
	const loginLog = async (res = {}, type = 'login') => {
		const now = Date.now()
		const uniIdLogCollection = db.collection('uni-id-log')
		let logData = {
			deviceId: params.deviceId || context.DEVICEID,
			ip: params.ip || context.CLIENTIP,
			type,
			ua: context.CLIENTUA,
			create_date: now
		};

		Object.assign(logData,
			res.code === 0 ? {
				user_id: res.uid,
				state: 1
			} : {
				state: 0
			})
		// console.log("111"+logData)

		return uniIdLogCollection.add(logData)
	}
	
	let res = {}
	const randomStr = '_00000_' + Math.floor(Math.random() * 1000000);
	
	switch(event.action) {
		case 'register':
			res = {
				code: 0,
				msg: '注册成功'
			}
			loginLog(res)
			break;
		case 'login':
			res = {
				code: 0,
				msg: '登录成功',
				token: params.username + randomStr,
				username: params.username
			}
			loginLog(res)
			break;
		case 'loginBySms':
			if (!params.code) {
				return {
					code: 500,
					msg: '请填写验证码'
				}
			}
			if (!/^1\d{10}$/.test(params.mobile)) {
				return {
					code: 500,
					msg: '手机号码填写错误'
				}
			}
			res = {
				code: 0,
				msg: '登录成功',
				token: params.username + randomStr,
				username:params.username
			}
			loginLog(res)
			break;
		case 'logout':
			res = {
				code: 0,
				msg: '退出成功'
			}
			loginLog(res)
			break;
		case 'checkToken':
			res = {
				code: 0,
				msg: 'token不合法，请重新登录'
			}
			break;
		default:
			res = {
				code: 403,
				msg: '非法访问'
			}
			break;
	}
	
	//返回数据给客户端
	return res
};
