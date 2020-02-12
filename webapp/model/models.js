sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createSholatAPIModel: function() {
			var oModel = new JSONModel();
			oModel.setData({
				city: "",
				country: "",
				cols: [{
					name: "Date"
				}, {
					name: "fajr"
				}, {
					name: "shurooq"
				}, {
					name: "dhuhr"
				}, {
					name: "asr"
				}, {
					name: "maghrib"
				}, {
					name: "isha"
				}],
				items: []
			});
			return oModel;
		}

	};
});