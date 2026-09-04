const path = require('path');

module.exports = {
	  development: {
		      client: 'better-sqlite3',
		      connection: {
			            filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
			          },
		      migrations: {
			            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
			          },
		      seeds: {
			            directory: path.resolve(__dirname, 'src', 'database', 'seeds')
			          },
		      pool: {
			            afterCreate: (conn, cb) => {
					            conn.pragma('foreign_keys = ON');
					            cb();
					          }
			          },
		      useNullAsDefault: true
		    }
};
