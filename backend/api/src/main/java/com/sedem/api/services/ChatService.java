package com.sedem.api.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final RegistroFinanceiroService financeiroService;
    private final RestClient restClient;

    @Value("${gemini.api-key}")
    private String apiKey;

    public ChatService(RegistroFinanceiroService financeiroService) {
        this.financeiroService = financeiroService;
        this.restClient = RestClient.create();
    }

    public String responderPergunta(String perguntaUsuario) {

        var registros = financeiroService.listar();

        String dadosContexto = registros.stream()
                .map(r -> String.format("- Data: %s | Total: R$ %s | Tipo: Financeiro", r.dataRegistro(), r.total()))
                .collect(Collectors.joining("\n"));

        String prompt = String.format("""
                Você é um assistente financeiro do sistema SEDEM.
                Analise os dados abaixo para responder à pergunta do usuário.
                
                DADOS DO SISTEMA:
                %s
                
                PERGUNTA DO USUÁRIO:
                %s
                
                Responda de forma resumida e direta.
                """, dadosContexto, perguntaUsuario);

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        // 4. Fazer a chamada REST "na mão" para o Google
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;

        try {
            // Enviando...
            Map response = restClient.post()
                    .uri(url)
                    .body(requestBody)
                    .retrieve()
                    .body(Map.class);

            // 5. Ler a resposta do JSON bagunçado do Google
            // O Google retorna: candidates[0].content.parts[0].text
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
            List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
            String textoResposta = (String) parts.get(0).get("text");

            return textoResposta;

        } catch (Exception e) {
            e.printStackTrace();
            return "Erro ao consultar a IA: " + e.getMessage();
        }
    }
}