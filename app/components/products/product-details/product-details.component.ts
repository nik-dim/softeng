import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@services/product.service';
import { Product } from '@models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.productService.getProduct(id)
    .subscribe(product => {
      console.log(product);
      this.product = new Product(JSON.parse(JSON.stringify(product)));
    });
  }

  /*
  getShopsAndPrices(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.productService.getShopsAndPrices(id)
    .subscribe(data => {
      console.log(data);

    })
  }
  */

}
