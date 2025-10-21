package com.sedem.api.repositories;

import com.sedem.api.models.Contato;
import com.sedem.api.models.CoordenadaBairro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoordenadaBairroRepository extends JpaRepository<CoordenadaBairro, Long> {
    Optional<CoordenadaBairro> findById(Long id);

    List<CoordenadaBairro> findAll();

    void deleteById(Long id);
}
