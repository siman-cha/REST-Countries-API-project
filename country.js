const countryName = new URLSearchParams(location.search).get('name');
const flagImg = document.querySelector('.country-details img');
const countryHead = document.querySelector('.details-text-con h1');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population ');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const domain = document.querySelector('.domain');
const currencies = document.querySelector('.currencies');
const language = document.querySelector('.language');
const borderCon = document.querySelector('.border-countries');
const darkMode = document.querySelector('.mode')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then((data) => {
    flagImg.src = data[0].flags.svg
    countryHead.innerText = data[0].name.common
    population.innerText = data[0].population.toLocaleString('en-In')
    region.innerText = data[0].region
    domain.innerText = data[0].tld.join(', ')

    if (data[0].name.nativeName) {
        nativeName.innerText = Object.values(data[0].name.nativeName)[0].common
    }
    else {
        nativeName.innerText = data[0].name.common
    }

    if (data[0].subregion) {
    subRegion.innerText = data[0].subregion
    }

    if (data[0].capital) {
    capital.innerText = data[0].capital?.[0]
    }

    if (data[0].currencies) {
        currencies.innerText = Object.values(data[0].currencies).map((currency) => currency.name).join(', ')
    }

    if (data[0].languages) {
        language.innerText = Object.values(data[0].languages).join(', ')
    }

    if (data[0].borders) {
        data[0].borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
                const borderConTag = document.createElement('a')
                borderConTag.innerText = borderCountry.name.common
                borderConTag.href = `country.html?name=${borderCountry.name.common}`
                borderCon.append(borderConTag)
            })
        })
    }
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