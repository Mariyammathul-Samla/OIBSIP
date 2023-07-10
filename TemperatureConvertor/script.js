var conversionHistory = [];
var conversionHistoryVisible = false;

function convertTemperature() {
    var temperature = parseFloat(document.getElementById('temperature').value);
    var unitFrom = document.getElementById('unitFrom').value;
    var unitTo = document.getElementById('unitTo').value;
    var convertedTemperature;
    var errorMessage = "";

    if (isNaN(temperature)) {
        errorMessage = "Please enter a valid temperature.";
    } else {
        if (unitFrom === 'celsius') {
            if (unitTo === 'fahrenheit') {
                convertedTemperature = (temperature * 9 / 5) + 32;
            } else if (unitTo === 'kelvin') {
                convertedTemperature = temperature + 273.15;
            } else {
                convertedTemperature = temperature;
            }
        } else if (unitFrom === 'fahrenheit') {
            if (unitTo === 'celsius') {
                convertedTemperature = (temperature - 32) * 5 / 9;
            } else if (unitTo === 'kelvin') {
                convertedTemperature = (temperature - 32) * 5 / 9 + 273.15;
            } else {
                convertedTemperature = temperature;
            }
        } else if (unitFrom === 'kelvin') {
            if (unitTo === 'celsius') {
                convertedTemperature = temperature - 273.15;
            } else if (unitTo === 'fahrenheit') {
                convertedTemperature = (temperature - 273.15) * 9 / 5 + 32;
            } else {
                convertedTemperature = temperature;
            }
        }
    }

    if (errorMessage === "") {
        document.getElementById('convertedTemperature').value = convertedTemperature.toFixed(2);
        document.getElementById('error-message').textContent = "";

        var conversionString = temperature + " " + unitFrom + " = " + convertedTemperature.toFixed(2) + " " + unitTo;
        conversionHistory.push(conversionString);
        updateConversionHistory();
    } else {
        document.getElementById('error-message').textContent = errorMessage;
    }
}

function clearFields() {
    document.getElementById('temperature').value = '';
    document.getElementById('unitFrom').selectedIndex = 0;
    document.getElementById('unitTo').selectedIndex = 0;
    document.getElementById('convertedTemperature').value = '';
    document.getElementById('error-message').textContent = '';
}

function swapUnits() {
    var unitFrom = document.getElementById('unitFrom').value;
    var unitTo = document.getElementById('unitTo').value;

    document.getElementById('unitFrom').value = unitTo;
    document.getElementById('unitTo').value = unitFrom;
}

function updateConversionHistory() {
    var historyList = document.getElementById('conversion-history');
    historyList.innerHTML = '';

    for (var i = 0; i < conversionHistory.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = conversionHistory[i];
        historyList.appendChild(listItem);
    }
}

function toggleHistory() {
    var historyList = document.getElementById('conversion-history');
    var historyButton = document.getElementById('show-history-button');
    var clearHistoryButton = document.getElementById('clear-history-button');

    if (historyList.style.display === 'none') {
        historyList.style.display = 'block';
        historyButton.textContent = 'Hide History';
        clearHistoryButton.style.display = 'inline-block';
        conversionHistoryVisible = true;
    } else {
        historyList.style.display = 'none';
        historyButton.textContent = 'Show History';
        clearHistoryButton.style.display = 'none';
        conversionHistoryVisible = false;
    }
}

function clearHistory() {
    conversionHistory = [];
    updateConversionHistory();
}

// Hide conversion history initially
window.addEventListener('DOMContentLoaded', function () {
    var historyList = document.getElementById('conversion-history');
    var clearHistoryButton = document.getElementById('clear-history-button');

    historyList.style.display = 'none';
    clearHistoryButton.style.display = 'none';
});

