const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const port = 8000;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/users", (req, res) => {
  const html = `
          <ul>
              ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
          </ul>
      `;
  res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "pending", id: users.length });
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .post((req, res) => {
    // TODO: Create new user
    return res.json({ status: "pending" });
  })
  .patch((req, res) => {
    // TODO: Edit new user with id
    const id = Number(req.params.id);
    const { first_name, last_name, email, gender, job_title } = req.body;

    const user = users.find((user) => user.id === id);
    const updatedUserData = {
      ...user,
      first_name,
      last_name,
      email,
      gender,
      job_title,
    };

    fs.readFile("./MOCK_DATA.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      const userData = JSON.parse(data);

      const userDataWithoutTheIdUser = userData.filter(
        (user) => user.id !== id
      );

      const newUserData = { ...userDataWithoutTheIdUser, updatedUserData };
      //   return res.json(newUserData);

      fs.writeFile(
        "./MOCK_DATA.json",
        JSON.stringify(newUserData),
        "utf8",
        (err) => {
          if (err) console.log(err);
        }
      );
    });

    return res.json({ status: `Updated the user with id : ${id}.` });
  })
  .delete((req, res) => {
    // TODO: Delete new user with id
    const id = Number(req.params.id);

    fs.readFile("./MOCK_DATA.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      // data is of type string , userData is of type object
      const userData = JSON.parse(data);

      // userData is of type object
      const updatedUserData = userData.filter((user) => user.id !== id);

      fs.writeFile(
        "./MOCK_DATA.json",
        JSON.stringify(updatedUserData),
        "utf8",
        (err) => {
          if (err) console.log(err);
        }
      );
    });

    return res.json({ status: `Delted the users with ${id}.` });
  });

app.listen(port, () => console.log("Server Started!!"));
