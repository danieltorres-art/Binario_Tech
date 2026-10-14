Prova Pratica 2 (Aula 04) - PBE1

Este repositorio contem a resolucao pratica dos exercicios de Arquitetura HTTP, Rotas RESTful, Validacao de Payloads/Status Codes e Scripts Bash, baseados na API de gestao de frotas (frota_api.js).

Estrutura do Repositorio

.
├── frota_api.js      # Codigo da API RESTful (Node.js / Express)
├── teste_crud.sh     # Script Bash de automacao das requisicoes CRUD
└── crud_result.log   # Arquivo contendo os logs e retornos gerados pelo teste_crud.sh


Tecnologias e Ferramentas Utilizadas

Node.js & Express: Criacao da API RESTful.

cURL & jq: Execucao de requisicoes HTTP e formatacao/parsing do JSON.

Bash Scripting: Automacao de testes e geracao de logs.

Servidor Debian: Ambiente de execucao e testes via SSH.

Como Executar o Servidor da API

Antes de executar qualquer exercicio ou script de teste, o servidor Node.js deve ser iniciado e mantido em execucao em um terminal dedicado.

Navegue ate o diretorio do projeto:

cd ~/binario_tech/prova_aula04


Instale as dependencias (caso necessario):

npm install


Inicie o servidor da API:

node frota_api.js


O servidor iniciara a escuta na porta 3006 (http://localhost:3006). Mantenha este terminal aberto e utilize uma segunda janela ou aba de terminal para executar os exercicios.

Mapeamento de Endpoints (/api/v1/veiculos)

Metodo

Endpoint

Descricao

Status Codes

GET

/api/v1/veiculos

Listagem geral (com suporte a filtro por query param ?status=)

200 OK

GET

/api/v1/veiculos/:id

Busca veiculo por ID

200 OK / 404 Not Found

POST

/api/v1/veiculos

Cadastro de novo veiculo

201 Created / 400 Bad Request

PUT

/api/v1/veiculos/:id

Substituicao completa dos dados do veiculo

200 OK / 400 Bad Request / 404 Not Found

PATCH

/api/v1/veiculos/:id

Atualizacao parcial (ex: status)

200 OK / 404 Not Found

DELETE

/api/v1/veiculos/:id

Remocao de veiculo

200 OK / 204 No Content / 404 Not Found

Resolucao dos Exercicios

Exercicio 01: Buscar Veiculo por ID e Formatar com jq

Descricao: Requisicao GET buscando o veiculo de ID 1 e exibicao formatada.

curl -s http://localhost:3006/api/v1/veiculos/1 | jq .


Exercicio 02: Cadastrar Novo Veiculo (POST com Status 201)

Descricao: Cadastro de um caminhao Volvo FH 540, placa KLL-9090.

curl -i -X POST http://localhost:3006/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{
    "montadora": "Volvo",
    "modelo": "FH 540",
    "placa": "KLL-9090",
    "status": "DISPONIVEL"
  }'


Validacao: Confirmar se o cabecalho retornado exibe HTTP/1.1 201 Created.

Exercicio 03: Validacao de Payload Sem Placa (Status 400)

Descricao: Teste de validacao enviando body sem o campo obrigatorio placa.

curl -i -X POST http://localhost:3006/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{
    "montadora": "Volvo",
    "modelo": "FH 540"
  }'


Validacao: A API deve responder com HTTP/1.1 400 Bad Request e uma mensagem contendo o erro de validacao.

Exercicio 04: Filtro de Veiculos por Query Parameter

Descricao: Filtrar veiculos que estejam com o status DISPONIVEL.

curl -s "http://localhost:3006/api/v1/veiculos?status=DISPONIVEL" | jq .


Exercicio 05: Atualizacao Parcial com PATCH

Descricao: Alterar o status do veiculo de ID 3 para EM_ROTA.

curl -i -X PATCH http://localhost:3006/api/v1/veiculos/3 \
  -H "Content-Type: application/json" \
  -d '{ "status": "EM_ROTA" }'


Exercicio 06: Validacao de ID Inexistente (Status 404)

Descricao: Tentar atualizar ou remover um veiculo inexistente (ID 99).

# Teste com PATCH
curl -i -X PATCH http://localhost:3006/api/v1/veiculos/99 \
  -H "Content-Type: application/json" \
  -d '{ "status": "EM_ROTA" }'

# Teste com DELETE
curl -i -X DELETE http://localhost:3006/api/v1/veiculos/99


Validacao: O servidor deve retornar HTTP/1.1 404 Not Found.

Exercicio 07: Rota PUT para Substituicao Completa

Descricao: Atualizacao total dos dados de um veiculo no endpoint /api/v1/veiculos/:id.

curl -i -X PUT http://localhost:3006/api/v1/veiculos/2 \
  -H "Content-Type: application/json" \
  -d '{
    "montadora": "Scania",
    "modelo": "R 450",
    "placa": "ABC-1234",
    "status": "MANUTENCAO"
  }'


Exercicio 08: Automacao com Script Bash (teste_crud.sh)

Descricao: Script que realiza o cadastro de 2 veiculos, atualiza 1 deles, deleta o outro e salva a execucao em crud_result.log.

Conteudo do teste_crud.sh:

#!/bin/bash

LOG_FILE="crud_result.log"

echo "=== INICIANDO TESTE AUTOMATIZADO DE CRUD ===" > $LOG_FILE
date >> $LOG_FILE
echo "--------------------------------------------" >> $LOG_FILE

# 1. Cadastrar Veiculo 1
echo -e "\n[1] Cadastrando Veiculo 1..." >> $LOG_FILE
curl -s -i -X POST http://localhost:3006/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora":"Mercedes","modelo":"Actros","placa":"AAA-1111","status":"DISPONIVEL"}' >> $LOG_FILE

# 2. Cadastrar Veiculo 2
echo -e "\n\n[2] Cadastrando Veiculo 2..." >> $LOG_FILE
curl -s -i -X POST http://localhost:3006/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora":"Scania","modelo":"R 500","placa":"BBB-2222","status":"DISPONIVEL"}' >> $LOG_FILE

# 3. Atualizar Veiculo 1 (PATCH)
echo -e "\n\n[3] Atualizando Veiculo 1..." >> $LOG_FILE
curl -s -i -X PATCH http://localhost:3006/api/v1/veiculos/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"EM_ROTA"}' >> $LOG_FILE

# 4. Deletar Veiculo 2
echo -e "\n\n[4] Deletando Veiculo 2..." >> $LOG_FILE
curl -s -i -X DELETE http://localhost:3006/api/v1/veiculos/2 >> $LOG_FILE

echo -e "\n\n=== TESTE CONCLUIDO ===" >> $LOG_FILE


Como executar o script:

chmod +x teste_crud.sh
./teste_crud.sh
cat crud_result.log


Passo a Passo para Submissao no Google Classroom

Commit e Push das alteracoes:

git add .
git commit -m "feat: resolucao dos exercicios da prova pratica 2"
git push origin main


Download dos Arquivos para a maquina local via interface web do GitHub:

frota_api.js

teste_crud.sh

crud_result.log

Anexar na atividade do Classroom:

Link do repositorio no GitHub.

Os 3 arquivos baixados.

Screenshot (print) do terminal com a execucao dos testes.
