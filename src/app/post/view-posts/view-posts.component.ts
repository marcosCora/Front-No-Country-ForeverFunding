import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/Services/post/post.service'; 
import { Post } from 'src/app/Interfaces/Post';
import { UserInfoComponent } from 'src/app/shared/user-components/user-info/user-info.component';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {
  
  listPost: Post[] = [];

  constructor(
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {

    this.loadPosts();  // Llama al método para cargar los posts al inicializar el componente
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe(
      posts => {
        this.listPost = posts;
        console.log('Posts cargados:', this.listPost);
      },
      error => {
        console.error('Error al cargar los posts:', error);
      }
    );
  }

  // Método para enviar producto a detalle
  detail(postID: any): void {
    console.log("ID Producto: " + postID);
    this.router.navigate(['/post/detail', postID]);
  }
}