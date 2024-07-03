import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Donation } from 'src/app/Interfaces/Donation';
import { DonationService } from 'src/app/Services/donation/donation.service';
import { PostService } from 'src/app/Services/post/post.service';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-list-donation',
  templateUrl: './list-donation.component.html',
  styleUrls: ['./list-donation.component.css']
})
export class ListDonationComponent {
  listDonations: Donation[] = [];
  email: any;
  token: any;
  userID: any;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar, private router: Router, private donationService: DonationService, private localService: UserAuthenticationService, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.initializeUserData();
  }

  initializeUserData(): void {
    this.email = this.localService.getEmail();
    this.token = this.localService.getItem();

    this.userService.searchByEmail(this.email, this.token).subscribe(data => {
      this.userID = data[0].id;
      this.getDonationsByUserID();
    });
  }


  getDonationsByUserID(): void {

  }

}
