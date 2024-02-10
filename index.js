const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const port = 8000;

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

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .post((req, res) => {
    // TODO: Create new user
    return res.json({ status: pending });
  })
  .patch((req, res) => {
    // TODO: Edit new user with id
    return res.json({ status: pending });
  })
  .delete((req, res) => {
    // TODO: Delete new user with id
    return res.json({ status: pending });
  });

app.listen(port, () => console.log("Server Started!!"));
