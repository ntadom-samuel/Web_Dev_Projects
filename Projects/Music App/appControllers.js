//TODO: FIX THIS
const User = require("./API");

exports.createUserProfile = (username, password) => {
  try {
    newUser = new User({
      user_name: username,
      password: password,
    });

    newUser
      .save()
      .then((doc) => console.log(doc))
      .catch((err) => console.log(`Error:`, err));
  } catch (error) {
    console.log(error);
  }
};
