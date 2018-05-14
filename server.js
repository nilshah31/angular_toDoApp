let express = require('express');
let app = express();
let path = require('path');

// Set Static Folder
app.use(express.static(path.join(__dirname, '/app')));
app.listen(8085);
