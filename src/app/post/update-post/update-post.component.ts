import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../Services/post/post.service';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';




@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  putForm: FormGroup;
  postID: any;
  postData: any = {};
  file!: File;
  angularFireStorage: any;

  constructor(private fb: FormBuilder, 
              private postService: PostService, 
              private snackBar: MatSnackBar, 
              private aRouter: ActivatedRoute, 
              private router: Router,
              private localService: UserAuthenticationService
              ) {
    // Inicializar el formulario
    this.putForm = this.fb.group({
      name: ['', Validators.required],
      data: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener el ID del post desde la ruta
    this.postID = parseInt(this.aRouter.snapshot.paramMap.get('id') || '');
    // Obtener los datos del post por su ID
    this.getPostDataById(this.postID);
  }

  // Llenar el formulario con los datos del post
  fillFormWithPostData(): void {
    this.putForm.patchValue({
      //id: this.postID.id,
      name: this.postData.name,
      data: this.postData.data
    });
  }

  onFileSelected(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const file = event.target.files?.[0];
      if (file) {
        this.file = file; // Asignamos la imagen seleccionada a this.file
        const reader = new FileReader();
        reader.onload = () => {
          this.postData.image = reader.result; // Asignamos la nueva imagen a postData.image
        };
        reader.readAsDataURL(file);
      }
    }
  }
  

  // Actualizar la información del post
  actualizarInformacion(): void {
    if (this.putForm.valid) {
      const postData = this.putForm.value;
      const file = this.file;
      ;
  
      if (file) {
        // Si hay un archivo seleccionado, la subida de imagen y la actualización del post se manejarán en el servicio
        const token = this.localService.getItem();
       
        // Llamar al servicio para actualizar el post con la nueva imagen
        this.postService.updatePost(this.postID,postData, file, true, token)
          .then(response => {
            console.log('Los datos fueron actualizados correctamente:', response);
            this.mostrarMensaje('Actualización exitosa');
          })
          .catch(error => {
            console.error('Error al actualizar los datos:', error);
            this.mostrarMensaje('Error al actualizar');
          });
      } else {
        console.error('No se ha seleccionado una nueva imagen');
        this.mostrarMensaje('Error: Debes seleccionar una nueva imagen');
      }
    }
  }

  // Mostrar mensajes utilizando MatSnackBar
  mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  // Obtener los datos del post por su ID
  getPostDataById(postId: number): void {
    const token = this.localService.getItem(); // Obtener el token de autenticación
    this.postService.getPostById(postId, token).subscribe(
      (response: any) => {
        console.log('Datos del post recuperados:', response);
        this.postData = response; // Suponiendo que response contiene los datos del post
        console.log('Datos del post seleccionado:', this.postData);
        this.fillFormWithPostData(); // Llenar el formulario con los datos del post
      },
      error => {
        console.error('Error al obtener los datos del post:', error);
        this.mostrarMensaje('Error al obtener los datos del post');
      }
    );
  }

  // Navegar a la página de creación de posts
  verMisPosts(): void {
    this.router.navigate(['/post/post-creator']);
  }
}