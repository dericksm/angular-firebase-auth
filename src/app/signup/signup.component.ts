import { auth } from 'firebase';
import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn } from '../router.animations'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }

})
export class SignupComponent implements OnInit {

  state: string = ''
  error: any
  password
  email

  constructor(private af: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(formData) {
    if (formData.valid) {
      this.af.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
        .then(
          (success) => {
            this.router.navigate(['/members'])
          }).catch(
            (err) => {
              console.log(err);
              this.error = err;
            })
    }
  }

}
