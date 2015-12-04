function rendering(textString, fontSize, frameWidth, blockString) {
    //animation frame polyfill

    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    //math2 utils
    var Math2={};Math2.random=function(t,n){return Math.random()*(n-t)+t},Math2.map=function(t,n,r,a,o){return(o-a)*((t-n)/(r-n))+a},Math2.randomPlusMinus=function(t){return t=t?t:.5,Math.random()>t?-1:1},Math2.randomInt=function(t,n){return n+=1,Math.floor(Math.random()*(n-t)+t)},Math2.randomBool=function(t){return t=t?t:.5,Math.random()<t?!0:!1},Math2.degToRad=function(t){return rad=t*Math.PI/180,rad},Math2.radToDeg=function(t){return deg=180/(Math.PI*t),deg},Math2.rgbToHex=function(t){function n(t){return("0"+parseInt(t).toString(16)).slice(-2)}t=t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);var r=n(t[1])+n(t[2])+n(t[3]);return r.toUpperCase()},Math2.distance=function(t,n,r,a){return Math.sqrt((r-t)*(r-t)+(a-n)*(a-n))};

    //mouse
    var mousePos={
      x:0,
      y:0
    };
    window.onmousemove = function(e) {
                
                e = e || window.event;

    			var pageX = e.pageX;
    			var pageY = e.pageY;
    			if (pageX === undefined) {
    				pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    				pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    			}
                mousePos = {
                    x: pageX,
                    y: pageY,
                };
            }
            
            

    var options = {
            width: window.innerWidth,
            height: fontSize,
            keyword : "17",
    				density : 10,
    				densityText : 3,
    				minDist : 20,
        }
        // initialize canvas
    var canvas = document.createElement('canvas');
    canvas.width = options.width;
    canvas.height = options.height;
    canvas.style.width = options.width/2;
    canvas.style.height = options.height/2;
    canvas.getContext('2d').scale(2,2)

    var renderer = new PIXI.autoDetectRenderer(options.width, options.height, {
        transparent: true
    });
    var stage = new PIXI.Stage("0X000000", true);
    $("#"+blockString).append(renderer.view);
    if(blockString == "second") {
            renderer.view.id = "promise";
        } else if(blockString == "first") {
            renderer.view.id = "num";
        }







    var imageData = false;
    var particles =[]; 


    function init() {
        if(blockString == "second") {
            positionText();
        } else if(blockString == "first") {
            createText();
        }
    }

    function createText() {

        var canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 350;
        var context = canvas.getContext("2d");
        context.fillStyle = "#000000";
        context.font = fontSize+"px 'Arial', sans-serif";
        context.fillText(textString, 0, 250);

        var imageData = context.getImageData(0, 0, 350, frameWidth);
        data = imageData.data;

        // Iterate each row and column
        for (var i = 0; i < imageData.height; i += options.density) {
            for (var j = 0; j < imageData.width; j += options.density) {

                // Get the color of the pixel
                var color = data[((j * (imageData.width * 4)) + (i * 4)) - 1];

                // If the color is black, draw pixels
                if (color == 255) {
                    var newPar = particle()
                    newPar.setPosition(i, j);
                    particles.push(newPar);
                    stage.addChild(newPar)
                }
            }
        }
    }

    function positionText() {
    var canvas = document.createElement("canvas");
    canvas.width = frameWidth;
    canvas.height = 120;
    var context = canvas.getContext("2d");
    context.fillStyle = "#000000";
    context.font = "80px 'Arial', sans-serif";
    context.fillText(textString, 0, 80);

    var imageData = context.getImageData(0, 0, 400, 400);
    data = imageData.data;

    // Iterate each row and column
    for (var i = 0; i < imageData.height; i += options.densityText) {
        for (var j = 0; j < imageData.width; j += options.densityText) {

            // Get the color of the pixel
            var color = data[((j * (imageData.width * 4)) + (i * 4)) - 1];

            // If the color is black, draw pixels
            if (color == 255) {
                var newPar = particle(true)
                newPar.setPosition(i, j);
                particles.push(newPar);
                stage.addChild(newPar)
            }
        }
    }
}

    function particle(text) {

        $this = new PIXI.Graphics()

        if (text == true) {
            $this.text = true;
        }

        $this.beginFill(0XFFFFFF);

        var radius;
        $this.radius = radius = $this.text ? Math.random() * 3.5 : Math.random() * 10.5;

        $this.drawCircle(0, 0, radius);

        $this.size = this.radius;
        $this.x = -this.width;
        $this.y = -this.height;
        $this.free = false;

        $this.timer = Math2.randomInt(0, 100);
        $this.v = Math2.randomPlusMinus() * Math2.random(.5, 1);
        $this.hovered = false

        $this.alpha = Math2.randomInt(10, 100) / 100;

        $this.vy = -5 + parseInt(Math.random() * 10) / 2;
        $this.vx = -4 + parseInt(Math.random() * 8);

        $this.setPosition = function(x, y) {
            if ($this.text) {
                $this.x = x + (options.width / 2 - 180);
                $this.y = y + (options.height / 2 + 100);
            } else {
                $this.x = x + (options.width / 2 - 250);
                $this.y = y + (options.height / 2 - 175);
            }
        };

        return $this;

    }


    function update() {
            
        renderer.render(stage);
            

        for (i = 0; i < particles.length; i++) {
            var p = particles[i];

            if (mousePos.x > p.x && mousePos.x < p.x + p.size && mousePos.y > p.y && mousePos.y < p.y + p.size) {
                p.hovered = true;
            }

            p.scale.x = p.scale.y = scale = Math.max(Math.min(2.5 - (Math2.distance(p.x, p.y, mousePos.x, mousePos.y) / 160), 160), 1);


            p.x = p.x + .2 * Math.sin(p.timer * .15)
            p.y = p.y + .2 * Math.sin(p.timer * .15)
            p.timer = p.timer + p.v;

        }
      window.requestAnimationFrame(update);
    }

    init();
    update()
}

