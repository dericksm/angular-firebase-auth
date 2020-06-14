import { auth } from 'firebase';
import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],  
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class MembersComponent implements OnInit {

  name: any
  state: string = ''

  constructor(public af: AngularFireAuth,private router: Router) {

    this.af.user.subscribe(auth => {
      if(auth) {
        console.log(auth)
        this.name = auth
      }
    })

  }

  logout() {
     this.af.signOut()
     console.log('logged out')
     this.router.navigateByUrl('/login')
  }

  ngOnInit(): void {
  }

}
