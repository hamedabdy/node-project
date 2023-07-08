class Database {
  constructor(pool) {
    this.pool = pool;
  }

  async query(sql, params) {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query(sql, params);
      return rows;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  }

  async select(table, where) {
    let sql = `SELECT * FROM ${table}`;
    if (where) {
      sql += ' WHERE ' + Object.entries(where).map(([k, v]) => `${k} = ?`).join(' AND ');
    }
    return await this.query(sql, Object.values(where));
  }

  async insert(table, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.map(() => '?').join(', ')})`;
    return await this.query(sql, values);
  }

  async update(table, data, where) {
    const set = Object.entries(data).map(([k, v]) => `${k} = ?`).join(', ');
    let sql = `UPDATE ${table} SET ${set}`;
    if (where) {
      sql += ' WHERE ' + Object.entries(where).map(([k, v]) => `${k} = ?`).join(' AND ');
    }
    return await this.query(sql, [...Object.values(data), ...Object.values(where)]);
  }

  async delete(table, where) {
    let sql = `DELETE FROM ${table}`;
    if (where) {
      sql += ' WHERE ' + Object.entries(where).map(([k, v]) => `${k} = ?`).join(' AND ');
    }
    return await this.query(sql, Object.values(where));
  }
}
