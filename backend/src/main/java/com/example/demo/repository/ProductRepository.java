package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByIdBetweenAndWithdrawnInOrderByNameAsc(Long start,  Long end, Collection<Boolean> withdrawn);
    List<Product> findByIdBetweenAndWithdrawnInOrderByNameDesc(Long start,  Long end, Collection<Boolean> withdrawn);
    List<Product> findByIdBetweenAndWithdrawnInOrderByIdAsc(Long start,  Long end, Collection<Boolean> withdrawn);
    List<Product> findByIdBetweenAndWithdrawnInOrderByIdDesc(Long start,  Long end, Collection<Boolean> withdrawn);

}
