package com.example.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "invoices")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String description;

    private String observation;

    @Column(name = "create_at")
    @Temporal(TemporalType.DATE)
    private Date createAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_client")
    @JsonIgnoreProperties(value = {"invoices", "hibernateLazyInitializer","handler"}, allowSetters = true)
    private Client client;

    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_items")
    private List<ItemInvoice> items;

    @PrePersist
    public void prePersist() {
        createAt = new Date();
    }
        public Double getTotal() {
            Double total = 0.0;
            for(ItemInvoice item : items){
                total += item.getAmount();
            }
            return total;
        }
}
