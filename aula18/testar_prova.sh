#!/bin/bash

# Configurações do ambiente
BASE_URL="http://localhost:3000/api/v1/prova"
EMAIL="aluno_$(date +%s)@binariotech.com"
SENHA="senhaSegura123"

echo "=================================================="
echo "1. CADASTRANDO USUÁRIO NA ROTA /register"
echo "=================================================="
curl -s -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"senha\": \"$SENHA\"}" | jq .

echo -e "\n=================================================="
echo "2. REALIZANDO LOGIN NA ROTA /login"
echo "=================================================="
RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL\", \"senha\": \"$SENHA\"}")

echo "$RESPONSE" | jq .

# Extrai o token JWT da resposta JSON usando jq
TOKEN=$(echo "$RESPONSE" | jq -r '.token')

echo -e "\nTOKEN GERADO: $TOKEN"

echo -e "\n=================================================="
echo "3. ACESSANDO ROTA PROTEGIDA /relatorio COM O TOKEN"
echo "=================================================="
curl -s -X GET "$BASE_URL/relatorio" \
  -H "Authorization: Bearer $TOKEN" | jq .

echo -e "\n=================================================="
echo "TESTE CONCLUÍDO COM SUCESSO!"
echo "=================================================="
