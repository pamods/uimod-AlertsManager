var alertsManagerSettings = 
	(typeof alertsManagerSettings === "undefined") ?
	(function(){
		var _nanodesu = "info.nanodesu.alertsManager.";
		var _showCreatedAlerts = _nanodesu + "showCreatedAlerts";
		var _showDestroyedAlerts = _nanodesu + "showDestroyedAlerts";

		var _showSightAlerts = _nanodesu  + "showSightAlerts";
		var _showTargetDestroyedAlerts = _nanodesu + "showTargetDestroyedAlerts";
		
		var exTypes = ".excludeTypes";
		var _excludeCreatedAlerts = _showCreatedAlerts + exTypes;
		var _excludeDestroyedAlerts = _showDestroyedAlerts + exTypes;
		var _excludeSightAlerts = _showSightAlerts + exTypes;
		var _excludeTargetDestroyedAlerts = _showTargetDestroyedAlerts + exTypes;
		
		var _includedUnitSpecAlertsCreated = _nanodesu + "includedUnitSpecAlerts.create";
		var _excludedUnitSpecAlertsCreated = _nanodesu + "excludedUnitSpecAlerts.create";
		var _includedUnitSpecAlertsDestroyed = _nanodesu + "includedUnitSpecAlerts.destroy";
		var _excludedUnitSpecAlertsDestroyed = _nanodesu + "excludedUnitSpecAlerts.destroy";
		
		var _includedUnitSpecAlertsSight = _nanodesu + "includedUnitSpecAlerts.sight";
		var _excludedUnitSpecAlertsSight = _nanodesu + "excludedUnitSpecAlerts.sight";
		var _includedUnitSpecAlertsTargetDestroyed = _nanodesu + "includedUnitSpecAlerts.targetDestroyed";
		var _excludedUnitSpecAlertsTargetDestroyed = _nanodesu + "excludedUnitSpecAlerts.targetDestroyed";		
		
		var _markKey = _nanodesu + "markKey";
		var _jumpKey = _nanodesu + "jumpKey";
		
		var _alertsManagerLegacyKilled = _nanodesu + "legacyKilled_";
		
		var _g = function(key) {
			return decode(localStorage[key]);
		};
		
		var _s = function(key, value) {
			localStorage[key] = encode(value);
		};

		var _setDefaults = function() {
			_s(_showCreatedAlerts, ["Factory", "Recon"]);
			_s(_showDestroyedAlerts, ["Structure"]);
			_s(_showSightAlerts, ['Commander']);
			_s(_showTargetDestroyedAlerts, ['Commander']);
			
			_s(_excludeCreatedAlerts, ['Wall']);
			_s(_excludeDestroyedAlerts, []);
			_s(_excludeSightAlerts, []);
			_s(_excludeTargetDestroyedAlerts, []);
			
			_s(_includedUnitSpecAlertsCreated, []);
			_s(_excludedUnitSpecAlertsCreated, []);
			_s(_includedUnitSpecAlertsDestroyed, []);
			_s(_excludedUnitSpecAlertsDestroyed, []);
			
			_s(_includedUnitSpecAlertsSight, []);
			_s(_excludedUnitSpecAlertsSight, []);
			_s(_includedUnitSpecAlertsTargetDestroyed, []);
			_s(_excludedUnitSpecAlertsTargetDestroyed, []);
			
			_s(_markKey, "k");
			_s(_jumpKey, "l");
		};
		
		if (localStorage[_showCreatedAlerts] === undefined ||
				_g(_alertsManagerLegacyKilled) == undefined) { // == is intentional!
			console.log("rewrite defaults: Alertsmanager");
			_setDefaults();
			_s(_alertsManagerLegacyKilled, true);
		}
		
		return {
			setDefaults: _setDefaults,
			getJumpKey: function() {
				return _g(_jumpKey);
			},
			setJumpKey: function(v) {
				_s(_jumpKey, v);
			},
			getMarkKey: function() {
				return _g(_markKey);
			},
			setMarkKey: function(v) {
				_s(_markKey, v);
			},
			getShowCreatedAlerts: function() {
				return _g(_showCreatedAlerts);
			},
			setShowCreatedAlerts: function(v) {
				_s(_showCreatedAlerts, v);
			},
			getShowDestroyedAlerts: function() {
				return _g(_showDestroyedAlerts);
			},
			setShowDestroyedAlerts: function(v) {
				_s(_showDestroyedAlerts, v);
			},
			getShowSightAlerts: function() {
				return _g(_showSightAlerts);
			},
			setShowSightAlerts: function(v) {
				_s(_showSightAlerts, v);
			},
			getShowTargetDestroyedAlerts: function() {
				return _g(_showTargetDestroyedAlerts);
			},
			setShowTargetDestroyedAlerts: function(v) {
				_s(_showTargetDestroyedAlerts, v);
			},
			getIncludedUnitSpecAlertsCreated: function() {
				return _g(_includedUnitSpecAlertsCreated);
			},
			setIncludedUnitSpecAlertsCreated: function(v) {
				_s(_includedUnitSpecAlertsCreated, v);
			},
			getExcludedUnitSpecAlertsCreated: function() {
				return _g(_excludedUnitSpecAlertsCreated);
			},
			setExcludedUnitSpecAlertsCreated: function(v) {
				_s(_excludedUnitSpecAlertsCreated, v);
			},
			getIncludedUnitSpecAlertsDestroyed: function() {
				return _g(_includedUnitSpecAlertsDestroyed);
			},
			setIncludedUnitSpecAlertsDestroyed: function(v) {
				_s(_includedUnitSpecAlertsDestroyed, v);
			},
			getExcludedUnitSpecAlertsDestroyed: function() {
				return _g(_excludedUnitSpecAlertsDestroyed);
			},
			setExcludedUnitSpecAlertsDestroyed: function(v) {
				_s(_excludedUnitSpecAlertsDestroyed, v);
			},
			getIncludedUnitSpecAlertsSight: function() {
				return _g(_includedUnitSpecAlertsSight);
			},
			setIncludedUnitSpecAlertsSight: function(v) {
				_s(_includedUnitSpecAlertsSight, v);
			},
			getExcludedUnitSpecAlertsSight: function() {
				return _g(_excludedUnitSpecAlertsSight);
			},
			setExcludedUnitSpecAlertsSight: function(v) {
				_s(_excludedUnitSpecAlertsSight, v);
			},
			getIncludedUnitSpecAlertsTargetDestroyed: function() {
				return _g(_includedUnitSpecAlertsTargetDestroyed);
			},
			setIncludedUnitSpecAlertsTargetDestroyed: function(v) {
				_s(_includedUnitSpecAlertsTargetDestroyed, v);
			},
			getExcludedUnitSpecAlertsTargetDestroyed: function() {
				return _g(_excludedUnitSpecAlertsTargetDestroyed);
			},
			setExcludedUnitSpecAlertsTargetDestroyed: function(v) {
				_s(_excludedUnitSpecAlertsTargetDestroyed, v);
			}			
		};
	}()) : alertsManagerSettings;
