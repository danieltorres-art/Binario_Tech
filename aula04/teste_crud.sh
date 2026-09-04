#!/bin/bash

LOGFILE="crud_result.log"

echo "=== INICIO DOS TESTES DE CRUD - $(date) ===" > "$LOGFILE"

# 1. Cadastrar primeiro veículo
echo -e "\n1. CADASTRANDO PRIMEIRO VEICULO..." >> "$LOGFILE"
curl -s -i -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"placa":"KLL-9090","montadora":"Volvo","modelo":"FH 540"}' >> "$LOGFILE"

# 2. Cadastrar segundo veículo
echo -e "\n\n2. CADASTRANDO SEGUNDO VEICULO..." >> "$LOGFILE"
curl -s -i -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"placa":"MNO-3333","montadora":"DAF","modelo":"XF 530"}' >> "$LOGFILE"

# 3. Atualizar status de um veículo
echo -e "\n\n3. ATUALIZANDO STATUS DO VEICULO ID 3..." >> "$LOGFILE"
curl -s -i -X PATCH http://localhost:3000/api/v1/veiculos/3/status \
  -H "Content-Type: application/json" \
  -d '{"status":"EM_ROTA"}' >> "$LOGFILE"

# 4. Deletar um veículo
echo -e "\n\n4. REMOVENDO VEICULO ID 4..." >> "$LOGFILE"
curl -s -i -X DELETE http://localhost:3000/api/v1/veiculos/4 >> "$LOGFILE"

echo -e "\n\n=== FIM DOS TESTES - $(date) ===" >> "$LOGFILE"

echo "Execucao concluida. Logs salvos em '$LOGFILE'."
