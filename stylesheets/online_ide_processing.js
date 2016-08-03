    var globalSketchIsRunning = false;
    var isOverSketch = false;

    function clickOnCanvas() {
        runSketch();
    }

    function clickOnCode() {
        if (globalSketchIsRunning == true) {
            globalSketchIsRunning = false;
            startCanvas();
        }
    }

    function clickOutsideCode() {
        createCanvas();
        runSketch();
    }

    function mouseOverSketch() {
        if (globalSketchIsRunning == false && isOverSketch == false) {
            overCanvas();
            isOverSketch = true;
        }
    }

    function mouseOutSketch() {
        if (globalSketchIsRunning == false) {
            startCanvas();
        }
        isOverSketch = false;
    }

    function startCanvas() {
        globalSketchIsRunning == false;
        createCanvas();
        var c = document.getElementById("sketch");
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#106000";
        ctx.font = "12px Arial";
        ctx.fillText("Нажми здесь, чтобы выполнить код", 10, 15);
        var grd = ctx.createRadialGradient(125, 50, 5, 140, 60, 100);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "green");

        ctx.beginPath();
        ctx.arc(150, 75, 50, 0, 2 * Math.PI);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.moveTo(135, 55);
        ctx.lineTo(175, 75);
        ctx.lineTo(135, 95);
        ctx.closePath();
        ctx.fillStyle = "#CCCCCC";
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.moveTo(137, 58);
        ctx.lineTo(175, 75);
        ctx.lineTo(135, 95);
        ctx.closePath();
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
    }

    function overCanvas() {
        createCanvas();
        var c = document.getElementById("sketch");
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#106000";
        ctx.font = "12px Arial";
        ctx.fillText("Нажми здесь, чтобы выполнить код", 10, 15);
        var grd = ctx.createRadialGradient(125, 50, 5, 140, 60, 100);
        grd.addColorStop(0, "yellow");
        grd.addColorStop(1, "green");

        ctx.beginPath();
        ctx.arc(150, 75, 50, 0, 2 * Math.PI);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.moveTo(135, 55);
        ctx.lineTo(175, 75);
        ctx.lineTo(135, 95);
        ctx.closePath();
        ctx.fillStyle = "#CCCCCC";
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.moveTo(137, 58);
        ctx.lineTo(175, 75);
        ctx.lineTo(135, 95);
        ctx.closePath();
        ctx.fillStyle = "#FFFFA0";
        ctx.fill();
    }


    startCanvas();

    function createCanvas() {
        var container = document.getElementById('sketch-container');
        var sketch = document.getElementById('sketch');
        container.removeChild(sketch);

        sketch = document.createElement('canvas');
        sketch.id = 'sketch';
        container.appendChild(sketch);

        return sketch;
    }

    function showErrorOnCanvas() {
        createCanvas();
        var c = document.getElementById("sketch");
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.font = "12px Arial";
        ctx.fillText("Произошла какая-то ошибка!", 10, 55);
        ctx.fillText("Проверь, все ли правильно написал?", 10, 75);
    }

    (function (global) {
        var canvas = document.getElementById('sketch'),
                code = document.getElementById('code'),
        /*output = document.getElementById('output'), временно отключено*/
                instance = null;

        function waitForExit() {
            var checkbox = document.getElementById('expect-exit-callback');
            if (!checkbox) {
                return false;
            }
            return checkbox.checked || checkbox.value;
        }

        global.runSketch = function (callback) {
            globalSketchIsRunning = true;

            try {

                /*var codeValue2 = code.value;
                 codeValue2 = codeValue2.replace(/[а-я]{1,}/gi,"!");
                 alert(codeValue2);*/

                var codingMode = "easy";
                codingMode = document.getElementById('codingMode').value;

                var codeValue = code.value;
                codeValue = codeValue.replace(/точка/gi, "point");
                codeValue = codeValue.replace(/жирность/gi, "strokeWeight");

                codeValue = codeValue.replace(/линия/gi, "line");
                codeValue = codeValue.replace(/цветКарандаша/gi, "stroke");


                codeValue = codeValue.replace(/овал/gi, "ellipse");
                codeValue = codeValue.replace(/цветФигуры/gi, "fill");


                codeValue = codeValue.replace(/красный/gi, "255,0,0");
                codeValue = codeValue.replace(/зеленый/gi, "0,190,0");
                codeValue = codeValue.replace(/синий/gi, "0,0,255");
                codeValue = codeValue.replace(/желтый/gi, "255,255,0");
                codeValue = codeValue.replace(/оранжевый/gi, "247,130,12");
                codeValue = codeValue.replace(/розовый/gi, "255,180,200");
                codeValue = codeValue.replace(/фиолетовый/gi, "141,9,178");
                codeValue = codeValue.replace(/голубой/gi, "127,139,252");
                codeValue = codeValue.replace(/черный/gi, "0,0,0");
                codeValue = codeValue.replace(/белый/gi, "255,255,255");


                codeValue = codeValue.replace(/мышкаГ/gi, "mouseX");
                codeValue = codeValue.replace(/мышкаВ/gi, "mouseY");

                codeValue = codeValue.replace(/если/gi, "if");
                codeValue = codeValue.replace(/мышкаНажата/gi, "mousePressed");

                codeValue = codeValue.replace(/выполнитьОдинРаз/gi, "void setup");
                codeValue = codeValue.replace(/выполнитьМногоРаз/gi, "void draw");
                codeValue = codeValue.replace(/цветЭкрана/gi, "background");

                codeValue = codeValue.replace(/число/gi, "float");
                codeValue = codeValue.replace(/запомни/gi, "=");
                codeValue = codeValue.replace(/размер/gi, "size");

//                if (currentStory <= 3) codeValue = "strokeWeight(10);" + codeValue;

                if (codingMode == "easy") {
                    codeValue = "void setup(){size(440, 300);} void draw(){size(440, 300);" + codeValue + "}";
                }

                if (codingMode == "medium") {
                    codeValue = "size(440, 300);" + codeValue + "";
                }

                if (codingMode == "full") {
                    codeValue = "" + codeValue + "";
                }

                /*for (var i=0;i<rusWords.length;i+=2)
                 {
                 codeValue = codeValue.replace(/овал/gi,"ellipse");
                 document.write(cars[i] + "<br>");
                 }*/

                /*output.value = ''; временно отключено*/
                canvas = createCanvas();
                var sketch = Processing.compile(codeValue);

                if (callback) {
                    if (!/exit\(\);/.test(codeValue)) {
                        throw "exit() not found in sketch. Add the exit() command, and re-run the sketch.";
                    }
                    sketch.onExit = callback;
                    instance = new Processing(canvas, sketch);
                } else {
                    instance = new Processing(canvas, sketch);
                }
            } catch (e) {
                showErrorOnCanvas();
                /*временно отключили
                 output.value = "Error! Error was:\n" + e.toString();*/
            }
        };

        global.convertToJS = function () {
            try {
                output.value = js_beautify(
                        Processing.compile(code.value).sourceCode).replace(/\n\n\n+/g, '\n\n');
                output.select();
            } catch (e) {
                output.value = "Parser Error! Error was:\n" + e.toString();
            }
        };

        global.generateDataURI = function () {
            runSketch();
            output.value = canvas.toDataURL();
            output.select();
        };

        function buildRefTest() {
            try {
                if (!instance.use3DContext) {
                    var context = canvas.getContext('2d');
                    var imgData = context.getImageData(0, 0, canvas.width, canvas.height).data;
                } else {
                    var context = canvas.getContext("experimental-webgl");
                    var imgData = new Uint8Array(canvas.width * canvas.height * 4);
                    context.readPixels(0, 0, canvas.width, canvas.height, context.RGBA, context.UNSIGNED_BYTE, imgData);
                }

                var pixels = [];
                for (var i = 0, idl = imgData.length; i < idl; i++) {
                    pixels[i] = imgData[i];
                }

                var dimensions = "[" + canvas.width + "," + canvas.height + "]";
                document.location.href = "data:text/plain;charset=utf-8;base64," +
                        btoa('//' + dimensions + pixels + '\n' + code.value);
            } catch (e) {
                output.value = "Error creating ref test! Error was: " + e.toString();
            }
        };

        global.generateRefTest = function () {
            runSketch(buildRefTest);
        };

    }(window));