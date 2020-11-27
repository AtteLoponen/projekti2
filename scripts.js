/*  */
var form = document.getElementsByTagName('form')[0]
var input = document.getElementsByTagName('input')[0]
var list = document.querySelector(".ajax .cw");

form.addEventListener("submit", e => {
    /* preventDefaultilla perutaan submitin perusominaisuus eli sivun päivittäminen */
    e.preventDefault();
    var iVal = input.value;

/* Seuraavaksi API määrittelyt. Saatuamme kaupungin nimen, se sijoitetaan API:n urliin */
var url = "https://api.openweathermap.org/data/2.5/weather?q="+iVal+"&appid=6b7e19ef422d67acff14a31e3b543311&units=metric";
/* Lähetämme palvelin pyynnön fetchillä */
fetch(url)
.then(response => response.json())
/* Haettu data sijoitetaan muuttujaan */ 
.then(data => {
      var { main, name, sys, weather } = data;
      /* Käytimme JavaScriptin Template Literals ominaisuutta ( ${} ) jolla saadaan kätevästi sijoitettua muuttuja 
      haluamaansa paikkaan. Käytämme kuvina Amazonin tarjoamia ilmaisia sääikonieita */
      var icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;
      /* Luomme listan säätiedoille */
      var li = document.createElement("li");
      /* Backtickin avulla alustamme koodilohkon joka lisää säätiedot valmiiseen HTML muotoon. Käytössä taas Template Literals */
      var citydata = `
        <h2 data-name="${name},${sys.country}">
          <h3>${name}</h3>
        </h2>
        ${Math.round(main.temp)}°C
          <img class="city-icon" src="${icon}">
          <figcaption>${weather[0]["description"]}</figcaption>
          `;
    /* Säätiedot lisätään uutena listan jäsenenä */
    li.innerHTML = citydata;
    list.appendChild(li);
});
}
);