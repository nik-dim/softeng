import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { 
    if (['User', 'Admin'].indexOf(this.authenticationService.currentUser().role) !== -1)
      this.router.navigate(['/']);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      username: [null, Validators.required],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])],
    });

  }

  onSubmit() {
    if (this.form.invalid)
      return;
    let values = this.form.value;
    this.authenticationService.signup(values)
    .subscribe(answer => {
      this.authenticationService.login(
        values.username,
        values.password,
      ).subscribe(a => this.router.navigate(['/']));
    });
  }

  getPassError() {
    return this.form.get('password').hasError('required') ?
      "Field is required (at least eight characters)" :
      "Password needs to be at least eight characters long";
  }

  getEmailError() {
    return this.form.get('email').hasError('required') ?
      "Field is required" :
      "Not a valid email address";
  }

}
