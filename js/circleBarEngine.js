
function circleEngine() {

  var circleContainer, circlePath, htmlElement, htmlContainer;
  var curentRotator, radius, lineWidth, lineColor, xPosition, yPosition;
  var starterChecker = Boolean(false);

  this.barInit = function (container) {
      htmlElement = container;
      circleContainer = document.getElementById(htmlElement);
      circlePath = circleContainer.getContext("2d");

      //установка параметров контейнера по умолчанию
      lineWidth = 1;
      lineColor = "#000000";
      circleContainer.height = $("#" + htmlElement).height();
      circleContainer.width = $("#" + htmlElement).width();
      xPosition = circleContainer.height / 2;
      yPosition = circleContainer.width / 2;
      radius = (circleContainer.height / 2) - lineWidth;
      
      
      xPosition = yPosition = lineWidth + radius;
  };

  this.barSetup = function (radiusSet, lineWidthSet, lineColorSet) {
    circleContainer.height = circleContainer.width = 2 * (lineWidthSet + radiusSet) + 40;  //высота и ширина контейнера
    xPosition = yPosition = lineWidthSet + radiusSet + 20;
    radius = radiusSet;
    lineColor = lineColorSet;
    lineWidth = lineWidthSet;
  };

  this.setContainer = function (containerSet) {
    htmlContainer = containerSet;
  };

  this.lineColorSetup = function (lineColorSet) {
    lineColor = lineColorSet;
  };

  this.lineWidthSetup = function (lineWidthSet) {
    lineWidth = lineWidthSet;
    radius = (circleContainer.height / 2) - lineWidth;
  };

  this.scaleStarter = function (gradSet, aMargin, stdScaleWidth) { 

    $("#" + htmlElement).clone().attr("id", htmlElement + "Scale").appendTo("#" + htmlContainer);
    circleScaleContainer = document.getElementById(htmlElement + "Scale");
    circleScalePath = circleScaleContainer.getContext("2d");
    circleScaleContainer.height = circleScaleContainer.width = $("#" + htmlElement + "Scale").height();

    var superRadius = circleScaleContainer.height / 2;
    var maxRadius = superRadius - stdScaleWidth;
    var minRadius = maxRadius - stdScaleWidth;

    radius = minRadius - aMargin - (lineWidth / 2);
    var i = 0;
    setInterval( function() {
        circleScalePath.beginPath();
        if (i <= gradSet){
          var minuteToDeg = i * (Math.PI / 30) - (Math.PI * 0.5);
          circleScalePath.strokeStyle = lineColor;
          circleScalePath.moveTo(xPosition + (minRadius * Math.cos(minuteToDeg)), yPosition + (minRadius * Math.sin(minuteToDeg)));

          if(i % 5 == 0){
            circleScalePath.lineTo(xPosition + (superRadius * Math.cos(minuteToDeg)), yPosition + (superRadius * Math.sin(minuteToDeg)));
          }else{
            circleScalePath.lineTo(xPosition + (maxRadius * Math.cos(minuteToDeg)), yPosition + (maxRadius * Math.sin(minuteToDeg)));
          }
          circleScalePath.stroke();
          i++;
        }
    }, 20);
  };

  this.barStarter = function (rotatorStart, rotatorEnd, speedAnimation) {       //speedAnimation 1 = 1 сек

    rotatorStart = (rotatorStart - 90) / 180;
    rotatorEnd = (rotatorEnd - 90) / 180;                                                       // 0 в 12 часов
    curentRotator = rotatorStart;

    starterChecker = false;

    var starterTimer = setInterval( function() {
      circlePath.clearRect(0, 0, circleContainer.width, circleContainer.height);
      circlePath.beginPath();
      circlePath.arc(xPosition, yPosition, radius, rotatorStart * Math.PI, curentRotator * Math.PI, false);
      circlePath.strokeStyle = lineColor;
      circlePath.lineWidth = lineWidth;
      circlePath.stroke();
      if (curentRotator < rotatorEnd) {
        if (curentRotator == rotatorStart) {
          curentRotator = rotatorStart + 0.001;
        }
        curentRotator += ((rotatorEnd - rotatorStart) / (speedAnimation * 50)) * (4 * Math.sin(Math.PI*((curentRotator - rotatorStart)/(rotatorEnd - rotatorStart))));
      }

      if (curentRotator.toFixed(4) == rotatorEnd.toFixed(4)) {
        clearInterval(starterTimer);
        starterChecker = true;
      }
    }, 20);
  };

  this.barRebuild = function (rotatorStart, rotatorEnd) {

    rotatorStart = (rotatorStart - 90) / 180;
    rotatorEnd = (rotatorEnd - 90) / 180;  
    curentRotator = rotatorStart;

    circlePath.clearRect(0, 0, circleContainer.width, circleContainer.height);
    circlePath.beginPath();
    circlePath.arc(xPosition, yPosition, radius, rotatorStart * Math.PI, rotatorEnd * Math.PI, false);
    circlePath.strokeStyle = lineColor;
    circlePath.lineWidth = lineWidth;
    circlePath.stroke();
  }; 

  this.barShadowEngine = function(){
    $("#" + htmlElement).clone().attr("id", htmlElement + "Shadow").appendTo("#" + htmlContainer); // Динамически создаёт контейнер для тени

    
    circleShadowContainer = document.getElementById(htmlElement + "Shadow");
    circleShadowPath = circleShadowContainer.getContext("2d");
    circleShadowContainer.height = circleShadowContainer.width = $("#" + htmlElement).height();

    shadowAlpha = 0.5;
    shadowRadius = 0;
    shadowTimer = setInterval( function(){
      if (shadowRadius <= (circleShadowContainer.height / 2)) {
        circleShadowPath.clearRect(0, 0, circleShadowContainer.width, circleShadowContainer.height);
        circleShadowPath.beginPath();
        circleShadowPath.arc(xPosition, yPosition, shadowRadius, 0, 2 * Math.PI, false);
        circleShadowPath.lineWidth = 1;

        if (shadowRadius <= (circleShadowContainer.height / 4)){
          shadowAlpha = (shadowRadius / (circleShadowContainer.height / 2));
        } else {
          shadowAlpha = 1 - (shadowRadius / (circleShadowContainer.height / 2));
        }
        circleShadowPath.strokeStyle = "rgba(255, 255, 255, " + shadowAlpha + ")"; 
        console.log(shadowAlpha);

        circleShadowPath.stroke();
        shadowRadius += circleShadowContainer.height / 200;
      } else {
        shadowRadius = 0;
      }
    }, 20);
  }

  this.checkStarterCompleate = function(){
    return starterChecker;
  }
}