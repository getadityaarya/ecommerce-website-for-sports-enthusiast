const { pool } = require('../config/config.js');

module.exports = {
  create: async (userDetails) => {
    try {
      const client = await pool.connect();
      const queryText = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *';
      const values = [userDetails.username, userDetails.email, userDetails.password];
      console.log('Executing create query:', queryText, values);
      const result = await client.query(queryText, values);
      client.release();
      return result.rows[0];
    } catch (err) {
      console.error('Error executing create query:', err);
      throw err;
    }
  },

  findByEmail: async (email) => {
    try {
      const client = await pool.connect();
      const queryText = 'SELECT * FROM users WHERE email = $1';
      const values = [email];
      console.log('Executing findByEmail query:', queryText, values);
      const result = await client.query(queryText, values);
      client.release();
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      console.error('Error executing findByEmail query:', err);
      throw err;
    }
  },
};
