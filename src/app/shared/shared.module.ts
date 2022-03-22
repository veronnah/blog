import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    MatProgressSpinnerModule,
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    MatProgressSpinnerModule,
  ]
})

export class SharedModule {

}
