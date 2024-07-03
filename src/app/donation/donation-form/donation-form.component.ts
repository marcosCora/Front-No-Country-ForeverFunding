import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Post } from 'src/app/Interfaces/Post';
import { PostService } from 'src/app/Services/post/post.service';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css']
})
export class DonationFormComponent implements OnInit{
  listPost: Post[] = [];
  email: any;
  token: any;
  userID: any;
  currentPage: number = 0; // Página actual
  pageSize: number = 3;  //numero de tarjetas que quiero visualizar


  constructor(private router: Router, private postService: PostService, private localService: UserAuthenticationService, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.initializeUserData();
  }

  initializeUserData(): void {
    this.email = this.localService.getEmail();
    this.token = this.localService.getItem();

    this.userService.searchByEmail(this.email, this.token).subscribe(data => {
      this.userID = data[0].id;
      this.getDonationsAll();
    });
  }


  getDonationsAll(): void {
    /*this.postService.getPostsByUserId(this.userID, this.token).subscribe(data => {
      this.listPost = data;
    });*/
  }

}
