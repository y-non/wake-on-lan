const wol = require("wol");

const macAddress = "BC:E9:2F:FB:CB:AC";

wol.wake(macAddress, (err, res) => {
  if (!err) {
    console.log("Sent successfully to computer !");
  } else {
    console.log("Have error when send request: ", err);
  }
});
