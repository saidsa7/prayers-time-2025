const cities = [
  { country: "MA", city: "Casablanca" },
  { country: "MA", city: "Agadir" },
  { country: "MA", city: "Tangier" },
  { country: "EG", city: "Cairo" },
  { country: "TN", city: "Tunis" },
];

let citySelect = document.getElementById("cities");
citySelect.innerHTML = "";
let content = "";
for (let theCity of cities) {
  content += `
    <option value="${theCity.city}" >${theCity.city}</option>

  `;
}
citySelect.innerHTML = content;

function prayerByCity(country, city) {
  axios
    .get(
      `https://api.aladhan.com/v1/timingsByCity?country=${country}&city=${city}`
    )
    .then(function (response) {
      let todayName = response.data.data.date.gregorian.weekday.en;
      let date = response.data.data.date.readable;
      document.getElementById("day-name").innerHTML = todayName;
      document.getElementById("date").innerHTML = date;

      const timings = response.data.data.timings;
      fillTimeForPrayers("fajr-time", timings.Fajr);
      fillTimeForPrayers("chourouk-time", timings.Sunrise);
      fillTimeForPrayers("duhr-time", timings.Dhuhr);
      fillTimeForPrayers("asr-time", timings.Asr);
      fillTimeForPrayers("maghreb-time", timings.Maghrib);
      fillTimeForPrayers("ishaa-time", timings.Isha);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}
prayerByCity("MA", "Casablanca");
let cityName = document.getElementById("city-name");
document.addEventListener("DOMContentLoaded", function () {
  citySelect.addEventListener("change", function () {
    for (let theCity of cities) {
      if (this.value == theCity.city) {
        prayerByCity(theCity.country, theCity.city);
        cityName.innerHTML = theCity.city;
      }
    }
  });
});

function fillTimeForPrayers(id, time) {
  return (document.getElementById(id).innerHTML = time);
}
