import express from "express";
import { generateJwtToken } from "../utils/generateJWT";
import db from "../db/models";
import { generateCode } from "../utils/generateCode";
import { IUserData } from "../types";

class AuthController {
  googleCb(req: express.Request, res: express.Response) {
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

  githubCb(req: express.Request, res: express.Response) {
    {
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
  }

  async getMe(req: express.Request, res: express.Response) {
    res.status(200).json(req.user);
  }

  async registration(req: express.Request, res: express.Response) {
    try {
      const { fullname, avatarUrl } = req.body;
      // const foundUser = await db.users.findOne({
      //   where: {
      //     fullname,
      //   },
      // });
      //
      // if (foundUser) {
      //   return done(null, foundUser.toJSON());
      // } else {
      const data: IUserData = {
        fullname,
        avatarUrl,
        isActive: 0,
        username: "",
        phone: "",
        provider: "",
      };

      const createdUser = await db.users.create(data);

      if (!createdUser) {
        return res.status(400).json("Registration error");
      }

      if (createdUser) {
        return res.status(200).send(createdUser.toJSON());
      }
      // }
    } catch (e) {
      console.log(e);
    }
  }

  async setPhone(req: express.Request, res: express.Response) {
    try {
      const { phone } = req.body;
      const { id: user_id } = req.user;
      const code = generateCode();
      if (!phone) {
        return res.status(400).send("Phone number not find");
      }

      const created = await db.codes.create({
        user_id,
        code,
        phone,
      });
      if (created) {
        res.status(201).send(created.toJSON());
      }
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async activate(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const { code, user_id } = await db.codes.findOne({
        where: { id },
      });

      if (!code) {
        return res.status(400).json({ message: "Code not found" });
      }
      await db.users.update({ isActive: 1 }, { where: { id: user_id } });
      const response = await db.codes.destroy({ where: { id } });
      if (response === 1) {
        return res.status(200).json("Code successfully deleted");
      } else {
        return res.status(400).json({ message: "Error deleting" });
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
