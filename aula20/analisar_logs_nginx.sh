#!/bin/bash
echo "=================================================="
echo "   AUDITORIA DE LOGS DO NGINX (HTTP 200 OK)"
echo "=================================================="

LOG_FILE="/var/log/nginx/access.log"

if [ -f "$LOG_FILE" ]; then
  echo "Exibindo as últimas requisições com status 200 OK:"
  echo "--------------------------------------------------"
  tail -n 15 "$LOG_FILE" | grep '" 200 '
else
  echo "[AVISO] Arquivo de log não encontrado em $LOG_FILE (Servidor sem Nginx ativo)"
fi

echo "=================================================="
