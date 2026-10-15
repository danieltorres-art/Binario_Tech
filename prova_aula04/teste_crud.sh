#!/bin/bash

BASE_URL="http://localhost:3006/api/v1/veiculos"

echo "==========================================" > crud_result.log
echo "DATA DA EXECUÇÃO: $(date)" >> crud_result.log
echo "==========================================" >> crud_result.log

echo -e "\n--- 1. CADASTRANDO VEÍCULOS (POST) ---" >> crud_result.log
curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{"placa": "VOL-5400", "montadora": "Volvo", "modelo": "Volvo FH 540"}' | jq . >> crud_result.log

curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{"placa": "MER-1122", "montadora": "Mercedes-Benz", "modelo": "Actros 2651"}' | jq . >> crud_result.log

echo -e "\n--- 2. LISTANDO APENAS DISPONÍVEIS (GET COM QUERY PARAM) ---" >> crud_result.log
curl -s -X GET "$BASE_URL?status=DISPONIVEL" | jq . >> crud_result.log

echo -e "\n--- 3. ATUALIZANDO STATUS (PATCH) ---" >> crud_result.log
curl -s -X PATCH "$BASE_URL/3/status" \
  -H "Content-Type: application/json" \
  -d '{"status": "EM_TRANSITO"}' | jq . >> crud_result.log

echo -e "\n--- 4. SUBSTITUIÇÃO COMPLETA (PUT) ---" >> crud_result.log
curl -s -X PUT "$BASE_URL/3" \
  -H "Content-Type: application/json" \
  -d '{"placa": "VOL-5400", "montadora": "Volvo", "modelo": "Volvo FH 540 Reboque", "status": "DISPONIVEL"}' | jq . >> crud_result.log

echo -e "\n--- 5. REMOVENDO VEÍCULO (DELETE) ---" >> crud_result.log
curl -s -X DELETE "$BASE_URL/4" | jq . >> crud_result.log

echo -e "\n--- TESTES CONCLUÍDOS COM SUCESSO ---" >> crud_result.log
cat crud_result.log
