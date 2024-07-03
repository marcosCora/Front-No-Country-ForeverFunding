import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Injectable({
  providedIn: 'root',
})

export class authDonorGuard {
  rol = '';

  constructor(public router: Router, public aRoute: ActivatedRoute, private userService: UserServiceService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    const token = localStorage.getItem('Authorization');
    const email = localStorage.getItem('email')!;


    if(token === null){
      //console.log("Ruta protegida");
      this.router.navigate(['/'])
      return false;
    }else {
      // Obtiene el rol del usuario
      this.userService.searchByEmail(email,token).subscribe(data =>{
        console.log(data[0].role);
        this.rol = data[0].role;
        if(this.rol !== 'DONOR'){
          this.router.navigate(['/login'])
        }
      })
    }
    return true;
  }
}