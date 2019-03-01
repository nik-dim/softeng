import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@services/product.service';
import { Product } from '@models/product';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  messageForm: FormGroup;
  product: Product;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      withdrawn: [ ]
    });
  }
  
  onSubmit(): void {
    if ( this.messageForm.invalid ) {
      return;
    }
    this.product = new Product(this.messageForm.value);
    this.productService.postProduct(this.product)
    .subscribe( data => {
      this.router.navigate(['products'])
    } );
  }
  
  
  
  
  ngOnInit() {
    
  }

  
}
