#!/bin/bash

# Faz a requisição na porta 3006
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3006/api/v1/health)

echo "HTTP Status Code: $STATUS_CODE" > health_check.log
echo "[TESTE] Status Code $STATUS_CODE gravado em health_check.log"
