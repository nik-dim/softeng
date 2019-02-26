package com.example.demo.helpers;

import com.example.demo.model.Product;
import com.example.demo.model.Shop;
import com.example.demo.model.Volunteer;

import java.io.Serializable;

public class CompositeKey implements Serializable {
//    private Long product_id;
//    private Long shop_id;
//    private Long volunteer_id;
    private Product product;
    private Shop shop;
    private Volunteer volunteer;
}