#!/bin/bash

LOG_FILE="audit_seguranca.log"

echo "=== INÍCIO DOS TESTES DE SEGURANÇA ===" > $LOG_FILE

echo -e "\n1. Testando Rota de Health Check (Pública):" | tee -a $LOG_FILE
curl -i -X GET http://localhost:3006/api/v1/health | tee -a $LOG_FILE

echo -e "\n\n2. Testando Acesso Não Autorizado (Sem X-API-KEY - Esperado 401):" | tee -a $LOG_FILE
curl -i -X GET http://localhost:3006/api/v1/motoristas | tee -a $LOG_FILE

echo -e "\n\n3. Testando Erro de Validação de CNH (CNH inválida - Esperado 400):" | tee -a $LOG_FILE
curl -i -X POST http://localhost:3006/api/v1/motoristas \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: binario-tech-secret-2026" \
  -d '{"nome": "Carlos Silva", "cnh": "123"}' | tee -a $LOG_FILE

echo -e "\n\n4. Testando Cadastro Bem-Sucedido de Motorista (Esperado 201):" | tee -a $LOG_FILE
curl -i -X POST http://localhost:3006/api/v1/motoristas \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: binario-tech-secret-2026" \
  -d '{"nome": "Carlos Silva", "cnh": "12345678901"}' | tee -a $LOG_FILE

echo -e "\n\n5. Testando Consulta Bem-Sucedida de Motoristas (Esperado 200):" | tee -a $LOG_FILE
curl -i -X GET http://localhost:3006/api/v1/motoristas \
  -H "X-API-KEY: binario-tech-secret-2026" | tee -a $LOG_FILE

echo -e "\n\n6. Testando Rota Inexistente (Esperado 404):" | tee -a $LOG_FILE
curl -i -X GET http://localhost:3006/api/v1/rota-que-nao-existe | tee -a $LOG_FILE

echo -e "\n=== FIM DOS TESTES ===" | tee -a $LOG_FILE
