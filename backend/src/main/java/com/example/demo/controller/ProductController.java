package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    ProductRepository productRepository;


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
            l = productRepository.findByIdBetweenAndWithdrawnInOrderByIdAsc(start,  start+count, withdrawn);
        }
        if (sorted[0].equals("id") && sorted[1].equals("DESC")){
            l = productRepository.findByIdBetweenAndWithdrawnInOrderByIdDesc(start,  start+count, withdrawn);
        }
        if (sorted[0].equals("name") && sorted[1].equals("ASC")){
            l = productRepository.findByIdBetweenAndWithdrawnInOrderByNameAsc(start,  start+count, withdrawn);
        }
        if (sorted[0].equals("name") && sorted[1].equals("DESC")){
            l = productRepository.findByIdBetweenAndWithdrawnInOrderByNameDesc(start,  start+count, withdrawn);
        }

        long total = (long)productRepository.findByWithdrawn(w1).size();
        if (w1 != w2){
            total += (long)productRepository.findByWithdrawn(w2).size();
        }

        Out out = new Out(start, count, total, l);
        return out;
    }


    @PostMapping("/products")
    public Product create(@RequestBody Product body){
        //
        body.setWithdrawn(Boolean.FALSE);
        return productRepository.save(body);
    }

    @GetMapping("/products/{id}")
    public Product show(@PathVariable long id){
        return productRepository.findById(id);
    }



    @PutMapping("/products/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product body){
        Product product = productRepository.findById(id);
        body.setId(product.getId());
        return productRepository.save(body);
    }

    @PatchMapping("/products/{id}")
    public Product patch(@PathVariable Long id, @RequestBody Map<Object, Object> body){
        Product product = productRepository.findById(id);
        productRepository.save(product);
        body.forEach((k, v) -> {
            try {
                Field field = ReflectionUtils.findField(Product.class, (String) k);
                field.setAccessible(true);
                ReflectionUtils.setField(field, product, v);
            }
            catch (Exception ex){
                System.out.println("wrong field name");
            }
        });
        return productRepository.save(product);
    }

    @DeleteMapping("/products/{id}")
    public Product delete(@PathVariable long id){
        Product product = productRepository.findById(id);
        product.setWithdrawn(true);
        return productRepository.save(product);
    }

}