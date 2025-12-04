package com.sedem.api.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Collections;

@Configuration
public class CorsConfig {

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // 1. Permitir a origem do seu Frontend (ajuste a porta se mudar)
        config.setAllowedOriginPatterns(Collections.singletonList("http://localhost:3000"));

        // 2. Permitir TUDO (Headers e Métodos)
        config.setAllowedHeaders(Collections.singletonList("*"));
        config.setAllowedMethods(Collections.singletonList("*")); // GET, POST, PUT, PATCH, DELETE, OPTIONS

        // 3. Permitir credenciais (cookies/auth headers)
        config.setAllowCredentials(true);

        source.registerCorsConfiguration("/**", config);

        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));

        // 4. O SEGREDO: Prioridade Máxima
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);

        return bean;
    }
}