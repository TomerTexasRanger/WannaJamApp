const express = require('express');
const app = express();
const http = require('http').Server(app);
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
//Routes
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
connectDB();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/auth', auth);
app.use('/api/posts', posts);

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Listening on port ${port}`));
