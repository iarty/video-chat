import express from "express";
const router = express.Router();
// import { logger } from "../configs/logger";
import db from "../db/models";
import { passport } from "../configs/passport";
import { generateJwtToken } from "../utils/generateJWT";

//Google auth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  function (req, res) {
    try {
      if (!req.user) {
        return res.send("Error");
      }

      const token = generateJwtToken(req.user);
      res.cookie("jwt", token);

      res.send(`
        <script>
            window.opener.postMessage('${JSON.stringify(req.user)}','${
        process.env.FRONT_URL
      }');
            window.close()
        </script>
        `);
    } catch (e) {
      console.log(e);
    }
  }
);

//Github auth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/", session: false }),
  function (req, res) {
    try {
      if (!req.user) {
        return res.send("Error");
      }

      const token = generateJwtToken(req.user);
      res.cookie("jwt", token);

      res.send(`
        <script>
            window.opener.postMessage('${JSON.stringify(req.user)}','${
        process.env.FRONT_URL
      }');
            window.close()
        </script>
        `);
    } catch (e) {
      console.log(e);
    }
  }
);

router.post(
  "/phone",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { phone, id: user_id } = req.body;
    console.log(req.user);
    // const { id: user_id } = req.user;
    const code = Math.floor(1000 + Math.random() * 9000);

    if (!phone) {
      return res.status(400).send("Phone number not find");
    }

    const created = await db.codes.create({
      user_id,
      code,
      phone,
    });
    console.log(created);
  }
);

export default router;
