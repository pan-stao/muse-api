const createSchmea = require("../schmea");
const createModel = require("../model");

const userSchema = createSchmea({
    username : String,
    password : String,
    email : String,
    phone : String,
});
const userModel = createModel("users", userSchema);

module.exports = {
  add(data) {
    const userEnity = new userModel(data);
    userEnity.save()
  },
  remove() {},
  updata() {},
  query() {},
};
