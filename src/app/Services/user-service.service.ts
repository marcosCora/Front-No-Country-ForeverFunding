import { Injectable, booleanAttribute ,  } from '@angular/core';
import { User } from '../Interfaces/User';
import { Observable, catchError, delay, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  apiUrl : string = 'https://backend-production-fb2bf.up.railway.app/user';

  constructor(private http : HttpClient) { }


  getUsers() : Observable<User>{
    return this.http.get<User>(this.apiUrl);
  }

  //Metodos Post para el registro de nuevos usuarios

  /*DONADOR*/
  postNewDonor(u : User) : Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/registerDonor`, u);
  }

  /*CREADOR*/
  postNewCreator(u : User) : Observable<string>{
    console.log(u);
    return this.http.post<string>(`${this.apiUrl}/registerCreator`, u);
  }

  /*ADMIN*/
  postNewAdmin(u : User) : Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/registerAdmin`, u);
  }

  //POST INICIO DE SESION

  postLogin(email : string, password : string) : Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/login`, {email , password});
  }

  putUser(u : User) : Observable<string>{
    return this.http.put<string>(`${this.apiUrl}/${u.id}`, u);
  }

  deleteUser(uId : number, token : any) : Observable<string>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
    });
    return this.http.delete<string>(`${this.apiUrl}/${uId}`, {headers});
  }

  getUserById(uId : number) : Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${uId}`);
  }

  verificationEmail(email : string) : Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/searchByEmailsearchByEmail?email=${email}`)
  } 

  searchByEmail(email : any, token : any) : Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
    });
    return this.http.get<boolean>(`${this.apiUrl}/searchByEmail?searchTerm=${email.replace(/^"|"$/g, '')}`, {headers})
  } 

  getUsersDonor(token : any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
    });
    return this.http.get<string>(`${this.apiUrl}/getDonnors`, {headers})
  }

  getUsersCreator(token : any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
    });
    return this.http.get<string>(`${this.apiUrl}/getCreators`, {headers})
  }
  
  //METODO PARA ACTUALIZAR USUARIOS
  updateUser(userId: string, userData: any, token: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
    });
    return this.http.put<string>(`${this.apiUrl}/${userId}`, userData, { headers });
  }

}


 


