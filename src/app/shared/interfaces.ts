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
  name?: string,
  title: string,
  text: string,
  author: string,
  photo: any,
  date: Date,
}

export interface ContactMessage {
  name: string,
  email: string,
  message: string,
}
