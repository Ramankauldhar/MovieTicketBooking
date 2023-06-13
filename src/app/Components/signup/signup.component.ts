import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit  {
  registerForm!: FormGroup;
  submitted = false;
  message: String = "";
  isProcess: boolean = false;
  className = 'd-none'; //display none for alert in Html

  constructor(private formBuilder: FormBuilder, private auth:AuthService){
    
  }
  ngOnInit(){
    this.registerForm = this.formBuilder.group(
      {
        fullName:['', Validators.required],
        email:['', [Validators.required, Validators.email]],
        pswd:['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      }
    )
     }

  register(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return
    }
    this.isProcess = true;
    const data = this.registerForm.value;
    delete data['confirm']
    this.auth.register(data).subscribe(res=>{
      //if success, 200 code will be returned
      if(res.success){
        this.isProcess = false;
        this.message = "The user is registered successfully!";
        this.className = 'alert alert-success';
      }
      else{
        this.isProcess = false;
        this.message = res.message;
        this.className = 'alert alert-danger';
      }
      this.registerForm.reset();
    }, err =>{
      //server side error handling
        this.isProcess = false;
        this.message = "Server is down!";
        this.className = 'alert alert-danger';
    })
  }
}
