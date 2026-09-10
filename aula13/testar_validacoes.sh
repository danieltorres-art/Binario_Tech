#!/bin/bash
echo "===================================================="
echo " AUDITORIA DE VALIDAÇÃO E ERROS - AULA 13"
echo "===================================================="

echo -e "\n[1] Teste 1: Payload INVÁLIDO (Esperado HTTP 422)..."
curl -s -X POST http://localhost:3000/api/v1/veiculos \
	  -H "Content-Type: application/json" \
	    -d '{ "placa": "abc", "chassi": "123", "capacidadeCargaKg": 50 }' | jq .

echo -e "\n[2] Teste 2: Payload VÁLIDO com Placa Minúscula + anoFabricacao (Esperado HTTP 201 + Placa Maiúscula)..."
curl -s -X POST http://localhost:3000/api/v1/veiculos \
	  -H "Content-Type: application/json" \
	    -d '{ "placa": "abc-1234", "chassi": "19BMSR450XYZ12345", "capacidadeCargaKg": 15000, "anoFabricacao": 2022 }' | jq .

echo -e "\n[3] Teste 3: Requisição sem Content-Type JSON (Exercício 3 - Esperado HTTP 400)..."
curl -s -X POST http://localhost:3000/api/v1/veiculos \
	  -d '{ "placa": "ABC-1234" }' | jq .

echo -e "\n[4] Teste 4: Erro Interno Simulado (Esperado HTTP 500)..."
curl -s -X POST http://localhost:3000/api/v1/veiculos \
	  -H "Content-Type: application/json" \
	    -d '{ "placa": "ABC-1234", "chassi": "ERRO_SIMULADO_500", "capacidadeCargaKg": 15000 }' | jq .

echo -e "\n[5] Teste 5: Rota Inexistente (Esperado HTTP 404)..."
curl -s http://localhost:3000/api/v1/rota-invalida | jq .
