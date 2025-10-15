package com.sedem.api.services;

import com.sedem.api.models.UserAccessLog;
import com.sedem.api.repositories.UserAccessLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserAccessLogService {

    @Autowired
    private UserAccessLogRepository userAccessLogRepository;

    public UserAccessLog create(UserAccessLog log) {
        return userAccessLogRepository.save(log);
    }

    public List<UserAccessLog> findAll() {
        return userAccessLogRepository.findAll();
    }

    public Optional<UserAccessLog> findById(Long id) {
        return userAccessLogRepository.findById(id);
    }

    public UserAccessLog update(Long id, UserAccessLog logAtualizado) {
        return userAccessLogRepository.findById(id).map(log -> {
            log.setPaginaAcessada(logAtualizado.getPaginaAcessada());
            log.setTipoAcesso(logAtualizado.getTipoAcesso());
            log.setCriadoEm(logAtualizado.getCriadoEm());
            return userAccessLogRepository.save(log);
        }).orElseThrow(() -> new RuntimeException("Log de acesso não encontrado"));
    }

    public void delete(Long id) {
        userAccessLogRepository.deleteById(id);
    }
}
