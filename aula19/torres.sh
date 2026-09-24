#!/usr/bin/env bash

echo "========================================================="
echo " PERSISTÊNCIA E SALVAMENTO DE PROCESSOS PM2 "
echo "========================================================="

echo -e "\n[1] A guardar lista de processos..."
pm2 save

echo -e "\n[2] A configurar a persistência no boot..."
pm2 startup

echo -e "\n[3] Tabela de processos ativos:"
pm2 status
