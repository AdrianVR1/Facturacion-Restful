package com.example.backend.services;

import com.example.backend.entities.Product;
import com.example.backend.respositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Transactional(readOnly = true)
    @Override
    public List<Product> findAllProduct() {
        return (List<Product>) productRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Product> findProductById(Long id) {
        return productRepository.findById(id);
    }

    @Transactional
    @Override
    public Optional<Product> updateProduct(Long id, Product product) {
        Optional<Product>optionalProduct = findProductById(id);
        if (optionalProduct.isPresent()) {
            Product productDB = optionalProduct.orElseThrow();
            productDB.setName(product.getName());
            productDB.setDescription(product.getDescription());
            productDB.setPrice(product.getPrice());
            return Optional.of(productRepository.save(productDB));
        }
        return optionalProduct;
    }

    @Override
    @Transactional
    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
