"use strict";

let inputSearch = $('.input-search');
let enterText = $('.enterText');
let contentWrapper = $('.content-wrapper');
let notFound = $('.not-found')

let baseURL = 'https://api.dictionaryapi.dev/api/v2';

async function fetchData(word) {
    try {
        let response = await fetch(`${baseURL}/entries/en/${word}`);
        let result = await response.json();
        console.log(result);
        renderSearch(result);
    } catch (err) {
        contentWrapper.innerHTML = `
        <div class="mt-[40px] not-found flex items-center justify-center gap-36">
        <div>
            <img src="./assets/images/sheksper.png" alt="">
        </div>
        <div class="w-[530px] text-center">
            <p class="font-semibold text-[24px] mb-2">No Definitions Found</p>
            <p class="text-[18px]">Sorry pal, we couldn't find definitions for the word you were looking for.</p>
        </div>
    </div>
        `
    }
}

inputSearch.addEventListener('keyup', (e) => {
    if(e.keyCode == 13 && e.target.value.length) { 
        fetchData(e.target.value.toLowerCase())
    }
})

function renderSearch(el) {
    contentWrapper.innerHTML = `
    <div class="w-[846px] mt-10 bg-white mx-auto px-8 py-[18px] rounded-[18px] flex flex-col gap-3">
        <p class="font-semibold text-[32px]">${el[0].word}</p>
        <p class="italic text-[#8C8B8B]">${el[0].meanings[0].partOfSpeech}</p>
        <div class="flex items-center gap-[10px]">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                    <path d="M13 11.8135V6.18646C13 3.04126 13 1.46866 12.0747 1.0773C11.1494 0.685932 10.0603 1.79793 7.88232 4.02192C6.75439 5.17365 6.11085 5.42869 4.50604 5.42869C3.10257 5.42869 2.40084 5.42869 1.89675 5.77262C0.850349 6.48655 1.00852 7.88199 1.00852 9C1.00852 10.118 0.850349 11.5134 1.89675 12.2274C2.40084 12.5713 3.10257 12.5713 4.50604 12.5713C6.11085 12.5713 6.75439 12.8264 7.88232 13.9781C10.0603 16.2021 11.1494 17.3141 12.0747 16.9227C13 16.5313 13 14.9587 13 11.8135Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 6C16.6254 6.81968 17 7.86344 17 9C17 10.1366 16.6254 11.1803 16 12" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 4C20.2508 5.36613 21 7.10574 21 9C21 10.8943 20.2508 12.6339 19 14" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
            <span class="text-[18px] text-[#8C8B8B]">${el[0].phonetics[1].text}</span>
        </div>
        <div>
            <p class="text-[18px]">${el[0].meanings[0].definitions[0].definition}</p>
        </div>
    </div>
    `
}

