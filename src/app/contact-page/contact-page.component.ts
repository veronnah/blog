import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  public contactForm: FormGroup;
  public submitted: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.initContactForm();
  }

  public initContactForm() {
    this.contactForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      message: new FormControl(null, [
        Validators.required
      ])
    })
  }

}
