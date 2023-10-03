const { getDatabase } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

class User {
  static collection() {
    return getDatabase().collection("users");
  }

  static findAll() {
    return User.collection()
      .find({}, { projection: { password: 0 } })
      .toArray();
  }

  static findById(id) {
    return User.collection().findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );
  }

  static createOne({ username, email, password, role, phoneNumber, address }) {
    return User.collection().insertOne({
      username,
      email,
      password,
      role,
      phoneNumber,
      address,
    });
  }

  static updateById(
    id,
    { username, email, password, role, phoneNumber, address }
  ) {
    return User.collection().updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          username,
          email,
          password,
          role,
          phoneNumber,
          address,
        },
      }
    );
  }

  static deleteById(id) {
    return User.collection().deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = User;
