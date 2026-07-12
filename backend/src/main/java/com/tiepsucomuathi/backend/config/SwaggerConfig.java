package com.tiepsucomuathi.backend.config;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Tiếp Sức Mùa Thi 2026 API")
                        .version("1.0")
                        .description("Public API — Kỷ yếu điện tử & Bức tường tri ân"));
    }
}
