import User from "../models/User";
import { createPasswordHash } from "../services/auth";

class UsersController {
  async index(req, res) {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" }); // evitar passar informações de log de err no servidor
    }
  }

  async showUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id); //  or find one({_id: id})
      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const { username, password, nivelUser } = req.body;
      const user = await User.findOne({ username }); // verify if already exists username

      if (user) {
        return res
          .status(422)
          .json({ message: `username ${username} already exists.` });
      }

      const encryptedPassword = await createPasswordHash(password);
      const newuser = await User.create({
        username,
        password: encryptedPassword,
        nivelUser,
      });

      return res.status(201).json(newuser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { username, password, nivelUser } = req.body;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: `User ${id} does not exists` });
      }

      const encryptedPassword = await createPasswordHash(password);
      await user.updateOne({
        username,
        password: encryptedPassword,
        nivelUser,
      });
      return res.status(200).json({ message: "user updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User does not exists" });
      }

      await user.deleteOne({ _id: id });
      res.status(200).json({message: "User removed"})

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new UsersController();
