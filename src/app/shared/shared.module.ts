import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ]
})

export class SharedModule {

}
