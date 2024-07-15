import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export interface pendingDeals {
  name: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-pending-deal',
  templateUrl: './pending-deal.component.html',
  styleUrls: ['./pending-deal.component.css']
})
export class PendingDealComponent implements OnInit {
  cards: pendingDeals[];
  displayedColumns: string[] = ['name', 'description', 'link'];

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.http.get(`${environment.endpoint}/pendingDeals`, { withCredentials: true }).subscribe(
      (response: pendingDeals[]) => {
        this.cards = response;
      }
    )
  }

}
