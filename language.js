const savedLanguage = localStorage.getItem('language') || 'ja';
let currentLanguage = savedLanguage;

// window.onload=function(){
//     let currentLanguage = 'ja';
// }
$(document).ready(function(){
    let currentLanguage = 'ja';
    loadLanguage();
  })

function loadLanguage() {
    fetch(`lang_${currentLanguage}.json`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('title').textContent = data.title;
        document.querySelectorAll('.currencyUnit').forEach((element) => {
            const key = element.getAttribute('data-key');
            if (key && data[key]) {
                element.textContent = data[key];
            }
        })
        document.getElementById('new-plate-prices').setAttribute('placeholder',data.placeholder);
        document.getElementById('subTitle').textContent = data.subTitle;
        document.getElementById('addButton').textContent = data.addButton;
        document.getElementById('totalCount').textContent = data.totalCount;
        document.getElementById('totalPrices').textContent = data.totalPrices;

        // document.getElementById('toggle-language').textContent =
        //     currentLanguage === 'ko' ? '' : ''; 
    })
    .catch(error => console.error('Error loading language file', error));   
}


function toggleLanguage(){
    currentLanguage = currentLanguage === 'ko' ? 'ja' : 'ko';
    localStorage.setItem('language', currentLanguage);
    loadLanguage();
}

document.addEventListener('DOMContentLoaded', loadLanguage);
