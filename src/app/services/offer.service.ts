import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService
{
  days:any;
  hours:any;
  minutes:any;
  seconds:any;
  isOfferValid:boolean = false;

  constructor() { }

  activateOffer()
  {
    this.isOfferValid=true;
    const value = setInterval(()=>
    {
      var futuredate = new Date("Augest 26,2023 15:57:07").getTime();
      var today = new Date().getTime();
      var balancetime = futuredate-today;
      this.days = Math.floor(balancetime/(1000*60*60*24));
      this.hours = Math.floor(balancetime%(1000*60*60*24)/(1000*60*60));
      this.minutes = Math.floor(balancetime%(1000*60*60)/(1000*60));
      this.seconds = Math.floor((balancetime%(1000*60))/(1000));
      if(balancetime < 0)
      {
        clearInterval(value);
        this.days="offer expired";
        this.isOfferValid = false;
      }
    },1000);
  }

  deactivateOffer()
  {
    this.isOfferValid = false;
  }
}
