import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '@models/user';
import { SignupService } from '@services/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {

  messageForm: FormGroup;
  //user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.messageForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
      });
  }

  onSubmit(): void {
    if ( this.messageForm.invalid ) {
      return;
    }
    console.log('valid');
    //this.user = new User(this.messageForm.value);
    this.signupService.addsignup(this.messageForm.controls.email.value, this.messageForm.controls.password.value)
    .subscribe( data => {
      this.router.navigate([''])
    } );
  }

  ngOnInit() {
  }

}
