import sql from 'mssql'

if (process.env.DB_USER == undefined || process.env.DB_PWD == undefined || process.env.DB_NAME == undefined) {
  throw new Error("SQL local environment not configured");
}

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    trustedConnection: true,
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
  }
}

let clientPromise: Promise<sql.ConnectionPool> = sql.connect(sqlConfig);

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export {clientPromise, sql};