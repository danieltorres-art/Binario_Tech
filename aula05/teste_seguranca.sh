#!/bin/bash

LOG_FILE="audit_seguranca.log"

echo "=== AUDITORIA DE SEGURANÇA DA API ===" > $LOG_FILE
echo "Data: $(date)" >> $LOG_FILE
echo "-----------------------------------" >> $LOG_FILE

echo -e "\n[1] Tentativa SEM chave de API:" >> $LOG_FILE
curl -s http://localhost:3000/api/v1/motoristas >> $LOG_FILE

echo -e "\n\n[2] Tentativa com chave INCORRETA:" >> $LOG_FILE
curl -s -H "X-API-KEY: chave-invalida" http://localhost:3000/api/v1/motoristas >> $LOG_FILE

echo -e "\n\n[3] Tentativa com chave VAZIA:" >> $LOG_FILE
curl -s -H "X-API-KEY: " http://localhost:3000/api/v1/motoristas >> $LOG_FILE

echo -e "\n\n[4] Tentativa com chave VÁLIDA:" >> $LOG_FILE
curl -s -H "X-API-KEY: binario-tech-secret-2026" http://localhost:3000/api/v1/motoristas >> $LOG_FILE

echo -e "\n\n=== FIM DA AUDITORIA ===" >> $LOG_FILE
