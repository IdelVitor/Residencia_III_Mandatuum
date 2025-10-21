package com.sedem.api.repositories;

import com.sedem.api.models.Contato;
import com.sedem.api.models.UserPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserPermissionRepository extends JpaRepository<UserPermission, Long> {
    Optional<UserPermission> findById(Long id);

    List<UserPermission> findAll();

    void deleteById(Long id);
}
