import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PriceService } from '@services/price.service';
import { ProductService } from '@services/product.service';
import { Price } from '@models/price';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '@models/product';
import { formatDate } from '@angular/common';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-price-add',
  templateUrl: './price-add.component.html',
  styleUrls: ['./price-add.component.scss']
})
export class PriceAddComponent implements OnInit {

  form: FormGroup;
  price: Price;
  products: Product[];
  shopId;

  constructor(
    private productService: ProductService,
    private priceService: PriceService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
  ) { 
    this.shopId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.productService.getProducts()
    .subscribe(products => {
      this.products = products.map(product => product as Product);
      this.form = this.formBuilder.group({
        productId: [null, Validators.required],
        dateFrom: [null, Validators.required],
        price: [null, Validators.required],
      });
    })
  }

  onSubmit() {
    if (this.form.invalid)
      return;
    let values = this.form.value;
    values.shopId = this.shopId;
    values.userId = this.auth.currentUser()._id;
    values.dateFrom = formatDate(values.dateFrom, 'yyyy-MM-dd', 'en')
    values.dateTo = formatDate(Date.now(), 'yyyy-MM-dd', 'en');
    this.priceService.addPrice(values)
    .subscribe(a => this.router.navigate(["/"]));
  }

}
