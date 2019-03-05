import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Shop } from '@models/shop';
import { User } from '@models/user';
import { ShopService } from '@services/shop.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  shops: Shop[];
  users: User[];
  userSource;
  shopSource;


  userColumns = [
    'email',
    'role',
    'update',
    'delete',
  ];

  shopColumns = [
    'name',
    'brand',
    'address',
    'delete',
  ];

  @ViewChild('uSort') uSort: MatSort;
  @ViewChild('sSort') sSort: MatSort;
  @ViewChild('uPage') uPaginator: MatPaginator;
  @ViewChild('sPage') sPaginator: MatPaginator;

  constructor(
    private userService: UserService,
    private shopService: ShopService,
  ) { }

  ngOnInit() {
    this.initUsers();
    this.initShops();
  }

  private initUsers() {
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users.map(user => user as User);
      this.userSource = new MatTableDataSource<User>(this.users);
      this.userSource.sort = this.uSort;
      this.userSource.paginator = this.uPaginator;
    });
  }

  private initShops() {
    this.shopService.getShops()
    .subscribe(shops => {
      this.shops = shops.map(shop => new Shop(shop));
      this.shopSource = new MatTableDataSource<Shop>(this.shops);
      this.shopSource.sort = this.sSort;
      this.shopSource.paginator = this.sPaginator;
    });
  }

  private deleteShop(id) {
    this.shopService.deleteShop(id)
    .subscribe(a => this.initShops());
  }

  private updateUser(id) {
    this.userService.updateToAdmin(id)
    .subscribe(a => this.initUsers());
  }

  private deleteUser(id) {
    this.userService.deleteUser(id)
    .subscribe(a => this.initUsers());
  }

}
