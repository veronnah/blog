import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PostsService} from "../shared/posts.service";
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent implements OnInit {

  public posts$: Observable<Post[] | null>;
  public posts: Post[] | null;
  public page: number = 1;
  public count: number = 0;
  public tableSize: number = 6;
  public tableSizes: any = [6, 12, 18, 24];

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  public getPosts() {
    this.posts$ = this.postsService.getAll();
    this.posts$.subscribe(posts => {
      this.posts = posts;
    })
  }

  public onPageChange(event: any) {
    this.page = event;
    this.getPosts();
  }

  public onPageSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPosts();
  }
}
