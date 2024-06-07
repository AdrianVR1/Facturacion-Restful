package com.example.backend.controllers;

import com.example.backend.entities.Invoice;
import com.example.backend.entities.Product;
import com.example.backend.services.ClientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class InvoiceController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/invoices/{id}")
    public ResponseEntity<?> view(@PathVariable Long id) {
        Optional<Invoice>invoiceOptional = clientService.findInvoiceById(id);
        if (invoiceOptional.isPresent()) {
            return ResponseEntity.ok(invoiceOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/invoices/create")
    public ResponseEntity<?>create(@Valid  @RequestBody Invoice invoice, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.saveInvoice(invoice));
    }

    @DeleteMapping("/invoices/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        clientService.deleteInvoiceById(id);
    }

    @GetMapping("/invoices/filter/{term}")
    @ResponseStatus(HttpStatus.OK)
    public List<Product>filterProduct(@PathVariable String term)  {
        return clientService.findProductByName(term);
    }

    public ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }

}
