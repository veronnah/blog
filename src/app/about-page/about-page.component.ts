import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutPageComponent implements OnInit {

  public isLoaded: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoaded = true;
    }, 2000);
  }

}
