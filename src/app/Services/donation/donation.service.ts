import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private API_URL = 'https://backend-production-fb2bf.up.railway.app/donation';

  constructor(private httpClient: HttpClient) { }

    // Lista de todas las donaciones
    public getDonationsAll(token : any): Observable<any> {
      //Encabezado necesario por tema de seguridad. Se agrega el Token como valor de la Autorization 'Authorization' 'Bearer'.
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
      });     
      return this.httpClient.get(`${this.API_URL}/all-donations`,{headers})
        .pipe(
          catchError(error => throwError('Error al obtener las donaciones'))
        );
    }

    // Guardar los datos de una donacion
    public saveDonations(id: any, donation: any, token : any): Observable<any> {
      //Encabezado necesario por tema de seguridad. Se agrega el Token como valor de la Autorization 'Authorization' 'Bearer'.
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
      });
      console.log(id);
      
      return this.httpClient.post(`${this.API_URL}/save-donation`, donation ,{headers})
        .pipe(
          catchError(error => throwError('Error al guardar la donacion'))
        );
    }
    
}
