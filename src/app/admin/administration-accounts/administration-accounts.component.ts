import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-administration-accounts',
  templateUrl: './administration-accounts.component.html',
  styleUrls: ['./administration-accounts.component.css']
})
export class AdministrationAccountsComponent implements OnInit {
  public page : number = 1;
  token: any;

  usersCreators : any[] = [];
  usersDonors : any[] = [];

  constructor(private userService: UserServiceService, private localService: UserAuthenticationService, private toastr: ToastrService){}
  
  ngOnInit(): void {
    this.token = this.localService.getItem();
    this.cagarTablas(this.token);
  }

  delete(userID: any){
    console.log("usuario a eliminar:" +userID);
    this.userService.deleteUser(userID, this.token).subscribe(data=>{
      this.toastr.success("Usuario eliminado con exito!","Acción Administrativa");
      this.cagarTablas(this.token);
    }, error =>{
      this.toastr.error("Error al eliminar Usuario","Error!");
    })
  }

  cagarTablas(token: any): void{
    //Metodo para obtener lista y sacamos la cantidad de los usuarios Donadores
    this.userService.getUsersDonor(token).subscribe(data =>{
      this.usersDonors = data;
    }); 

    //Metodo para obtener lista y sacamos la cantidad de los usuarios Creadores
    this.userService.getUsersCreator(token).subscribe(data =>{
      //console.log(data);
      this.usersCreators = data;
    }) 
  }

}




