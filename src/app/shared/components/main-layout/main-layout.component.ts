import {Component, HostBinding, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public isFixedNavbar: boolean;
  public isShown: boolean = false;

  @HostBinding('class.navbar-opened') navbarOpened = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (offset > 80) {
      this.isFixedNavbar = true;
    } else {
      this.isFixedNavbar = false;
    }
  }

  public toggleMenu() {
    this.navbarOpened = !this.navbarOpened;
    this.isShown = !this.isShown;
  }

}
