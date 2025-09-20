package com.sedem.api.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "acoes")
public class Acao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private String titulo;
    private String descricao;
    private String tipo;

    private LocalDateTime data;
    private String cidade;
    private String bairro;
    private Double latitude;
    private Double longitude;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();

    // Relacionamento opcional com contato
    @ManyToOne
    @JoinColumn(name = "contato_id")
    private Contato contato;
}
