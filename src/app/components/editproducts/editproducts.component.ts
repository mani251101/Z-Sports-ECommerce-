import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeactivateGuard } from 'src/app/guards/deactivate.guard';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.css']
})
export class EditproductsComponent implements OnInit, IDeactivateGuard {

  product! : FormGroup ;

  selectedFile!: File;
  updateproduct:any;

  constructor(private _fb: FormBuilder, private _ps:ProductsService, private router:Router, private activatedroute:ActivatedRoute){}

  ngOnInit(): void
  {
    this.product = this._fb.group({
      productName:['',Validators.required],
      productPrice:['',Validators.required],
      category:['',Validators.required],
      description:['',Validators.required],
      highlights:['',Validators.required],
      count:[''],
      stocksAvailability:['',Validators.required]
    });

    let productId = this.activatedroute.snapshot.params['productId'];
    if(productId)
    { 
      this._ps.getProductsById(productId).subscribe(result=>
        {
          this.updateproduct = result;
          this.product.patchValue({
            productName: result.productName,
            productPrice: result.productPrice,
            category: result.category,
            description: result.description,
            highlights: result.highlights,
            stocksAvailability: result.stocksAvailability
          });
        })
    }

  }

  submit()
  {
    const formData: FormData = new FormData();
    formData.append('productName', this.product.value.productName);
    formData.append('productPrice', this.product.value.productPrice);
    formData.append('category', this.product.value.category);
    formData.append('description', this.product.value.description);
    formData.append('highlights', this.product.value.highlights);
    formData.append('count', '1');
    formData.append('stocksAvailability', this.product.value.stocksAvailability);
    formData.append('imageUrl', this.product.value.imageUrl);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this._ps.updateProduct(this.updateproduct.productId,formData).subscribe(response=>
      {
        alert("Product Updated")
        this.router.navigate(['/product-list']);
      },
      error=>
      {
        console.error('Error while updating product:', error);
      })
  }

  onFileSelected(event: any)
  {
    this.selectedFile = event.target.files[0];
  }

  canExit()
  {
    if(confirm('Are You Sure you want to exit'))
    {
      return true;
    }
    return false;
  }
}
