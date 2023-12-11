import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ILoginRequest, LoginRequest } from '../../Interfaces/auth';
import { AuthService } from '../../Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  value: any;
  nationalNum: string = '';
  password: string = '';
  isError: boolean = false;
  loading = false;
  submitted = false;

  loginForm: FormGroup = new FormGroup({
    nationalNum: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
         if (data.success) {
        //   this.messageService.add({
        //     severity: 'success',
        //     summary: 'Success',
        //     detail: data.message,
        //   });
          this.router.navigateByUrl('admin/Profile');
         }
        //else {
        //   // this.messageService.add({
        //   //   severity: 'error',
        //   //   summary: 'Error',
        //   //   detail: data.message,
        //   // });
        // }
        console.log(data);
      },
      (error) => {
        console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Error occure",
          });
      }
    );
  }
}
