import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '@services/product.service';
import { Product } from '@models/product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  form: FormGroup;
  categories = [
    'Accessories',
    'Boiler Fuel',
    'Car Essentials',
    'Car Fuel',
    'Cleaning',
    'Home Usage',
  ]
  tags: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
      tags: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid)
      return;
    this.tags = this.form.value.tags;
    let atags = this.tags.split(",").map(a => a.trim());
    this.form.value.tags = atags;
    let value = this.form.value;
    this.productService.addProduct(new Product(value))
    .subscribe(a => this.router.navigate(['/products']));
  }

}
