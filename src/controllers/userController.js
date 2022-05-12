import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password does not match Confirmation.",
    });
  }
  const usernameExists = await User.exists({ $or: [{ username }, { email }] });
  if (usernameExists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });

    return res.redirect("/login");
  } catch (error) {
    return res
      .status(400)
      .render("join", { pageTitle: "Join", errorMessage: error._Message });
  }
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const getLogin = (req, res) => {
  res.render("Login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Username does not exists",
    });
  }
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  res.redirect("/");
};
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");
