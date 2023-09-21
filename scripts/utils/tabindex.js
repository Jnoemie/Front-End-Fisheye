//fonction pour basculer l'attribut "tabintex" et la propriete overflow de notre body 

function tabindexSet(value){
    let body = document.querySelector("body");
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    const tabs = [ ...main.querySelectorAll("[tabindex]") , ...header.querySelectorAll("[tabindex]") ];

    if ( body.style.overflow === 'hidden' ) { 
        body.style.overflow = 'unset'
    } else {
        body.style.overflow = 'hidden';
    }

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].setAttribute("tabindex",`${value}`);
    }
}