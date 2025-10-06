import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

let server;


if (process.env.NODE_ENV !== 'test') {
  connectDB();
  server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} else {
  
  server = app.listen(PORT);
}
    

export default server;

