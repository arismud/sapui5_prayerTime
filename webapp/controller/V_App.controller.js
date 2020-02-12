sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ampPrayerTime.controller.V_App", {
		onInit: function() {
			this._loadSholat("Jakarta");
		},
		_mapResults: function(results) {
			var oModel = this.getView().getModel();
			oModel.setProperty("/city", results.query);
			oModel.setProperty("/country", results.country);
			var aSholatResults = [];
			for (var i = 0; i < results.items.length; i++) {
				aSholatResults.push({
					date: results.items[i].date_for,
					fajr: results.items[i].fajr,
					shurooq: results.items[i].shurooq,
					dhuhr: results.items[i].dhuhr,
					asr: results.items[i].asr,
					maghrib: results.items[i].maghrib,
					isha: results.items[i].isha
				});
			}
			oModel.setProperty("/items", aSholatResults);
		},
		_loadSholat: function(sCity) {
			var oView = this.getView();
			var oParams = {
				key: "5ad273b81ff66c6f3248604cfc728baa"
			};
			var vUrl = "http://muslimsalat.com/";
			var vType = ".json";
			var sUrl = vUrl.concat(sCity, vType);
			oView.setBusy(true);
			var self = this;
			$.get(sUrl, oParams).done(function(results) {
				oView.setBusy(false);
				self._mapResults(results);
			}).fail(function(err) {
				oView.setBusy(false);
				if (err !== undefined) {
					var oErrorResponse = $.parseJSON(err.responseText);
					sap.m.MessageToast.show(oErrorResponse.message, {
						duration: 6000
					});
				} else {
					sap.m.MessageToast.show("unknown error!");
				}
			});
		},
		_onSearch: function(event) {
			this._loadSholat(event.mParameters.query);
		}

	});
});