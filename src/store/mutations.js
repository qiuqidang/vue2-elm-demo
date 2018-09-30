import {
  RECORD_USERINFO,
	GET_USERINFO,
	SAVE_GEOHASH,
	RECORD_ADDRESS,
} from './mutation-types'

export default {
  // 获取用户信息存入vuex
  [GET_USERINFO] (state, info) {
		if (state.userInfo && (state.userInfo.username !== info.username)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info}
		} else {
			state.userInfo = null
		}  
	},
	
	// 保存geohash
	[SAVE_GEOHASH] (state, geohash) {
		state.geohash = geohash
	},

	// 记录当前位置的经纬度
	[RECORD_ADDRESS] (state, {
		latitude,
		longitude
	}) {
		state.latitude = latitude
		state.longitude = longitude
	}
}
