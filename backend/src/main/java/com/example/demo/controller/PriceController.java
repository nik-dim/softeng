package com.example.demo.controller;

import com.example.demo.helpers.NameOnly;
import com.example.demo.helpers.priceHelp;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

    @Autowired
    private TagRepository tagRepository;


    public class Out{
        private long start;
        private long count;
        private long total;
        private List<priceHelp> prices;

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

        public List<priceHelp> getPrices() {
            return prices;
        }

        public void setPrices(List<priceHelp> prices) {
            this.prices = prices;
        }

        public Out(long start, long count, long total, List<priceHelp> prices) {
            this.start = start;
            this.count = count;
            this.total = total;
            this.prices = prices;
        }
    }


    @GetMapping(value = "/shops/{shop_id}/prices")
    public List<Price> getAllPricesByShopId(
            @PathVariable (value = "shop_id") Long shop_id){
        return priceRepository.findAllByShopId(shop_id);
    }

    @GetMapping(value = "/volunteers/{volunteer_id}/prices")
    public List<Price> getAllPricesByVolunteerId(
            @PathVariable (value = "volunteer_id") Long volunteer_id){
        return priceRepository.findAllByVolunteerId(volunteer_id);
    }

    @GetMapping(value = "/products/{product_id}/prices")
    public List<Price> getAllPricesByProductId(
            @PathVariable (value = "product_id") Long product_id){
        return priceRepository.findAllByProductId(product_id);
    }





    @GetMapping("/pricesFULL")
    public List<Price> indexFull(
            @RequestParam(name = "start", required = false, defaultValue = "0") long start,
            @RequestParam(name = "count", required = false, defaultValue = "20") long count,
            @RequestParam(name = "geoDist", required = false, defaultValue = "-1") int geoDist,
            @RequestParam(name = "geoLng", required = false, defaultValue = "0.0") double geoLng,
            @RequestParam(name = "geoLat", required = false, defaultValue = "-1") double geoLat,
            @RequestParam(name = "dateFrom", required = false, defaultValue = "null") String dateFrom,
            @RequestParam(name = "dateTo", required = false, defaultValue = "null") String dateTo,
            @RequestParam(name = "shops", required = false) List<Long> shops,
            @RequestParam(name = "products", required = false) List<Long> products,
            @RequestParam(name = "tags", required = false) List<String> tags,
            @RequestParam(name = "sort", required = false, defaultValue = "price.value|ASC") String sortt) throws IOException, JSONException {

        // fix check conditions
        if (geoDist == -1) {geoDist = Integer.MAX_VALUE;}
        if (geoLng == -1) {geoLng = 0;}
        if (geoLat == -1) {geoLat = 0;}
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (dateFrom.equals("null")){ dateFrom = "2000-12-18 00:00:00";}
        if (dateTo.equals("null")){ dateTo = dateFormat.format(new Date());}
        if (shops == null){ shops = shopRepository.getShopIDs(); }
        if (products == null){ products = productRepository.getProductIDs(); }
        if (tags == null){ tags = tagRepository.getTags(); }
        String sorted[] = sortt.split("\\|");
        sortt = sorted[0] + " " + sorted[1];

        return  priceRepository.getAll(
                    geoDist,
                    geoLng,
                    geoLat,
                    dateFrom,
                    dateTo,
                    shops,
                    products,
                    tags,
                    sortt);
    }



    @GetMapping("/prices")
    public Out index(
            @RequestParam(name = "start", required = false, defaultValue = "0") long start,
            @RequestParam(name = "count", required = false, defaultValue = "20") long count,
            @RequestParam(name = "geoDist", required = false, defaultValue = "-1") int geoDist,
            @RequestParam(name = "geoLng", required = false, defaultValue = "-1.0") double geoLng,
            @RequestParam(name = "geoLat", required = false, defaultValue = "-1.0") double geoLat,
            @RequestParam(name = "dateFrom", required = false, defaultValue = "null") String dateFrom,
            @RequestParam(name = "dateTo", required = false, defaultValue = "null") String dateTo,
            @RequestParam(name = "shops", required = false) List<Long> shops,
            @RequestParam(name = "products", required = false) List<Long> products,
            @RequestParam(name = "tags", required = false) List<String> tags,
            @RequestParam(name = "sort", required = false, defaultValue = "price.value|ASC") String sortt) throws IOException, JSONException {

        // fix check conditions
        if (geoDist == -1) {geoDist = Integer.MAX_VALUE;}
        if (geoLng == -1.0) {geoLng = 0.0;}
        if (geoLat == -1.0) {geoLat = 0.0;}
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if (dateFrom.equals("null")){ dateFrom = "2000-12-18 00:00:00";}
        if (dateTo.equals("null")){ dateTo = dateFormat.format(new Date());}
        if (shops == null){ shops = shopRepository.getShopIDs(); }
        if (products == null){ products = productRepository.getProductIDs(); }
        if (tags == null){ tags = tagRepository.getTags(); }
        String sorted[] = sortt.split("\\|");
        sortt = sorted[0] + " " + sorted[1];
        List<NameOnly> no =  priceRepository.findByNativeQuery(
                geoDist,
                geoLng,
                geoLat,
                dateFrom,
                dateTo,
                shops,
                products,
                tags,
                sortt);

        List<priceHelp> phlist = new ArrayList<priceHelp>();
        for (NameOnly n: no) {
            phlist.add(new priceHelp(n));
        }
        for (priceHelp p:phlist) {
            p.setProductTags(tagRepository.findTagsByProductId(p.getProductId()));
            p.setShopTags(tagRepository.findTagsByShopId(p.getShopId()));
        }
        int total = phlist.size();
        return new Out(start, count, total, phlist);
    }
}
