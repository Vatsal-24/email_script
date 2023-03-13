const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const { parse } = require("csv-parse");

const emailFunc = require("./Email");
const text = require("./message");

dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.static(`${__dirname}`));
app.get("/", (req, res) => {
  return res.json({ status: "Up and running" });
});
app.use(express.json());

app.listen(process.env.PORT || 5000, () =>
  console.log("Server started listening!")
);

const fun = async () => {
  // let text = await fs.readFileSync("./message.txt", "utf8");

  await fs
    .createReadStream("./data.csv")
    .pipe(parse({ delimiter: ",", from_line: 1 }))
    .on("data", function (row) {
      let info = row[0].split(" ");
      let emailText = text.replace("<<name>>", info[0]);
      let subject = "INFLUENCER MARKETING THROUGH YOUTUBE";
      emailFunc(emailText, info[1], subject);
    });
};

fun();
