package com.example.backend.respositories;

import com.example.backend.entities.City;
import com.example.backend.entities.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends CrudRepository<Client, Long> {
    Page<Client>findAll(Pageable pageable);

    @Query("FROM City")
    List<City>findAllCity();

    @Query("SELECT c FROM Client c WHERE c.name LIKE %?1%")
    List<Client>findClientByName(String key);

}
