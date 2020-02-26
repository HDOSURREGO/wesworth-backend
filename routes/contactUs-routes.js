const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const creds = require("../.config");

const transport = {
	host: "smtp.esquemainc.com", // Don’t forget to replace with the SMTP host of your provider
	port: 587,
	auth: {
		user: creds.USER,
		pass: creds.PASS
	},
	tls: {
		rejectUnauthorized: false
	}
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
	if (error) {
		console.log(error);
	} else {
		console.log("Server is ready to take messages");
	}
});

router.post("/contactUs", (req, res, next) => {
	console.log("Frontend data:", req.body);
	var nameFromContactUs = req.body.nameFromContactUs;
	var emailAddress = req.body.emailAddress;
	var message = req.body.message;
	var content = `Name: ${nameFromContactUs} \n Email Address: ${emailAddress} \n Message: ${message}`;

	var mail = {
		from: name,
		to: "henry@esquemainc.com", // Change to email address that you want to receive messages on
		subject: "New Message from Contact Us Form",
		text: content
	};

	transporter.sendMail(mail, (err, data) => {
		if (err) {
			res.json({
				status: "fail"
			});
		} else {
			res.json({
				status: "success"
			});
		}
	});
});

module.exports = router;
