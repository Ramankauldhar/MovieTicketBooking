import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  submitted = false;

  message: String = "";
  isProcess: boolean = false;
  className = 'd-none'; //display none for alert in Html

  
  constructor(private formBuilder: FormBuilder, private auth:AuthService, private router:Router){
  }
  
  ngOnInit(){ this.loginForm = this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    pswd:['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
  })}
  
  login(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return
    }
          this.isProcess = true;
          const data = this.loginForm.value;
          this.auth.login(data).subscribe((res)=>{
            if(res.success){
              localStorage.setItem('token', res.token);
              this.auth.setUserEmail(data.email);
              this.router.navigate(['/dashboard'])
            }
            else{
              this.isProcess = false;
              this.message = res.message;
              this.className = 'alert alert-danger';
            }
          }, error=>{
            alert("Login Failed")
          })
  }
  }