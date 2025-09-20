package com.sedem.api.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "registros_financeiros")
public class RegistroFinanceiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private LocalDateTime data;
    private String descricao;
    private String tipo;
    private String categoria;

    private BigDecimal valor;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();
}
