const pool = require("../database")

/* *****************************
* Return favorite data using email address
* ***************************** */
async function getFavoritesByAccount(account_id) {
  try {
    const sql = await pool.query(
      'SELECT * FROM favorites JOIN inventory ON favorites.inv_id = inventory.inv_id WHERE favorites.account_id = $1',
      [account_id])
    return sql.rows
  } catch (error) {
    return new Error("No matching account found")
  }
}

/* *****************************
* Return favorite data
* ***************************** */
async function addFavorite(account_id, inv_id) {
  try {
    const sql = await pool.query(
      "INSERT INTO favorites (account_id, inv_id) VALUES ($1, $2) RETURNING *",
      [account_id, inv_id])
    return sql.rows[0]
  } catch (error) {
    return error.message
  }
}

/* ***************************
 *  Delete Favorite Item
 * ************************** */
 async function removeFromFavorite(account_id, inv_id) {
  try {
    const sql = "DELETE FROM favorites WHERE account_id = $1 AND inv_id = $2"
    const data = await pool.query(sql, [account_id, inv_id])
  return data
  } catch (error) {
    new Error("Delete item Error")
  }
}

/* ***************************
 *  Check if Favorite Exists
 * ************************** */
 async function checkIFavoriteExists(account_id, inv_id) {
  try {
    const sql = "SELECT * FROM favorites WHERE account_id = $1 AND inv_id = $2"
    const data = await pool.query(sql, [account_id, inv_id])
    return data.rowCount
  } catch (error) {
    return error.message
  }
}


module.exports = {addFavorite, removeFromFavorite, checkIFavoriteExists, getFavoritesByAccount}