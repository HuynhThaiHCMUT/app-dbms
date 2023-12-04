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

let clientPromise: Promise<sql.ConnectionPool>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalSQL = global as typeof globalThis & {
    _sqlClientPromise?: Promise<sql.ConnectionPool>
  }

  if (!globalSQL._sqlClientPromise) {
    globalSQL._sqlClientPromise = sql.connect(sqlConfig);
  }
  clientPromise = globalSQL._sqlClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = sql.connect(sqlConfig);
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;