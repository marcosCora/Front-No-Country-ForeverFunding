import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/Interfaces/Post';
import { PostService } from 'src/app/Services/post/post.service';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-administration-post',
  templateUrl: './administration-post.component.html',
  styleUrls: ['./administration-post.component.css']
})
export class AdministrationPostComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;  //Se bindea con los componentes del html
  displayedColumns: string[] = ['id', 'name', 'data'];
  dataSource = new MatTableDataSource<Post>();
  listPost: Post[] = [];
  email: any;
  token: any;
  userID: any;

  constructor(private snackBar: MatSnackBar, private router: Router, private postService: PostService, private localService: UserAuthenticationService, private userService: UserServiceService) { }

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
      this.dataSource = new MatTableDataSource<Post>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

}
