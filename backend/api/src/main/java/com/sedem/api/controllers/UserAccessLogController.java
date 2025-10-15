package com.sedem.api.controllers;

import com.sedem.api.models.UserAccessLog;
import com.sedem.api.services.UserAccessLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-access-logs")
public class UserAccessLogController {

    @Autowired
    private UserAccessLogService userAccessLogService;

    @PostMapping
    public UserAccessLog create(@RequestBody UserAccessLog log) {
        return userAccessLogService.create(log);
    }

    @GetMapping
    public List<UserAccessLog> findAll() {
        return userAccessLogService.findAll();
    }

    @GetMapping("/{id}")
    public UserAccessLog findById(@PathVariable Long id) {
        return userAccessLogService.findById(id)
                .orElseThrow(() -> new RuntimeException("Log de acesso não encontrado"));
    }

    @PutMapping("/{id}")
    public UserAccessLog update(@PathVariable Long id, @RequestBody UserAccessLog log) {
        return userAccessLogService.update(id, log);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userAccessLogService.delete(id);
    }
}
