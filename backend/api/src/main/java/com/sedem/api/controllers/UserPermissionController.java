package com.sedem.api.controllers;

import com.sedem.api.models.UserPermission;
import com.sedem.api.services.UserPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-permissions")
public class UserPermissionController {

    @Autowired
    private UserPermissionService userPermissionService;

    @PostMapping
    public UserPermission create(@RequestBody UserPermission permission) {
        return userPermissionService.create(permission);
    }

    @GetMapping
    public List<UserPermission> findAll() {
        return userPermissionService.findAll();
    }

    @GetMapping("/{id}")
    public UserPermission findById(@PathVariable Long id) {
        return userPermissionService.findById(id)
                .orElseThrow(() -> new RuntimeException("Permissão não encontrada"));
    }

    @PutMapping("/{id}")
    public UserPermission update(@PathVariable Long id, @RequestBody UserPermission permission) {
        return userPermissionService.update(id, permission);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userPermissionService.delete(id);
    }
}
