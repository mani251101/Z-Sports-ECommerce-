import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signup!: FormGroup;

  constructor(private _fb:FormBuilder, private _auth:AuthService){}

  ngOnInit(): void {
    this.signup = this._fb.group({
      firstName:['', [Validators.required, Validators.minLength(2), Validators.pattern("^(?!.*([A-Za-z])\\1\\1)[A-Za-z]+$")]],
      lastName:['', [Validators.required]],
      mobile:['', [Validators.required, Validators.pattern('^[6-9][0-9]+'), Validators.minLength(10), Validators.maxLength(10)]],
      email:['', [Validators.required, Validators.pattern('^(?!.*([a-zA-Z])\\1\\1)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password:['', [Validators.required, Validators.minLength(8)]]
    })
  }

  userregister(usersignup:any)
  {
    this._auth.signup(usersignup.value)
    this.signup.reset()
  }
}
