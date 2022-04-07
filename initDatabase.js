require('dotenv').config();
const Importer = require('mysql-import');

const startDatabase = async () => {
    const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;
    
    const importer = new Importer({
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    host: MYSQL_HOST,
    });
    
    await importer.import('./StoreManager.sql');
    
    importer.disconnect();
    };
    
    startDatabase();