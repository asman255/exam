const express = require("express");
const prisma = require("../config/prisma");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const testers = await prisma.tester.findMany();
    res.json(testers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching testers" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tester = await prisma.tester.findUnique({
      where: { id },
    });
    if (!tester) {
      res.status(404).json({ error: "Tester not found" });
    } else {
      res.json(tester);
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching tester" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      id,
      name,
      lastname,
      colorblind,
      longsight,
      astigmatic,
      reflec,
      sign,
      line,
      giveway,
      practice,
    } = req.body;
    console.log(req.body)
    

    const bodyScore = colorblind + longsight + astigmatic + reflec;
    const bodyresult = bodyScore >= 30 ? true : false;
    const theoryScore = sign + line + giveway;
    const theoryresult = theoryScore / 150 >= 0.8 ? true : false;
    const final = bodyresult && theoryresult && practice ? "true" : "false";

    await prisma.tester.upsert({
      where: { id },
      update: {
        id,
        name,
        lastname,
        colorblind,
        longsight,
        astigmatic,
        reflec,
        sign,
        line,
        giveway,
        bodyresult,
        theoryresult,
        final,
        practice,
      },
      create: {
        id,
        name,
        lastname,
        colorblind,
        longsight,
        astigmatic,
        reflec,
        sign,
        line,
        giveway,
        bodyresult,
        theoryresult,
        final,
        practice,
      },
    });

    res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error inserting data" });
    console.log(error)
  }
});






// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       lastname,
//       colorblind,
//       longsight,
//       astigmatic,
//       reflec,
//       sign,
//       line,
//       giveway,
//       practice,
//     } = req.body;

//     const bodyScore = colorblind + longsight + astigmatic + reflec;
//     const bodyresult = bodyScore >= 30 ? true : false;
//     const theoryScore = sign + line + giveway;
//     const theoryresult = theoryScore / 150 >= 0.8 ? true : false;
//     const final = bodyresult && theoryresult && practice ? "true" : "false";

//     await prisma.tester.update({
//       where: { id },
//       data: {
//         name,
//         lastname,
//         bodyresult,
//         theoryresult,
//         final,
//         practice,
//       },
//     });

//     res.status(200).json({ message: "Data updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error updating data" });
//     console.log(error);
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tester.delete({
      where: { id },
    });
    res.status(200).json({ message: "Tester deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting tester" });
    console.log(error);
  }
});

module.exports = router;
