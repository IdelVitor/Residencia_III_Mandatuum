package com.sedem.api.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "user_permissions")
public class UserPermission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private String pagina;

    @Column(name = "has_access")
    private Boolean hasAccess = false;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();
}