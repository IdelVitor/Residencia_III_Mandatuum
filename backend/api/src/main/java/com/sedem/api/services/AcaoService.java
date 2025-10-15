package com.sedem.api.services;

import com.sedem.api.models.Acao;
import com.sedem.api.repositories.AcaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AcaoService {

    @Autowired
    private AcaoRepository acaoRepository;

    public Acao create(Acao acao) {
        return acaoRepository.save(acao);
    }

    public List<Acao> findAll() {
        return acaoRepository.findAll();
    }

    public Optional<Acao> findById(Long id) {
        return acaoRepository.findById(id);
    }

    public Acao update(Long id, Acao acaoAtualizada) {
        return acaoRepository.findById(id).map(acao -> {
            acao.setTitulo(acaoAtualizada.getTitulo());
            acao.setDescricao(acaoAtualizada.getDescricao());
            acao.setTipo(acaoAtualizada.getTipo());
            acao.setData(acaoAtualizada.getData());
            return acaoRepository.save(acao);
        }).orElseThrow(() -> new RuntimeException("Ação não encontrada"));
    }

    public void delete(Long id) {
        acaoRepository.deleteById(id);
    }
}
