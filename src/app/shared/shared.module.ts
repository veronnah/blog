import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
  ]
})

export class SharedModule {

}
