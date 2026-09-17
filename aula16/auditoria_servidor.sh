echo "========================================================================="
echo " AUDITORIA DE SERVIDOR "
echo "========================================================================="

echo "Listando status de execução dos processos Node.js..."

# Grava o cabeçalho e limpa o log anterior
echo "=== RELATÓRIO DE PROCESSOS NODE.JS - $(date) ===" > processos.log

# Captura os processos Node.js ativos (ignorando a própria busca do grep)
ps aux | grep node | grep -v grep >> processos.log

echo "Resultado da Lista:"
sleep 2
cat processos.log
