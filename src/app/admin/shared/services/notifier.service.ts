import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotifierComponent} from "../components/notifier/notifier.component";

@Injectable({
  providedIn: "root"
})

export class NotifierService {
  constructor(private snackBar: MatSnackBar) {
  }

  public showSnackbar(message: string, className: string) {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: message,
      },
      duration: 2000,
      panelClass: className,
    });
  }
}
