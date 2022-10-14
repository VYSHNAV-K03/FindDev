const express = require("express");
const { upload } = require("../helpers/filehelper");
const Authenticate = require("../middleware/authenticate");
const USER = require("../modelschemas/userschema");
const router = express.Router();
const fs = require("fs");
const wbm = require("wbm");

router.post(
  "/upload_stud",
  upload.fields([
    {
      name: "sslc_certificate",
    },
    {
      name: "plustwo_certificate",
    },
  ]),
  Authenticate,
  async (req, res) => {
    // console.log(req.files);

    const final_path_sslc =
      req.files.sslc_certificate[0] && req.files.sslc_certificate[0].path;

    const base64_sslc =
      req.files.sslc_certificate[0] &&
      fs.readFileSync(final_path_sslc, "base64");

    const buffer_sslc =
      req.files.sslc_certificate[0] && Buffer.from(base64_sslc, "base64");

    const final_path__plustwo =
      req.files.plustwo_certificate[0] && req.files.plustwo_certificate[0].path;

    const base64_plustwo =
      req.files.plustwo_certificate[0] &&
      fs.readFileSync(final_path__plustwo, "base64");

    const buffer_plustwo =
      req.files.plustwo_certificate[0] && Buffer.from(base64_plustwo, "base64");

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
      hindi,
      malayalam,
      developer_status,
      dev_description,
      nodev_status,
      git,
      linkedin,
      college_name,
      branch,
      year,
      cgpa,
      backpapers,
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

    console.log(python);

    var user_id = req.userID;
    const userUpdate = await USER.findByIdAndUpdate(user_id, {
      education: [
        {
          institution_name: college_name,
          branch: branch,
          year: year,
          cgpa: cgpa,
          back_papers: backpapers,
          sslc: [
            {
              phy: sscl_phy,
              che: sscl_che,
              maths: sscl_maths,
              english: sslc_english,
              sslc_cer: {
                data: req.files.sslc_certificate[0] && buffer_sslc,
                contentType:
                  req.files.sslc_certificate[0] &&
                  req.files.sslc_certificate[0].mimetype,
              },
            },
          ],
          plustwo: [
            {
              phy: plustwo_phy,
              che: plustwo_che,
              maths: plustwo_maths,
              english: plustwo_english,
              cs: plustwo_cs,
              plustwo_cer: {
                data: req.files.plustwo_certificate[0] && buffer_plustwo,
                contentType:
                  req.files.plustwo_certificate[0] &&
                  req.files.plustwo_certificate[0].mimetype,
              },
            },
          ],
        },
      ],
      coding: [
        {
          nodev_desc: nodev_status,
          dev_desc: dev_description,

          dev_status: developer_status,

          languages: [
            python === "true"
              ? {
                  language_name: "python",
                  language_level: python_level,
                }
              : {
                  language_name: "null",
                  language_level: "null",
                },
            c === "true"
              ? {
                  language_name: "c",
                  language_level: c_level,
                }
              : {
                  language_name: "null",
                  language_level: "null",
                },
            js === "true"
              ? {
                  language_name: "js",
                  language_level: js_level,
                }
              : {
                  language_name: "null",
                  language_level: "null",
                },
            cplus === "true"
              ? {
                  language_name: "c++",
                  language_level: cplus_level,
                }
              : {
                  language_name: "null",
                  language_level: "null",
                },
            sql === "true"
              ? {
                  language_name: "sql",
                  language_level: sql_level,
                }
              : {
                  language_name: "null",
                  language_level: "null",
                },
          ],
          communication_languages: [
            english === "true"
              ? {
                  language_name: "english",
                }
              : {
                  language_name: "null",
                },
            hindi === "true"
              ? {
                  language_name: "hindi",
                }
              : {
                  language_name: "null",
                },
            malayalam === "true"
              ? {
                  language_name: "malayalam",
                }
              : {
                  language_name: "null",
                },
          ],

          links: [
            {
              github: git,
              linkedin: linkedin,
            },
          ],
        },
      ],
    });
    res.send(userUpdate);
    console.log(req.body);
    // console.log(userUpdate);
  }
);

