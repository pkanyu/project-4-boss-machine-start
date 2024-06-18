const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // Import the path module

module.exports = app;
app.use(express.static("./"));

/* Do not change the following line! It is required for testing and allowing
 *  the frontend application to interact as planned with the api server
 */
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middleware for parsing request bodies here:
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require("./server/api");
app.use("/api", apiRouter);

// Serve the main index.html file for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// This conditional is here for testing purposes:
if (!module.parent) {
  // Add your code to start the server listening at PORT below:
  const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

  // Handle SIGINT for proper server shutdown
  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Process terminated");
      process.exit(0);
    });
  });
}
