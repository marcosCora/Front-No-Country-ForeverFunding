import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private API_URL = 'https://backend-production-fb2bf.up.railway.app/post';

  constructor(private httpClient: HttpClient, public storage: AngularFireStorage) { }

  // Lista Posts
  public getAllPosts(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/all-post`)
      .pipe(
        catchError(error => {
          console.error('Ocurrió un error al obtener los posts:', error);
          return of('No se pudieron obtener los posts en este momento.');
        })
  )}

  //Lista de Posts por Id de CREADOR
  public getPosts(id: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
    });
    console.log(id);
    return this.httpClient.get(`${this.API_URL}/user/${id}`, { headers })
      .pipe(
        catchError(error => throwError('Error al obtener los posts'))
      );
  }
  // Guardar el Post
  public savePost(name: any, data: any, file: any, token: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const horaActual = new Date();
      const fechaHora = horaActual.toLocaleString();
      const fecha = fechaHora.split(",")[0];
      const horas = fechaHora.split(", ")[1];

      const filePath = '/post_' + fecha + '/' + name + '_' + horas;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);

      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res => {
            const downloadURL = res;
            resolve(downloadURL);

            const post = {
              name: name,
              data: data,
              image: downloadURL,
            }
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
            });

            this.httpClient.post(`${this.API_URL}/save-post`, post, { headers }).subscribe(
              (response: any) => {
                resolve(response);
              },
              error => {
                reject(error);
              }
            );
          });
        })
      ).subscribe();
    });
  }

  // Actualizar el Post
  public updatePost(id: number, post: any, file: File, cambio: boolean, token: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!post) {
        reject('El post es inválido');
        return;
      }

      if (cambio) {

        const filePath = '/post_' + post.id + '/' + post.name;
        const ref = this.storage.ref(filePath);
        const task = ref.put(file);

        task.snapshotChanges().pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe((res: any) => {
              const downloadURL = res;

              const updatedPost = {
                id,
                ...post,
                image: downloadURL
              };

              const headers = new HttpHeaders({
                'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
              });

              console.log(id);
              console.log('Token:', token); // Mostrar el token
              console.log('Cuerpo de la información:', updatedPost);
              // Actualizar el post con la nueva imagen
              this.httpClient.put(`${this.API_URL}/updatePost`, updatedPost, { headers }).subscribe(
                (response: any) => {
                  resolve(response);
                },
                error => {
                  reject(error);
                }
              );
            });
          })
        ).subscribe();
      } else {
        // Si no hay cambio en la imagen, solo actualizar los datos del post
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
        });

        this.httpClient.put(`${this.API_URL}/updatePost`, post, { headers }).subscribe(
          (response: any) => {
            resolve(response);
          },
          error => {
            reject(error);
          }
        );
      }
    });
  }

  // Obtener un Post por su ID
  public getPostById(postId: number, token: any): Observable<any> {
    if (!postId) {
      return throwError('El ID del post es inválido');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
    });
    return this.httpClient.get(`${this.API_URL}/post_id/${postId}`, { headers })
      .pipe(
        catchError(error => throwError('Error al obtener el post por ID'))
      );
  }

  // Eliminar el Post
  public deletePost(postId: number, token: any): Observable<any> {
    if (!postId) {
      return throwError('El ID del post es inválido');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
    });
    return this.httpClient.delete(`${this.API_URL}/deletePost/${postId}`, { headers })
      .pipe(
        catchError(error => throwError('Error al eliminar el post'))
      );
  }
}