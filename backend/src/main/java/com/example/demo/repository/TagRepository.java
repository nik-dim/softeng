package com.example.demo.repository;

import com.example.demo.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query(value = "select DISTINCT tag.value from tag ", nativeQuery = true)
    List<String> getTags();

    @Query(value = "select DISTINCT tag.value from tag, product_tag, product " +
            "WHERE product.id = product_tag.product_id " +
            "AND tag.id = product_tag.tag_id " +
            "AND product.id = :id  ", nativeQuery = true)
    List<String> findTagsByProductId(@Param("id") long id);


    @Query(value = "select DISTINCT tag.value from tag, shop_tag, shop " +
            "WHERE shop.id = shop_tag.shop_id " +
            "AND tag.id = shop_tag.tag_id " +
            "AND shop.id = :id  ", nativeQuery = true)
    List<String> findTagsByShopId(@Param("id") long id);
}
