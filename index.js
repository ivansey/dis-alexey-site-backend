require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const md5 = require("md5");
const cors = require("cors");
const path = require("path");

const models = require("./models");

const PORT = process.env.PORT;

// mongoose.set("useFindAndModify", false);
// mongoose.set("useNewUrlParser", true);
// mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGODB_SERVER, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser());
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "/statics")));

app.use("/", require("./routes"));

app.get("/", (req, res) => {
	res.send("ok");
})

app.post("/", (req, res) => {
	res.send("ok");
})

app.post("/storage/media/upload", (req, res) => {
	const file = req.files.file;

	console.log("Upload image");

	file.mv("./statics/" + req.body.filename, (err) => {
		if (err) {
			return res.json({response: "ok", url: "/" + req.body.filename});
		}

		return res.json({response: "ok", url: "/" + req.body.filename});
	})
});

app.listen(PORT, () => {
    models.users.userModel.find({email: "admin"}).then(async (data) => {
		if (data.length === 0) {
			console.error("Not found admin user");
			console.log("Create admin user...");
			await models.users.userModel.addUser("admin", "admin", "admin").then(() => {
				console.log("Add admin user\nLogin: admin\nPassword: admin");
			});
		}
	});
    console.log("Server started on port " + PORT);
})