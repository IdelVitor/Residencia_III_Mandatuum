package com.sedem.api.services;

import com.sedem.api.dto.RegistroFinanceiroCreateDTO;
import com.sedem.api.dto.RegistroFinanceiroListDTO;
import com.sedem.api.models.RegistroFinanceiro;
import com.sedem.api.models.Usuario;
import com.sedem.api.repositories.RegistroFinanceiroRepository;
import com.sedem.api.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RegistroFinanceiroService {

    private final RegistroFinanceiroRepository registroRepo;
    private final UsuarioRepository usuarioRepo;

    @Transactional
    public RegistroFinanceiroListDTO criar(RegistroFinanceiroCreateDTO dto) {
        RegistroFinanceiro rf = mapToEntity(dto, new RegistroFinanceiro());
        rf = registroRepo.save(rf);
        return toListDTO(rf);
    }

    @Transactional(readOnly = true)
    public List<RegistroFinanceiroListDTO> listar() {
        return registroRepo.findAll()
                .stream()
                .map(this::toListDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public RegistroFinanceiroListDTO buscarPorId(Long id) {
        RegistroFinanceiro rf = registroRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registro financeiro não encontrado: " + id));
        return toListDTO(rf);
    }

    @Transactional
    public RegistroFinanceiroListDTO atualizar(Long id, RegistroFinanceiroCreateDTO dto) {
        RegistroFinanceiro rf = registroRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Registro financeiro não encontrado: " + id));
        rf = mapToEntity(dto, rf);
        rf = registroRepo.save(rf);
        return toListDTO(rf);
    }

    @Transactional
    public void deletar(Long id) {
        if (!registroRepo.existsById(id)) {
            throw new IllegalArgumentException("Registro financeiro não encontrado: " + id);
        }
        registroRepo.deleteById(id);
    }

    /* ---------- mapeamentos ---------- */

    private RegistroFinanceiro mapToEntity(RegistroFinanceiroCreateDTO dto, RegistroFinanceiro target) {
        // usuário
        Usuario usuario = usuarioRepo.findById(dto.usuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado: " + dto.usuarioId()));
        target.setUsuario(usuario);

        // datas: DTO usa LocalDate; entidade usa LocalDateTime
        if (dto.dataRegistro() != null) {
            target.setDataRegistro(dto.dataRegistro().atStartOfDay());
        } else {
            target.setDataRegistro(null);
        }

        // valores
        target.setValorLocacaoImovel(dto.valorLocacaoImovel());
        target.setValorAssessoriaJuridica(dto.valorAssessoriaJuridica());
        target.setValorAssessoriaComunicacao(dto.valorAssessoriaComunicacao());
        target.setValorCombustivel(dto.valorCombustivel());
        target.setDespesasDebito(dto.despesasDebito());
        target.setDespesasCredito(dto.despesasCredito());
        target.setOutrasDespesas(dto.outrasDespesas());

        return target;
    }

    private RegistroFinanceiroListDTO toListDTO(RegistroFinanceiro rf) {
        return new RegistroFinanceiroListDTO(
                rf.getId(),
                rf.getDataRegistro() != null ? rf.getDataRegistro().toLocalDate() : null,
                rf.getValorLocacaoImovel(),
                rf.getValorAssessoriaJuridica(),
                rf.getValorAssessoriaComunicacao(),
                rf.getValorCombustivel(),
                rf.getDespesasDebito(),
                rf.getDespesasCredito(),
                rf.getOutrasDespesas()
        );
    }
}
