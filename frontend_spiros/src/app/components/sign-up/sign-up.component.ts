import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Volunteer } from '@models/volunteer';
import { SignupService } from '@services/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  messageForm: FormGroup;
  volunteer: Volunteer = new Volunteer();

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.messageForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
      });
  }

  onSubmit(): void {
    if ( this.messageForm.invalid ) {
      return;
    }
    console.log('valid');
    this.volunteer = new Volunteer(this.messageForm.value);
    this.signupService.addsignup(this.volunteer, this.messageForm.controls.password.value)
    .subscribe( data => {
      this.router.navigate(['blogs'])
    } );
  }

  ngOnInit() {
  }

}
