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
}
