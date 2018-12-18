package com.example.demo.controller;

import com.example.demo.model.Price;
import com.example.demo.repository.PriceRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ShopRepository;
import com.example.demo.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PriceController {

    @Autowired
    private PriceRepository priceRepository;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VolunteerRepository volunteerRepository;

    @GetMapping(value = "/shops/{shop_id}/prices")
    public List<Price> getAllPricesByShopId(
            @PathVariable (value = "shop_id") Long shop_id){
        return priceRepository.findAllByShopId(shop_id);
    }

//    @GetMapping(value = "/volunteers/{volunteer_id}/prices")
//    public List<Price> getAllPricesByVolunteerId(
//            @PathVariable (value = "volunteer_id") Long volunteer_id){
//        return priceRepository.findAllByVolunteerId(volunteer_id);
//    }

//    @GetMapping(value = "/products/{product_id}/prices")
//    public List<Price> getAllPricesByProductId(
//            @PathVariable (value = "product_id") Long product_id){
//        return priceRepository.findAllByProductId(product_id);
//    }
}
