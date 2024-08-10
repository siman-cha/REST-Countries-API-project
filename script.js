const countriesCon = document.querySelector('.countries-con');
const filterRegion = document.querySelector('.filter-region');
const searchInput = document.querySelector('.search-con input');
const darkMode = document.querySelector('.mode');

let countriesData;

fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
.then((data) => {
  renderCon(data)
  countriesData = data
}) 

    filterRegion.addEventListener("change", (e) => {
      fetch(`https://restcountries.com/v3.1/region/${filterRegion.value}`)
      .then((res) => res.json())
      .then(renderCon)
    });

function renderCon(data) {
  countriesCon.innerHTML = ''
        data.forEach((country) => {
          const countryCard = document.createElement("a");
          countryCard.classList.add("country-card");
          countryCard.href = `/country.html?name=${country.name.common}`
          countryCard.innerHTML = `
          <img src=${country.flags.svg} alt="flag" />
                      <div class="card-text">
                        <h3 class="card-title">${country.name.common}</h3>
                        <p><b>Population: </b>${country.population.toLocaleString('en-In')}</p>
                        <p><b>Region: </b>${country.region}</p>
                        <p><b>Capital: </b>${country.capital}</p>
                      </div>`;
  
                      countriesCon.append(countryCard);
                    })
                  };

searchInput.addEventListener('input', (e) => {
  const filterCon = countriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))

  renderCon(filterCon);
});

darkMode.addEventListener('click', (e) => {
  document.body.classList.toggle('active1');
  localStorage.setItem('darkMode', document.body.classList.contains('active1') ? 'dark' : 'light');
});
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'dark') {
  document.body.classList.add('active1');
} else {
  document.body.classList.remove('active1');
}

