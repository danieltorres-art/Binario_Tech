#!/bin/bash

echo "=========================================="
echo "    INÍCIO DOS TESTES DE TELEMETRIA       "
echo "    Data: $(date +'%d/%m/%Y')"
echo "=========================================="
echo ""

echo "[$(date +'%H:%M:%S')] 1. Testando rota /status..."
curl -s http://localhost:3000/status
echo -e "\n------------------------------------------\n"

echo "[$(date +'%H:%M:%S')] 2. Testando rota /scania/info..."
curl -s http://localhost:3000/scania/info
echo -e "\n------------------------------------------\n"

echo "[$(date +'%H:%M:%S')] 3. Testando rota /vw/info..."
curl -s http://localhost:3000/vw/info
echo -e "\n------------------------------------------\n"

echo "=========================================="
echo "         Testes Finalizados!             "
echo "=========================================="
