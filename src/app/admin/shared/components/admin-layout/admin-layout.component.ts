import {Component, HostBinding, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  public isShown: boolean = false;

  @HostBinding('class.navbar-opened') navbarOpened = false;

  constructor(private router: Router,
              public auth: AuthService) {
  }

  ngOnInit(): void {
  }

  public logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/admin', 'login']);
  }

  public toggleMenu() {
    this.navbarOpened = !this.navbarOpened;
    this.isShown = !this.isShown;
  }

}
