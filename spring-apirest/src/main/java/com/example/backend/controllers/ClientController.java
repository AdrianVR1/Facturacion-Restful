package com.example.backend.controllers;

import com.example.backend.entities.City;
import com.example.backend.entities.Client;
import com.example.backend.services.ClientService;
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
@RestController
@RequestMapping("/api")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping
    public List<Client>clientList() {
        return clientService.findAll();
    }

    @GetMapping("/filter/{key}")
    @ResponseStatus(HttpStatus.OK)
    public List<Client>filterClient(@PathVariable String key)  {
        return clientService.findClientByName(key);
    }

    @GetMapping("/city")
    public List<City>cityList() {
        return clientService.findAllCity();
    }

    @GetMapping("/page/{page}")
    public Page<Client>clientPage(@PathVariable Integer page) {
        Pageable pageable = PageRequest.of(page, 9 );
        return clientService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?>view(@PathVariable Long id) {
        Optional<Client> optionalClient = clientService.findById(id);
        if (optionalClient.isPresent()) {
            return ResponseEntity.ok(optionalClient.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?>saveClient(@Valid @RequestBody Client client, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.save(client));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?>updateClient(@Valid @RequestBody Client client, BindingResult result, @PathVariable Long id) {
        if (result.hasErrors()) {
            return validation(result);
        }
        Optional<Client>optionalClient = clientService.update(id, client);
        if (optionalClient.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(optionalClient.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        clientService.delete(id);
    }

    public ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
