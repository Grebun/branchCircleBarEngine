$(document).ready(function() {
	var i = 0.5;
	var lineColor = "#f0f0f0";

	var generalBar = new circleEngine();
	generalBar.barInit("topTimer");
	generalBar.setContainer("barContainer");
	generalBar.lineColorSetup(lineColor);
	generalBar.lineWidthSetup(10);
	generalBar.scaleStarter(50, 5, 10);
	generalBar.barStarter(0, 150, 1);
	generalBar.barShadowEngine();

	setInterval(function(){
		var a = generalBar.checkStarterCompleate();
		if (a == true){
			i += 0.0001;
			generalBar.barRebuild(0, 300 * i);
		}
    }, 20);

});
