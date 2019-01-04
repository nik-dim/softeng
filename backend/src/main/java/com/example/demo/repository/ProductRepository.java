package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByIdBetweenAndWithdrawnInOrderByNameAsc(Long start,  Long end, Collection<Boolean> withdrawn);
    List<Product> findByIdBetweenAndWithdrawnInOrderByNameDesc(Long start,  Long end, Collection<Boolean> withdrawn);
    List<Product> findByIdBetweenAndWithdrawnInOrderByIdAsc(Long start,  Long end, Collection<Boolean> withdrawn);
    List<Product> findByIdBetweenAndWithdrawnInOrderByIdDesc(Long start,  Long end, Collection<Boolean> withdrawn);
    List<Product> findByWithdrawn(Boolean withdrawn);
//    Long countByWithdrawn(Collection<Boolean> withdrawn);
    Product findById(long id);

    @Query(value = "select p.id from product p", nativeQuery = true)
    List<Long> getProductIDs();


//    default Map<Long, Product> findByIdMap(Long id) {
//        return findById(id).().collect(Collectors.toMap(Product::getId, v -> v));
//    }
}
