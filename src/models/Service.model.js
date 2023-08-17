"use strict";

//-!dmbg
const mongoose = require("mongoose");

const DOCUMENT_NAME = "Service";
const COLLECTION_NAME = "Services";

var ServiceSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		price: {
			type: BigInt,
			required: true
		},
		time: {
			type: Number,
			required: true
		},
		combos: {
			type: [mongoose.Types.ObjectId],
      required: true,
		},
		courses: {
			type: [mongoose.Types.ObjectId],
      required: true,
		},

	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
		versionKey: false
	}
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, ServiceSchema);
