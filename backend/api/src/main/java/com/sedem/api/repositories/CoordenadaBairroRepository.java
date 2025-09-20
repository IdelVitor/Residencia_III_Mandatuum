package com.sedem.api.repositories;

import com.sedem.api.models.CoordenadaBairro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordenadaBairroRepository extends JpaRepository<CoordenadaBairro, Long> {
}
