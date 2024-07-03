import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  implements OnInit{

  formLogin !: FormGroup;

  constructor(private router : Router, private _toastr: ToastrService  ,private userService : UserServiceService, private localService : UserAuthenticationService){}

  ngOnInit(): void {
      this.formLogin = new FormGroup({
        'email' : new FormControl('', {
          validators : [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
          updateOn : 'blur'
        }),
        'password' : new FormControl('', {
          validators : [Validators.required, Validators.minLength(8)],
          updateOn : 'blur'
        })
      })
  }

  login(){
    if(!this.formLogin.invalid){
    
      let email = this.formLogin.controls['email'].value;
      let password = this.formLogin.controls['password'].value;
      
      this.userService.postLogin(email, password).pipe(
        map((data: any) => data.token)
      ).subscribe(token => {

        this.localService.setItem(token);

        this.userService.searchByEmail(email, token).subscribe(valor =>{
          console.log(valor[0]);

          this.localService.setEmail(valor[0].email);

          console.log(valor[0].role);

          if(valor[0].role === 'ADMIN'){
            this.router.navigate(['/admin'])
          }else{
            if(valor[0].role === 'CREATOR'){
              this.router.navigate(['/creator']);
            }else{
              if(valor[0].role === 'DONOR'){
                this.router.navigate(['/donor']);
              }
            }
          }
          this._toastr.success('Ingreso Exitoso','Furever Funding');
        })
      });
    }
  }

  //Ingreso por tecla enter 
  @HostListener('document:keydown.enter', ['$event'])
  onEnterKey(event: KeyboardEvent) {
    // Verifica si el evento ocurrió dentro de un input, si es así, no se ejecuta el login()
    if (!(event.target instanceof HTMLInputElement)) {
      this.login();
    }
  }
}
