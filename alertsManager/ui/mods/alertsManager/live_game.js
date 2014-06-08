(function() {
	console.log("alertsManager live_game loaded");
	
	var magicAnchor = 1337 * 3;
	
	var msgAlerts = function(msg, payload) {
		api.panels.unit_alert.message(msg, payload);
	};
	
	var inChronoView = false;
	var jumpTarget = undefined;
	
	handlers["unit_alert.enterChronoView"] = function(payload) {
		jumpTarget = payload;
		inChronoView = true;
		model.showTimeControls(true);
	};
	
	model.showTimeControls.subscribe(function(v) {
		if (!v) {
			inChronoView = false;
		}
	});	
	
	Mousetrap.bind(alertsManagerSettings.getMarkKey(), function() {
		var toMark = [];
		if (model.selection()) {
			var sel = model.selection().selectionResult;
			for (var i = 0; i < sel.length; i++) {
				toMark.push(sel[i]);
			}
		}
		msgAlerts("markUnits", toMark);
	});
	
	Mousetrap.bind(alertsManagerSettings.getJumpKey(), function() {
		if (inChronoView) {
			api.camera.recallAnchor(magicAnchor);
			model.showTimeControls(false);
		}
	});
	
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
}());