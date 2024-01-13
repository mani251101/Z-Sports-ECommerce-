import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { shippingtype } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  Address!: FormGroup;
  payment!: FormGroup;
  users:any = localStorage.getItem('user');
  loggedinUser = JSON.parse(this.users);

  showaddress:any;
  totalamount:number = 0
  value:any;
  myCarts:any;
  Total:number = 0
  shippingaddress:any;
  products:any;
  overallamount:number = 0;
  deliverycharges:number = 0;
  cancelOrders:any;

  //shipping details
  selectedShippingMethod!: string;
  estimatedDeliveryDate!: Date;


  shippingMethods = shippingtype.shippingMethods;

  userId = this.loggedinUser.userId;

  constructor(private formbuilder:FormBuilder, private auth:AuthService,
    private product:ProductsService, private router:Router){}

  ngOnInit()
  {
    this.Address = this.formbuilder.group({
      userId:[this.userId],
      address:['',Validators.required],
      state:['',Validators.required],
      city:['',Validators.required],
      landmark:['',Validators.required],
      zipcode:['',Validators.required],
    })

    this.payment = this.formbuilder.group({
      paymentId:[Math.floor(Math.random()*1000000)+1],
      userId:[this.userId],
      cardNumber:['',[Validators.required,Validators.minLength(16), Validators.maxLength(16)]],
      cvv:['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]],
      expireDate:['',[Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/(2[2-9]|[3-9][0-9])$'), this.expirationDateValidator]],
    })

    //getuser
    this.auth.getUserById(this.userId).subscribe(result=>
    {
      const user:any = result;
      this.products = user.myCarts;
    })

    this.getUserAddress(this.userId);
    this.getProductByUserId();
  }

  //adding new address
  SubmitAddress(data:any)
  {
    console.warn(data.value);
    this.auth.UserAddress(data.value).subscribe(result=>
    {
      alert("Address added successfully");
      this.Address.reset();
    },
    )
  }

  //get user address
  getUserAddress(id:any)
  {
    this.auth.getAddressByUserId(id).subscribe(result=>
    {
      this.showaddress = result;
    })
  }

  //summary
  getProductByUserId()
  {
    this.totalamount = 0;
    this.auth.getUserById(this.userId).subscribe(result =>
    {
      this.value = result;
      this.myCarts = this.value.myCarts;
      this.Total = this.myCarts.length;
      //For delivery charges
      this.myCarts.forEach((calculate:any) =>
      {
        this.totalamount += parseInt(calculate.productPrice);
        this.overallamount = this.totalamount;
      });
      if(this.overallamount == this.totalamount)
      {
        this.overallamount = this.overallamount + this.deliverycharges;
      }
    })
  }

  calculatedeliveryDay()
  {
    const today = new Date();
    let daysToAdd = 0;

    switch (this.selectedShippingMethod)
    {
      case 'Standard Shipping':
        daysToAdd = 5;
        this.deliverycharges = 0;
        break;
      case 'Express Shipping':
        this.deliverycharges = 75;
        daysToAdd = 3;
        break;
      case 'Next-Day Delivery':
        this.deliverycharges = 145;
        daysToAdd = 1;
        break;
      default:
        this.deliverycharges = 0;
        daysToAdd = 0;
        break;
    }

    this.estimatedDeliveryDate = new Date(today.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
    this.getProductByUserId();
  }

  //Address selection
  onSelectAddress(id:number)
  {
    this.auth.getAddressByAddressId(id).subscribe((result:any)=>
    {
      console.warn(result);
      this.shippingaddress = {
        userId:this.userId,
        address:result.address,
        state:result.state,
        city:result.city,
        landmark:result.landmark,
        zipcode:result.zipcode,
      };
    })
  }

  //Payment Selection
  onPaymentSubmit()
  {
    const booking = {
      shippingAddress:this.shippingaddress,
      shippingType:this.selectedShippingMethod,
      deliveryDate:this.estimatedDeliveryDate,
      totalAmount:this.overallamount,
      paidDate: new Date(),
      deliveryStatus:'Paid',
      paymentid:this.payment.value.paymentid,
      userId:this.payment.value.userId,
      cardNumber:this.payment.value.cardNumber,
      cvv:this.payment.value.cvv,
      expireDate:this.payment.value.expireDate,
      products:this.products
    }
    this.product.onPayment(booking).subscribe(result=>
    {
      alert("Paid Successfully");

      this.product.updateCart(this.userId);
      this.updateStockAvailability(this.products);
      this.router.navigate(['/feedback'])
    })
  }

  expirationDateValidator(control:any)
  {
    if (!control.value)
    {
      return null;
    }

    const regexPattern = /^(0[1-9]|1[0-2])\/(2[2-9]|[3-9][0-9])$/;
    if (!regexPattern.test(control.value)) {
      return { invalidFormat: true };
    }

    const [expMonth, expYear] = control.value.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return { expired: true };
    }

    return null;
  }

  updateStockAvailability(product:any)
  {
    product.forEach((check:any) =>
      {
        this.product.getProductsById(check.productId).subscribe(result=>
          {
            const stock = parseInt(result.stocksAvailability) - parseInt(check.count);

            const body = [{op:'replace',path:'/stocksAvailability', value:stock}]
            this.product.updateStocksAvailability(check.productId, body).subscribe(result=>
              {
              })
          })
      });
  }
}

