var express = require('express');
var app = express();
var port = process.env.PORT || 3000

app.use(express.static(__dirname + "/public"));

// Use port 3000
app.listen(port);
console.log("Sever running on port " + port);
