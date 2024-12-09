const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = 3000; // You can change this to any port you prefer
const MAC_ADDRESS = "bc:e9:2f:fb:cb:ac"; // Replace this with your PC's MAC address

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

// Route to shut down the target computer
app.get("/shutdown", (req, res) => {
  // const macAddress = req.query.mac;
  const targetIP = "172.16.128.197";

  if (!targetIP) {
    return res
      .status(404)
      .send("Target computer not found for the given MAC address.");
  }

  // Use SSH to send the shutdown command
  const command = `ssh yonno@${targetIP} 'shutdown /s /t 0'`; // Adjust for your OS
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send(`Error shutting down the computer: ${stderr}`);
      return;
    }
    console.log("Shutdown command sent successfully:", stdout);
    res.send("Shutdown command sent successfully.");
  });
});

// Route to put the target computer to sleep
app.get("/sleep", (req, res) => {
  // const macAddress = req.query.mac;
  const targetIP = "172.16.128.197";

  if (!targetIP) {
    return res
      .status(404)
      .send("Target computer not found for the given MAC address.");
  }

  // Use SSH to send the sleep command
  const command = `ssh yonno@${targetIP} 'rundll32.exe powrprof.dll,SetSuspendState 0,1,0'`; // Adjust for your OS
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send(`Error putting the computer to sleep: ${stderr}`);
      return;
    }
    console.log("Sleep command sent successfully:", stdout);
    res.send("Sleep command sent successfully.");
  });
});

// Serve static files in the 'public' directory (CSS, JS, images, etc.)
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
