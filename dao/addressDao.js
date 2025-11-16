const { pool } = require('../config/config.js');

module.exports = {
  create: async (addDetails) => {
    try {
      const client = await pool.connect();
      const queryText = 'INSERT INTO address(email, line1, line2, country, city, pin) VALUES($1, $2, $3,$4,$5,$6) RETURNING *';
      const values = [addDetails.email, addDetails.line1, addDetails.line2, addDetails.country, addDetails.city,addDetails.pin];
      const result = await client.query(queryText, values);
      client.release();
      return result.rows[0];
    } catch (err) {
      console.error('Error executing add address query:', err);
      throw err;
    }
  },
  get: async (email) => {
    try {
      const client = await pool.connect();
      const queryText = 'SELECT * FROM address where email = $1';
      const values = [email];
      const result = await client.query(queryText, values);
      client.release();
      return result.rows.length > 0 ? result.rows[0]: null;
    } catch (err) {
      console.error('Error executing get address query:', err);
      throw err;
    }
  },
  update: async (addDetails,id) => {
    try {
   
      const client = await pool.connect();
      const queryText = 'update address set line1=$1, line2=$2, country=$3, city=$4, pin=$5 where add_id=$6';
      const values = [ addDetails.line1, addDetails.line2, addDetails.country, addDetails.city,addDetails.pin,id];
      const result = await client.query(queryText, values);
      client.release();
      return result.rows[0];
    } catch (err) {
      console.error('Error executing update address query:', err);
      throw err;
    }
  }
};
