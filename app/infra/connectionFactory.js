var mysql  = require('mysql');

function createDBConnection() {
    if(!process.env.NODE_ENV) {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'casadocodigo_nodejs'
        });
    }
    if(process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'casadocodigo_nodejs_test'
        });
    }

    if(process.env.NODE_ENV == 'production') {
        var urlDeConexao = process.env.CLEARDB_DATABASE_URL;
        var grupos = urlDeConexao.match(/mysql:\/\/(.*)):(.*)@(.*)\/(.*)\?reconnect=true/)
        return mysql.createConnection({
            host: grupos[3],
            user: grupos[4],
            password: grupos[5],
            database: grupos[6]
        });
    }
}

module.exports = function() {
    return createDBConnection;
}
