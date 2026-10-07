const colorPreview = document.getElementById("colorPreview");

const colorCode = document.getElementById("colorCode");

const rgbValue = document.getElementById("rgbValue");

const hslValue = document.getElementById("hslValue");

const generateBtn = document.getElementById("generateBtn");

const copyBtn = document.getElementById("copyBtn");

const message = document.getElementById("message");

const history = document.getElementById("history");


let colorHistory = [];


// Generate a random HEX color

function generateColor() {

    const characters = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {

        const randomIndex =
            Math.floor(Math.random() * characters.length);

        color += characters[randomIndex];
    }

    applyColor(color);
}


// Apply the generated color to the page

function applyColor(color) {

    document.body.style.backgroundColor = color;

    colorPreview.style.backgroundColor = color;

    colorCode.textContent = color;

    const rgb = hexToRgb(color);

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    rgbValue.textContent =
        `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;

    hslValue.textContent =
        `HSL: ${hsl.h}°, ${hsl.s}%, ${hsl.l}%`;

    message.textContent =
        "New color generated.";

    addToHistory(color);
}


// Convert HEX to RGB

function hexToRgb(hex) {

    const r = parseInt(hex.substring(1, 3), 16);

    const g = parseInt(hex.substring(3, 5), 16);

    const b = parseInt(hex.substring(5, 7), 16);

    return {
        r: r,
        g: g,
        b: b
    };
}


// Convert RGB to HSL

function rgbToHsl(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);

    const min = Math.min(r, g, b);

    let h;
    let s;

    const l = (max + min) / 2;

    if (max === min) {

        h = 0;
        s = 0;

    } else {

        const difference = max - min;

        s =
            l > 0.5
                ? difference / (2 - max - min)
                : difference / (max + min);

        switch (max) {

            case r:

                h =
                    (g - b) / difference +
                    (g < b ? 6 : 0);

                break;

            case g:

                h =
                    (b - r) / difference + 2;

                break;

            case b:

                h =
                    (r - g) / difference + 4;

                break;
        }

        h /= 6;
    }

    return {
        h: Math.round(h * 360),

        s: Math.round(s * 100),

        l: Math.round(l * 100)
    };
}


// Copy HEX code

copyBtn.addEventListener("click", function () {

    const color = colorCode.textContent;

    if (navigator.clipboard) {

        navigator.clipboard.writeText(color)

            .then(function () {

                message.textContent =
                    `${color} copied to clipboard.`;

            })

            .catch(function () {

                message.textContent =
                    "Unable to copy the color.";

            });

    } else {

        message.textContent =
            "Clipboard is not available.";

    }
});


// Generate button

generateBtn.addEventListener("click", generateColor);


// Add color to history

function addToHistory(color) {

    colorHistory.unshift(color);

    colorHistory =
        colorHistory.slice(0, 6);

    history.innerHTML = "";

    colorHistory.forEach(function (savedColor) {

        const colorCircle =
            document.createElement("div");

        colorCircle.className =
            "history-color";

        colorCircle.style.backgroundColor =
            savedColor;

        colorCircle.title =
            savedColor;

        colorCircle.addEventListener(
            "click",
            function () {

                applyColor(savedColor);

                message.textContent =
                    `${savedColor} selected from history.`;

            }
        );

        history.appendChild(colorCircle);

    });
}