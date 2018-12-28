package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    public class Out{
        private long start;
        private long count;
        private long total;
        private List<Product> products;

        public long getStart() {
            return start;
        }

        public void setStart(long start) {
            this.start = start;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }

        public long getTotal() {
            return total;
        }

        public void setTotal(long total) {
            this.total = total;
        }

        public List<Product> getProducts() {
            return products;
        }

        public void setProducts(List<Product> products) {
            this.products = products;
        }

        public Out(long start, long count, long total, List<Product> products) {
            this.start = start;
            this.count = count;
            this.total = total;
            this.products = products;
        }
    }

    @Autowired
    ProductRepository ProductRepository;


//    @GetMapping("/products")
//    public List<Product> index(){
//        List<Product>  l =  ProductRepository.findAll();
//        return l;
//    }

    @GetMapping(value = "/products")
//    public List<Product> index(
    public Out index(
            @RequestParam(name = "start", required = false, defaultValue = "0") long start,
            @RequestParam(name = "count", required = false, defaultValue = "20") long count,
            @RequestParam(name = "status", required = false, defaultValue = "ACTIVE") String status,
            @RequestParam(name = "sort", required = false, defaultValue = "id|DESC") String sort) throws IOException, JSONException {
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

        long total = (long)ProductRepository.findByWithdrawn(w1).size();
        if (w1 != w2){
            total += (long)ProductRepository.findByWithdrawn(w2).size();
        }
//        Long total = count;
//        JSONObject json = new JSONObject();
//        json.put("start", start);
//        json.put("count", count);
//        json.put("total", l.size());
//
//        JSONArray array = new JSONArray();
//        array.put(l);
//        json.put("shops", array);
//        JsonGenerator jgen = new JsonFactory().createGenerator(System.out);
//        jgen.writeStartObject();
//        jgen.writeNumberField("start", start);
//        jgen.writeNumberField("count", count);
//        jgen.writeNumberField("total", l.size()); //fix this
//        jgen.writeFieldName("shops");
//        for (Product product : l){
////            jgen.write(product);
//        }
//        jgen.writeEndObject();
        Out out = new Out(start, count, total, l);
        return out;
//        return json.toString();
//        return jgen.toString();
    }


    @GetMapping("/products/{id}")
    public Product show(@PathVariable long id){
        return ProductRepository.findById(id);
    }

    @PostMapping("/products")
    public Product create(@RequestBody Product body){
        body.setWithdrawn(Boolean.FALSE);
        return ProductRepository.save(body);
    }


}