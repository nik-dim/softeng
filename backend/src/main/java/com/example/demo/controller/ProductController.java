package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    ProductRepository ProductRepository;


//    @GetMapping("/products")
//    public List<Product> index(){
//        List<Product>  l =  ProductRepository.findAll();
//        return l;
//    }

    @GetMapping(value = "/products")
    public List<Product> index(
            @RequestParam(name = "start", required = false, defaultValue = "0") long start,
            @RequestParam(name = "count", required = false, defaultValue = "20") long count,
            @RequestParam(name = "status", required = false, defaultValue = "ACTIVE") String status,
            @RequestParam(name = "sort", required = false, defaultValue = "id|DESC") String sort){
        Boolean w1 = true;
        Boolean w2 = false;
        if (status.equals("ACTIVE")){
            w2 = true;
        }
        else if (status.equals("WITHDRAWN")){
            w1 = false;
        }

        // FIX THE CASE WHERE STATUS IS DIFFERENT THAN ...

        ArrayList<Boolean> withdrawn = new ArrayList<>();
        withdrawn.add(w1);
        withdrawn.add(w2);
        String sorted[] = sort.split("\\|");
        List<Product>  l = new ArrayList<>();
        if (sorted[0].equals("id") && sorted[1].equals("ASC")){
            l = ProductRepository.findByIdBetweenAndWithdrawnInOrderByIdAsc(start,  start+count, withdrawn);
        }
        if (sorted[0].equals("id") && sorted[1].equals("DESC")){
            l = ProductRepository.findByIdBetweenAndWithdrawnInOrderByIdDesc(start,  start+count, withdrawn);
        }
        if (sorted[0].equals("name") && sorted[1].equals("ASC")){
            l = ProductRepository.findByIdBetweenAndWithdrawnInOrderByNameAsc(start,  start+count, withdrawn);
        }
        if (sorted[0].equals("name") && sorted[1].equals("DESC")){
            l = ProductRepository.findByIdBetweenAndWithdrawnInOrderByNameDesc(start,  start+count, withdrawn);
        }
        return l;
    }

}