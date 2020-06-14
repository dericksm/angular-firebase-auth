import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from '../router.animations'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {

  state: string = '';
  error: any;
  email
  password

    constructor(public af: AngularFireAuth,private router: Router) {
      this.af.user.subscribe(auth => {
        console.log(auth)
        if(auth) {
          this.router.navigateByUrl('/members')
        }
      })
  }


  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  ngOnInit(): void {
  }

}
