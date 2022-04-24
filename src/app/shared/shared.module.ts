import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SpinnerComponent} from './components/spinner/spinner.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    NgxPaginationModule,
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    SpinnerComponent,
    NgxPaginationModule,
  ],
  declarations: [
    SpinnerComponent
  ]
})

export class SharedModule {

}
