package com.sedem.api.repositories;

import com.sedem.api.models.Acao;
import com.sedem.api.models.Contato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContatoRepository extends JpaRepository<Contato, Long> {
    Optional<Contato> findById(Long id);

    List<Contato> findAll();

    void deleteById(Long id);
}
