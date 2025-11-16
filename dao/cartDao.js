const { pool } = require('../config/config.js');

module.exports = {
  add: async (cartDetails) => {
    try {
      const client = await pool.connect();
      const queryText = 'INSERT INTO cart(product_id, email, quantity, size) VALUES($1, $2, $3,$4) RETURNING *';
      const values = [cartDetails.product_id, cartDetails.email, cartDetails.quantity, cartDetails.size];
      const result = await client.query(queryText, values);
      client.release();
      return result.rows[0];
    } catch (err) {
      console.error('Error executing add cart query:', err);
      throw err;
    }
  },

  remove: async (cartId) => {
    try {
      const client = await pool.connect();
      const queryText = 'DELETE FROM cart WHERE CART_ID = $1';
      const values = [cartId];
      const result = await client.query(queryText, values);
      client.release();
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      console.error('Error executing delete cart query:', err);
      throw err;
    }
  },
  get: async (email) => {
    try {
      const client = await pool.connect();
      const queryText = `SELECT * FROM cart c, product_details p WHERE c.product_id=p.product_id and email = $1 and order_status='IN_CART'`;
      const values = [email];
      const result = await client.query(queryText, values);
      client.release();
      return result.rows.length > 0 ? result.rows: null;
    } catch (err) {
      console.error('Error executing get cart query:', err);
      throw err;
    }
  },
  getOrders: async (email) => {
    try {
      console.log(email)
      const client = await pool.connect();
      const queryText = `SELECT * FROM cart c, product_details p WHERE c.product_id=p.product_id and email = $1 and order_status<>'IN_CART'`;
      const values = [email];
      const result = await client.query(queryText, values);
      client.release();
      return result.rows.length > 0 ? result.rows: null;
    } catch (err) {
      console.error('Error executing get cart query:', err);
      throw err;
    }
  },
  placeOrders: async(email)=>{
    try {
   
      const client = await pool.connect();
      const queryText = `update cart set order_status='PLACED' where email=$1`;
      const values = [ email];
      const result = await client.query(queryText, values);
      client.release();
      return result.rows[0];
    } catch (err) {
      console.error('Error executing place order  query:', err);
      throw err;
    }
  }
  
};
