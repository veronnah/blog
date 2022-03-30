import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../shared/interfaces";
import {PostsService} from "../../shared/posts.service";
import {AlertService} from "../shared/services/alert.service";
import {NotifierService} from "../shared/services/notifier.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  public form: FormGroup;

  constructor(private postsService: PostsService,
              private alert: AlertService,
              private notifierService: NotifierService,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      photo: new FormControl('', Validators.required),
      author: new FormControl(null, Validators.required),
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

  submit() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      photo: this.form.value.photo,
      date: new Date(),
    }
    console.log(post)

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
      // this.alert.success('Post has been created');
      this.notifierService.showSnackbar('Post has been created', 'success');
    })
  }

}
