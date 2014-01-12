var alertsManagerSettings = 
	(typeof alertsManagerSettings === "undefined") ?
	(function(){
		var _nanodesu = "info.nanodesu.alertsManager.";
		var _showCreatedAlerts = _nanodesu + "showCreatedAlerts";
		var _showDestroyedAlerts = _nanodesu + "showDestroyedAlerts";
		var _includedUnitSpecAlertsCreated = _nanodesu + "includedUnitSpecAlerts.create";
		var _excludedUnitSpecAlertsCreated = _nanodesu + "excludedUnitSpecAlerts.create";
		var _includedUnitSpecAlertsDestroyed = _nanodesu + "includedUnitSpecAlerts.destroy";
		var _excludedUnitSpecAlertsDestroyed = _nanodesu + "excludedUnitSpecAlerts.destroy";
		var _markKey = _nanodesu + "markKey";
		var _jumpKey = _nanodesu + "jumpKey";
		
		var _g = function(key) {
			return decode(localStorage[key]);
		};
		
		var _s = function(key, value) {
			localStorage[key] = encode(value);
		};

		var _setDefaults = function() {
			_s(_showCreatedAlerts, ["Factory"]);
			_s(_showDestroyedAlerts, ["Structure"]);
			_s(_includedUnitSpecAlertsCreated, []);
			_s(_excludedUnitSpecAlertsCreated, []);
			_s(_includedUnitSpecAlertsDestroyed, []);
			_s(_excludedUnitSpecAlertsDestroyed, []);
			_s(_markKey, "k");
			_s(_jumpKey, "l");
		}
		
		if (localStorage[_showCreatedAlerts] === undefined) {
			_setDefaults();
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
			}
		};
	}()) : alertsManagerSettings;
