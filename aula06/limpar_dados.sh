#!/bin/bash
echo "=========================================="
echo "      LIMPEZA DO AMBIENTE DE TESTES       "
echo "=========================================="
echo ""

echo "--> Encerrando o servidor Node.js..."
fuser -k 3000/tcp

echo "--> Excluindo ocorrencias.json..."
rm -f ocorrencias.json

echo ""
echo "=========================================="
echo "        AMBIENTE LIMPO COM SUCESSO!       "
echo "=========================================="
