package com.sedem.api.repositories;

import com.sedem.api.models.Contato;
import com.sedem.api.models.RegistroFinanceiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegistroFinanceiroRepository extends JpaRepository<RegistroFinanceiro, Long> {
    Optional<RegistroFinanceiro> findById(Long id);

    List<RegistroFinanceiro> findAll();

    void deleteById(Long id);
}
