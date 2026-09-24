#!/bin/bash

echo "========================================================="
echo " PERSISTÊNCIA E SALVAMENTO DE PROCESSOS PM2 "
echo "========================================================="

# 1. Salva a lista de processos ativos
echo -e "\n[1] Salvando lista de processos ativos..."
pm2 save

# 2. Configura a inicialização no boot do sistema operacional
echo -e "\n[2] Gerando e configurando o script de boot no SO..."
pm2 startup

# 3. Exibe a tabela oficial e nativa do PM2
echo -e "\n[3] Status atual dos processos:"
pm2 status
