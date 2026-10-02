#!/bin/bash

API_URL="http://localhost:3006/api/v1"
CHAVE_VALIDA="binario-tech-secret-2026"

echo "=== INICIANDO AUDITORIA DE SEGURANÇA E ROTAS ==="
echo ""

# 1. Teste de Acesso Sem Chave (Deve retornar 401)
echo -n "1. Testando GET /manutencoes sem chave... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/manutencoes")
echo "Status: $STATUS"

# 2. Teste de Acesso Com Chave Válida (Deve retornar 200)
echo -n "2. Testando GET /manutencoes com chave valida... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -H "X-API-KEY: $CHAVE_VALIDA" "$API_URL/manutencoes")
echo "Status: $STATUS"

# 3. Teste de CNH Inválida (Deve retornar 400)
echo -n "3. Testando POST /motoristas com CNH invalida... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API_URL/motoristas" \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: $CHAVE_VALIDA" \
  -d '{"nome": "Carlos", "cnh": "123"}')
echo "Status: $STATUS"

# 4. Teste de Rota Inexistente (Deve retornar 404)
echo -n "4. Testando rota inexistente /clientes... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/clientes")
echo "Status: $STATUS"

echo ""
echo "=== AUDITORIA CONCLUÍDA ==="
