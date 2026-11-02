//TEMPERATURE UNIT TOGGLE
let currentUnit = "C"
let lastLeavingTemp = null;
let lastReturningTemp = null;

const unitButton = document.getElementById("unit-toggle");
unitButton.addEventListener("click", function(){
  if (currentUnit ==="C"){
    currentUnit = "F";
    unitButton.textContent = "Switch to °C";
  }else{
    currentUnit = "C";
    unitButton.textContent = "Switch to °F";
  }
  if(lastLeavingTemp !== null){
    document.getElementById("leaving-temp").textContent = formatTemperature(lastLeavingTemp);
  }
  if(lastReturningTemp !== null){
    document.getElementById("returning-temp").textContent = formatTemperature(lastReturningTemp);
  }
  if(lastLeavingTemp!==null&&lastReturningTemp!==null){
    document.getElementById("temp-difference").textContent = formatDifference(lastLeavingTemp,lastReturningTemp);
  }
});

function formatTemperature(celsius){
  if(currentUnit === "F"){
const fahrenheit = celsius *9 /5 +32;
    return `${Math.round(fahrenheit)}°F`;
  }else{
    return`${Math.round(celsius)}°C`
  }
}
function formatDifference(leavingC,returningC){
  if(currentUnit === "F"){
    const leavingF = leavingC * 9/5 +32;
    const returningF = returningC * 9/5 +32;
    return `${Math.round(returningF) - Math.round(leavingF)}°F`;
  }else{
    return `${Math.round(returningC) - Math.round(leavingC)}°C`;
  }
}

//TIME DROPDOWNS
const leaveHour = document.getElementById("leave-hour");
const leaveMinute = document.getElementById("leave-minute");
const returnHour = document.getElementById("return-hour");
const returnMinute = document.getElementById("return-minute");

for (let hour = 0; hour < 24; hour++) {
  const hh = String(hour).padStart(2, "0");

  leaveHour.add(new Option(hh, hh));
  returnHour.add(new Option(hh, hh));
}

for (let minute = 0; minute < 60; minute += 15) {
  const mm = String(minute).padStart(2, "0");

  leaveMinute.add(new Option(mm, mm));
  returnMinute.add(new Option(mm, mm));
}

leaveHour.value = "12";
leaveMinute.value = "00";

returnHour.value = "23";
returnMinute.value = "00";

//CHECK TEMPERATURE BUTTON

const checkButton = document.getElementById("check-temperature");
checkButton.addEventListener("click", function () {
  const leavingTime = `${leaveHour.value}:${leaveMinute.value}`;
  const returningTime = `${returnHour.value}:${returnMinute.value}`;
  const returningDay= document.getElementById("return-day").value;
  console.log("Leaving:", leavingTime);
  console.log("Outside again:", returningTime);
  console.log("Returning day:", returningDay);

//FETCH WEATHER DATA
  
  const apiUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=40.69371&longitude=-73.98596&minutely_15=apparent_temperature&timezone=America%2FNew_York&forecast_days=2";
  console.log("Requested URL:", apiUrl);
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const times = data.minutely_15.time;
      const temperatures = data.minutely_15.apparent_temperature;
      const today = times[0].slice(0, 10);
      const tomorrow = times[times.length-1].slice(0, 10);
      const leavingTargetTime = `${today}T${leavingTime}`;
      const leavingIndex = times.indexOf(leavingTargetTime);
      

let returningDate = today;
      if(returningDay==="tomorrow"){
        returningDate = tomorrow;
      }
      const returningTargetTime = `${returningDate}T${returningTime}`;
      const returningIndex = times.indexOf(returningTargetTime);
      console.log("Target:", leavingTargetTime);
      console.log("Index:", leavingIndex);
      console.log("Target:", returningTargetTime);
      console.log("Index:", returningIndex);
      console.log("Returning Target:", returningTargetTime);
      
      if (leavingIndex !== -1) {
        lastLeavingTemp = temperatures[leavingIndex];
        console.log("Leaving feels-like:", lastLeavingTemp);
        document.getElementById("leaving-temp").textContent = formatTemperature(lastLeavingTemp);
      }

if (returningIndex !== -1) {
          lastReturningTemp = temperatures[returningIndex];
        console.log("returning feels-like:", lastReturningTemp);
        document.getElementById("returning-temp").textContent = formatTemperature(lastReturningTemp);;
      }

if (leavingIndex !== -1 && returningIndex !== -1){
    const difference = lastReturningTemp - lastLeavingTemp;

    console.log ("Temperature differece:", difference);
document.getElementById("temp-difference").textContent = formatDifference(lastLeavingTemp,lastReturningTemp);


let nowAdvice = "";
  if (lastLeavingTemp < 12){
    nowAdvice = "Wear a jacket when you leave.";
  }else{
    nowAdvice = "A lighter outfit should work when you leave :D"
  }
      document.getElementById("clothing-advice").textContent = nowAdvice
        
let laterAdvice = "";
  if (difference <= -3){
    laterAdvice = "Bring an extra layer for later.";
  }else{
    laterAdvice = "No major temperature drop detected :D"
  }
      document.getElementById("clothing-advice").textContent = `${nowAdvice}\n${laterAdvice}`;
  
}

      
    })
    .catch((error) => {
      console.error("API error:", error);
    });
});