setTimeout(function(){$("body").css("background", "#2196F3")}, 2500);
rendering("17", 300, 300, "first");
function second() {
    $("#first").addClass("animated rollOut");
    setTimeout(function(){$("#first").html("")}, 1000)
    $("body").css("background", "#333");
    setTimeout(secondRendering, 1500);
}

function secondRendering() {
    $(".take").css("-webkit-animation-delay", "0s");
    $(".take").css("animation-delay", "0s");
    $(".my").css("-webkit-animation-delay", "1.25s");
    $(".my").css("animation-delay", "1.25s");
    $(".little").css("-webkit-animation-delay", "2s");
    $(".little").css("animation-delay", "2s");
    $(".helloWorld").css("-webkit-animation-delay", "2s");
    $(".helloWorld").css("animation-delay", "2s");
    $(".takenBtn").css("-webkit-animation-delay", "3s");
    $(".takenBtn").css("animation-delay", "3s");
}

var takenBtnCounter = 0;

function takenBtnGame() {
    if (takenBtnCounter==0) {
        $(".takenBtn").css("-webkit-transform", "translateX(120px)");
        $(".takenBtn").css("transform", "translateX(120px)");
        takenBtnCounter = takenBtnCounter+1;
    } else if (takenBtnCounter==1) {
        $(".takenBtn").css("-webkit-transform", "translateY(50px)");
        $(".takenBtn").css("transform", "translateY(50px)");
        takenBtnCounter = takenBtnCounter+1;
    } else if (takenBtnCounter==2) {
        third();
    }
}

function third() {
    $("#second").addClass("animated zoomOutUp");
    setTimeout(function(){$("#second").html("")}, 1000)
    $("body").css("background", "#fff");
    $("#third").css("display", "block");
    $("#third").css("opacity", "1");
    setTimeout(thirdRendering, 1500);
}

function thirdRendering() {
    var love = setInterval(function(){
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;

    $('.bg_heart').append("<div class='heart' style='width:"+r_size+"px;height:"+r_size+"px;left:"+r_left+"%;background:rgba(255,"+(r_bg-25)+","+r_bg+",1);-webkit-animation:love "+r_time+"s ease;-moz-animation:love "+r_time+"s ease;-ms-animation:love "+r_time+"s ease;animation:love "+r_time+"s ease'></div>");

    $('.bg_heart').append("<div class='heart' style='width:"+(r_size-10)+"px;height:"+(r_size-10)+"px;left:"+(r_left+r_num)+"%;background:rgba(255,"+(r_bg-25)+","+(r_bg+25)+",1);-webkit-animation:love "+(r_time+5)+"s ease;-moz-animation:love "+(r_time+5)+"s ease;-ms-animation:love "+(r_time+5)+"s ease;animation:love "+(r_time+5)+"s ease'></div>");

    $('.heart').each(function(){
    var top = $(this).css("top").replace(/[^-\d\.]/g, '');
    var width = $(this).css("width").replace(/[^-\d\.]/g, '');
    if(top <= -100 || width >= 150){
      $(this).detach();
    }
    });
    },500);
    var dark = 0;
    setInterval(function(){if(dark==0){$("body").css("background", "#333");dark=1;}else{$("body").css("background", "#fff");dark=0;}}, 3000)
}