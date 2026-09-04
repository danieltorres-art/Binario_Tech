#!/bin/bash

LOG_FILE="auditoria.log"

echo "=== AUDITORIA DE ROTAS DA API - BINÁRIO TECH ===" > $LOG_FILE
echo "Data da execução: $(date)" >> $LOG_FILE
echo "----------------------------------------------------" >> $LOG_FILE

echo -e "\n[1] Checando Rota Scania..." >> $LOG_FILE
curl -s http://localhost:3000/api/v1/telemetria/scania >> $LOG_FILE

echo -e "\n\n[2] Checando Rota Mercedes..." >> $LOG_FILE
curl -s http://localhost:3000/api/v1/telemetria/mercedes >> $LOG_FILE

echo -e "\n\n[3] Checando Rota Inexistente (404)..." >> $LOG_FILE
curl -s http://localhost:3000/api/v1/telemetria/volvo >> $LOG_FILE

echo -e "\n\n=== AUDITORIA CONCLUÍDA ===" >> $LOG_FILE

echo "Auditoria realizada com sucesso! Verifique o arquivo $LOG_FILE."
