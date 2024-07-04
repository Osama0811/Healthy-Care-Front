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
  userId: string = '';


  onSubmit() {
     this.userId = this.route.snapshot.paramMap.get('PatientId') || '';

     this.route.paramMap.subscribe(params => {
       this.userId = params.get('PatientId') || '';
     });
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
         if (data.success) {

          if(data.resource.roleId==1){
          localStorage.setItem("Token",data.resource.token)
          localStorage.setItem("UserId",data.resource.userId)
          if(this.userId==''){
          this.router.navigateByUrl('admin/User');
          }else{
            this.router.navigateByUrl('UserHistory/'+this.userId);
          }
          }
          else{
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: "Your Are Not Admin",
            });
          }
         }
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: data.message,
          });
        }
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
