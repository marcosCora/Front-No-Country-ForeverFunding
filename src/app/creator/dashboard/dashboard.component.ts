import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/User';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  email: any;
  token: any;
  
  user!: User;

  constructor(private userService: UserServiceService, private localService: UserAuthenticationService){

  }
  ngOnInit(): void {
    this.email = this.localService.getEmail();
    this.token = this.localService.getItem();

    this.userService.searchByEmail(this.email, this.token).subscribe(data=>{
      this.user = data[0];
      console.log(this.user);
    })
  }
}
