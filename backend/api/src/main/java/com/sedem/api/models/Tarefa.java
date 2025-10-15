package com.sedem.api.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "tarefas")
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private String titulo;
    private String descricao;
    private LocalDateTime datas;
    private String responsavel;

    @Enumerated(EnumType.STRING)
    private Prioridade prioridade;

    @Enumerated(EnumType.STRING)
    private StatusTarefa status = StatusTarefa.ABERTA;

    @ElementCollection
    private List<String> categorias;

    private String cidade;
    private String bairro;
    private Double latitude;
    private Double longitude;

    @ManyToOne
    @JoinColumn(name = "contato_id")
    private Contato contato;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();
}
