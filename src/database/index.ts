import {createConnection} from 'typeorm'

createConnection().then(() => console.log('Conexão estabelecida com DB 🔐'));
