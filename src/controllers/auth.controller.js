const { signupService, loginService, confirmService } = require("../services/auth.services");

const login = async (req,res)=>{
    try {
        const { username, password } = req.body;
        const tokens = await loginService(username, password);
        res.status(200).json(tokens);
    } catch (error) {
          res.status(error.status || 500).json({ error: error.message });
    }
}

const signup = async (req, res) => {
  try {
    const { username, password, phone_number, given_name } = req.body;

    const loginResponse = await signupService(
      username,
      password,
      phone_number,
      given_name
    );
    res.status(200).json(loginResponse);
  } catch (error) {
   res.status(error.status || 500).json({ error: error.message });
  }
};

const confirm = async (req, res) => {
  try {
    const { username, code} = req.body;

    const confirmResponse = await confirmService(
      username,
      code
    );
    res.status(200).json(confirmResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports={login,signup,confirm}