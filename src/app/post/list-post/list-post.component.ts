import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../Services/post/post.service';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

interface Post {
  id: number;
  id_creator: number;
  name: string;
  data: string;
  image: string;
}

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  listPost: Post[] = [];
  email: any;
  token: any;
  userID: any;
  currentPage: number = 0; // Página actual
  pageSize: number = 3;  //numero de tarjetas que quiero visualizar


  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar, private router: Router, private postService: PostService, private localService: UserAuthenticationService,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.initializeUserData();
  }

  initializeUserData(): void {
    this.email = this.localService.getEmail();
    this.token = this.localService.getItem();

    this.userService.searchByEmail(this.email, this.token).subscribe(data => {
      this.userID = data[0].id;
      this.getPostsByUserID();
    });
  }


  getPostsByUserID(): void {
    this.postService.getPosts(this.userID, this.token).subscribe(data => {
      this.listPost = data;
    });
  }

  deletePost(post: Post): void {
    this.postService.deletePost(post.id, this.token).subscribe(
      () => {
        console.log("Post eliminado exitosamente");
        this.listPost = this.listPost.filter(p => p !== post);
        this.openSnackBar('Post eliminado exitosamente', 'Cerrar');
      },
      error => {
        console.error("Error al eliminar el post:", error);
        this.openSnackBar('Error al eliminar el post', 'Cerrar');
      }
    );
  }

  update(postID: any) {
    this.router.navigate(['/post/update-post', postID])
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  get totalPages(): number {
    return Math.ceil(this.listPost.length / this.pageSize);
  }

  getCurrentPagePosts(): any[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.listPost.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  goBack(): void {
    this.router.navigate(['/creator/dashboard']);
  }
}
