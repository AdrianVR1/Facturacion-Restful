package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "debe tener entre 4 y 15 caracteres")
    @Size(min = 4, max = 15)
    private String name;

    @NotBlank
    @Column(name = "last_name")
    private String lastname;

    @NotBlank
    @Email
    private String email;

    @Temporal(TemporalType.DATE)
    private Date date;

    @Temporal(TemporalType.DATE)
    private Date dateDt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_city")
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    private City city;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "client", cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = {"client", "hibernateLazyInitializer","handler"}, allowSetters = true)
    private List<Invoice> invoices;

    public Client() {
        this.invoices = new ArrayList<>();
    }

    @PrePersist
    public void prePersist() {
        date = new Date();
    }
    @PreUpdate
    public void preUpdate() {
        dateDt = new Date();
    }
}
