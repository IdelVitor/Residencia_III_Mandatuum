package com.sedem.api.repositories;

import com.sedem.api.models.Contato;
import com.sedem.api.models.UserAccessLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAccessLogRepository extends JpaRepository<UserAccessLog, Long> {
    Optional<UserAccessLog> findById(Long id);

    List<UserAccessLog> findAll();

    void deleteById(Long id);
}
