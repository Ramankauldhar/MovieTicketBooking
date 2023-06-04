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
  message: String = "";
  isProcess: boolean = false;
  className = 'd-none'; //display none for alert in Html

  
  constructor(private formBuilder: FormBuilder, private auth:AuthService, private router:Router){
    this.loginForm = this.formBuilder.group({
      'email':new FormControl('', Validators.compose([Validators.required])),
      'pswd':new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)]) )
    })
  }
  
  ngOnInit(): void { }
  
  login(){
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