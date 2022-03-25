import {Component, OnInit} from '@angular/core';
import {PostsService} from "../shared/posts.service";
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public posts$: Observable<Post[] | null>;

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAll();
  }

}
