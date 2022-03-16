export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean,
}

export interface FbAuthResponse {
  isToken?: string | null,
  expiresIn?: string | undefined,
}
