#!/bin/bash
echo "=================================================="
echo "    PIPELINE DE DEPLOY AUTOMATIZADO - BINÁRIO TECH"
echo "=================================================="

REPO_DIR="$HOME/Binario_Tech"
APP_NAME="api-cicd"
PORT=3006

echo "[1/5] Atualizando código-fonte do repositório remoto..."
cd $REPO_DIR
git pull origin main

echo "[2/5] Verificando e instalando novas dependências..."
cd $REPO_DIR/aula21
npm install --production

echo "[3/5] Registrando Histórico de Deploy..."
COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "LOCAL_DEV")
echo "$(date '+%Y-%m-%d %H:%M:%S') - Commit: $COMMIT_HASH - Deploy Realizado" >> deploy_history.log

echo "[4/5] Reiniciando aplicação no PM2..."
pm2 restart $APP_NAME

echo "[5/5] Executando Smoke Test na API (Porta $PORT)..."
sleep 2
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT/api/v1/versao)

if [ "$HTTP_STATUS" -eq 200 ]; then
  echo -e "\n[SUCESSO] Deploy realizado e verificado com sucesso! HTTP Status 200."
  pm2 list | grep $APP_NAME
else
  echo -e "\n[FALHA] Smoke Test falhou com status $HTTP_STATUS! Verifique os logs do PM2."
  pm2 logs $APP_NAME --lines 20
  exit 1
fi
echo "=================================================="
