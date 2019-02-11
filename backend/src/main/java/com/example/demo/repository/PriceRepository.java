package com.example.demo.repository;

import com.example.demo.helpers.NameOnly;
import com.example.demo.model.Price;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PriceRepository extends JpaRepository<Price, Long> {

    List<Price> findAllByShopId(Long shop_id);

    List<Price> findAllByVolunteerId(Long volunteer_id);

    List<Price> findAllByProductId(Long product_id);


    @Query(value =
            "SELECT DISTINCT price.value as value, price.timestamp as date, " +
                    "product.id as productId, product.name as productName, " +
                    "s.id as shopId, s.name as shopName, s.address as shopAddress,  " +
                    "floor(distanceOf(s.lng, s.lat, :geoLng, :geoLat)/1000) as shopDist " +
                    "FROM shop as s, tag, shop_tag, price, product\n" +
                    "INNER JOIN product_tag pt on product.id = pt.product_id\n" +
                    "INNER JOIN tag t1 on pt.tag_id = t1.id\n" +
                    "INNER JOIN shop_tag st on t1.id = st.tag_id\n" +
                    "INNER JOIN tag t2 on st.tag_id = t2.id\n" +
                    "WHERE distanceOf(s.lng, s.lat, :geoLng, :geoLat) < :geoDist * 1000 \n" +
                    "AND price.shop_id = s.id\n" +
                    "AND product.id = price.product_id\n" +
                    "AND s.id in :shops\n" +
                    "AND price.timestamp BETWEEN :dateFrom AND :dateTo \n" +
                    "AND product.id in :products\n" +
                    "AND (t1.value in :tags OR t2.value in :tags)\n" +
                    "ORDER BY :sort",
            nativeQuery = true)
    List<NameOnly> findByNativeQuery(@Param("geoDist") int geoDist,
                                     @Param("geoLng") double geoLng,
                                     @Param("geoLat") double geoLat,
                                     @Param("dateFrom") String dateFrom,
                                     @Param("dateTo") String dateTo,
                                     @Param("shops") List<Long> shops,
                                     @Param("products") List<Long> products,
                                     @Param("tags") List<String> tags,
                                     @Param("sort") String sort);




//
//
    @Query(value = "SELECT  DISTINCT price.*" +
            "FROM shop as s, tag, shop_tag, price, product\n" +
            "INNER JOIN product_tag pt on product.id = pt.product_id\n" +
            "INNER JOIN tag t1 on pt.tag_id = t1.id\n" +
            "INNER JOIN shop_tag st on t1.id = st.tag_id\n" +
            "INNER JOIN tag t2 on st.tag_id = t2.id\n" +
            "WHERE distanceOf(s.lng, s.lat, :geoLng, :geoLat) < :geoDist * 1000 \n" +
            "AND price.shop_id = s.id\n" +
            "AND product.id = price.product_id\n" +
            "AND s.id in :shops\n" +
            "AND price.timestamp BETWEEN :dateFrom AND :dateTo \n" +
            "AND product.id in :products\n" +
            "AND (t1.value in :tags OR t2.value in :tags)\n" +
            "ORDER BY :sort",
            nativeQuery = true)
    List<Price> getAll(@Param("geoDist") int geoDist,
                          @Param("geoLng")  double geoLng,
                          @Param("geoLat") double geoLat,
                          @Param("dateFrom") String dateFrom,
                          @Param("dateTo") String dateTo,
                          @Param("shops") List<Long> shops,
                          @Param("products") List<Long> products,
                          @Param("tags") List<String> tags,
                          @Param("sort") String sort);
//
//
//
//
//    @Query(value = "SELECT  DISTINCT price.*" +
////            "price.value, product.id, product.name, s.id, s.name, t1.value,\n" +
////            "       s.address, price.timestamp, distanceOf(s.lng, s.lat, 0.0, 0.0) as dist\n" +
//            "FROM shop as s, tag, shop_tag, price, product\n" +
//            "INNER JOIN product_tag pt on product.id = pt.product_id\n" +
//            "INNER JOIN tag t1 on pt.tag_id = t1.id\n" +
//            "INNER JOIN shop_tag st on t1.id = st.tag_id\n" +
//            "INNER JOIN tag t2 on st.tag_id = t2.id\n" +
//            "WHERE distanceOf(s.lng, s.lat, :geoLng, :geoLat) < :geoDist * 1000 \n" +
//            "AND price.shop_id = s.id\n" +
//            "AND product.id = price.product_id\n" +
//            "AND s.id in :shops\n" +
//            "AND price.timestamp BETWEEN :dateFrom AND :dateTo \n" +
//            "AND product.id in :products\n" +
//            "AND (t1.value in :tags OR t2.value in :tags)\n" +
//            "ORDER BY :sort",
//    nativeQuery = true)
//    List<Price> getAll(@Param("geoDist") int geoDist,
//                       @Param("geoLng")  double geoLng,
//                       @Param("geoLat") double geoLat,
//                       @Param("dateFrom") String dateFrom,
//                       @Param("dateTo") String dateTo,
//                       @Param("shops") List<Long> shops,
//                       @Param("products") List<Long> products,
//                       @Param("tags") List<String> tags,
//                       @Param("sort") String sort);
//
}
