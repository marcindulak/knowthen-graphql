import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'database',
  database: 'hackerbook',
  user: 'postgres'
});

async function query(sql, params) {
  const client = await pool.connect();
  try {
    return client.query(sql, params);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}

export default query;
