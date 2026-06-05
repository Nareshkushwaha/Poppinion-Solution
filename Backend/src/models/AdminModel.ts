import pool from '../config/db';

// Database queries sirf Model mein rahengi (True MVC Pattern)
export class AdminModel {
  
  // Email se profile laane ki query
  static async getByEmail(email: string) {
    const [rows]: any = await pool.query(
      'SELECT name, email, phone, designation, bio, photo FROM admins WHERE email = ?',
      [email]
    );
    return rows;
  }

  // Profile update karne ki query
  static async updateProfile(name: string, phone: string, designation: string, bio: string, photo: string, email: string) {
    const query = `
      UPDATE admins 
      SET name = ?, phone = ?, designation = ?, bio = ?, photo = ? 
      WHERE email = ?
    `;
    const [result]: any = await pool.query(query, [name, phone, designation, bio, photo, email]);
    return result;
  }
}