import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ContactService} from "../shared/contact.service";
import {ContactMessage} from "../shared/interfaces";
import {NotifierService} from "../admin/shared/services/notifier.service";

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  public contactForm: FormGroup;
  public submitted: boolean = false;

  constructor(private contactService: ContactService,
              private notifierService: NotifierService) {
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

  public submit(formDirective: FormGroupDirective) {
    if (this.contactForm.invalid) {
      return;
    }

    const formValue: ContactMessage = this.contactForm.getRawValue();
    this.submitted = true;

    this.contactService.sendMessage(formValue)
      .subscribe({
        next: value => {
          this.contactForm.reset();
          formDirective.resetForm();

          this.submitted = false;
          this.notifierService.showSnackbar('Message has been sent', 'success');
        },
        error: err => {
          this.submitted = false;
          this.notifierService.showSnackbar('Something went wrong', 'error');
        },
      })

  }

}
