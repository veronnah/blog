export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean,
}

export interface FbAuthResponse {
  idToken?: string | null,
  expiresIn?: string | undefined,
}

export interface Post {
  id?: string,
  title: string,
  text: string,
  author: string,
  date: Date,
}