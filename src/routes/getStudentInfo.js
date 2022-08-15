const express = require("express");
const { upload } = require("../helpers/filehelper");
const Authenticate = require("../middleware/authenticate");
const USER = require("../modelschemas/userschema");
const router = express.Router();

router.post("/upload_stud", Authenticate, async (req, res) => {
  const {
    python,
    c,
    cplus,
    js,
    sql,
    python_level,
    c_level,
    js_level,
    sql_level,
    cplus_level,
    english,
    english_level,
    hindi,
    hindi_level,
    developer,
    developer_status,
    work,
    git,
    linkedin,
    college_name,
    branch,
    year,
    cgpa,
    sscl_maths,
    sscl_phy,
    sscl_che,
    sslc_english,
    plustwo_maths,
    plustwo_phy,
    plustwo_che,
    plustwo_english,
    plustwo_cs,
  } = req.body;
  var user_id = req.userID;
  const userUpdate = await USER.findByIdAndUpdate(user_id, {
    education: [
      {
        institution_name: college_name,
        course: branch,
        year: year,
        cgpa: cgpa,
        sslc: [
          {
            phy: sscl_phy,
            che: sscl_che,
            maths: sscl_maths,
            english: sslc_english,
          },
        ],
        plustwo: [
          {
            phy: plustwo_phy,
            che: plustwo_che,
            maths: plustwo_maths,
            english: plustwo_english,
            cs: plustwo_cs,
          },
        ],
      },
    ],
    coding: [
      {
        languages: [
          python
            ? {
                language_name: "python",
                language_level: python_level,
              }
            : {},
          c
            ? {
                language_name: "c",
                language_level: c_level,
              }
            : {},
          js
            ? {
                language_name: "js",
                language_level: js_level,
              }
            : {},
          cplus
            ? {
                language_name: "c++",
                language_level: cplus_level,
              }
            : {},
          sql
            ? {
                language_name: "sql",
                language_level: sql_level,
              }
            : {},
        ],
        communication_languages: [
          english
            ? {
                language_name: "english",
                language_level: english_level,
              }
            : {},
          hindi
            ? {
                language_name: "hindi",
                language_level: hindi_level,
              }
            : {},
        ],
        development: [
          developer
            ? {
                developer: developer_status,
              }
            : {},
        ],
        working_status: work,
        links: [
          {
            github: git,
            linkedin: linkedin,
          },
        ],
      },
    ],
    ver:
      python ||
      c ||
      cplus ||
      js ||
      (sql && english) ||
      (hindi &&
        developer &&
        developer_status &&
        work &&
        git &&
        linkedin &&
        college_name &&
        branch &&
        year &&
        cgpa &&
        sscl_maths &&
        sscl_phy &&
        sscl_che &&
        sslc_english &&
        plustwo_maths &&
        plustwo_phy &&
        plustwo_che &&
        plustwo_english &&
        plustwo_cs)
        ? 1
        : 0,
  });
  res.send(userUpdate);
});

