(function() {
	var alertsManagerDisplayFilterSettings = alertsManager.makeEmptyFilterSettings();
	alertsManagerDisplayFilterSettings.selectedTypes[alertsManager.WATCH_TYPES.CREATED] = alertsManagerSettings.getShowCreatedAlerts();
	alertsManagerDisplayFilterSettings.includedUnits[alertsManager.WATCH_TYPES.CREATED] = alertsManagerSettings.getIncludedUnitSpecAlertsCreated();
	alertsManagerDisplayFilterSettings.excludedUnits[alertsManager.WATCH_TYPES.CREATED] = alertsManagerSettings.getExcludedUnitSpecAlertsCreated();

	alertsManagerDisplayFilterSettings.selectedTypes[alertsManager.WATCH_TYPES.DESTROYED] = alertsManagerSettings.getShowDestroyedAlerts();
	alertsManagerDisplayFilterSettings.includedUnits[alertsManager.WATCH_TYPES.DESTROYED] = alertsManagerSettings.getIncludedUnitSpecAlertsDestroyed();
	alertsManagerDisplayFilterSettings.excludedUnits[alertsManager.WATCH_TYPES.DESTROYED] = alertsManagerSettings.getExcludedUnitSpecAlertsDestroyed();

	// changing this is not supported, if you want to try you need to read up on the alertsManager.js and modify it a (tiny) bit
	alertsManagerDisplayFilterSettings.selectedTypes[alertsManager.WATCH_TYPES.DAMAGED] = ['Commander'];
	alertsManager.replaceDisplayFilter(alertsManagerDisplayFilterSettings);
	
	
	$(".div_unit_alert").each(function(index, element) {
		var oldBind = $(element).data("bind");
		var regex = /click.*,/m;
		var newBind = oldBind.replace(regex, "click: function (data, event) { $parent.acknowledge($data.id, event) }, event: {contextmenu: function (data, event) { $parent.acknowledge($data.id, event) }},");
		$(element).attr("data-bind", newBind);
	});
	
	var jumpTarget = undefined;

	var oldTime = handlers.time;
	handlers.time = function(payload) {
		oldTime(payload);
		if (jumpTarget) {
			var nowMs = new Date().getTime();
			var diff = nowMs - jumpTarget;
			var diffS = diff / 1000;
			var target = payload.end_time - diffS - 0.5;
			api.time.set(Number(target));
			jumpTarget = undefined;
		}
	};
	
	var magicAnchor = 1337 * 3;
	var inChronoView = false;
	
	var oldAck = model.unitAlertModel.acknowledge;
	model.unitAlertModel.acknowledge = function(data, event) {
		if (event.type === "contextmenu") { // right click
			if (event.ctrlKey) {
				model.unitAlertModel.close(data);
			}
		} else {
			var alert = model.unitAlertModel.map[data];
			if (event.shiftKey) {
				jumpTarget = alert.time;
				api.camera.captureAnchor(magicAnchor);
				inChronoView = true;
				model.showTimeControls(true);
			}
			var target = {
				location: alert.location,
				planet_id: alert.planet_id
			};

			engine.call('camera.lookAt', JSON.stringify(target));
		}
	};
	
	var markedIds = {};
	
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
	
	Mousetrap.bind(alertsManagerSettings.getMarkKey(), function() {
		if (model.selection()) {
			var sel = model.selection().selectionResult;
			for (var i = 0; i < sel.length; i++) {
				markedIds[sel[i]] = true;
			}
		}
	});
	
	model.showTimeControls.subscribe(function(v) {
		if (!v) {
			inChronoView = false;
		}
	});
	
	Mousetrap.bind(alertsManagerSettings.getJumpKey(), function() {
		if (inChronoView) {
			api.camera.recallAnchor(magicAnchor);
			model.showTimeControls(false);
		}
	});
}());