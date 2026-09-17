#!/bin/bash

URL="http://localhost:3006/api/v1/prova"
EMAIL="aluno_$(date +%s)@binariotech.com"
SENHA="senhaSegura123"

echo -e "\033[1;33m==================================================\033[0m"
echo -e "\033[1;36m1. CADASTRANDO USUÁRIO NA ROTA /register\033[0m"
echo -e "\033[1;33m==================================================\033[0m"
curl -s -X POST "$URL/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"senha\":\"$SENHA\"}" | jq -C .

echo -e "\n\033[1;33m==================================================\033[0m"
echo -e "\033[1;36m2. REALIZANDO LOGIN NA ROTA /login\033[0m"
echo -e "\033[1;33m==================================================\033[0m"
RESPONSE=$(curl -s -X POST "$URL/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"senha\":\"$SENHA\"}")

echo "$RESPONSE" | jq -C .

TOKEN=$(echo "$RESPONSE" | jq -r '.token')

echo -e "\n\033[1;33m==================================================\033[0m"
echo -e "\033[1;36m3. ACESSANDO ROTA PROTEGIDA /relatorio COM O TOKEN\033[0m"
echo -e "\033[1;33m==================================================\033[0m"
curl -s -X GET "$URL/relatorio" \
  -H "Authorization: Bearer $TOKEN" | jq -C .

echo -e "\n\033[1;32m==================================================\033[0m"
echo -e "\033[1;32mTESTE CONCLUÍDO COM SUCESSO!\033[0m"
echo -e "\033[1;32m==================================================\033[0m"
