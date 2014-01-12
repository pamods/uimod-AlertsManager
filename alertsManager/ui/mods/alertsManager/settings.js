(function() {
	$('#game_settings ul').append('<li class="game_settings"><a href="#tab_alert_manager">AlertsManager</a></li>');
	$('#game_settings').append("<div class='div_settings' id='tab_alert_manager'></div>");

	function AlertsSettingsModel() {
		var self = this;
		
		self.jumpBackKey = ko.observable(alertsManagerSettings.getJumpKey());
		self.selectedMarkKey = ko.observable(alertsManagerSettings.getMarkKey());
		self.knownUnitTypes = ko.observableArray();
		self.knownUnits = ko.observableArray();
		self.showCreatedAlerts = ko.observableArray(alertsManagerSettings.getShowCreatedAlerts());
		self.showDestroyedAlerts = ko.observableArray(alertsManagerSettings.getShowDestroyedAlerts());
		self.includeUnitSpecAlertsCreated = ko.observableArray(alertsManagerSettings.getIncludedUnitSpecAlertsCreated());
		self.excludedUnitSpecAlertsCreated = ko.observableArray(alertsManagerSettings.getExcludedUnitSpecAlertsCreated());
		self.includeUnitSpecAlertsDestroyed = ko.observableArray(alertsManagerSettings.getIncludedUnitSpecAlertsDestroyed());
		self.excludedUnitSpecAlertsDestroyed = ko.observableArray(alertsManagerSettings.getExcludedUnitSpecAlertsDestroyed());

		self.unitNameMap = undefined;
		self.renderUnit = function(unit) {
			return self.unitNameMap[unit];
		}
		
		unitInfoParser.loadUnitTypesArray(function(types) {
			self.knownUnitTypes(types);
			self.knownUnitTypes.sort();
		});
	}

	var alertsManagerSettingsModel = new AlertsSettingsModel();

	var alertsManagerOldOkFunc = model.ok;
	model.ok = function() {
		alertsManagerOldOkFunc();
		
		alertsManagerSettings.setJumpKey(alertsManagerSettingsModel.jumpBackKey());
		alertsManagerSettings.setMarkKey(alertsManagerSettingsModel.selectedMarkKey());
		alertsManagerSettings.setShowCreatedAlerts(alertsManagerSettingsModel.showCreatedAlerts());
		alertsManagerSettings.setShowDestroyedAlerts(alertsManagerSettingsModel.showDestroyedAlerts());
		alertsManagerSettings.setIncludedUnitSpecAlertsCreated(alertsManagerSettingsModel.includeUnitSpecAlertsCreated());
		alertsManagerSettings.setExcludedUnitSpecAlertsCreated(alertsManagerSettingsModel.excludedUnitSpecAlertsCreated());
		alertsManagerSettings.setIncludedUnitSpecAlertsDestroyed(alertsManagerSettingsModel.includeUnitSpecAlertsDestroyed());
		alertsManagerSettings.setExcludedUnitSpecAlertsDestroyed(alertsManagerSettingsModel.excludedUnitSpecAlertsDestroyed());
	}

	var alertsManagerOldDefaultsFunc = model.defaults;
	model.defaults = function() {
		alertsManagerOldDefaultsFunc();
		alertsManagerSettings.setDefaults();
	}

	$('#tab_alert_manager').load("coui://ui/mods/alertsManager/settings.html", function() {
		unitInfoParser.loadUnitNamesMapping(function(nameMap) {
			alertsManagerSettingsModel.unitNameMap = nameMap;
			for (u in nameMap) {
				alertsManagerSettingsModel.knownUnits.push(u);
			}
			alertsManagerSettingsModel.knownUnits.sort(function(left, right) {
				return nameMap[left] == nameMap[right] ? 0 : (nameMap[left] < nameMap[right] ? -1 : 1);
			});
			ko.applyBindings(alertsManagerSettingsModel, $('#tab_alert_manager').get(0));
		});
	});
}());