package com.sedem.api.repositories;

import com.sedem.api.models.Acao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AcaoRepository extends JpaRepository<Acao, Long> {
    Optional<Acao> findById(Long id);

    List<Acao> findAll();

    void deleteById(Long id);
}
