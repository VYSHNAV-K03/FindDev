const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const Authenticate = require("../middleware/authenticate");
const USER = require("../modelschemas/userschema");

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
      transporter.sendMail({
        from: "vyshnavk891@gmail.com",
        to: user.email,
        subject: "selected for placement",
        html: `
      <p>${req.rootUser.name} select you as their employee</p>
      `,
      });
      res.status(200).send("mail send successfully");
    }
  } catch (error) {
    res.status(400).send("there is a problem");
  }
});

module.exports = router;
