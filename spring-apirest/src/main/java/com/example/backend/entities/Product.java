package com.example.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 2, max = 80)
    private String name;

    @NotBlank
    private String description;

    @Positive
    private Double price;

    @Column(name = "create_at")
    @Temporal(TemporalType.DATE)
    private Date createAt;

    @Column(name = "update_dt")
    @Temporal(TemporalType.DATE)
    private Date updateDt;

    @PrePersist
    public void prePersist() {
        createAt = new Date();
    }

    @PreUpdate
    public void PreUpdate() {
        updateDt = new Date();
    }
}
