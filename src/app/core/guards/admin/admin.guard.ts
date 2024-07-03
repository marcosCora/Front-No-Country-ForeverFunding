import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Injectable({
  providedIn: 'root',
})

export class authAdminGuard {
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
        //console.log(data);
        this.rol = data[0].role;
        //console.log(this.rol)
        if(this.rol !== 'ADMIN'){
          this.router.navigate(['/login'])
        }
      })
     /*
        Validar este codigo para que no lo regiriga al login si no haga un refresh desde donde se encuentre a la ruta que no debería ir
        
        else {
          // Comprobar si el usuario ya está en la página a la que intenta ir
          if (state.url !== '/' && state.url !== '/admin') {
            // Si intenta ir a una página diferente, hacer refresh
            window.location.reload();
          }
          return true;
        }
      */
    }
    return true;
  }
}