package com.example.demo.repository;

import com.example.demo.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {
    List<Shop> findByIdBetweenAndWithdrawnInOrderByIdAsc(long start, long l, ArrayList<Boolean> withdrawn);
    List<Shop> findByIdBetweenAndWithdrawnInOrderByIdDesc(long start, long l, ArrayList<Boolean> withdrawn);
    List<Shop> findByIdBetweenAndWithdrawnInOrderByNameAsc(long start, long l, ArrayList<Boolean> withdrawn);
    List<Shop> findByIdBetweenAndWithdrawnInOrderByNameDesc(long start, long l, ArrayList<Boolean> withdrawn);
    Shop findById(long id);

    @Query(value = "select s.id from shop s", nativeQuery = true)
    List<Long> getShopIDs();

    List<Shop>  findByWithdrawn(Boolean w1);
}
