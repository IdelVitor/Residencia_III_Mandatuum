package com.sedem.api.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "user_access_logs")
public class UserAccessLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "pagina_acessada")
    private String paginaAcessada;

    @Column(name = "tipo_acesso")
    private String tipoAcesso;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();
}
