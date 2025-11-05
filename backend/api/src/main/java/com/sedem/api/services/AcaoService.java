package com.sedem.api.services;

import com.sedem.api.dto.AcaoListDTO;
import com.sedem.api.models.Acao;
import com.sedem.api.repositories.AcaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AcaoService {

    @Autowired
    private AcaoRepository acaoRepository;

    // 🔹 Criação
    public Acao create(Acao acao) {
        return acaoRepository.save(acao);
    }

    // 🔹 Busca todas as ações
    public List<Acao> findAll() {
        return acaoRepository.findAll();
    }

    // 🔹 Busca por ID
    public Optional<Acao> findById(Long id) {
        return acaoRepository.findById(id);
    }

    // 🔹 Atualização
    public Acao update(Long id, Acao acao) {
        Acao existente = acaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ação não encontrada"));
        acao.setId(existente.getId());
        return acaoRepository.save(acao);
    }

    // 🔹 Exclusão
    public void delete(Long id) {
        acaoRepository.deleteById(id);
    }

    // 🔹 Lista resumida (DTO simplificado)
    public List<AcaoListDTO> listLite() {
        return acaoRepository.findAll()
                .stream()
                .map(a -> new AcaoListDTO(
                        a.getId(),
                        a.getTitulo(),
                        a.getDescricao(),
                        a.getCidade(),
                        a.getBairro()
                ))
                .collect(Collectors.toList());
    }

    // 🔹 Estatísticas por bairro
    public Map<String, Object> getEstatisticas() {
        List<Map<String, Object>> dados = acaoRepository.countByBairro();
        long total = dados.stream()
                .mapToLong(m -> ((Number) m.get("qtd")).longValue())
                .sum();

        // ✅ Cria uma nova lista modificável
        List<Map<String, Object>> dadosComPercentual = new ArrayList<>();
        for (Map<String, Object> item : dados) {
            Map<String, Object> novo = new HashMap<>();
            novo.put("bairro", item.get("bairro"));
            novo.put("qtd", item.get("qtd"));

            long qtd = ((Number) item.get("qtd")).longValue();
            double percentual = (total > 0) ? (qtd * 100.0 / total) : 0.0;
            novo.put("percentual", String.format("%.0f%%", percentual));

            dadosComPercentual.add(novo);
        }

        Map<String, Object> resposta = new HashMap<>();
        resposta.put("total", total);
        resposta.put("dados", dadosComPercentual);

        return resposta;
    }

    // 🔹 Estatísticas por cidade e bairro (corrigido e seguro)
    public List<Map<String, Object>> getAcoesPorCidadeEBairro() {
        List<Map<String, Object>> lista = acaoRepository.contarPorCidadeEBairro();

        long total = lista.stream()
                .mapToLong(m -> ((Number) m.get("quantidade")).longValue())
                .sum();

        // ✅ Cria nova lista com objetos HashMap modificáveis
        List<Map<String, Object>> resultado = new ArrayList<>();

        for (Map<String, Object> item : lista) {
            Map<String, Object> novo = new HashMap<>();
            novo.put("cidade", item.get("cidade"));
            novo.put("bairro", item.get("bairro"));
            novo.put("quantidade", item.get("quantidade"));

            long quantidade = ((Number) item.get("quantidade")).longValue();
            double percentual = (total > 0) ? (quantidade * 100.0 / total) : 0.0;
            novo.put("percentual", String.format("%.0f%%", percentual));

            resultado.add(novo);
        }

        return resultado;
    }
}
