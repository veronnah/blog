import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FbAuthResponse, User} from "../../../shared/interfaces";
import {Observable, tap} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    // @ts-ignore
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  public login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  public logout() {
    this.setToken(null);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse | null) {
    console.log(response)
    if (response) {
      let expDate;
      if (typeof response.isToken === "string" && typeof response.expiresIn === 'string') {
        expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
        localStorage.setItem('fb-token', response.isToken);
        localStorage.setItem('fb-token-exp', expDate.toString());
      }
    } else {
      localStorage.clear();
    }
  }
}
