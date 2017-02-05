/*

script:        chartBarEngine ver.1.5
autor:         dUtkin
releaseDate:   24.12.2016

releaseNote:   скрипт предназначен для анимированного
               вывода круглого прогресс бара с хаданными
               параметрами из управляющего Core скрипта.

               В 1.5 добавлена масштабная шкала по минутам

               В 2.0 появилась возможность ребилда бублика
               для динамической отрисовки прогресса. Дополнительно
               имплементирована проверка исполнения Стартера (правда
               через костыли)
*/

function circleEngine() {

  var circleContainer, circlePath, htmlElement;
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

  this.lineColorSetup = function (lineColorSet) {
    lineColor = lineColorSet;
  };

  this.lineWidthSetup = function (lineWidthSet) {
    lineWidth = lineWidthSet;
    radius = (circleContainer.height / 2) - lineWidth;
  };

  this.scaleStarter = function (gradSet, aMargin, stdScaleWidth) { 

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

  this.checkStarterCompleate = function(){
    return starterChecker;
  }
}