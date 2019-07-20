 require([
    "esri/Color",
    "dojo/dom",
    "dojo/dom-geometry",
    "dojo/has",
    "dojo/on",
    "dojo/parser",
    "dojo/ready",
    "dojo/window",
    "esri/geometry/Point",
    "esri/graphic",
    "esri/map",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol"
],  function(Color, dom, domGeom, has, on, parser, ready) {

    var map;
    var COMPASS_SIZE = 125;
    var compassFaceRadius, compassFaceDiameter;
    var needleAngle, needleWidth, needleLength, compassRing;
    var renderingInterval = -1;
    var currentHeading;
    var hasCompass;
    var compassHousing;
    var containerX;
    var containerY;
    var compassNeedleContext;

    ready(function() {
        parser.parse();

        var supportsOrientationChange = "onorientationchange" in window,
            orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

        window.addEventListener(orientationEvent, function () {
            orientationChanged();
        }, false);
        loadCompass();
    });

    function loadCompass() {
        compassHousing = dom.byId("compassHousing");
        // assign the compass housing dimensions
        compassHousing.style.height = compassHousing.style.width = COMPASS_SIZE + "px";
        // return the absolute position of the compass housing
        containerX = domGeom.position(compassHousing).x;
        containerY = domGeom.position(compassHousing).y;
        currentHeading = 0;
        needleAngle = 0;
        if (!buildCompassFace()) {
            return;
        }
        drawCompassFace();
        drawCompassNeedle();
        hasWebkit();
    }

    // Creates the diameter of the compass face
    // Creates the radius
    function buildCompassFace() {
        // compass housing diameter and radius
        compassFaceDiameter = COMPASS_SIZE;
        compassFaceRadius = compassFaceDiameter / 2;
        // needle length
        needleLength = compassFaceDiameter;
        // needle width
        needleWidth = needleLength / 10;
        // tick marks
        compassRing = compassFaceDiameter / 50;
        return true;
    }

    var compassFaceContext;
    // Draw the coppass face, text labels and font, and tick marks
    function drawCompassFace() {
        var compassFaceCanvas = dom.byId("compassFace");
        compassFaceCanvas.width = compassFaceCanvas.height = compassFaceDiameter;
        compassFaceContext = compassFaceCanvas.getContext("2d");
        compassFaceContext.clearRect(0, 0, compassFaceCanvas.width, compassFaceCanvas.height);

        // draw the tick marks and center the compass ring
        var xOffset, yOffset;
        xOffset = yOffset = compassFaceCanvas.width / 2;
        for (var i = 0; i < 360; ++i) {
            var x = (compassFaceRadius * Math.cos(degToRad(i))) + xOffset;
            var y = (compassFaceRadius * Math.sin(degToRad(i))) + yOffset;
            var x2 = ((compassFaceRadius - compassRing) * Math.cos(degToRad(i))) + xOffset;
            var y2 = ((compassFaceRadius - compassRing) * Math.sin(degToRad(i))) + yOffset;
            compassFaceContext.beginPath();
            compassFaceContext.moveTo(x, y);
            compassFaceContext.lineTo(x2, y2);
            compassFaceContext.closePath();
            compassFaceContext.stroke();
            i = i + 4;
        }

        // The measureText method returns an object, with one attribute: width.
        // The width attribute returns the width of the text, in pixels.
        compassFaceContext.font = "10px Arial";
        compassFaceContext.textAlign = "center";
        var metrics = compassFaceContext.measureText('N');
        compassFaceContext.fillText('N', compassFaceRadius, 15);
        compassFaceContext.fillText('S', compassFaceRadius, compassFaceDiameter - 10);
        compassFaceContext.fillText('E', (compassFaceRadius + (compassFaceRadius - metrics.width)), compassFaceRadius);
        compassFaceContext.fillText('W', 10, compassFaceRadius);
    }

    // Draw the compass needle
    function drawCompassNeedle() {
        var compassNeedle = dom.byId("compassNeedle");
        compassNeedle.width = compassNeedle.height = compassFaceDiameter;
        compassNeedle.style.left = Math.floor(compassFaceContext.width / 2) + "px";
        compassNeedle.style.top = Math.floor(compassFaceContext.height / 2) + "px";
        compassNeedleContext = compassNeedle.getContext("2d");
        compassNeedleContext.translate(compassFaceRadius, compassFaceRadius);
        compassNeedleContext.clearRect((compassNeedleContext.canvas.width / 2) * -1, (compassNeedleContext.canvas.height / 2) * -1, compassNeedleContext.canvas.width, compassNeedleContext.canvas.height);

        // The first step to create a path is calling the beginPath method. Internally, paths are stored as a list of sub-paths
        // (lines, arcs, etc) which together form a shape. Every time this method is called, the list is reset and we can start
        // drawing new shapes.

        // SOUTH
        compassNeedleContext.beginPath();
        compassNeedleContext.lineWidth = 1;
        compassNeedleContext.moveTo(0, 5);
        compassNeedleContext.lineTo(0, compassFaceRadius);
        compassNeedleContext.stroke();
        // circle around label
        compassNeedleContext.beginPath();
        compassNeedleContext.arc(0, compassFaceRadius - 15, 8, 0, 2 * Math.PI, false);
        compassNeedleContext.fillStyle = "#FFF";
        compassNeedleContext.fill();
        compassNeedleContext.lineWidth = 1;
        compassNeedleContext.strokeStyle = "black";
        compassNeedleContext.stroke();
        // S
        compassNeedleContext.beginPath();
        compassNeedleContext.moveTo(0, 0);
        compassNeedleContext.font = "normal 10px Verdana";
        compassNeedleContext.fillStyle = "#000";
        compassNeedleContext.textAlign = "center";
        compassNeedleContext.fillText("S", 0, compassFaceRadius - 10);
        // needle
        compassNeedleContext.beginPath();
        compassNeedleContext.fillStyle = "#000";
        compassNeedleContext.moveTo(0, 0);
        compassNeedleContext.lineTo(0, needleLength / 4);
        compassNeedleContext.lineTo((needleWidth / 4) * -1, 0);
        compassNeedleContext.fill();
        compassNeedleContext.beginPath();
        compassNeedleContext.fillStyle = "#000";
        compassNeedleContext.moveTo(0, 0);
        compassNeedleContext.lineTo(0, needleLength / 4);
        compassNeedleContext.lineTo(needleWidth / 4, 0);
        compassNeedleContext.fill();


        // NORTH
        compassNeedleContext.beginPath();
        compassNeedleContext.lineWidth = 1;
        compassNeedleContext.moveTo(0, 0);
        compassNeedleContext.lineTo(0, - compassFaceRadius);
        compassNeedleContext.stroke();
        // circle
        compassNeedleContext.beginPath();
        compassNeedleContext.arc(0, - (compassFaceRadius - 16), 8, 0, 2 * Math.PI, false);
        compassNeedleContext.fillStyle = "#FFF";
        compassNeedleContext.fill();
        compassNeedleContext.lineWidth = 1;
        compassNeedleContext.strokeStyle = "black";
        compassNeedleContext.stroke();
        // N
        compassNeedleContext.beginPath();
        compassNeedleContext.moveTo(0, 0);
        compassNeedleContext.font = "normal 10px Verdana";
        compassNeedleContext.fillStyle = "#000";
        compassNeedleContext.textAlign = "center";
        compassNeedleContext.fillText("N", 0, - (compassFaceRadius - 20));
        // needle
        compassNeedleContext.beginPath();
        compassNeedleContext.fillStyle = "#000";
        compassNeedleContext.moveTo(0, 0);
        compassNeedleContext.lineTo(0, (needleLength / 4) * -1);
        compassNeedleContext.lineTo((needleWidth / 4) * -1, 0);
        compassNeedleContext.fill();
        compassNeedleContext.beginPath();
        compassNeedleContext.fillStyle = "#000";
        compassNeedleContext.moveTo(0, 0);
        compassNeedleContext.lineTo(0, (needleLength / 4) * -1);
        compassNeedleContext.lineTo(needleWidth / 4, 0);
        compassNeedleContext.fill();

        // center pin color
        compassNeedleContext.beginPath();
        compassNeedleContext.arc(0, 0, 10, 0, 2 * Math.PI, false);
        compassNeedleContext.fillStyle = "rgb(255,255,255)";
        compassNeedleContext.fill();
        compassNeedleContext.lineWidth = 1;
        compassNeedleContext.strokeStyle = "black";
        compassNeedleContext.stroke();

        compassNeedleContext.beginPath();
        compassNeedleContext.moveTo(0, 0);
        compassNeedleContext.arc(0, 0, (needleWidth / 4), 0, degToRad(360), false);
        compassNeedleContext.fillStyle = "#000";
        compassNeedleContext.fill();
    }

    var orientationHandle;
    function orientationChangeHandler() {
        // An event handler for device orientation events sent to the window.
        orientationHandle = on(window, "deviceorientation", onDeviceOrientationChange);
        // The setInterval() method calls rotateNeedle at specified intervals (in milliseconds).
        renderingInterval = setInterval(rotateNeedle, 100);
    }

    var compassTestHandle;
    function hasWebkit() {
        if (has("ff") || has("ie") || has("opera")) {
            hasCompass = false;
            orientationChangeHandler();
            alert("Your browser does not support WebKit.");
        } else if (window.DeviceOrientationEvent) {
            compassTestHandle = on(window, "deviceorientation", hasGyroscope);
        } else {
            hasCompass = false;
            orientationChangeHandler();
        }
    }

    // Test if the device has a gyroscope.
    // Instances of the DeviceOrientationEvent class are fired only when the device has a gyroscope and while the user is changing the orientation.
    function hasGyroscope(event) {
        dojo.disconnect(compassTestHandle);
        if (event.webkitCompassHeading !== undefined || event.alpha != null) {
            hasCompass = true;
        } else {
            hasCompass = false;
        }
        orientationChangeHandler();
    }

    // Rotate the needle based on the device's current heading
    function rotateNeedle() {
        var multiplier = Math.floor(needleAngle / 360);
        var adjustedNeedleAngle = needleAngle - (360 * multiplier);
        var delta = currentHeading - adjustedNeedleAngle;
        if (Math.abs(delta) > 180) {
            if (delta < 0) {
                delta += 360;
            } else {
                delta -= 360;
            }
        }
        delta /= 5;
        needleAngle = needleAngle + delta;
        var updatedAngle = needleAngle - window.orientation;
        // rotate the needle
        dom.byId("compassNeedle").style.webkitTransform = "rotate(" + updatedAngle + "deg)";
    }

    function onDeviceOrientationChange(event) {
        var accuracy;
        if (event.webkitCompassHeading !== undefined) {
            // Direction values are measured in degrees starting at due north and continuing clockwise around the compass.
            // Thus, north is 0 degrees, east is 90 degrees, south is 180 degrees, and so on. A negative value indicates an invalid direction.
            currentHeading = (360 - event.webkitCompassHeading);
            accuracy = event.webkitCompassAccuracy;
        } else if (event.alpha != null) {
            // alpha returns the rotation of the device around the Z axis; that is, the number of degrees by which the device is being twisted
            // around the center of the screen
            // (support for android)
            currentHeading = (270 - event.alpha) * -1;
            accuracy = event.webkitCompassAccuracy;
        }

        if (accuracy < 11) {
            compassNeedleContext.fillStyle = "rgba(0, 205, 0, 0.9)";
        } else if (accuracy >= 15 && accuracy < 25) {
            compassNeedleContext.fillStyle = "rgba(255, 255, 0, 0.9)";
        } else if (accuracy > 24) {
            compassNeedleContext.fillStyle = "rgba(255, 0, 0, 0.9)";
        }
        compassNeedleContext.fill();

        if (renderingInterval == -1) {
            rotateNeedle();
        }
    }

    // Convert degrees to radians
    function degToRad(deg) {
        return (deg * Math.PI) / 180;
    }

    // Handle portrait and landscape mode orientation changes
    function orientationChanged() {
        if (map) {
            map.reposition();
            map.resize();
        }
    }
});