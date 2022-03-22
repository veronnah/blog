import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Post} from "./interfaces";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})

export class PostsService {
  constructor(private http: HttpClient) {
  }

  public create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response: Post) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date),
          }
        })
      );
  }

  public getAll(): Observable<Post[] | null> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          if(response){
            return Object.keys(response)
              .map(key => ({
                ...response[key],
                id: key,
                date: new Date(response[key].date),
              }));
          } else {
          return null;
          }
      }));
  }

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }
}
