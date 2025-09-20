package com.sedem.api.services;

import com.sedem.api.models.RegistroFinanceiro;
import com.sedem.api.repositories.RegistroFinanceiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegistroFinanceiroService {

    @Autowired
    private RegistroFinanceiroRepository registroFinanceiroRepository;

    public RegistroFinanceiro create(RegistroFinanceiro registro) {
        return registroFinanceiroRepository.save(registro);
    }

    public List<RegistroFinanceiro> findAll() {
        return registroFinanceiroRepository.findAll();
    }

    public Optional<RegistroFinanceiro> findById(Long id) {
        return registroFinanceiroRepository.findById(id);
    }

    public RegistroFinanceiro update(Long id, RegistroFinanceiro registroAtualizado) {
        return registroFinanceiroRepository.findById(id).map(registro -> {
            registro.setData(registroAtualizado.getData());
            registro.setDescricao(registroAtualizado.getDescricao());
            registro.setTipo(registroAtualizado.getTipo());
            registro.setCategoria(registroAtualizado.getCategoria());
            registro.setValor(registroAtualizado.getValor());
            return registroFinanceiroRepository.save(registro);
        }).orElseThrow(() -> new RuntimeException("Registro financeiro não encontrado"));
    }

    public void delete(Long id) {
        registroFinanceiroRepository.deleteById(id);
    }
}
