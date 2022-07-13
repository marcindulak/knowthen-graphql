import pkg from 'pg';
const { Pool } = pkg;
import humps from 'humps';

const pool = new Pool({
  host: 'database',
  database: 'hackerbook',
  user: 'postgres'
});

function logQuery (sql, params) {
  console.log('BEGIN-------------------------------------');
  console.log('SQL:', sql);
  console.log('PARAMS:', JSON.stringify(params));
  console.log('END---------------------------------------');
};

async function query(sql, params) {
  const client = await pool.connect();
  logQuery(sql, params);
  try {
    const result = await client.query(sql, params);
    const rows = humps.camelizeKeys(result.rows);
    return { ...result, rows };
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}

export default query;
