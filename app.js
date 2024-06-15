const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = 3000; // You can change this to any port you prefer
const MAC_ADDRESS = "A8:A1:59:32:5C:AC"; // Replace this with your PC's MAC address

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Route to handle waking up the PC
app.get("/wake", (req, res) => {
  exec(`wakeonlan ${MAC_ADDRESS}`, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Error waking up the PC");
      return;
    }
    console.log("Magic packet sent successfully");
    res.send("Magic packet sent successfully");
  });
});

// Serve static files in the 'public' directory (CSS, JS, images, etc.)
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
