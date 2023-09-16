const { app, server } = require("./src/config/app");
const db = require("./src/config/database");

// Start the server
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to the database
db.on("error", console.error.bind(console, "Database connection error:"));
