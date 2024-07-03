import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/User';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  email: any;
  token: any;

  user!: User;
  userDonor: any;
  userCreator: any;

  constructor(private userService: UserServiceService, private localService: UserAuthenticationService, private router: Router){

  }
  ngOnInit(): void {
    this.email = this.localService.getEmail();
    this.token = this.localService.getItem();

    this.userService.searchByEmail(this.email, this.token).subscribe(data=>{
      this.user = data[0];
      console.log(this.user);
    })

    //Metodo para obtener lista y sacamos la cantidad de los usuarios Donadores
    this.userService.getUsersDonor(this.token).subscribe(data =>{
      console.log(data.length);
      this.userDonor=data.length;
    }); 

    //Metodo para obtener lista y sacamos la cantidad de los usuarios Creadores
    this.userService.getUsersCreator(this.token).subscribe(data =>{
      console.log(data.length);
      this.userCreator=data.length;
    }) 
  }

}