router.post("/get_stud", async (req, res) => {
  try {
    if (req.body.id) {
      const user = await USER.find().where("_id").in(req.body.id).exec();
      res.send(user);
    } else {
      const user = await USER.find();
      res.send(user);
    }
    // console.log(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/get_stud_admin_want", async (req, res) => {
  try {
    var id = req.body.id;
    const user = await USER.findById(id);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/get_stud_profile", Authenticate, async (req, res) => {
  var id = req.userID;
  console.log(id);
  try {
    const user = await USER.findById(id);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/get_filter_stud", async (req, res) => {
  const {
    python,
    c,
    cplus,
    js,
    sql,
    python_level,
    c_level,
    cplus_level,
    js_level,
    sql_level,
    web_dev,
    app_dev,
    game_dev,
    ai_dev,
    iot,
    cad,
    robotics,
    sslc_maths,
    sslc_phy,
    sslc_che,
    plustwo_phy,
    plustwo_che,
    plustwo_maths,
    year,
    cgpa,
    suppli,
    branch,
    english,
    english_level,
    hindi,
    hindi_level,
  } = req.body;

  console.log("filtering_students", req.body);

  const user = await USER.find({
    $or: [
      python
        ? {
            "coding.languages": {
              $elemMatch: {
                language_name: "python",
                language_level: python_level,
              },
            },
          }
        : {
            "coding.languages": { $elemMatch: { language_name: "werdkdk" } },
          },
      c
        ? {
            "coding.languages": {
              $elemMatch: { language_name: "c", language_level: c_level },
            },
          }
        : {
            "coding.languages": { $elemMatch: { language_name: "wefdfkr" } },
          },
      js
        ? {
            "coding.languages": {
              $elemMatch: { language_name: "js", language_level: js_level },
            },
          }
        : {
            "coding.languages": { $elemMatch: { language_name: "wedfjlkdr" } },
          },
      sql
        ? {
            "coding.languages": {
              $elemMatch: {
                language_name: "sql",
                language_level: sql_level,
              },
            },
          }
        : {
            "coding.languages": { $elemMatch: { language_name: "wer" } },
          },
      cplus
        ? {
            "coding.languages": {
              $elemMatch: {
                language_name: "c++",
                language_level: cplus_level,
              },
            },
          }
        : {
            "coding.languages": { $elemMatch: { language_name: "wer" } },
          },
      web_dev
        ? {
            "coding.development": {
              $elemMatch: {
                developer: "Web Developer",
              },
            },
          }
        : {
            "coding.development": {
              $elemMatch: {
                developer: "satheesh",
              },
            },
          },

      app_dev
        ? {
            "coding.development": {
              $elemMatch: {
                developer: "App Developer",
              },
            },
          }
        : {
            "coding.development": {
              $elemMatch: {
                developer: "satheesh",
              },
            },
          },
      game_dev
        ? {
            "coding.development": {
              $elemMatch: {
                developer: "Game Developer",
              },
            },
          }
        : {
            "coding.development": {
              $elemMatch: {
                developer: "satheesh",
              },
            },
          },
      ai_dev
        ? {
            "coding.development": {
              $elemMatch: {
                developer: "AI Developer",
              },
            },
          }
        : {
            "coding.development": {
              $elemMatch: {
                developer: "satheesh",
              },
            },
          },

      iot
        ? {
            "coding.hardware": {
              $elemMatch: {
                hardware_field: "iot",
              },
            },
          }
        : {
            "coding.hardware": {
              $elemMatch: {
                hardware_field: "satheesh",
              },
            },
          },
      cad
        ? {
            "coding.hardware": {
              $elemMatch: {
                hardware_field: "cad",
              },
            },
          }
        : {
            "coding.hardware": {
              $elemMatch: {
                hardware_field: "satheesh",
              },
            },
          },
      robotics
        ? {
            "coding.hardware": {
              $elemMatch: {
                hardware_field: "robotics",
              },
            },
          }
        : {
            "coding.hardware": {
              $elemMatch: {
                hardware_field: "satheesh",
              },
            },
          },
      sslc_maths < 100
        ? {
            "education.sslc": { $elemMatch: { maths: { $gte: sslc_maths } } },
          }
        : { "education.sslc": { $elemMatch: { maths: "0.1" } } },
      sslc_che < 100
        ? {
            "education.sslc": { $elemMatch: { che: { $gte: sslc_che } } },
          }
        : { "education.sslc": { $elemMatch: { che: "0.1" } } },
      sslc_phy < 100
        ? {
            "education.sslc": {
              $elemMatch: { phy: { $gte: sslc_phy } },
            },
          }
        : { "education.sslc": { $elemMatch: { phy: "0.1" } } },

      plustwo_maths < 100
        ? {
            "education.plustwo": {
              $elemMatch: { maths: { $gte: plustwo_maths } },
            },
          }
        : { "education.plustwo": { $elemMatch: { maths: "0.1" } } },
      plustwo_che < 100
        ? {
            "education.plustwo": { $elemMatch: { che: { $gte: plustwo_che } } },
          }
        : { "education.plustwo": { $elemMatch: { che: "0.1" } } },
      plustwo_phy < 100
        ? {
            "education.plustwo": {
              $elemMatch: { phy: { $gte: plustwo_phy } },
            },
          }
        : { "education.plustwo": { $elemMatch: { phy: "0.1" } } },
      year
        ? {
            education: {
              $elemMatch: { year: { $eq: year } },
            },
          }
        : {
            education: {
              $elemMatch: { year: 0 },
            },
          },
      cgpa < 10
        ? {
            education: {
              $elemMatch: { cgpa: { $gte: cgpa } },
            },
          }
        : {
            education: {
              $elemMatch: { cgpa: { $gte: "sumesh" } },
            },
          },
      suppli
        ? {
            education: {
              $elemMatch: { back_papers: { $lte: suppli } },
            },
          }
        : {
            education: {
              $elemMatch: { back_papers: { $lte: "rajesh" } },
            },
          },
      branch
        ? {
            education: {
              $elemMatch: { course: branch },
            },
          }
        : {
            education: {
              $elemMatch: { course: "sumeshji" },
            },
          },

      english
        ? {
            "coding.communication_languages": {
              $elemMatch: {
                language_name: "english",
                language_level: english_level,
              },
            },
          }
        : {
            "coding.communication_languages": {
              $elemMatch: {
                language_name: "sumesh",
                language_level: "rameh",
              },
            },
          },

      hindi
        ? {
            "coding.communication_languages": {
              $elemMatch: {
                language_name: "hindi",
                language_level: hindi_level,
              },
            },
          }
        : {
            "coding.communication_languages": {
              $elemMatch: {
                language_name: "sumesh",
                language_level: "rameh",
              },
            },
          },
    ],
  });
  res.send(user);
});

router.post("/get_filter_stud_college_admin", async (req, res) => {
  console.log(req.body);

  const {
    filter_content,
    filter_interview,
    filter_interview_attended,
    filter_placement,
  } = req.body;

  const user = await USER.find({
    $or: [
      filter_content === "interview"
        ? {
            "college_admin.interview": {
              $elemMatch: filter_interview && {
                attended: filter_interview,
                selected:
                  filter_interview !== "Filter" && filter_interview_attended,
              },
            },
          }
        : {},
    ],
  });

  res.send(user);
});

module.exports = router;
