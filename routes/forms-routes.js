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

router.post("/electric/send", (req, res, next) => {
	console.log("Frontend data:", req.body);
	var companyName = req.body.companyName;
	var personToContact = req.body.personToContact;
	var streetAddress = req.body.streetAddress;
	var city = req.body.city;
	var state = req.body.state;
	var zipCode = req.body.zipCode;
	var emailAddress = req.body.emailAddress;
	var message = req.body.message;
	var content = `companyName: ${companyName} \n email: ${emailAddress} \n message: ${message} `; //test with this content only final version to have them all

	var mail = {
		from: companyName,
		to: "henry@esquemainc.com", // Change to email address that you want to receive messages on
		subject: "New Message from Contact Form",
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
