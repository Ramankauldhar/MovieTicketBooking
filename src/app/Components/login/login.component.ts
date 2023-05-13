import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private auth:AuthService){
    this.loginForm = this.formBuilder.group({
      'email':['', Validators.required],
      'pswd':['', Validators.required],
    })
  }
  
  ngOnInit(): void { }
  
  login(){
    const data = this.loginForm.value;
    this.auth.login(data).subscribe((res)=>{
  
    }, error=>{
      
    })
  }
  }