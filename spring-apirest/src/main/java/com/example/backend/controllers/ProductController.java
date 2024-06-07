package com.example.backend.controllers;

import com.example.backend.entities.Product;
import com.example.backend.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("*")
@RequestMapping("/api/products")
@RestController

public class ProductController {

    @Autowired
    private ProductService productService;


    @GetMapping
    public List<Product>productList() {
        return productService.findAllProduct();
    }

    @GetMapping("/page/{page}")
    public Page<Product> productPage(@PathVariable Integer page) {
        Pageable pageable = PageRequest.of(page, 9 );
        return productService.findAll(pageable);
    }

    @PostMapping
    public ResponseEntity<?>saveProduct(@Valid @RequestBody Product product, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.saveProduct(product));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?>findProduct(@PathVariable Long id) {
        Optional<Product>optionalProduct = productService.findProductById(id);
        if (optionalProduct.isPresent()) {
            return ResponseEntity.ok(optionalProduct.orElseThrow());
        }

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?>updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Optional<Product>optionalProduct = productService.updateProduct(id, product);
        if (optionalProduct.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(optionalProduct.orElseThrow());
        }

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }

    public ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
