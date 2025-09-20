package com.sedem.api.services;

import com.sedem.api.models.CoordenadaBairro;
import com.sedem.api.repositories.CoordenadaBairroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoordenadaBairroService {

    @Autowired
    private CoordenadaBairroRepository coordenadaBairroRepository;

    public CoordenadaBairro create(CoordenadaBairro coordenadaBairro) {
        return coordenadaBairroRepository.save(coordenadaBairro);
    }

    public List<CoordenadaBairro> findAll() {
        return coordenadaBairroRepository.findAll();
    }

    public Optional<CoordenadaBairro> findById(Long id) {
        return coordenadaBairroRepository.findById(id);
    }

    public CoordenadaBairro update(Long id, CoordenadaBairro coordenadaAtualizada) {
        return coordenadaBairroRepository.findById(id).map(cb -> {
            cb.setCidade(coordenadaAtualizada.getCidade());
            cb.setBairro(coordenadaAtualizada.getBairro());
            cb.setLatitude(coordenadaAtualizada.getLatitude());
            cb.setLongitude(coordenadaAtualizada.getLongitude());
            return coordenadaBairroRepository.save(cb);
        }).orElseThrow(() -> new RuntimeException("Coordenada de bairro não encontrada"));
    }

    public void delete(Long id) {
        coordenadaBairroRepository.deleteById(id);
    }
}
