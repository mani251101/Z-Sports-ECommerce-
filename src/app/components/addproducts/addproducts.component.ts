import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  product! : FormGroup ;

  selectedFile!: File;
  selectedFile1!: File;
  selectedFile2!: File;
  selectedFile3!: File;

  constructor(private _fb: FormBuilder, private _ps:ProductsService){}

  ngOnInit(): void
  {
    this.product = this._fb.group({
      productName:['',Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      productPrice:['',Validators.required],
      category:['',Validators.required],
      description:['',Validators.required],
      highlights:['',Validators.required],
      count:[''],
      stocksAvailability:['', Validators.required],
      image:[null, [Validators.required, Validators.pattern('^.*\.(img|jpe?g|webp|png)$')]],
      image1:[null, [Validators.required, Validators.pattern('^.*\.(img|jpe?g|webp|png)$')]],
      image2:[null, [Validators.required, Validators.pattern('^.*\.(img|jpe?g|webp|png)$')]],
      image3:[null, [Validators.required, Validators.pattern('^.*\.(img|jpe?g|webp|png)$')]],

    });
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

    if (this.selectedFile)
    {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    if (this.selectedFile1)
    {
      formData.append('image1', this.selectedFile1, this.selectedFile1.name);
    }

    if (this.selectedFile2)
    {
      formData.append('image2', this.selectedFile2, this.selectedFile2.name);
    }

    if (this.selectedFile3)
    {
      formData.append('image3', this.selectedFile3, this.selectedFile3.name);
    }

    this._ps.create(formData).subscribe((response:any)=>
      {
        alert("Product added successfully")
        this.product.reset();
      },
      error=>
      {
        console.error('Error adding product:', error);
      })
  }

  onFileSelected(event: any, fileNumber: number)
  {
    const selectedFiles = event.target.files[0];
    switch(fileNumber)
    {
      case 1:
        this.selectedFile = selectedFiles;
        break;
      case 2:
        this.selectedFile1 = selectedFiles;
        break;
      case 3:
        this.selectedFile2 = selectedFiles;
        break;
      case 4:
        this.selectedFile3 = selectedFiles;
        break;
      default:
        break;
    }
  }
}
