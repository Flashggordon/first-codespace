  // Create web server
  var express = require('express');
  var app = express();
  // Serve static files
  app.use(express.static('public'));
  // Create server
  var server = require('http').createServer(app);
  // Socket.io
  var io = require('socket.io')(server);
  // Listen for connections
  server.listen(8080, function() {
    console.log('Server listening on port 8080');
  });
  // Listen for socket connections
  io.on('connection', function(client) {
    console.log('Client connected...');
    // Listen for new comment
    client.on('comment', function(data) {
      // Broadcast comment to all connected clients
      io.emit('comment', data);
    });
  });
  // Path: public/index.html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Comments</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <div id="comments">
        <ul id="comments-list"></ul>
        <form id="comment-form">
          <input type="text" id="comment-input" placeholder="Add a comment...">
          <input type="submit" value="Send">
        </form>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js"></script>
      <script src="comments.js"></script>
    </body>
  </html>
  // Path: public/comments.js
  // Connect to socket.io server
  var socket = io.connect('http://localhost:8080');
  // Listen for comment
  socket.on('comment', function(data) {
    // Add comment to page
    addComment(data);
  });
  // Add comment to page
  function addComment(data) {
    // Create elements
    var commentList = document.getElementById('comments-list'),
        name = document.createElement('strong'),
        comment = document.createElement('span'),
        li = document.createElement('li');
    // Set text content
    name.textContent = data.name;
    comment.textContent = data.comment;
    // Add elements to li
    li.appendChild(name);
    li.appendChild(comment);
    // Add li to ul
    commentList.appendChild(li);
  }
  // Path: public/style.css
  * {
    margin:  








