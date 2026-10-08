-Guia de Estudo e Resolução - Prova Prática 1 (PBE1 - Aula 03)

Este repositório contém as orientações gerais, passo a passo detalhado dos 8 Exercícios de Fixação da Aula 03 e o procedimento de entrega para a Prova Prática 1 de Programação Backend (PBE1).

- Acesso ao Enunciado no Servidor Debian

Para copiar o arquivo de orientações no servidor via SSH, execute os comandos:

mkdir -p ~/binario_tech/prova_aula03
cp /var/prova_aula03.txt ~/binario_tech/prova_aula03/
cd ~/binario_tech/prova_aula03


- Resolução dos Exercícios de Fixação

Nota: Certifique-se de que a aplicação Node.js (telemetria.js) esteja rodando localmente (por padrão na porta 3000 ou na porta configurada) antes de executar as requisições aos endpoints HTTP.

🔹 Exercício 01: Requisição cURL + jq

Enunciado: Efetue uma requisição GET para a rota /api/v1/scania via cURL e use o jq para exibir somente a chave modelo.

Comando:

curl -s http://localhost:3000/api/v1/scania | jq '.modelo'


Explicação: O parâmetro -s oculta o progresso do cURL e o pipe | envia a resposta JSON para o jq, filtrando apenas o campo .modelo.

🔹 Exercício 02: Requisição HTTPie salvando em JSON

Enunciado: Faça uma requisição para a rota /api/v1/mercedes utilizando a ferramenta httpie e salve o resultado no arquivo mercedes.json.

Comando:

http GET http://localhost:3000/api/v1/mercedes > mercedes.json


(ou utilizando o atalho do HTTPie)

http http://localhost:3000/api/v1/mercedes -o mercedes.json


Explicação: O operador > ou a flag -o redirecionam a saída da requisição HTTP diretamente para um arquivo chamado mercedes.json.

🔹 Exercício 03: Leitura e Filtro de Arquivo com jq

Enunciado: Utilize o jq para ler o arquivo mercedes.json e filtrar apenas o valor do campo status.

Comando:

jq '.status' mercedes.json


Explicação: O jq aceita o caminho do arquivo diretamente após a expressão de filtro para ler e formatar o conteúdo.

🔹 Exercício 04: Edição da Aplicação Node.js (telemetria.js)

Enunciado: Edite o arquivo telemetria.js e adicione uma nova rota /api/v1/volvo retornando os dados do modelo FH 540. Reinicie a aplicação e teste a rota.

Editar o código: Abra o arquivo telemetria.js em seu editor/terminal (ex: nano telemetria.js) e adicione o trecho do endpoint:

app.get('/api/v1/volvo', (req, res) => {
  res.json({
    montadora: 'Volvo',
    modelo: 'FH 540',
    status: 'Ativo'
  });
});


Reiniciar a aplicação: Encerre o processo anterior com Ctrl + C e reinicie:

node telemetria.js


Testar a nova rota:

curl -s http://localhost:3000/api/v1/volvo | jq .


🔹 Exercício 05: Configuração de Script no package.json

Enunciado: Configure o arquivo package.json adicionando um script "start": "node telemetria.js". Teste a execução usando npm start.

Editar o package.json: Adicione a chave "start" dentro do bloco "scripts":

{
  "name": "prova-telemetria",
  "version": "1.0.0",
  "scripts": {
    "start": "node telemetria.js"
  }
}


Executar via npm:

npm start


🔹 Exercício 06: Redirecionamento de Saída para Log

Enunciado: Crie um comando que direcione o resultado da auditoria do script testar_telemetria.sh para um arquivo de log chamado relatorio.log.

Comando:

bash testar_telemetria.sh > relatorio.log


(Garantindo permissão de execução, caso necessário):

chmod +x testar_telemetria.sh
./testar_telemetria.sh > relatorio.log


Explicação: O operador > captura toda a saída padrão do script Bash e salva/sobrescreve no arquivo relatorio.log.

🔹 Exercício 07: Filtro Múltiplo de Campos no jq

Enunciado: Filtre a resposta da rota /api/v1/vw para exibir apenas os campos montadora e status em uma única chamada jq.

Comando:

curl -s http://localhost:3000/api/v1/vw | jq '{montadora: .montadora, status: .status}'


(Ou sintaxe simplificada do jq)

curl -s http://localhost:3000/api/v1/vw | jq '{montadora, status}'


🔹 Exercício 08: Encontrar e Finalizar Processo Node.js

Enunciado: Localize o PID do processo Node.js em execução no seu terminal usando ps aux | grep node e encerre-o com o comando kill -9 <PID>.

Localizar o PID:

ps aux | grep node


Identifique o número do PID na segunda coluna da linha correspondente ao node telemetria.js.

Encerrar o processo:

kill -9 <PID_ENCONTRADO>


(Substitua <PID_ENCONTRADO> pelo número real, ex: kill -9 12345)

- Passo a Passo para Entrega no Google Classroom

Como os exercícios são executados no terminal via SSH, siga este fluxo obrigatório para realizar a entrega:

Enviar as alterações para o GitHub:

git add .
git commit -m "Finalizando exercicios da prova 1"
git push origin main


Baixar os arquivos do GitHub:
Acesse o repositório pelo seu navegador no computador/celular e faça o download dos 3 arquivos obrigatórios:

telemetria.js

testar_telemetria.sh

relatorio.log

Anexar no Google Classroom:
Anexe na atividade correspondente:

[x] Os 3 arquivos baixados (telemetria.js, testar_telemetria.sh, relatorio.log).

[x] O link público do seu repositório GitHub.

[x] O print/captura de tela do seu terminal com a execução dos testes.
