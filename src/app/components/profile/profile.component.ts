import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userdetails:any;

  users:any = localStorage.getItem('user');
  loggedinUser = JSON.parse(this.users);

  signup!:FormGroup;
  updateprofile:any;
  userId = this.loggedinUser.userId;
  constructor(public authservice:AuthService,
    private formbuilder:FormBuilder){}

  ngOnInit(): void {
    this.profile(this.userId);
    this.signup = this.formbuilder.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      mobile:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    })
        this.signup.patchValue({
          firstName: this.loggedinUser.firstName,
          lastName: this.loggedinUser.lastName,
          mobile: this.loggedinUser.mobile,
          email: this.loggedinUser.email,
          password: this.loggedinUser.password,
        });

        this.setTimer();
  }

  profile(id:any)
  {
    if(this.authservice.isloggedIn()===true)
    {
      this.authservice.getUserById(id).subscribe(result=>
        {
          this.userdetails = result;
        })
    }
  }

  submit()
  {
    const profile = {
          firstName: this.signup.value.firstName,
          lastName: this.signup.value.lastName,
          mobile: this.signup.value.mobile,
          email: this.signup.value.email,
          password: this.signup.value.password
    }
    this.authservice.updateProfile(this.loggedinUser.userId, profile).subscribe({
      next(result) {
        alert("Profile Updated")
      },
      error(err) {
        alert("Error while Update the profile")
      },
    })
  }

  setTimer()
  {
    setInterval(()=>
    {
      this.profile(this.loggedinUser.userId)
    },500)
  }

}
