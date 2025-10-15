package com.sedem.api.services;

import com.sedem.api.models.Contato;
import com.sedem.api.repositories.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContatoService {

    @Autowired
    private ContatoRepository contatoRepository;

    public Contato create(Contato contato) {
        return contatoRepository.save(contato);
    }

    public List<Contato> findAll() {
        return contatoRepository.findAll();
    }

    public Optional<Contato> findById(Long id) {
        return contatoRepository.findById(id);
    }

    public Contato update(Long id, Contato contatoAtualizado) {
        return contatoRepository.findById(id).map(contato -> {
            contato.setNomeCompleto(contatoAtualizado.getNomeCompleto());
            contato.setEmail(contatoAtualizado.getEmail());
            contato.setCelular(contatoAtualizado.getCelular());
            contato.setEndereco(contatoAtualizado.getEndereco());
            contato.setObservacao(contatoAtualizado.getObservacao());
            return contatoRepository.save(contato);
        }).orElseThrow(() -> new RuntimeException("Contato não encontrado"));
    }

    public void delete(Long id) {
        contatoRepository.deleteById(id);
    }
}
