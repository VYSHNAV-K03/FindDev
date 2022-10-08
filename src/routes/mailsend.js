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
      if (c === 0) {
        console.log("new");
        user.placement.push({
          company_name: req.rootUser.name,
          level_of_placement: 0, //it will get from body
          current_status: 1,
          response: 0,
        });

        const new_interval = setInterval(() => {
          console.log("new ramesh");
          user.placement
            .filter((item) => item.company_name === req.rootUser.name)
            .map(async (element) => {
              if (element.response === 0) {
                await USER.findOneAndUpdate(
                  {
                    _id: req.body.id,
                    "placement.company_name": req.rootUser.name,
                  },
                  {
                    $set: {
                      "placement.$.level_of_placement": "0",
                      "placement.$.current_status": "1",
                      "placement.$.response": "2",
                    },
                  }
                );
              }
            });
          clearInterval(new_interval);
        }, 60000);

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
      } else {
        console.log("already present");
        if (req.body.date_new) {
          console.log("suemsh");
          await USER.findOneAndUpdate(
            { _id: req.body.id, "placement.company_name": req.rootUser.name },
            {
              $set: {
                "placement.$.level_of_placement": req.body.level_exam,
                "placement.$.current_status": "1",
                "placement.$.response": "0",
              },
            }
          );
        } else {
          console.log("ramesh");

          await USER.findOneAndUpdate(
            { _id: req.body.id, "placement.company_name": req.rootUser.name },
            {
              $set: {
                "placement.$.level_of_placement": "0",
                "placement.$.current_status": "1",
                "placement.$.response": "0",
              },
            }
          );
        }
        await user.save();

        const user_after_update = await USER.findById(req.body.id);
        if (user_after_update) {
          const My_interval = setInterval(() => {
            console.log("interval ramesh");

            user_after_update.placement
              .filter((sumesh) => sumesh.company_name === req.rootUser.name)
              .map(async (ramesh) => {
                console.log("rameshresponse", ramesh.response);
                if (ramesh.response === 0) {
                  await USER.findOneAndUpdate(
                    {
                      _id: req.body.id,
                      "placement.company_name": req.rootUser.name,
                    },
                    {
                      $set: {
                        "placement.$.level_of_placement": "0",
                        "placement.$.current_status": "1",
                        "placement.$.response": "2",
                      },
                    }
                  );
                }
              });
            clearInterval(My_interval);
          }, 60000);
        }
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
      }
      if (req.body.date_new) {
        console.log("hareesh");
        user.notifications.push({
          company_name: req.rootUser.name,
          level_of_placement: req.body.level_exam,
          date: req.body.date_new,
          type_exam: req.body.exam_type,
          mode: req.body.exam_mode,
          requirements: [
            {
              laptop: req.body.requirements.laptop,
              internet: req.body.requirements.internet,
              more: req.body.requirements.description,
            },
          ],
        });
        await user.save();
      } else {
        console.log("sathashivan");

        user.notifications.push({
          company_name: req.rootUser.name,
          level_of_placement: "0",
        });
        await user.save();
      }
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
    } else {
      res.status(200).send("user not found");
    }
  } catch (error) {
    res.status(400).send("there is a problem");
  }
});

router.post("/send_student_response", Authenticate, async (req, res) => {
  console.log(req.body);
  try {
    const user = await USER.findOneAndUpdate(
      { _id: req.userID, "placement.company_name": req.body.name },
      {
        $set: {
          "placement.$.response": req.body.response ? "1" : "2",
        },
      }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("send_stud_response error", error);
  }
});

module.exports = router;
