import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostsService} from "../../shared/posts.service";
import {AlertService} from "../shared/services/alert.service";
import {NotifierService} from "../shared/services/notifier.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription, switchMap} from 'rxjs';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public submitted: boolean = false;

  public post: Post;

  public isNew: boolean = false;
  public isEdit: boolean = false;

  public loading: boolean;

  public createSub: Subscription;
  public updateSub: Subscription;

  constructor(private postsService: PostsService,
              private alert: AlertService,
              private notifierService: NotifierService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if (this.router.url.endsWith('/create')) {
      this.isNew = true;
      this.initForm();
    } else {
      this.loading = true;
      this.isEdit = true;
      this.initForm();
      this.getPost();
    }
  }

  ngOnDestroy() {
    if (this.createSub) {
      this.createSub.unsubscribe();
    }
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }

  public initForm() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      photo: new FormControl('', Validators.required),
      author: new FormControl(null, Validators.required),
      subject: new FormControl(null),
    });
  }

  public getPost() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
            return this.postsService.getById(params['id']);
          }
        )
      ).subscribe((post: Post) => {
      this.form.patchValue(post);
      this.post = post;
      this.loading = false;
    })
  }

  public addPhoto(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length
      || event.dataTransfer.files && event.dataTransfer.files.length) {
      const [file] = event.target.files || event.dataTransfer.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          photo: reader.result
        });
      }
    }
  }

  public onDragOver(event: any) {
    event.preventDefault();
  }

  public onDragSuccess(event: any) {
    event.preventDefault();
    this.addPhoto(event);
  }

  public delPhoto() {
    this.form.get('photo')?.patchValue(null);
  }

  public submit(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      photo: this.form.value.photo,
      subject: this.form.value.subject,
      date: new Date(),
    }

    if (this.isNew) {
      this.createSub = this.postsService.create(post).subscribe(() => {
        formDirective.resetForm();
        this.form.reset();
        this.submitted = false;

        // this.alert.success('Post has been created');
        this.notifierService.showSnackbar('Post has been created', 'success');
      });
    } else {
      this.updateSub = this.postsService.update({
        ...this.post,
        title: this.form.value.title,
        text: this.form.value.text,
        photo: this.form.value.photo,
        subject: this.form.value.subject,
      }).subscribe(() => {
        this.submitted = false;
        this.router.navigate(['/admin', 'dashboard']).then();
        // this.alert.success('Changes saved successfully');
        this.notifierService.showSnackbar('Changes successfully saved', 'success');
      });
    }
  }

}
