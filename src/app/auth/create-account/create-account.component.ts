import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/User';
import { CustomValidator } from '../custom-validator';

import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  formNewUser !: FormGroup;
  opcionRol: string = 'Donador';

  constructor(private router: Router, private _toastr: ToastrService, private userService: UserServiceService, private localService : UserAuthenticationService) { }

  ngOnInit() {
    this.formNewUser = new FormGroup({
      'firstName': new FormControl('', {
        validators: [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')],
        updateOn: 'blur'
      }),

      'lastName': new FormControl('', {
        validators: [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')],
        updateOn: 'blur'
      }),

      'email': new FormControl('', {
        validators: [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
        updateOn: 'blur'
      }),

      'rol' : new FormControl(''),

      'place': new FormControl(''),

      'password': new FormControl('', {
        validators: [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>?]).*$/)],
        updateOn: 'blur'
      }),

      'repeatPassword': new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      })

    }, {
      validators: CustomValidator.matchPasswords('password', 'repeatPassword')
    })
  }

  addNewUser() {

    let newUser : User = {
      id: 0,
      email: '',
      name: '',
      lastname: '',
      password: '',
      photo: '',
      rrs_fb: '',
      rrs_ig: '',
      place: '',
      role : {
        id: 0,
        roleName : ''
      }
    };
    
    this.mostrarControlesInvalidos(this.formNewUser)

    if (!this.formNewUser.invalid) {
      console.log('entra');
      
      newUser.name = this.formNewUser.controls['firstName'].value;
      newUser.lastname = this.formNewUser.controls['lastName'].value;
      newUser.email = this.formNewUser.controls['email'].value;
      newUser.place = this.formNewUser.controls['place'].value;
      newUser.password = this.formNewUser.controls['password'].value;
      newUser.photo = 'https://cdn-icons-png.flaticon.com/512/666/666201.png';

      console.log(newUser);

      console.log(this.opcionRol);

       if (this.opcionRol == 'Donador') {
        this.userService.postNewDonor(newUser).subscribe((response : any) => {
          this.localService.setItem(response.token)
          this._toastr.success('Cuenta Registrada exitosamente','Registro Exitoso!');
          this.router.navigate(['/home']);
        },
          (error) => {
            this._toastr.error('Error al registrarse','Error!')
            console.error(error);
          })
      }else if(this.opcionRol == 'Creador'){
        this.userService.postNewCreator(newUser).subscribe((response)=>{
          console.log(response)
          this.localService.setItem(response)
          this._toastr.success('Cuenta Registrada exitosamente','Registro Exitoso!');
          this.router.navigate(['/home']);
        },
          (error) => {
            this._toastr.error('Error al registrarse','Error!')
            console.error(error);
        })
      } 
    }
  }

   mostrarControlesInvalidos(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);
      if (control && control.invalid) {
        console.log(`El control ${controlName} es inválido.`);
      }
    });
  }

  opcionDonor() {
      this.opcionRol = 'Donador';
  } 

  opcionCreator(){
    this.opcionRol = 'Creador'
  }

}




