import { Component, OnInit, HostBinding } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from '@angular/fire'
import { Router } from '@angular/router'
import {moveIn} from '../router.animations'
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any

  constructor(private af: AngularFireAuth, private router: Router) {
    this.af.user.subscribe(auth => {
      console.log(auth)
      if(auth) {
        this.router.navigateByUrl('/members')
      }
    })
  }

  ngOnInit(): void {
  }

  facebookLogin(){
    this.af.signInWithPopup(new auth.FacebookAuthProvider())
    .then(
      (success) => {
        this.router.navigate(['/members'])
      }
    )
    .catch(
      (err) => {
        this.error = err
      }
    )
  }

  googleLogin(){
    this.af.signInWithPopup(new auth.GoogleAuthProvider())
    .then(
      (success) => {
        this.router.navigate(['/members'])
      }
    )
    .catch(
      (err) => {
        this.error = err
      }
    )
  }

}
