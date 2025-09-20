package com.sedem.api.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "coordenadas_bairros")
public class CoordenadaBairro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private String cidade;
    private String bairro;
    private Double latitude;
    private Double longitude;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();
}
