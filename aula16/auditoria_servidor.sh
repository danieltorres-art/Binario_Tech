echo "========================================================================="
echo " AUDITORIA DE SERVIDOR "
echo "========================================================================="

echo "Listando status de execução dos procossos Node.js"
ps aux | grep node >>./processos.log

echo "Resultado da Lista:"
sleep 2
cat processos.log 
