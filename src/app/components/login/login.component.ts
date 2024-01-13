import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  login!:FormGroup;

  constructor(private _fb:FormBuilder, private _auth:AuthService){}

  ngOnInit(): void {
    this.login = this._fb.group({
      email:['', [Validators.required, Validators.pattern('^(?!.*([a-zA-Z])\\1\\1)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password:['', [Validators.required, Validators.minLength(8)]]
    })
  }

  userlogin(login:any)
  {
    this._auth.userlogin(login.value)
  }

}



