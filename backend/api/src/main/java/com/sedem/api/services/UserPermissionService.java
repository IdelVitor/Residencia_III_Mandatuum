package com.sedem.api.services;

import com.sedem.api.models.UserPermission;
import com.sedem.api.repositories.UserPermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserPermissionService {

    @Autowired
    private UserPermissionRepository userPermissionRepository;

    public UserPermission create(UserPermission permission) {
        return userPermissionRepository.save(permission);
    }

    public List<UserPermission> findAll() {
        return userPermissionRepository.findAll();
    }

    public Optional<UserPermission> findById(Long id) {
        return userPermissionRepository.findById(id);
    }

    public UserPermission update(Long id, UserPermission permissionAtualizada) {
        return userPermissionRepository.findById(id).map(permission -> {
            permission.setPagina(permissionAtualizada.getPagina());
            permission.setHasAccess(permissionAtualizada.getHasAccess());
            return userPermissionRepository.save(permission);
        }).orElseThrow(() -> new RuntimeException("Permissão não encontrada"));
    }

    public void delete(Long id) {
        userPermissionRepository.deleteById(id);
    }
}
