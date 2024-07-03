import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit{
  
  email: any;
  token: any;
  role: any;
  opcion: any;
  photoUser !: string;

  constructor(private router: Router, private auth: UserAuthenticationService, private userService: UserServiceService){}

  ngOnInit(): void {
    this.optionAdmin().subscribe(() => {
      console.log(this.role);
      if (this.role === 'admin') {
        this.opcion = 'Administración de Cuentas'
      } else if (this.role === 'donor') {
        this.opcion = 'Administración de donaciones';
      } else if (this.role === 'creator') {
        this.opcion = 'Administración de post';
      }
    });
  }
  
  optionAdmin(): Observable<void> {
    this.email = this.auth.getEmail();
    this.token = this.auth.getItem();
    return new Observable<void>((observer) => {
      this.userService.searchByEmail(this.email, this.token).subscribe(data => {
        this.photoUser = data[0].photo;
        this.role = data[0].role.toLowerCase();
        observer.next();
        observer.complete();
      });
    });
  }

  redirectToUserInfo() {
    if (this.role === 'admin') {
      this.router.navigate(['/admin/userinfo']);
    } else if (this.role === 'donor') {
      this.router.navigate(['/donor/userinfo']);
    } else if (this.role === 'creator') {
      this.router.navigate(['/creator/userinfo']);
    }
  }

  redirectToAdministration(){
    if (this.role === 'admin') {
      this.opcion = 'Administración de Cuentas'
      this.router.navigate(['/admin/administration-accounts']);
    } else if (this.role === 'donor') {
      this.opcion = 'Administración de donaciones';
      this.router.navigate(['/donor/donations-administration']);
    } else if (this.role === 'creator') {
      this.opcion = 'Administración de post';
      this.router.navigate(['/creator/administration-post']);
    }
  }

  panel(){
    if (this.role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (this.role === 'donor') {
      this.router.navigate(['/donor/dashboard']);
    } else if (this.role === 'creator') {
      this.router.navigate(['/creator/dashboard']);
    }
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

  logOut(){
    this.auth.removeItem();
    this.router.navigate(['/']);
  }
}
