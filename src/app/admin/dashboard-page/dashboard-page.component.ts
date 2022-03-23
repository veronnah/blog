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
  public displayedPosts: Post[] | null | undefined;

  public pSub: Subscription;
  public dSub: Subscription;

  public searchStr = '';
  public isTitleMatches: boolean;
  public loading: boolean;
  public submitted: boolean = false;

  public errorMessage: string;
  public nothingFoundMessage: string;
  public noPostsMessage: string;

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.getPosts();


  }

  public getPosts() {
    this.loading = true;
    this.postsService.getAll().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.displayedPosts = this.posts;
        this.loading = false;
        this.checkPosts();
      },
      error: () => {
        this.errorMessage = 'Something went wrong :(';
        this.loading = false;
      },
      complete: () => this.loading = false,
    });
  }

  private checkPosts(){
    console.log(this.displayedPosts)
    if (!this.displayedPosts || !this.displayedPosts.length) {

      this.noPostsMessage = 'No posts yet';
    }
  }

  public remove(id: string) {
    this.submitted = true;

    this.postsService.remove(id).subscribe({
        next: () => {
          this.displayedPosts = this.displayedPosts?.filter(post => post.id !== id);
          this.submitted = false;
          this.checkPosts();
        },
        error: () => this.submitted = false,
      }
    );
  }

  public search(value: string) {
    if (!value.trim()) {
      this.displayedPosts = this.posts;
      this.nothingFoundMessage = '';
      return;
    }
    this.displayedPosts = this.posts?.filter(post => post.title.toLowerCase().includes(value));

    if (this.displayedPosts?.length === 0) {
      this.nothingFoundMessage = 'No posts found. Try to update search query';
    } else {
      this.nothingFoundMessage = '';
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
