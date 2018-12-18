package com.example.demo.repository;

import com.example.demo.model.Price;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PriceRepository extends JpaRepository<Price, Long> {

    List<Price> findAllByShopId(Long shop_id);

    List<Price> findAllByVolunteerId(Long volunteer_id);

    List<Price> findAllByProductId(Long product_id);
}
