import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserAuthenticationService {

  private key : string = 'Authorization'

  constructor() { } 

  setItem(token : string){
    localStorage.setItem(this.key, JSON.stringify(token));
  }

  getItem() : string | null{
    let token = localStorage.getItem(this.key);
    return token ? token : null
  }

  removeItem(){
    localStorage.removeItem(this.key);
    localStorage.removeItem('email');
  }

  setEmail(email: string){
    localStorage.setItem('email', JSON.stringify(email));
  }

  getEmail() : string | null{
    let email = localStorage.getItem('email');
    return email ? email : null
  }
  
}
