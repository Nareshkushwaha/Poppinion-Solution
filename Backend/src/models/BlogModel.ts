import pool from '../config/db';

export class BlogModel {
  static async getAll(): Promise<any[]> {
    // Fix: created_at ko createdAt kar diya
    const [rows]: any = await pool.query('SELECT * FROM blogs ORDER BY createdAt DESC');
    return rows;
  }

  static async create(data: any): Promise<any> {
    // Fix: AUTO_INCREMENT id hata di, aur metaTitle, metaDescription, keywords add kar diye
    const query = `
      INSERT INTO blogs 
      (title, slug, content, category, tags, featuredImage, metaTitle, metaDescription, keywords, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result]: any = await pool.query(query, [
      data.title, 
      data.slug, 
      data.content, 
      data.category, 
      JSON.stringify(data.tags || []), // Array ko JSON string banaya 
      data.featuredImage, 
      data.metaTitle, 
      data.metaDescription, 
      data.keywords, 
      data.status
    ]);
    return result;
  }

  static async update(id: string, data: any): Promise<any> {
    // Fix: Update query mein bhi meta fields aur keywords theek kar diye
    const query = `
      UPDATE blogs SET 
      title=?, slug=?, content=?, category=?, tags=?, featuredImage=?, 
      metaTitle=?, metaDescription=?, keywords=?, status=? 
      WHERE id=?
    `;
    
    const [result]: any = await pool.query(query, [
      data.title, 
      data.slug, 
      data.content, 
      data.category, 
      JSON.stringify(data.tags || []), 
      data.featuredImage, 
      data.metaTitle, 
      data.metaDescription, 
      data.keywords, 
      data.status, 
      id
    ]);
    return result;
  }

  static async delete(id: string): Promise<any> {
    const [result]: any = await pool.query('DELETE FROM blogs WHERE id = ?', [id]);
    return result;
  }
}