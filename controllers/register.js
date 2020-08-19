const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("Incorrect Form Submission");
  }
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  db.transaction(async (trx) => {
    await trx("login")
      .insert({
        hash: hash,
        email: email,
      })
      .returning("email")
      .then(async (loginEmail) => {
        await trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.status(200).json(user[0]);
          })
          .catch((err) => {
            res.status(400).json("Unable to register");
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

module.exports = {
  handleRegister,
};
