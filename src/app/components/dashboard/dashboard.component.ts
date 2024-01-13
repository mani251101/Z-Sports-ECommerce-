import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public offer:OfferService){}

  ngOnInit(): void
  {

  }

  activateOffer()
  {
    this.offer.activateOffer();
    alert("Offer activated");
  }

  deactivateOffer()
  {
    this.offer.deactivateOffer()
    alert("Offer Deactivated");
  }

}
