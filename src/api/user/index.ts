//统一管理项目里的用户相关接口
import request from '@/utils/request'
import type { UserForm, loginResponseData, userInfoResponseData } from './type'
//统一管理接口
enum API {
  LOGIN = '/user/login',
  USERINFO = '/user/info',
}

//登录接口
export const reqLogin = (data: UserForm) => request.post<any, loginResponseData>(API.LOGIN, data)
//获取用户信息接口
export const reqUserInfo = () => request.get<any, userInfoResponseData>(API.USERINFO)
