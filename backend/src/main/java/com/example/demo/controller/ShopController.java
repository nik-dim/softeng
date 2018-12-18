package com.example.demo.controller;


import com.example.demo.model.Shop;
import com.example.demo.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ShopController {

    @Autowired
    ShopRepository shopRepository;

    @GetMapping("/shops")
    List<Shop> index(){
        return shopRepository.findAll();
    }
}
