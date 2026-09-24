module.exports = {
  apps: [
    {
      name: 'app-aula-19',
      script: './server.js', // Arquivo de entrada da aplicação
      instances: 'max',         // Executa em modo cluster utilizando todas as CPUs disponíveis em produção
      exec_mode: 'cluster',     // Modo de execução em cluster para alta disponibilidade

      // Configurações de ambiente para Desenvolvimento (padrão ao executar: pm2 start ecosystem.config.js)
      env: {
        NODE_ENV: 'development',
        PORT: 3006,
        LOG_LEVEL: 'debug',
        DATABASE_URL: 'mongodb://localhost:27017/aula19_dev'
      },

      // Configurações de ambiente para Produção (ao executar: pm2 start ecosystem.config.js --env production)
      env_production: {
        NODE_ENV: 'production',
        PORT: 3006,
        LOG_LEVEL: 'info',
        DATABASE_URL: 'mongodb://usuario:senha@cluster-prod:27017/aula19_prod'
      },

      // Configurações gerais de log e gerenciamento de recursos
      watch: false,                 // Defina como true em ambiente local se desejar auto-reload
      max_memory_restart: '1G',     // Reinicia o processo se exceder 1GB de RAM
      error_file: './logs/err.log', // Registros de erro
      out_file: './logs/out.log',   // Registros de saída padrão
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
