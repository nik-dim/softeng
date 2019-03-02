import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  returnUrl: string;

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
      username: [null, Validators.required],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
      ])],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.form.invalid)
      return;
    let values = this.form.value;
    this.authenticationService.login(
      values.username,
      values.password,
    ).subscribe(user => {
      console.log(user);
      this.router.navigate([this.returnUrl]);
    });
  }

  getPassError() {
    return this.form.get('password').hasError('required') ?
      "Field is required (at least eight characters)" :
      "Password needs to be at least eight characters long";
  }


}
