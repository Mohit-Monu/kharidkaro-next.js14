export interface IUser {
  name: string;
  email: string
  sub: string
  id: string
  role: string
  iat: number
  exp: number
  jti: string
  JWT?:string
}