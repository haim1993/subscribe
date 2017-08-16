"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

var Random = function () {
    function Random() {
        _classCallCheck(this, Random);
    }

    Random.generateBinary = function generateBinary() {
        var random = Math.random();
        if (random > 0.5) {
            return 1;
        } else {
            return 0;
        }
    };

    Random.generate = function generate(min, max) {
        return Math.floor(Math.random() * max + min);
    };

    return Random;
}();

var Binary = function () {
    function Binary() {
        _classCallCheck(this, Binary);

        this.value = Random.generateBinary();
    }

    Binary.prototype.animate = function animate(ts, leftOffset, topOffset) {
        var div = document.createElement("div");
        $(div).css("font-size", ts + "px");
        $(div).css("top", topOffset * (ts / 2));
        $(div).css("left", leftOffset + "px");
        $(div).text(this.value);
        $(div).addClass("binary");
        $(div).hide();
        $("body").append(div);
        $(div).show().addClass("animated fadeIn").on(animationEnd, this.fadeInEnd);
        return $(div).offset().top;
    };

    Binary.prototype.fadeInEnd = function fadeInEnd(event) {
        var $binary = $(event.currentTarget);
        $binary.removeClass("animated fadeIn");
        $binary.addClass("animated fadeOut").on(animationEnd, function () {
            $binary.remove();
        });
    };

    return Binary;
}();

var BinaryLine = function () {
    function BinaryLine(lO, tS, dS) {
        _classCallCheck(this, BinaryLine);

        this.leftOffset = lO;
        this.textSize = tS;
        this.documentSize = dS;
    }

    BinaryLine.prototype.generate = function generate() {
        var iterator = 1;
        var size = this.length;
        var fontSize = this.textSize;
        var documentSize = this.documentSize;
        var currentOffset = 0;
        var leftOffset = this.leftOffset;
        var interval = setInterval(function () {
            if (currentOffset < documentSize) {
                var binary = new Binary();
                currentOffset = binary.animate(fontSize, leftOffset, iterator);
                iterator++;
            } else {
                clearInterval(interval);
            }
        }, 80);
    };

    return BinaryLine;
}();

var BinaryAnimation = function () {
    function BinaryAnimation() {
        _classCallCheck(this, BinaryAnimation);
    }

    BinaryAnimation.prototype.start = function start() {
        setInterval(function () {
            new BinaryLine(Random.generate(0, $(document).width()), Random.generate($(document).width() * 0.008, $(document).width() * 0.012), $(document).height()).generate();
        }, 2000);

        setInterval(function () {
            $(".binary").remove();
        }, 30000);
    };

    return BinaryAnimation;
}();

new BinaryAnimation().start();