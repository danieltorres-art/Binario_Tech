Prova Pratica 2 (Aula 04) - PBE1

# Inicializacao da API
npm install
node frota_api.js

# Exercicio 01
curl -s http://localhost:3006/api/v1/veiculos/1 | jq .

# Exercicio 02
curl -i -X POST http://localhost:3006/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora": "Volvo", "modelo": "FH 540", "placa": "KLL-9090"}'

# Exercicio 03
curl -i -X POST http://localhost:3006/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora": "Volvo", "modelo": "FH 540"}'

# Exercicio 04
curl -s "http://localhost:3006/api/v1/veiculos?status=DISPONIVEL" | jq .

# Exercicio 05
curl -i -X PATCH http://localhost:3006/api/v1/veiculos/3 \
  -H "Content-Type: application/json" \
  -d '{"status": "EM_ROTA"}'

# Exercicio 06
curl -i -X PATCH http://localhost:3006/api/v1/veiculos/99 \
  -H "Content-Type: application/json" \
  -d '{"status": "EM_ROTA"}'

curl -i -X DELETE http://localhost:3006/api/v1/veiculos/99

# Exercicio 07
curl -i -X PUT http://localhost:3006/api/v1/veiculos/2 \
  -H "Content-Type: application/json" \
  -d '{"montadora": "Scania", "modelo": "R 450", "placa": "ABC-1234", "status": "MANUTENCAO"}'

# Exercicio 08
chmod +x teste_crud.sh
./teste_crud.sh
cat crud_result.log

# ==========================================
# VARIAÇÕES DO NPM (Caso o npm install falhe)
# ==========================================

# 1. Se der erro por falta de package.json na pasta:
npm init -y
npm install express

# 2. Se houver conflito ou erro de permissoes no servidor:
npm install --no-audit --no-fund
# ou force a instalacao:
npm install --force

# 3. Se a pasta node_modules ja existir mas der erro ao rodar a API:
rm -rf node_modules package-lock.json
npm install

# ==========================================
# COMANDOS PARA COMMITAR E ENVIAR AO GITHUB
# ==========================================

# Garanta que os arquivos gerados estao na pasta da prova
cp frota_api.js teste_crud.sh crud_result.log ~/binario_tech/prova_aula04/
cd ~/binario_tech/prova_aula04

# Ignorar node_modules no Git
echo "node_modules" > .gitignore

# Adicionar arquivos, commitar e enviar
git add .
git commit -m "Entrega Prova Pratica 2 - Exercicios 01 ao 08"
git push origin main


# PASSO A PASSO DA ENTREGA NO CLASSROOM
# 1. Copie para o seu computador/telemovel os arquivos:
#    - frota_api.js
#    - teste_crud.sh
#    - crud_result.log
# 2. Anexe os 3 arquivos na tarefa do Google Classroom.
# 3. Anexe o LINK do seu repositorio GitHub na atividade.
# 4. Anexe o PRINT DO TERMINAL com os testes executados.
