package com.example.backend.services;

import com.example.backend.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product>findAllProduct();
    Page<Product> findAll(Pageable pageable);
    Product saveProduct(Product product);
    Optional<Product>findProductById(Long id);
    Optional<Product>updateProduct(Long id, Product product);
    void delete (Long id);

}
