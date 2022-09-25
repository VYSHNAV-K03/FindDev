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
      var c = 0;
      user.placement.map((item) => {
        if (item.company_name === req.rootUser.name) {
          c++;
        }
      });
      if (c > 0) {
        console.log("already present");
        const result = await USER.findOneAndUpdate(
          { "placement.company_name": req.rootUser.name },
          {
            $set: {
              "placement.$.level_of_placement": "5",
              "placement.$.current_status": "1",
              "placement.$.response": "1",
            },
          }
        );

        // transporter.sendMail({
        //   from: "vyshnavk891@gmail.com",
        //   to: user.email,
        //   subject: "selected for placement",
        //   html: `
        //       <p>${req.rootUser.name} select you as their employee</p>
        //       <p>pls click <a href="http://localhost:3000/rsvp1">link</a> to submit or cancel the proposal</p>

        //       `,
        // });
        // if (date) {
        // setInterval(() => {
        //   const date = new Date();
        //   if (
        //     new Date("2022-09-23T17:40:00.058Z") - date < 240000 &&
        //     new Date("2022-09-23T17:40:00.058Z") - date > 0
        //   ) {
        //     transporter.sendMail({
        //       from: "vyshnavk891@gmail.com",
        //       to: user.email,
        //       subject: "selected for placement",
        //       html: `
        //     <p>${req.rootUser.name} select you as their employee</p>
        //     <p>pls click <a href="http://localhost:3000/rsvp1">link</a> to submit or cancel the proposal</p>
        //     `,
        //     });
        //   }
        // }, 60000);
        // }
      } else {
        console.log("new");
        user.placement.push({
          company_name: req.rootUser.name,
          level_of_placement: 0, //it will get from body
          current_status: 1,
          response: 0,
        });

        // transporter.sendMail({
        //   from: "vyshnavk891@gmail.com",
        //   to: user.email,
        //   subject: "selected for placement",
        //   html: `
        //       <p>${req.rootUser.name} select you </p>
        //       <p>pls click <a href="http://localhost:3000/rsvp1">link</a> to submit or cancel the proposal</p>

        //       `,
        // });

        await user.save();
      }
      user.notifications.push({
        company_name: req.rootUser.name,
        level_of_placement: 0,
        date: "2022-05-21",
        time: "9:00 am",
        type_exam: 1,
        mode: 0,
      });
      await user.save();
      // setInterval(() => {
      //   const date = new Date();
      //   if (
      //     new Date("2022-09-23T17:40:00.058Z") - date < 240000 &&
      //     new Date("2022-09-23T17:40:00.058Z") - date > 0
      //   ) {
      //     transporter.sendMail({
      //       from: "vyshnavk891@gmail.com",
      //       to: user.email,
      //       subject: "selected for placement",
      //       html: `
      //     <p>${req.rootUser.name} select you as their employee</p>
      //     <p>pls click <a href="http://localhost:3000/rsvp1">link</a> to submit or cancel the proposal</p>

      //     `,
      //     });
      //   }
      // }, 60000);

      res.status(200).send("mail send successfully");
    }
  } catch (error) {
    res.status(400).send("there is a problem");
  }
});

module.exports = router;
