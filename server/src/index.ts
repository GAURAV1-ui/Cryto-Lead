import express from 'express';
import route from './routes/testRoute';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/api/example', route);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
