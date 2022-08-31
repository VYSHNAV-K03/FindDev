const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const Authenticate = require("../middleware/authenticate");
const USER = require("../modelschemas/userschema");
const wbm = require("wbm");
const { Client } = require("whatsapp-web.js");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SEND_GRIDAPI,
    },
  })
);

router.post("/sendmail", Authenticate, async (req, res) => {
  console.log(req.body);
  try {
    const user = await USER.findById(req.body.id);

    console.log(user.email);

    console.log(req.rootUser.name);

    if (user) {
      user.placement.push({
        company_name: req.rootUser.name,
      });
      await user.save();
      transporter.sendMail({
        from: "vyshnavk891@gmail.com",
        to: user.email,
        subject: "selected for placement",
        html: `
      <p>${req.rootUser.name} select you as their employee</p>
      `,
      });
      res.status(200).send("mail send successfully");

      // const client = new Client();

      // client.on("qr", (qr) => {
      //   // Generate and scan this code with your phone
      //   console.log("QR RECEIVED", qr);
      // });

      // client.on("ready", () => {
      //   console.log("Client is ready!");
      // });

      // client.on("message", (msg) => {
      //   if (msg.body == "!ping") {
      //     msg.reply("pong");
      //   }
      // });

      // res.status(200).send("mail send successfully");

      // // wbm
      // //   .start()
      // //   .then(async () => {
      // //     const phones = ["7012606849"];
      // //     const message = "Good Morning.";
      // //     await wbm.send(phones, message);
      // //   })
      // //   .catch((err) => console.log(err));
    }
  } catch (error) {
    res.status(400).send("there is a problem");
  }
});

module.exports = router;
