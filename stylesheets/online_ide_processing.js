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
    ctx.fillText("Нажми здесь, чтобы выполнить код", 55, 140);
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


    /*output = document.getElementById('output'), временно отключено*/

function runSketch(callback) {
    globalSketchIsRunning = true;

    try {
        var code = document.getElementById('code');
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

        var codingMode = "easy";
//            codingMode = document.getElementById('codingMode').value;
        var isProfCodingMode = document.getElementById('input_prof_mode').checked;
        if (isProfCodingMode) {
            codingMode = "full";
        } else {
            codingMode = "easy";
        }

        if (codingMode == "easy") {
            codeValue = "void setup(){size(440, 300);} void draw(){background(200);" + codeValue + "}";
        }

        if (codingMode == "medium") {
            codeValue = "size(440, 300);" + codeValue + "";
        }

        if (codingMode == "full") {
            codeValue = "" + codeValue + "";
        }

        /*output.value = ''; временно отключено*/
        var canvas = createCanvas();
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
}

function convertToJS() {
    try {
        var code = document.getElementById('code');
        output.value = js_beautify(
            Processing.compile(code.value).sourceCode).replace(/\n\n\n+/g, '\n\n');
        output.select();
    } catch (e) {
        output.value = "Parser Error! Error was:\n" + e.toString();
    }
}

function codeChanged() {
    var isAutoRunEnabled = document.getElementById('input_auto_run').checked;
    if (isAutoRunEnabled) {
        clickOutsideCode();
    }
    document.getElementById('a_gist_url').style.display = "none";
}

function setTabBehaviour() {
//        var textareas = document.getElementsByTagName('textarea');
//        var count = textareas.length;
//        for(var i=0;i<count;i++){
//            textareas[i].onkeydown = function(e){
//                if(e.keyCode==9 || e.which==9){
//                    e.preventDefault();
//                    var s = this.selectionStart;
//                    this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
//                    this.selectionEnd = s+1;
//                }
//            }
//        }

    $('#code').on('keydown', function (ev) {
        var keyCode = ev.keyCode || ev.which;

        if (keyCode == 9) {
            ev.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;
            var val = this.value;
            var selected = val.substring(start, end);
            var re, count;

            if (ev.shiftKey) {
                re = /^\t/gm;
                count = -selected.match(re).length;
                this.value = val.substring(0, start) + selected.replace(re, '') + val.substring(end);
                // todo: add support for shift-tabbing without a selection
            } else {
                re = /^/gm;
                count = selected.match(re).length;
                this.value = val.substring(0, start) + selected.replace(re, '\t') + val.substring(end);
            }

            if (start === end) {
                this.selectionStart = end + count;
            } else {
                this.selectionStart = start;
            }

            this.selectionEnd = end + count;
        }
    });
}

function changeURL(gistId) {
    var url = "?id=" + gistId;

    var isProfCodingMode = document.getElementById('input_prof_mode').checked;
    if (isProfCodingMode) {
        url += "&prof=" + isProfCodingMode;
    }

    if (url != window.location) {
        window.history.pushState(null, null, url);
    }
}

function loadGist(gistId, isProfMode) {
//        var code = document.getElementById('code');
//        var codeValue = code.value;
//        var data = '{"description": "a gist for a user with token api call via ajax","public": true,"files": {"file1.txt": {"content": "' + codeValue + '"}}}';
//        var dataObj = {
//            description: "a gist for a user with token api call via ajax",
//            public: true,
//            files: {
//                "file1.txt": {
//                    content: codeValue
//                }
//            }
//        };
//        console.log(dataObj);

//        document.getElementById('span_gist_url').innerHTML = '?s=response.id';

    $.ajax({
        url: 'https://api.github.com/gists/' + gistId,
        type: 'GET'
    }).done(function (response) {
        console.log(response);
        var content = response.files["file1.txt"].content;
        console.log('ID: ' + content);
        document.getElementById('code').innerHTML = content;
        if (isProfMode) {
            document.getElementById('input_prof_mode').checked = true;
        }
//            document.getElementById('a_gist_url').href = response.html_url;
//            document.getElementById('a_gist_url').innerHTML = response.html_url;
//            document.getElementById('a_gist_url').style.display = "block";
        /*window.open(response.html_url);*/
    }).error(function (e) {
        console.log(e);
        var errorMsg = "// :( Не найден код \n// под указанным id в URL";
        document.getElementById('code').innerHTML = errorMsg;
    });
}

function createGist() {
    var code = document.getElementById('code');
    var codeValue = code.value;
    var data = '{"description": "a gist for a user with token api call via ajax","public": true,"files": {"file1.txt": {"content": "' + codeValue + '"}}}';
    var dataObj = {
        description: "a gist for a user with token api call via ajax",
        public: true,
        files: {
            "file1.txt": {
                content: codeValue
            }
        }
    };
    console.log(dataObj);

//        document.getElementById('span_gist_url').innerHTML = '?s=response.id';

    $.ajax({
        url: 'https://api.github.com/gists',
        type: 'POST',
        data: JSON.stringify(dataObj)
    }).done(function (response) {
        console.log(response);
        console.log('ID: ' + response.id);

        var isProfCodingMode = document.getElementById('input_prof_mode').checked;
        isProfCodingMode = isProfCodingMode ? true : false;
        if (isProfCodingMode) {
            isProfCodingMode = "&prof=true";
        } else {
            isProfCodingMode = "";
        }

        var newParams = "?id=" + response.id + isProfCodingMode;

        document.getElementById('a_gist_url').href = newParams; /* добавляет параметры к текущей странице */
        document.getElementById('a_gist_url').href = "http://khasang.io/pages/processing" + newParams;
        document.getElementById('a_gist_url').innerHTML = "khasang.io/pages/processing" + newParams;
        document.getElementById('a_gist_url').style.display = "block";
        changeURL(response.id);

//            document.getElementById('a_gist_url').href = response.html_url;
//            document.getElementById('a_gist_url').innerHTML = response.html_url;
//            document.getElementById('a_gist_url').style.display = "block";
//            changeURL(response.id);
        /*window.open(response.html_url);*/
    }).error(function (e) {
        console.log(e);
    });
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function startDocument() {
    var gistId = getUrlVars()["id"];
    var isProfMode = getUrlVars()["prof"] ? true : false;
    if (gistId) {
        loadGist(gistId, isProfMode);
    } else {
        //var errorMsg = "";
        //document.getElementById('code').innerHTML = errorMsg;
    }
    setTabBehaviour();
    setListeners();
    startCanvas();
}

function setListeners() {
//        var textArea = document.querySelector('#code');
    var textArea = document.getElementById('code');
    textArea.onfocus = function () {
        clickOnCode();
    };
    textArea.onmouseover = function () {
        clickOnCode();
    };
    textArea.onblur = function () {
        clickOutsideCode();
    };
    textArea.onmouseout = function () {
        clickOutsideCode();
    };
    textArea.onkeyup = function () {
        codeChanged();
    };

//        var divSketchContainer = document.querySelector('#sketch-container');
    var divSketchContainer = document.getElementById('sketch-container');
    divSketchContainer.onfocus = function () {
        clickOnCanvas();
    };
}

    //    startCanvas();
    //    $(document).ready(startDocument());
$(document).ready(startDocument);
