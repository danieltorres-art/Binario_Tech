#!/bin/bash

LOG_FILE="crud_result.log"

echo "=== INICIANDO TESTE AUTOMATIZADO DE CRUD ===" > $LOG_FILE
date >> $LOG_FILE
echo "--------------------------------------------" >> $LOG_FILE

# 1. Cadastrar Veiculo 1
echo -e "\n[1] Cadastrando Veiculo 1..." >> $LOG_FILE
curl -s -i -X POST http://localhost:3006/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora":"Mercedes","modelo":"Actros","placa":"AAA-1111","status":"DISPONIVEL"}' >> $LOG_FILE

# 2. Cadastrar Veiculo 2
echo -e "\n\n[2] Cadastrando Veiculo 2..." >> $LOG_FILE
curl -s -i -X POST http://localhost:3006/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora":"Scania","modelo":"R 500","placa":"BBB-2222","status":"DISPONIVEL"}' >> $LOG_FILE

# 3. Atualizar Veiculo 1 (PATCH)
echo -e "\n\n[3] Atualizando Veiculo 1..." >> $LOG_FILE
curl -s -i -X PATCH http://localhost:3006/api/v1/veiculos/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"EM_ROTA"}' >> $LOG_FILE

# 4. Deletar Veiculo 2
echo -e "\n\n[4] Deletando Veiculo 2..." >> $LOG_FILE
curl -s -i -X DELETE http://localhost:3006/api/v1/veiculos/2 >> $LOG_FILE

echo -e "\n\n=== TESTE CONCLUIDO ===" >> $LOG_FILE
