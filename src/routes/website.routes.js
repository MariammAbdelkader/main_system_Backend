const express = require("express");
const { login, signup, confirm } = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/authentication.middlewares");
const { createWebsite } = require("../controllers/website.controllers");

const authRouter =express.Router();


authRouter.post("/signup",signup)

authRouter.post("/confirm",confirm)

authRouter.post("/login", login)

authRouter.post("/website",createWebsite)


authRouter.get("/test",authMiddleware,(req,res)=>{
    res.json("hello")
})

module.exports={authRouter}