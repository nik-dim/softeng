import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { SigninService } from '@services/signin.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  messageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SigninService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.messageForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
      });
  }

  onSubmit(): void {
    if ( this.messageForm.invalid ) {
      return;
    }
    console.log('valid');
    //this.signin = new Signin(this.messageForm.value);
    //this.signinService.addsignin(this.signup)
    //.subscribe( data => {
    //  this.router.navigate(['blogs'])
    //} );
  }

  ngOnInit() {
  }

}
