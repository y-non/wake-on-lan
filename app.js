// const express = require("express");
// const wol = require("wol");

// const app = express();
// const PORT = 3000;

// const macAddress = "BC:E9:2F:FB:CB:AC";

// app.get("/wake", (req, res) => {
//   wol.wake(macAddress, (err, res) => {
//     if (!err) {
//       console.log("Sent successfully to computer !");
//     } else {
//       console.log("Have error when send request: ", err);
//     }
//   });
// });

// // Serve static files in the 'public' directory (CSS, JS, images, etc.)
// app.use(express.static("public"));

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = 3000; // You can change this to any port you prefer
const MAC_ADDRESS = "BC:E9:2F:FB:CB:AC"; // Replace this with your PC's MAC address

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
