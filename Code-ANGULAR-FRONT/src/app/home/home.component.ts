import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { PendingDealComponent } from '../pending-deal/pending-deal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards = [];

  constructor(private http: HttpClient, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.http.get(`${environment.endpoint}/deals`, { withCredentials: true }).subscribe(
      (response: []) => {
        this.cards = response;
        console.log(document.cookie);
      }
    )
  }


  getImage(imageName: string): string {
    return `url(${environment.endpointImg}/validated/${imageName})`;
  }

  openPendingDeal() {
    this.dialog.open(PendingDealComponent, {
      height: '60vh',
      width: '80vw'
    })
  }
}
