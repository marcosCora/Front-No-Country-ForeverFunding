import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; 
import { PostService } from '../../Services/post/post.service';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postSelected: string | ArrayBuffer = '';
  file!: File;
  token: any;

  postForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    data: ['', Validators.required],
    image: ['', Validators.required],
    user: ['']
  });

  constructor(
    public fb: FormBuilder,
    public postService: PostService,
    private snackBar: MatSnackBar,
    private localService: UserAuthenticationService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    // No es necesario inicializar aquí si se inicializa en la declaración.
  }

  guardarInformacion(): void {
    // Verificar si el formulario está inicializado y si los controles name y data no son null
    if (this.postForm && this.postForm.get('name') !== null && this.postForm.get('data') !== null) {
      console.log("Datos a guardar:", this.postForm.value);
      console.log("Imagen seleccionada:", this.file);
      const name = this.postForm.get('name')?.value;
      const data = this.postForm.get('data')?.value; 
      const file = this.file;

      this.token = this.localService.getItem();

      this.postService.savePost(name, data, file, this.token).then(
        (res) => {
          console.log("Respuesta del servidor:", res);
          window.location.reload();
          this.mostrarMensaje('Datos guardados con éxito');
        },
        (error) => {
          console.error("Error al guardar el post:", error);
          this.mostrarMensaje('Error al guardar los datos');
        }
      );
    } else {
      console.error("Los campos name y data son nulos");
      this.mostrarMensaje('Error: Campos name y data son nulos');
    }
  }
  
  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Asignar el archivo seleccionado a this.file
      this.file = file;
  
      // Mostrar la imagen seleccionada en el formulario
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result !== null) {
          this.postSelected = reader.result as string;
        }
      };
    }
  }
  

  // Función para mostrar mensajes utilizando MatSnackBar
  mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000, // Duración del mensaje en milisegundos
      horizontalPosition: 'center', // Posición horizontal del mensaje
      verticalPosition: 'top' // Posición vertical del mensaje
    });
  }

  verMisPosts(): void {
    this.router.navigate(['/post/post-creator']);
  }
}
