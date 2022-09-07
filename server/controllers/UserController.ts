import express from "express";
import db from "../db/models";

class UserController {
  async getUserById(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const foundUser = await db.users.findOne({ where: { id } });
      if (!foundUser) {
        return res.status(400).send("User not found");
      }
      return res.status(200).send(foundUser.toJSON());
    } catch (e) {
      return res.status(400).send("Server error");
    }
  }
}

export default new UserController();
