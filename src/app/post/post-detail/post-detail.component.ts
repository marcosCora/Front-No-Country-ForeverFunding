import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/Interfaces/Post';

const postData: Post[] = [
  {
    "id": 1,
    "id_creator": 1,
    "data": "El valle de las mascotas, el refugio de 100 gatos y 46 perros en Guayaquil",
    "image": "https://imagenes.expreso.ec/files/image_348_220/uploads/2020/02/18/5e4c49bf7e0ef.jpeg",
    "nombre": "Fundación Patitas Felices"
  },
  {
    "id": 2,
    "id_creator": 2,
    "data": "Rescatan animales, les dan cobijo y buscan una familia que los adopte: cómo es el trabajo de los refugios",
    "image": "https://www.infobae.com/new-resizer/k-d-DNWvIxupqUo3qdQvLLbok_Q=/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/04/25161858/Refugio-Aprani-2.jpg",
    "nombre": "Refugio Amor Animal"
  },
  {
    "id": 3,
    "id_creator": 3,
    "data": "Recuperan y donan comida para animales de refugio - El Sol de México | Noticias, Deportes, Gossip, Columnas",
    "image": "https://www.elsoldemexico.com.mx/metropoli/qshq9c-rrefugio-de-animales.jpg/ALTERNATES/LANDSCAPE_400/Rrefugio%20de%20animales.jpg",
    "nombre": "Hogar de Esperanza Peluda"
  },
  {
    "id": 4,
    "id_creator": 4,
    "data": "La activista de la liberación animal que tiene en su casa un santuario de mascotas",
    "image": "https://www.clarin.com/2023/05/23/RHWiRdST3_360x240__1.jpg",
    "nombre": "Rescate Animal Sin Fronteras"
  },
  {
    "id": 5,
    "id_creator": 5,
    "data": "Medellín no solo salva sus mascotas en riesgo sino que también apoya otras ciudades",
    "image": "https://estaticos.elcolombiano.com/binrepository/896x565/88c0/780d565/none/11101/SQEX/documentation-fotos-1-10887861-f8daae6eb9fa26d106120fc370587ab5_39765896_20220405203640.jpg",
    "nombre": "Fundación Huellas Solidarias"
  },
  {
    "id": 6,
    "id_creator": 6,
    "data": "Bienestar Animal presenta catálogo con 140 perros y 65 gatos en adopción – Alcaldía de Guayaquil",
    "image": "https://www.guayaquil.gob.ec/wp-content/uploads/2024/01/bienestar-animal-presenta-catalogo-perros-gatos-adopcion5.jpg",
    "nombre": "Refugio Amanecer Peludo"
  },
  {
    "id": 7,
    "id_creator": 7,
    "data": "Una segunda oportunidad para los animales maltratados | El Mundo - Expansión",
    "image": "https://uecluster.blob.core.windows.net/images/planetainteligente/1554985808_shutterstock-527302681.jpg",
    "nombre": "Asociación Protectora de Animales Alas de Amor"
  },
  {
    "id": 8,
    "id_creator": 8,
    "data": "..................",
    "image": "https://images.google.com/ cámara",
    "nombre": "Refugio Esperanza Canina"
  },
  {
    "id": 9,
    "id_creator": 9,
    "data": "..............",
    "image": "https://images.google.com/ televisor",
    "nombre": "Fundación Vida Animal"
  },
  {
    "id": 10,
    "id_creator": 10,
    "data": ".........................",
    "image": "https://images.google.com/ bicicleta",
    "nombre": "Refugio Manos Amigas"
  }
];


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit{

  postID : any;
  postSeleccionado!: Post;
  listPost: any;

  constructor(private router: Router, private aRouter: ActivatedRoute){

  }

  ngOnInit(): void {
    this.listPost = postData;
    this.postID = parseInt(this.aRouter.snapshot.paramMap.get('id') || '');
    this.searchPostByID(this.postID);
  }

  searchPostByID(postID: number): void {
    this.postSeleccionado = this.listPost.find((post: any) => post.id === postID);
    console.log(this.postSeleccionado);
  }

  
}
