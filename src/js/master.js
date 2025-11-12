let inp = document.querySelector('input')
const searchBtn = document.getElementById('searchBtn')
const plantList = document.getElementById('plantList')

searchBtn.addEventListener('click', () => {
    let searchRes = inp.value.trim().toLowerCase()
    if (searchRes == "") return

    fetch('src/home_plants_80_unique.json')
        .then(response => response.json())
        .then(data => {

            const filtered = data.filter(plant =>
                plant.name.toLowerCase().includes(searchRes)
            )

            if (filtered.length === 0) {
                console.error('plant not found.');
                plantList.innerHTML = `
                    <div class="resStyle p-5 flex justify-center items-center flex-wrap *:text-[#a6d16a]">
                        <h3 class="w-full text-[#a6d16a] font-extrabold">Plant not found :(</h3>
                        <p>We couldn’t find any results matching your search. Please check the spelling or try a different name.</p>
                    </div>`

            } else {
                plantList.innerHTML = ''
                filtered.forEach(val => {
                    const plantData = document.createElement('div');
                    plantData.classList.add('resStyle')
                    plantData.innerHTML = `
                    <div class="flex items-center gap-[15px] w-full border-b-2 border-b-[#a6d16a] pb-2.5 mb-2.5">
                       <h2 class="h-fit text-[#a6d16a] uppercase font-extrabold">name: </h2>
                       <p class="text-[#606060]">${val.name}</p>
                    </div>
                    <div class="flex items-center justify-between gap-[15px] w-full md:w-[65%] h-fit flex-wrap bg-[#fefce8] rounded-[8px] *:w-full *:flex *:items-center *:gap-[15px]">
                      <div>
                          <img class="size-[30px]" src="src/assets/img/sun.png" alt="">
                          <h3 class="text-[#a6d16a] capitalize font-extrabold">Sunlight: </h3>
                          <p class="capitalize text-[#606060]">${val.sunlight}</p>
                      </div>
                      <div>
                          <img class="size-[30px]" src="src/assets/img/water.png" alt="">
                          <h3 class="text-[#a6d16a] capitalize font-extrabold">Watering: </h3>
                          <p class="capitalize text-[#606060]">${val.watering}</p>
                      </div>
                      <div>
                          <img class="size-[30px]" src="src/assets/img/cat.png" alt="">
                          <h3 class="text-[#a6d16a] capitalize font-extrabold">Pet Friendly: </h3><span class="material-symbols-outlined petMark"></span>
                      </div>
                      <div>
                         <img class="size-[30px]" src="src/assets/img/leaf.png" alt="">
                         <h3 class="text-[#a6d16a] capitalize font-extrabold">Difficulty: </h3>
                         <div class="bar w-[100px] h-[12px] border-2 border-[#a6d16a] rounded-full p-[1px]">
                             <div class="h-full w-full rounded-full"></div>
                         </div>
                      </div>
                    </div>
                    <figure class="w-[50%] md:w-[30%] h-fit overflow-hidden rounded-[8px] border-2 border-[#a6d16a] myShadow2">
                        <img class="object-cover object-center" src="${val.image}" alt="">
                    </figure>
                    `
                    //pet-friendly mark
                    let petMark = plantData.querySelector('.petMark')
                    if (val.pet_friendly == true) {
                        petMark.innerText = 'check'
                        petMark.style.color = "green"
                    } else {
                        petMark.innerText = 'close'
                        petMark.style.color = "red"
                    }
                    //difficulty bar
                    let diff = plantData.querySelector('.bar>div')
                    if (val.difficulty == 'easy') {
                        diff.style.width = '25%'
                        diff.classList.add('myBg')
                    } else if (val.difficulty == 'moderate') {
                        diff.style.width = '50%'
                        diff.classList.add('moderateBg')
                    } else if (val.difficulty == 'advanced') {
                        diff.style.width = '80%'
                        diff.classList.add('advancedBg')
                    }

                    plantList.appendChild(plantData)
                })
            }
        })
        .catch(err => {
            console.error('plant not found', err)
        })
})