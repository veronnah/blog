import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription, switchMap} from "rxjs";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public post: Post;
  public submitted: boolean = false;

  public updateSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) {
  }

  ngOnInit(): void {
    this.getPost();
  }

  public getPost() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params['id']);
        })
      ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      })
    });
  }

  public save() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    this.updateSub = this.postsService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,
    }).subscribe(() => {
      this.submitted = false;
    })
  }

  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }

}
