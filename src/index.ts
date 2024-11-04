import express from 'express';
import courseRoutes from './routes/courseRoutes';
import logger from './middleware/logger';
import http from 'http';

const app = express();
const PORT = 3000;
const server = http.createServer(app);

// for parsing json data
app.use(express.json());

// for parsing form data
app.use(express.urlencoded({ extended: true }));

// html files are in src/public folder
app.use(express.static('src/public'));


// logger 
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Course Management System API is running');
});

app.use('/courses', courseRoutes);

// start the server
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export {server , app};
