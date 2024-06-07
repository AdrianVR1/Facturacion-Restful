package com.example.backend.services;

import com.example.backend.entities.City;
import com.example.backend.entities.Client;
import com.example.backend.entities.Invoice;
import com.example.backend.entities.Product;
import com.example.backend.respositories.ClientRepository;
import com.example.backend.respositories.InvoiceRepository;
import com.example.backend.respositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Client> findAll() {
        return (List<Client>) clientRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Client> findAll(Pageable pageable) {
        return clientRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public Client save(Client client) {
        return clientRepository.save(client);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Client> findById(Long id) {
        return clientRepository.findById(id);
    }

    @Override
    @Transactional
    public Optional<Client> update(Long id, Client client) {
        Optional<Client>optionalClient = findById(id);
        if(optionalClient.isPresent()) {
            Client clientDB = optionalClient.orElseThrow();
            clientDB.setName(client.getName());
            clientDB.setLastname(client.getLastname());
            clientDB.setEmail(client.getEmail());
            clientDB.setCity(client.getCity());

            return Optional.of(clientRepository.save(clientDB));
        }
        return optionalClient;
    }

    @Override
    @Transactional
    public void delete(Long id) {
        clientRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Client> findClientByName(String key) {
        return clientRepository.findClientByName(key);
    }

    @Override
    @Transactional(readOnly = true)
    public List<City> findAllCity() {
        return clientRepository.findAllCity();
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Invoice> findInvoiceById(Long id) {
        return invoiceRepository.findById(id);
    }

    @Override
    @Transactional
    public Invoice saveInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    @Override
    @Transactional
    public void deleteInvoiceById(Long id) {
        invoiceRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Product> findProductByName(String term) {
        return productRepository.findProductByName(term );
    }

}
