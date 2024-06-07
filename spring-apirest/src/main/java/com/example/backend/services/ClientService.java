package com.example.backend.services;

import com.example.backend.entities.City;
import com.example.backend.entities.Client;
import com.example.backend.entities.Invoice;
import com.example.backend.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ClientService {
    List<Client>findAll();
    Page<Client> findAll(Pageable pageable);
    Client save(Client client);
    Optional<Client>findById(Long id);
    Optional<Client>update(Long id, Client client);
    void delete (Long id);
    List<Client>findClientByName(String key);

    /*City*/
    List<City>findAllCity();

    /*Invoice*/
    Optional<Invoice>findInvoiceById(Long id);
    Invoice saveInvoice(Invoice invoice);
    void deleteInvoiceById(Long id);

    /*Product*/
    List<Product>findProductByName(String term);
}
