import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ContactMessage} from "./interfaces";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})

export class ContactService {
  constructor(private http: HttpClient) {
  }

  public sendMessage(data: ContactMessage) {
    return this.http.post<ContactMessage>(`${environment.fbDbUrl}/messages.json`, data);
  }
}
