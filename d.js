// Function to fetch available Google Fonts
async function fetchGoogleFonts() {
    const response = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCLZ8BHbgtwAASf-egjI0zXb-WHe6BhR3c');
    const data = await response.json();
    return data.items;
}

// Function to dynamically load fonts into select dropdown
async function loadFonts() {
    const fonts = await fetchGoogleFonts();
    const fontSelect = document.getElementById('fontSelect');
    fonts.forEach(font => {
        const option = document.createElement('option');
        option.text = font.family;
        option.value = font.family;
        fontSelect.add(option);
    });
}

document.addEventListener('DOMContentLoaded', loadFonts);

document.getElementById('convertBtn').addEventListener('click', function() {
    var textInput = document.getElementById('textInput').value.trim();
    var fontName = document.getElementById('fontSelect').value;
    var resultDiv = document.getElementById('result');

    if (textInput === '') {
        resultDiv.innerHTML = '<p>Please enter some text.</p>';
        return;
    }

    var fontSize = 100;

    var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="200">
        <text x="0" y="150" font-family="${fontName}" font-size="${fontSize}">
            ${textInput}
        </text>
    </svg>`;

    resultDiv.innerHTML = `
        <a href="data:image/svg+xml,${encodeURIComponent(svg)}" download="${textInput}.svg">
            <button>Download SVG</button>
        </a>
    `;
});
