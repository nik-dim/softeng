package com.example.demo.controller;


import com.example.demo.model.Shop;
import com.example.demo.repository.ShopRepository;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class ShopController {

    @Autowired
    ShopRepository shopRepository;


    public class Out{
        private long start;
        private long count;
        private long total;
        private List<Shop> shops;

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

        public List<Shop> getShops() {
            return shops;
        }

        public void setShops(List<Shop> shops) {
            this.shops = shops;
        }

        public Out(long start, long count, long total, List<Shop> shops) {
            this.start = start;
            this.count = count;
            this.total = total;
            this.shops = shops;
        }
    }

//    @GetMapping("/shops")
//    List<Shop> index(){
//        return shopRepository.findAll();
//    }
//

    @GetMapping(value = "/shops")
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
        List<Shop>  l = new ArrayList<>();
        if (sorted[0].equals("id") && sorted[1].equals("ASC")){
            l = shopRepository.findByIdBetweenAndWithdrawnInOrderByIdAsc(start,  start+count, withdrawn);
        }
        if (sorted[0].equals("id") && sorted[1].equals("DESC")){
            l = shopRepository.findByIdBetweenAndWithdrawnInOrderByIdDesc(start,  start+count, withdrawn);
        }
        if (sorted[0].equals("name") && sorted[1].equals("ASC")){
            l = shopRepository.findByIdBetweenAndWithdrawnInOrderByNameAsc(start,  start+count, withdrawn);
        }
        if (sorted[0].equals("name") && sorted[1].equals("DESC")){
            l = shopRepository.findByIdBetweenAndWithdrawnInOrderByNameDesc(start,  start+count, withdrawn);
        }

        long total = (long)shopRepository.findByWithdrawn(w1).size();
        if (w1 != w2){
            total += (long)shopRepository.findByWithdrawn(w2).size();
        }

        Out out = new Out(start, count, total, l);
        return out;
    }



    @PostMapping("/shops")
    public Shop create(@RequestBody Shop body){
        //
        body.setWithdrawn(Boolean.FALSE);
        return shopRepository.save(body);
    }

    @GetMapping("/shops/{id}")
    public Shop show(@PathVariable long id){
        return shopRepository.findById(id);
    }



    @PutMapping("/shops/{id}")
    public Shop update(@PathVariable long id, @RequestBody Shop body){
        Shop product = shopRepository.findById(id);
        body.setId(product.getId());
        return shopRepository.save(body);
    }

    @PatchMapping("/shops/{id}")
    public Shop patch(@PathVariable long id, @RequestBody Map<Object, Object> body){

        Shop shop = shopRepository.findById(id);
        body.forEach((k, v) -> {
            try {
                Field field = ReflectionUtils.findField(Shop.class, (String) k);
                field.setAccessible(true);
                ReflectionUtils.setField(field, shop, v);
            }
            catch (Exception ex){
                System.out.println("wrong field name");
            }
        });
        return shopRepository.save(shop);
    }

    @DeleteMapping("/shops/{id}")
    public Shop delete(@PathVariable long id){
        Shop shop = shopRepository.findById(id);
        shop.setWithdrawn(true);
        return shopRepository.save(shop);
    }

}
