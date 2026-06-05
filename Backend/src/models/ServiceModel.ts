import pool from '../config/db';

export class ServiceModel {
  static async getAll(): Promise<any[]> {
    const [rows]: any = await pool.query('SELECT * FROM services ORDER BY created_at DESC');
    return rows;
  }

  static async getById(id: string): Promise<any[]> {
    const [rows]: any = await pool.query('SELECT * FROM services WHERE id = ?', [id]);
    return rows;
  }

  static async create(data: any): Promise<any> {
    const query = `INSERT INTO services (id, title, slug, shortDescription, fullDescription, featuredImage, galleryImages, benefits, features, faq, seoTitle, seoDescription, seoKeywords, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result]: any = await pool.query(query, [data.id, data.title, data.slug, data.shortDescription, data.fullDescription, data.featuredImage, JSON.stringify(data.galleryImages), JSON.stringify(data.benefits), JSON.stringify(data.features), JSON.stringify(data.faq), data.seoTitle, data.seoDescription, data.seoKeywords, data.status]);
    return result;
  }

  static async update(id: string, data: any): Promise<any> {
    const query = `UPDATE services SET title=?, slug=?, shortDescription=?, fullDescription=?, featuredImage=?, galleryImages=?, benefits=?, features=?, faq=?, seoTitle=?, seoDescription=?, seoKeywords=?, status=? WHERE id=?`;
    const [result]: any = await pool.query(query, [data.title, data.slug, data.shortDescription, data.fullDescription, data.featuredImage, JSON.stringify(data.galleryImages), JSON.stringify(data.benefits), JSON.stringify(data.features), JSON.stringify(data.faq), data.seoTitle, data.seoDescription, data.seoKeywords, data.status, id]);
    return result;
  }

  static async delete(id: string): Promise<any> {
    const [result]: any = await pool.query('DELETE FROM services WHERE id = ?', [id]);
    return result;
  }
}