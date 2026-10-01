#!/bin/bash
echo "=================================================="
echo "   LIMPEZA DE AMBIENTE DOCKER - BINÁRIO TECH"
echo "=================================================="

echo "[1/2] Removendo containers parados/excluídos..."
docker container prune -f

echo "[2/2] Removendo imagens sem tag (dangling images)..."
docker image prune -f

echo "[OK] Limpeza concluída com sucesso!"
echo "=================================================="
