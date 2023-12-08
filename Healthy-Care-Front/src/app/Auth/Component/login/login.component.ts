import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  ILoginRequest,
  LoginRequest } from '../../Interfaces/auth';
import { AuthService } from '../../Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  value: any;
  nationalNum: string = '';
  password: string = '';
  isError: boolean = false;
  loading = false;
  submitted = false;

  loginForm: FormGroup = new FormGroup({
    nationalNum: new FormControl('', [
      Validators.required,

    ]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

     
      if (this.loginForm.invalid) {
          return;
      }

      this.authService.login(this.loginForm.value).subscribe(
              data => {

                 console.log(data);
                 this.router.navigateByUrl('admin/Profile');
              },
              error => {
                  console.log(error);
              });
  }
}
