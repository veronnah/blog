import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Post} from "./interfaces";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})

export class PostsService {
  constructor(private http: HttpClient,
  ) {
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

  public update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}/.json`, post)
  }

  public getAll(): Observable<Post[] | null> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          if (response) {
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

  public getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(map((post: Post) => {
        return {
          ...post, id,
          date: new Date(post.date)
        }
      }))
  }


  public remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }
}
