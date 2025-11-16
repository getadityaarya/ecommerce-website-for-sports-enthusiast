const { pool } = require('../config/config.js');

module.exports = {
  getAll: async () => {
    try {
      const client = await pool.connect();
      const queryText = 'SELECT * FROM wproduct_details';
      const result = await client.query(queryText);
      client.release();
      return result.rows.length > 0 ? result.rows : null;
    } catch (err) {
      console.error('Error executing product getAll query:', err);
      throw err;
    }
  },
  getById: async (id) => {
    try {
      const client = await pool.connect();
      const queryText = `SELECT * FROM wproduct_details where product_id=${parseInt(id)}`;
      const result = await client.query(queryText);
      client.release();
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      console.error('Error executing product getById query:', err);
      throw err;
    }
  }
};
