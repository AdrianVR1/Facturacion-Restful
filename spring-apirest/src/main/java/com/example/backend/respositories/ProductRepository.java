package com.example.backend.respositories;

import com.example.backend.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product,Long> {

     Page<Product> findAll(Pageable pageable);


     @Query("SELECT p FROM Product p WHERE p.name LIKE %?1%")
     List<Product>findProductByName(String term);



}


