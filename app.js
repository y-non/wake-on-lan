const express = require("express");
const wol = require("wol");

const app = express();
const PORT = 3000;

const macAddress = "BC:E9:2F:FB:CB:AC";

app.get("/wake", (req, res) => {
  wol.wake(macAddress, (err, res) => {
    if (!err) {
      console.log("Sent successfully to computer !");
    } else {
      console.log("Have error when send request: ", err);
    }
  });
});

// Serve static files in the 'public' directory (CSS, JS, images, etc.)
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
