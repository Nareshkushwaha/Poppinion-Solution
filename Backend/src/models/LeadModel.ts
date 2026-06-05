import pool from '../config/db';

export class LeadModel {
  // Fix: SQL column name match kiya (createdAt)
  static async getAll(): Promise<any[]> {
    const [rows]: any = await pool.query('SELECT * FROM leads ORDER BY createdAt DESC');
    return rows;
  }

  static async create(data: any): Promise<any> {
    // Note: Agar database mein 'id' auto-increment hai, toh id send mat karo. 
    // Agar id send kar rahe ho toh yahan rehne do.
    const query = `INSERT INTO leads (name, email, phone, service, message, status) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result]: any = await pool.query(query, [data.name, data.email, data.phone, data.service, data.message, data.status || 'new']);
    return result;
  }

  static async delete(id: string): Promise<any> {
    const [result]: any = await pool.query('DELETE FROM leads WHERE id = ?', [id]);
    return result;
  }

  static async updateStatus(id: string, status: string): Promise<any> {
    const [result]: any = await pool.query('UPDATE leads SET status = ? WHERE id = ?', [status, id]);
    return result;
  }
}