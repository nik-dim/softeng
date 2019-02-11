package com.example.demo.helpers;

import com.example.demo.helpers.NameOnly;

import java.util.Date;
import java.util.List;

public class priceHelp implements NameOnly {
    double value;
    Date Date;
    long ProductId;
    String ProductName;
    long ShopId;
    String ShopName;
    String ShopAddress;

    int ShopDist;

    List<String> productTags;
    List<String> shopTags;

    public priceHelp(NameOnly nameOnly) {
        this.value = nameOnly.getValue();
        this.Date = nameOnly.getDate();
        this.ProductId = nameOnly.getProductId();
        this.ProductName = nameOnly.getProductName();
        this.ShopId = nameOnly.getShopId();
        this.ShopName = nameOnly.getShopName();
        this.ShopAddress = nameOnly.getShopAddress();
        this.ShopDist = nameOnly.getShopDist();
//        this.productTags = n
    }

    @Override
    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    @Override
    public java.util.Date getDate() {
        return Date;
    }

    public void setDate(java.util.Date date) {
        Date = date;
    }

    @Override
    public long getProductId() {
        return ProductId;
    }

    public void setProductId(long productId) {
        ProductId = productId;
    }

    @Override
    public String getProductName() {
        return ProductName;
    }

    public void setProductName(String productName) {
        ProductName = productName;
    }

    @Override
    public long getShopId() {
        return ShopId;
    }

    public void setShopId(long shopId) {
        ShopId = shopId;
    }

    @Override
    public String getShopName() {
        return ShopName;
    }

    public void setShopName(String shopName) {
        ShopName = shopName;
    }

    @Override
    public String getShopAddress() {
        return ShopAddress;
    }

    public void setShopAddress(String shopAddress) {
        ShopAddress = shopAddress;
    }

    @Override
    public int getShopDist() {
        return ShopDist;
    }

    public void setShopDist(int shopDist) {
        ShopDist = shopDist;
    }

    public List<String> getProductTags() {
        return productTags;
    }

    public void setProductTags(List<String> productTags) {
        this.productTags = productTags;
    }

    public List<String> getShopTags() {
        return shopTags;
    }

    public void setShopTags(List<String> shopTags) {
        this.shopTags = shopTags;
    }

    public priceHelp(double value, java.util.Date date, long productId, String productName, long shopId, String shopName, String shopAddress, int shopDist) {
        this.value = value;
        Date = date;
        ProductId = productId;
        ProductName = productName;
        ShopId = shopId;
        ShopName = shopName;
        ShopAddress = shopAddress;
        ShopDist = shopDist;
    }
}