router.post("/get_stud", async (req, res) => {
  try {
    if (req.body.id && req.body.id !== "null" && req.body.id !== "undefined") {
      const user = await USER.find()
        .where("_id")
        .in(req.body.id.map((item, i) => item))
        .exec();

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

router.post("/get_filter_stud", Authenticate, async (req, res) => {
  const {
    python,
    c,
    cplus,
    js,
    sql,
    dev_tech,
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
    hindi,
    malayalam,
    level_placement,
    response,
    compa_name,
  } = req.body;

  console.log("filtering_students", req.body);

  const user = await USER.find({
    $or: [
      python
        ? {
            "coding.languages": {
              $elemMatch: {
                language_name: "python",
              },
            },
          }
        : {
            "coding.languages": { $elemMatch: { language_name: "werdkdk" } },
          },
      c
        ? {
            "coding.languages": {
              $elemMatch: { language_name: "c" },
            },
          }
        : {
            "coding.languages": { $elemMatch: { language_name: "wefdfkr" } },
          },
      js
        ? {
            "coding.languages": {
              $elemMatch: { language_name: "js" },
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
              },
            },
          }
        : {
            "coding.languages": { $elemMatch: { language_name: "wer" } },
          },
      dev_tech
        ? {
            coding: {
              $elemMatch: {
                dev_status: dev_tech,
              },
            },
          }
        : {
            coding: {
              $elemMatch: {
                dev_status: "satheesh",
              },
            },
          },

      sslc_maths
        ? {
            "education.sslc": { $elemMatch: { maths: { $gte: sslc_maths } } },
          }
        : {
            education: {
              $elemMatch: { branch: "sumeshji" },
            },
          },

      sslc_che
        ? {
            "education.sslc": { $elemMatch: { che: { $gte: sslc_che } } },
          }
        : {
            education: {
              $elemMatch: { branch: "sumeshji" },
            },
          },
      sslc_phy
        ? {
            "education.sslc": {
              $elemMatch: { phy: { $gte: sslc_phy } },
            },
          }
        : {
            education: {
              $elemMatch: { branch: "sumeshji" },
            },
          },

      plustwo_maths
        ? {
            "education.plustwo": {
              $elemMatch: { maths: { $gte: plustwo_maths } },
            },
          }
        : {
            education: {
              $elemMatch: { branch: "sumeshji" },
            },
          },
      plustwo_che
        ? {
            "education.plustwo": { $elemMatch: { che: { $gte: plustwo_che } } },
          }
        : {
            education: {
              $elemMatch: { branch: "sumeshji" },
            },
          },
      plustwo_phy
        ? {
            "education.plustwo": {
              $elemMatch: { phy: { $gte: plustwo_phy } },
            },
          }
        : {
            education: {
              $elemMatch: { branch: "sumeshji" },
            },
          },
      year
        ? {
            education: {
              $elemMatch: { year: { $eq: year } },
            },
          }
        : {
            education: {
              $elemMatch: { branch: "sumeshji" },
            },
          },
      cgpa
        ? {
            education: {
              $elemMatch: { cgpa: { $gte: cgpa } },
            },
          }
        : {
            education: {
              $elemMatch: { branch: "sumeshji" },
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
              $elemMatch: { branch: "sumeshji" },
            },
          },
      branch
        ? {
            education: {
              $elemMatch: { branch: branch },
            },
          }
        : {
            education: {
              $elemMatch: { branch: "sumeshji" },
            },
          },

      level_placement
        ? {
            placement: {
              $elemMatch: {
                company_name: req.rootUser.name,
                level_of_placement: level_placement,
              },
            },
          }
        : {
            education: {
              $elemMatch: { branch: "sumeshji" },
            },
          },

      response && response !== ""
        ? {
            placement: {
              $elemMatch: {
                company_name: req.rootUser.name,
                response: response === "p" ? 0 : response === "a" ? 1 : 2,
              },
            },
          }
        : {
            education: {
              $elemMatch: { branch: "sumeshji" },
            },
          },

      compa_name && compa_name !== ""
        ? {
            placement: {
              $elemMatch: {
                company_name: compa_name,
              },
            },
          }
        : {
            education: {
              $elemMatch: { branch: "sumeshji" },
            },
          },
      english
        ? {
            "coding.communication_languages": {
              $elemMatch: {
                language_name: "english",
              },
            },
          }
        : {
            "coding.communication_languages": {
              $elemMatch: {
                language_name: "sumesh",
              },
            },
          },

      hindi
        ? {
            "coding.communication_languages": {
              $elemMatch: {
                language_name: "hindi",
              },
            },
          }
        : {
            "coding.communication_languages": {
              $elemMatch: {
                language_name: "sumesh",
              },
            },
          },
      malayalam
        ? {
            "coding.communication_languages": {
              $elemMatch: {
                language_name: "malayalam",
              },
            },
          }
        : {
            "coding.communication_languages": {
              $elemMatch: {
                language_name: "sumesh",
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
