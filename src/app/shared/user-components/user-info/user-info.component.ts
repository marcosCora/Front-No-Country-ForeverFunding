import { Component, OnInit } from '@angular/core';
import { User } from '../../../Interfaces/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../../Services/user-service.service';
import { UserAuthenticationService } from '../../../Services/user-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  email: any;
  token: any;

  user!: User;
  role: any;
  userForm: any;

  isCardExpanded = false;

  constructor(private router: Router, 
    private userService: UserServiceService, 
    private localService: UserAuthenticationService,
    private fb: FormBuilder) {}

  ngOnInit(): void {


    this.cargarDatos();

    this.userForm = this.fb.group({
      name: [''],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      place: [''],
      rrs_ig: ['']
    });
  }

  cargarDatos(){
    this.email = this.localService.getEmail();
    this.token = this.localService.getItem();

    this.userService.searchByEmail(this.email, this.token).subscribe(data=>{
      this.user = data[0];
      this.role = data[0].role.toLowerCase();
      console.log(this.user);
    })
  }

  back(){
    if (this.role === 'admin') {
      this.router.navigate(['/admin/posts']);
    } else if (this.role === 'donor') {
      this.router.navigate(['/donor/posts']);
    } else if (this.role === 'creator') {
      this.router.navigate(['/creator/posts']);
    }
  }


  isLoading = false;

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
  
      const userId = this.user.id.toString();
      const userData = this.userForm.value;
      const token = this.token;
  
      this.userService.updateUser(userId, userData, token).subscribe(
        response => {
          console.log('Usuario Actualizado-----------', response);
          this.disableEditing();
          this.isLoading = false; 
          this.cargarDatos();
        },
        error => {
          console.error('Error al actualizar el perfil del usuario---------', error);
          this.isLoading = false;
          this.reloadPage();
        }
      );
    } this.cargarDatos();
  }

  isEditing = false;
  
  enableEditing() {
    this.isEditing = true;
  }

  disableEditing() {
    this.isEditing = false;
  }
  reloadPage(): void {
    window.location.reload();
  }

}

