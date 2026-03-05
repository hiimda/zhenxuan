//对应的类型

//用户登录携带的类型
export interface UserForm {
  username: string
  password: string
}

interface dataType {
  token?: string
  message?: string
}
//用户登录返回的类型
export interface loginResponseData {
  code: number
  data: dataType
}

interface UserInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
//获取用户信息返回的类型
interface user {
  checkUser: UserInfo
}
export interface userInfoResponseData {
  code: number
  data: user
}
