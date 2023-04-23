
btnPesquisa.addEventListener('click', function buscaCidade() {
    
    const pesquisa = document.getElementById('pesquisa')
    const cidade = document.getElementById('dados')
    const temp = document.getElementById('temp')
    const clima = document.getElementById('clima')
    const humidade = document.getElementById('humidade')
    const vento = document.getElementById('vento')
    const load = document.getElementById('load')
    



    cidade.innerHTML = '';
    temp.innerHTML = ''
    clima.innerHTML = ''
    humidade.innerHTML = ''
    vento.innerHTML = ''

    load.style.display = 'block';

    //elementos HTML
    
    const btnPesquisa = document.getElementById('btnPesquisa')
    const container = document.getElementById('container')

    //API
    const API_KEY = '532b0bde70a3ba2e73962d04b4402abc'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${pesquisa.value}&appid=${API_KEY}&lang=pt_br`



    const humiImg = `<span id="humidade-icon"><i class="fa-solid fa-droplet"></i></span>`
    const ventoImg = `<span id="vento-icon"><i class="fa-solid fa-wind"></i></span>`
    const localImg = `<i class="fa-solid fa-location-dot"></i>`
    setTimeout(function buscaCidade(){
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            // Função de callback para o evento de clique
            console.log('Botão clicado!');

            // Seleciona container da cidade
            const spanDados = document.getElementById('dados');

            const cidadeNome = document.createElement('p');
            cidadeNome.id = 'cidade';
            cidadeNome.innerHTML = `${localImg} ${data.name}`;
            spanDados.appendChild(cidadeNome);

            const tempCelsius = data.main.temp - 273.15

            temp.innerHTML = `${parseInt(tempCelsius)}°C`;
            console.log(data.weather[0].main)


            //define qual imagem irá aparecer ao lado do clima
            const climaID = data.weather[0].id
            console.log(climaID)

            var climaImg;
            
            if(climaID === 804){
                climaImg = `<i class="fa-solid fa-cloud"></i>`
            } else if(climaID >= 801 || climaID <= 803 ){
                climaImg = `<i class="fa-solid fa-cloud-sun"></i>`
            } else if(climaID === 800){
                climaImg = `<i class="fa-solid fa-sun"></i>`
            }  else if(climaID >= 600 || climaID <= 602){
                climaImg = `<i class="fa-solid fa-snowflake"></i>`
            } else if(climaID >= 611 || climaID <= 622){
                climaImg = `<i class="fa-regular fa-snowflake-droplets"></i>`
            } else if(climaID >= 500 || climaID <= 531){
                climaImg = `<i class="fa-solid fa-cloud-rain"></i>`
            } else if(climaID >= 200 || climaID <= 232){
                climaImg = `<i class="fa-solid fa-cloud-bolt"></i>`
            }  else {
                return;
            }
            clima.innerHTML = `${climaImg} ${data.weather[0].description}`

            humidade.innerHTML = `${humiImg} ${data.main.humidity}%`

            const ventoKm = data.wind.speed * 3.6

            vento.innerHTML = `${ventoImg} ${parseInt(ventoKm)}Km/h`

            pesquisa.value = ''
            
            
            

        })
        .catch(error => {
            document.getElementById("cidade").innerHTML = "Não foi possivel encontrar essa cidade."
            document.getElementById('pesquisa').value = ''
        });
        load.style.display = 'none';
        
    }, 3000)
         
});
