



$.fn.colorpicker = function () {

    let element = $(this);

    //Buton
    let button = $("<img>").attr({
        id: "btn-picker",
        src: "./imgs/icon.jpg"
    });
    button.click(togglePicker);
    element.append(button);

    //Template ColorPicker
    let canvas = $("<canvas>").attr({
        id:"myCanvas"
    });
    let canvasImage = $("<img>").attr({
        id: "canvasImage",
        src:"./imgs/color-picker.png"
    });
    let exitButton = $("<img>").attr({
        id: "exit",
        src: "./imgs/close.png"
    });
    let divColorPicker = $("<div>").attr({
        id: "colorPicker"
    });
    let inputHEX = $("<input>").attr({
        id:"HEX",
        type:"text",
        placeholder:"HEX"
    });
    let inputRGB = $("<input>").attr({
        id:"RGB",
        type:"text",
        placeholder:"RGB"
    });
    let colorPreview = $("<div>").attr({
        id: "color"
    });
    let divColorInfo = $("<div>");

    divColorInfo.append(inputHEX);
    divColorInfo.append(inputRGB);
    divColorInfo.append(colorPreview);
    divColorPicker.append(exitButton);
    divColorPicker.append(canvas);
    divColorPicker.append(divColorInfo);

    let ctx;
    function togglePicker() {
        if($("#colorPicker").length){
            close();
            return;
        }
        canvas.click(getColor);
        exitButton.click(close);
        inputRGB.change(changeColorbyRGB);
        inputHEX.change(changeColorbyHEX);
        element.append(divColorPicker);
        ctx = canvas[0].getContext("2d");
        ctx.drawImage(canvasImage[0], 10, 10);
    }

    function getColor(event) {
        let data,offsetTop,offsetLeft;
        offsetTop = canvas.offset().top + $(window).scrollTop();
        offsetLeft = canvas.offset().left + $(window).scrollLeft();
        data = ctx.getImageData(event.pageX-offsetLeft,event.pageY-offsetTop,1,1).data;
        inputRGB.val(data[0] + "." + data[1] + "." + data[2]);
        inputHEX.val(RGBtoHEX(data[0],data[1],data[3]));
        inputHEX.copy();
        colorPreview.css("background-color", "rgb(" + data[0] + "," + data[1] + "," + data[2] + ")");
    }

    function changeColorbyHEX(event) {
        colorPreview.css("background-color", event.target.value);
        inputRGB.val(hexToRgb(event.target.value));
        inputHEX.copy;
    }

    function changeColorbyRGB(event) {
        let color = event.target.value.replace(".", ",");
        color = color.replace(".", ",");
        colorPreview.css("background-color", "rgb(" + color + ")");
        let rgb = color.split(",");
        inputHEX[0].value = RGBtoHEX(Number(rgb[0]),Number(rgb[1]),Number(rgb[2]));
        inputHEX.copy();
    }


    $.fn.copy = function() {
        this[0].select();
        document.execCommand("copy");
        console.log("copied to clipboard:",inputHEX[0].value);
    }

    function RGBtoHEX(r, g, b) { 
        return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    }

    const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

    function close() {
        $("#colorPicker").remove();
    }
}