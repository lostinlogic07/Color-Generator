const colorCode = document.getElementById("colorCode");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

function generateColor() {

    const characters = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);

        color += characters[randomIndex];
    }

    document.body.style.backgroundColor = color;

    colorCode.textContent = color;
}

generateBtn.addEventListener("click", generateColor);

copyBtn.addEventListener("click", function () {

    navigator.clipboard.writeText(colorCode.textContent);

    alert("Color code copied!");
});