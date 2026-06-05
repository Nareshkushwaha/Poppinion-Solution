import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db'; 
import serviceRoutes from './routes/serviceRoutes';
import portfolioRoutes from './routes/portfolioRoutes'; 
import blogRoutes from './routes/blogRoutes';
import careerRoutes from './routes/careerRoutes'; 
import leadRoutes from './routes/leadRoutes'; 
import profileRoutes from './routes/profileRoutes';
import settingsRoutes from './routes/settingsRoutes';
import authRoutes from './routes/authRoutes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Sabhi Routes
app.use('/api/services', serviceRoutes);
app.use('/api/portfolio', portfolioRoutes); 
app.use('/api/blogs', blogRoutes); 
app.use('/api/careers', careerRoutes); 
app.use('/api/leads', leadRoutes); 
app.use('/api/profile', profileRoutes); 
app.use('/api/settings', settingsRoutes);
app.use('/api', authRoutes); // <-- Login/Signup ke routes yahan se chalenge

app.get('/', async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query('SELECT "Database Connected Successfully!" AS message');
    res.json({ success: true, serverMessage: 'Backend ekdum mast chal raha hai! 🚀', dbMessage: rows[0].message });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database connect nahi hua yr!' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Arre yr! Port ${PORT} pehle se koi aur use kar raha hai.`);
  } else {
    console.error('Server error aa gaya yr:', err);
  }
});