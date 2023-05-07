// Get the form and submit button elements
const form = document.querySelector('form');
const submitBtn = document.querySelector('#submit-btn');
const newBtn = document.querySelector('#new-btn');

const loadingScreen = document.getElementById("loading-screen");
const loadingScreenAPI = document.getElementById("api-con");

const dailyUsageField = document.getElementById('daily-usage');

const resultDiv = document.querySelector('#carbon-footprint');
const mainDiv = document.querySelector('#calculation-results');


submitBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the form from submitting

  const dailyUsageInput = document.getElementById('daily-usage');
  const dailyUsageValue = dailyUsageInput.value;
  const isValidDailyUsage = dailyUsageInput.checkValidity() && (dailyUsageValue >= 1 && dailyUsageValue <= 24);

  if (!isValidDailyUsage) {
    dailyUsageInput.reportValidity();
  } else {
    const deviceName = document.querySelector('select[name="device-name"]').value;
  const batteryCap = document.querySelector('input[name="battery-cap"]').value;
  const dailyUsage = document.querySelector('input[name="daily-usage"]').value;

  // Show the loading screen
  loadingScreen.style.display = "block";


  // Calculate the carbon footprint
  const electricityMixFactor = 0.462;
  const jsonFileUrl = "data.json";
  
  fetch(jsonFileUrl)
    .then(response => response.json())
    .then(data => {
      const deviceData = data[deviceName];

      // calculate annual charging cycles
      const totalBatteryCapacity = deviceData.batteryCapacity * batteryCap / 100;
      const averageDailyUsageTime = dailyUsage;
      const annualChargingCycles = totalBatteryCapacity / averageDailyUsageTime * 365;

      // calculate carbon footprint
      const lcdEnergyConsumption = deviceData.lcdEnergyConsumption;
      const screenSize = deviceData.screenSize;
      const annualUsageTime = dailyUsage * 365;
      const carbonFootprint = (totalBatteryCapacity * annualChargingCycles * electricityMixFactor * lcdEnergyConsumption * screenSize * annualUsageTime) / 1000;

      // Delay hiding the loading screen by 5 seconds
      setTimeout(() => {
        // Hide the loading screen and show the results
        loadingScreen.style.display = "none";
        mainDiv.style.display = "flex";
        resultDiv.textContent = `Your carbon footprint is ${carbonFootprint.toFixed(2)} kg CO2e per year`;
        resultDiv.style.display = "flex";
        form.style.display = "none";
      }, 1000);

    })
    .catch(error => console.error(error));

  }
});

const responseDiv = document.getElementById("response");
const aiResults = document.getElementById("ai-results");

newBtn.addEventListener('click', (event) => {
  event.preventDefault(); // prevent the form from submitting

  // Get the values of the input fields
  const deviceName = document.querySelector('select[name="device-name"]').value;

  // Call the API function
  loadingScreenAPI.style.display = "block";
  setTimeout(() => {
    makeOpenAIRequest(deviceName);
  }, 100);
});

// Function to make the API request to OpenAI
async function makeOpenAIRequest(deviceName) {
const openaiApiKey = process.env.OPENAI_API_KEY;
  console.log(deviceName);

  // Construct the API request body
  const requestBody = {
    model: 'text-davinci-003',
    prompt: `I have already purchased ${deviceName}, How can I lower the carbon footprint of my ${deviceName}?`,
    max_tokens: 300,
    n: 1,
    stop: '###',
  };
  console.log(JSON.stringify(requestBody));
  try {
    // Make the API request using fetch()
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Extract the JSON response from the
    const jsonResponse = await response.json();

    // Call a function to display the response to the user
    if (document.querySelector('#response')) {
      displayResponse(jsonResponse.choices[0].text);
    }
  } catch (error) {
    console.error(error);
  }
}

// define constants
function displayResponse(responseText) {
  const responseDiv = document.querySelector('#response');

  // split the response by line breaks
  const responseLines = responseText.split('\n');

  // create an ordered list element
  const ol = document.createElement('ol');

  // loop through each line of response and create list item for each non-empty line
  for (let i = 0; i < responseLines.length; i++) {
    if (responseLines[i]) { // check if line is not empty
      const li = document.createElement('li');
      li.textContent = responseLines[i];
      ol.appendChild(li);
    }
  }
  // replace the content of the response div with the ordered list
  responseDiv.innerHTML = '';
  responseDiv.appendChild(ol);

  ol.style.marginBlockStart = 0;
  ol.style.marginLeft = 0;
  ol.style.paddingInlineStart = 0;
  ol.style.marginBlockEnd= 0;
  loadingScreenAPI.style.display = "none";
  mainDiv.style.display = "none";
  resultDiv.style.display = "none";
  aiResults.style.display="flex";
  responseDiv.style.display = "block";
}

const formSteps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');

nextBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const inputFields = formSteps[index].querySelectorAll('input[type="number"], input[type="text"]');
    let isValid = true;
    inputFields.forEach((field) => {
      if (field.checkValidity() === false) {
        isValid = false;
        field.reportValidity();
      }
    });
    if (isValid) {
      formSteps[index].style.display = 'none';
      formSteps[index + 1].style.display = 'block';
    }
    
  });
});




prevBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    formSteps[index + 1].style.display = 'none';
    formSteps[index].style.display = 'block';
  });
});


// Add event listener for keydown event on the document


const inputFields = document.querySelectorAll('#registration-form input');

function focusOnInputFields() {
  inputFields.forEach(input => {
    input.focus();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    focusOnInputFields();
  }
});

const aboutUsLink = document.querySelector('.about-us-link');
const calcSecLink = document.querySelector('.cal-sec-link');
const helpSecLink = document.querySelector('.help-sec-link');

aboutUsLink.addEventListener('click', () => {
  window.location.href = 'aboutus.html';
});

calcSecLink.addEventListener('click', () => {
  window.location.href = 'calc.html';

});

helpSecLink.addEventListener('click', () => {
  window.location.href = 'help.html';

});


const recheck = document.querySelector('#re-btn');
recheck.addEventListener('click', () => {
  window.location.href = 'index.html';

});


const logo = document.querySelector('.logo');
        
logo.addEventListener('click', () => {
    window.location.href="index.html"
});




document.addEventListener("keydown", function(event) {
  if (event.key === 13) {
    event.preventDefault();
  }
});
