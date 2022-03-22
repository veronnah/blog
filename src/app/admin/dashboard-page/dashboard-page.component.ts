import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] | null | undefined;
  public pSub: Subscription;
  public dSub: Subscription;
  public searchStr = '';
  public isTitleMatches: boolean;
  public submitted: boolean = false;
  public displayedPosts: Post[] | null | undefined;
  public nothingFoundMessage: string;

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
      this.displayedPosts = this.posts;
    });
  }

  public remove(id: string) {
    this.submitted = true;

    this.postsService.remove(id).subscribe({
        next: () => {
          this.posts = this.posts?.filter(post => post.id !== id);
          this.submitted = true;
        },
        error: () => this.submitted = false,
      }
    );
  }

  public search(value: string) {
    if (!value.trim()) {
      this.displayedPosts = this.posts;
      return;
    }

    this.posts?.forEach(post => {
      this.isTitleMatches = post.title.toLowerCase().includes(value.toLowerCase());

      if (!this.isTitleMatches) {
        this.displayedPosts = this.displayedPosts?.filter(fPost => fPost.id !== post.id);
      }
    });

    if (this.displayedPosts?.length === 0) {
      this.nothingFoundMessage = 'No posts found. Try to update search query';
    }
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
