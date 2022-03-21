import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean = false;
  public message: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Login first to access this page';
      } else if (params ['authFailed']) {
        this.message = 'The session has expired. Please login again'
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ])
    });
  }

  public login() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }

}
