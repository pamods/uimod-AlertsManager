(function() {
	var alertsManagerDisplayFilterSettings = alertsManager.makeEmptyFilterSettings();
	alertsManagerDisplayFilterSettings.selectedTypes[alertsManager.WATCH_TYPES.CREATED] = alertsManagerSettings.getShowCreatedAlerts();
	alertsManagerDisplayFilterSettings.includedUnits[alertsManager.WATCH_TYPES.CREATED] = alertsManagerSettings.getIncludedUnitSpecAlertsCreated();
	alertsManagerDisplayFilterSettings.excludedUnits[alertsManager.WATCH_TYPES.CREATED] = alertsManagerSettings.getExcludedUnitSpecAlertsCreated();

	alertsManagerDisplayFilterSettings.selectedTypes[alertsManager.WATCH_TYPES.DESTROYED] = alertsManagerSettings.getShowDestroyedAlerts();
	alertsManagerDisplayFilterSettings.includedUnits[alertsManager.WATCH_TYPES.DESTROYED] = alertsManagerSettings.getIncludedUnitSpecAlertsDestroyed();
	alertsManagerDisplayFilterSettings.excludedUnits[alertsManager.WATCH_TYPES.DESTROYED] = alertsManagerSettings.getExcludedUnitSpecAlertsDestroyed();

	alertsManagerDisplayFilterSettings.selectedTypes[alertsManager.WATCH_TYPES.SIGHT] = alertsManagerSettings.getShowSightAlerts();
	alertsManagerDisplayFilterSettings.includedUnits[alertsManager.WATCH_TYPES.SIGHT] = alertsManagerSettings.getIncludedUnitSpecAlertsSight();
	alertsManagerDisplayFilterSettings.excludedUnits[alertsManager.WATCH_TYPES.SIGHT] = alertsManagerSettings.getExcludedUnitSpecAlertsSight();

	alertsManagerDisplayFilterSettings.selectedTypes[alertsManager.WATCH_TYPES.TARGET_DESTROYED] = alertsManagerSettings.getShowTargetDestroyedAlerts();
	alertsManagerDisplayFilterSettings.includedUnits[alertsManager.WATCH_TYPES.TARGET_DESTROYED] = alertsManagerSettings.getIncludedUnitSpecAlertsTargetDestroyed();
	alertsManagerDisplayFilterSettings.excludedUnits[alertsManager.WATCH_TYPES.TARGET_DESTROYED] = alertsManagerSettings.getExcludedUnitSpecAlertsTargetDestroyed();
	
	// changing this is not supported, if you want to try you need to read up on the alertsManager.js and modify it a (tiny) bit
	alertsManagerDisplayFilterSettings.selectedTypes[alertsManager.WATCH_TYPES.DAMAGED] = ['Commander'];
	alertsManager.replaceDisplayFilter(alertsManagerDisplayFilterSettings);

	$(".div_unit_alert").each(function(index, element) {
		var oldBind = $(element).data("bind");
		var regex = /click.*,/m;
		var newBind = oldBind.replace(regex, "click: function (data, event) { $parent.acknowledge($data.id, event) },");
		$(element).attr("data-bind", newBind);
	});
	
	var magicAnchor = 1337 * 3;
	
	var oldAck = model.acknowledge;
	model.acknowledge = function(data, event) {
		if (event.ctrlKey) {
			model.close(data);
		} else {
			var alert = model.map[data];
			if (event.shiftKey) {
				api.camera.captureAnchor(magicAnchor);
				api.Panel.message(api.Panel.parentId, 'unit_alert.enterChronoView', alert.time);
			}
			
			var target = {
				location : alert.location,
				planet_id : alert.planet_id
			};

			alert.cb && alert.cb.resolve(self);
			if (!alert.custom) {
				engine.call('camera.lookAt', JSON.stringify(target));
			}
			
			// do not use oldAck => do not call close
		}
	};
	
	var markedIds = {};
	
	handlers.markUnits = function(payload) {
		for (var i = 0; i < payload.length; i++) {
			markedIds[payload[i]] = true;
		}
	};
	
	alertsManager.addListener(function(payload) {
		var markedHits = [];
		for (var i = 0; i < payload.list.length; i++) {
			var notice = payload.list[i];
			if (markedIds[notice.id]) {
				markedHits.push(notice);
			}
		}
		if (markedHits.length > 0) {
			alertsManager.getDisplayListener()({list: markedHits});
		}
	});
}());