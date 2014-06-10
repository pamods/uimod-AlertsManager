(function() {
	$("#main .header").children(":first").append('<li><a href="#tab_alert_manager" data-toggle="pill">AlertsManager</a></li>');
	$("#main .content").children(":first").append("<div class='option-list tab-pane' id='tab_alert_manager'></div>");

	// the next version probably should handle alert types in a generic way that doesn't require me to write more and more code...
	
	function AlertsSettingsModel() {
		var self = this;
		
		self.jumpBackKey = ko.observable(alertsManagerSettings.getJumpKey());
		self.selectedMarkKey = ko.observable(alertsManagerSettings.getMarkKey());
		self.knownUnitTypes = ko.observableArray();
		self.knownUnits = ko.observableArray();
		
		self.showCreatedAlerts = ko.observableArray(alertsManagerSettings.getShowCreatedAlerts());
		self.showDestroyedAlerts = ko.observableArray(alertsManagerSettings.getShowDestroyedAlerts());
		
		self.showSightAlerts = ko.observableArray(alertsManagerSettings.getShowSightAlerts());
		self.showTargetDestroyedAlerts = ko.observableArray(alertsManagerSettings.getShowTargetDestroyedAlerts());
		
		self.includeUnitSpecAlertsCreated = ko.observableArray(alertsManagerSettings.getIncludedUnitSpecAlertsCreated());
		self.excludeUnitSpecAlertsCreated = ko.observableArray(alertsManagerSettings.getExcludedUnitSpecAlertsCreated());
		self.includeUnitSpecAlertsDestroyed = ko.observableArray(alertsManagerSettings.getIncludedUnitSpecAlertsDestroyed());
		self.excludeUnitSpecAlertsDestroyed = ko.observableArray(alertsManagerSettings.getExcludedUnitSpecAlertsDestroyed());
		
		self.includeUnitSpecAlertsSight = ko.observableArray(alertsManagerSettings.getIncludedUnitSpecAlertsSight());
		self.includeUnitSpecAlertsTargetDestroyed = ko.observableArray(alertsManagerSettings.getIncludedUnitSpecAlertsTargetDestroyed());
		self.excludeUnitSpecAlertsSight = ko.observableArray(alertsManagerSettings.getExcludedUnitSpecAlertsSight());
		self.excludeUnitSpecAlertsTargetDestroyed = ko.observableArray(alertsManagerSettings.getExcludedUnitSpecAlertsTargetDestroyed());
		
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

	var alertsManagerOldOkFunc = model.save;
	model.save = function() {
		alertsManagerOldOkFunc();
		
		alertsManagerSettings.setJumpKey(alertsManagerSettingsModel.jumpBackKey());
		alertsManagerSettings.setMarkKey(alertsManagerSettingsModel.selectedMarkKey());
		
		alertsManagerSettings.setShowCreatedAlerts(alertsManagerSettingsModel.showCreatedAlerts());
		alertsManagerSettings.setShowDestroyedAlerts(alertsManagerSettingsModel.showDestroyedAlerts());
		alertsManagerSettings.setShowSightAlerts(alertsManagerSettingsModel.showSightAlerts());
		alertsManagerSettings.setShowTargetDestroyedAlerts(alertsManagerSettingsModel.showTargetDestroyedAlerts());
		
		alertsManagerSettings.setIncludedUnitSpecAlertsCreated(alertsManagerSettingsModel.includeUnitSpecAlertsCreated());
		alertsManagerSettings.setExcludedUnitSpecAlertsCreated(alertsManagerSettingsModel.excludeUnitSpecAlertsCreated());
		alertsManagerSettings.setIncludedUnitSpecAlertsDestroyed(alertsManagerSettingsModel.includeUnitSpecAlertsDestroyed());
		alertsManagerSettings.setExcludedUnitSpecAlertsDestroyed(alertsManagerSettingsModel.excludeUnitSpecAlertsDestroyed());

		alertsManagerSettings.setIncludedUnitSpecAlertsSight(alertsManagerSettingsModel.includeUnitSpecAlertsSight());
		alertsManagerSettings.setExcludedUnitSpecAlertsSight(alertsManagerSettingsModel.excludeUnitSpecAlertsSight());
		alertsManagerSettings.setIncludedUnitSpecAlertsTargetDestroyed(alertsManagerSettingsModel.includeUnitSpecAlertsTargetDestroyed());
		alertsManagerSettings.setExcludedUnitSpecAlertsTargetDestroyed(alertsManagerSettingsModel.excludeUnitSpecAlertsTargetDestroyed());
	}

	var alertsManagerOldDefaultsFunc = model.restoreDefaults;
	model.restoreDefaults = function() {
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