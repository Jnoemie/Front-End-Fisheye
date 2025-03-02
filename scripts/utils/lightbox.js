let IsLightboxKeyListenerActive = false;
//ajout d'un ecouteur global 
document.addEventListener( 'keydown',
    function (event) {
        IsLightboxKeyListenerActive ? handleLightboxKeyDown(event) : undefined;
    }
);
// selectionne de class photograph-work ... et les renvoyer sous forme de tableau Js 
function getWorks() {
    // recherche tout les element a selectionner 
    //workNodes est une nodelist 
    const worksNodes = document.querySelectorAll(".photograph-work>.thumb-imgfull");
    // Converti la nodelist en tabelau 
    return Array.prototype.slice.call(worksNodes);
}
// gere l'ouverture d'une lightbox lorsque l'utilisateur clique sur une image 
function lightbox(event) {
    const target = event.currentTarget;
    const work = target.parentNode;
    const lightbox = document.querySelector(".lightbox");
    const works = getWorks();
    const indexWork = works.indexOf(work);

    lightbox.dataset.key = indexWork;

    tabindexSet(-1);
    loadLightbox();
    
    lightbox.classList.toggle('lightbox-show');
    lightbox.querySelector(".close").focus();

    IsLightboxKeyListenerActive = true;
}
// prepare et affiche le contenu de la lighthbox en fonction de l'élément selectionné 
function loadLightbox() {
    const lightbox = document.querySelector(".lightbox");
    const lightboxText = lightbox.querySelector("p");
    const works = getWorks();// renvoie du tableau contenant les oeuvres
    const currentWorkKey = lightbox.dataset.key;// recupere de la valeur 
    const currentText = works[currentWorkKey].querySelector("h2").textContent;
    const currentWork = works[currentWorkKey].querySelector(".thumb-img").cloneNode(true);// clone de l'element 
    currentWork.setAttribute("tabindex","4");// attribut tabindex 4 au clone 
    currentWork.removeAttribute("onkeydown");
    currentWork.removeAttribute("aria-haspopup");
// si video ajout de l'attribut "control" pour les commandes de lecture 
    if (currentWork.tagName.toLowerCase() === "video") {// si video affichage des commandes
        currentWork.setAttribute("controls","");
    }

    if (currentWorkKey < 1) {// verification si l'oeuvre et la premiere
        lightbox.querySelector(".previous").setAttribute("disabled","")// desactive precedent
    } else if (currentWorkKey > works.length - 2) {// si l'oeuvre est la derniere 
        lightbox.querySelector(".next").setAttribute("disabled","")//desactive le bouton next 
    } else {
        // reactive bouton 
        lightbox.querySelector(".previous").removeAttribute("disabled")
        lightbox.querySelector(".next").removeAttribute("disabled")
    }

    if (lightbox.querySelector(".thumb-img") != undefined) {
        lightbox.querySelector(".thumb-img").outerHTML = "";
    }

    lightbox.insertBefore(currentWork, lightboxText);
    lightbox.querySelector(".thumb-img").removeAttribute("onclick");// suppression de l'attribut onclick 
    lightboxText.textContent = currentText;//met a jour le texte de l'ouevre actuel 
}
//determine quelle action doit etre effectuer en fonction de la classe 
function lightboxControl(event) {
    switch (event.currentTarget.className) {
        case "next":
            nextItem();
            break;
        case "previous":
            previousItem();
            break;
        case "close":
            closeLightbox()
            break;
    }
}
//gere les touche du clavier 
function handleLightboxKeyDown(event) {
    switch (event.key) {
        case "ArrowLeft":
            previousItem()
            break;
        case "ArrowRight":
            nextItem()
            break;
        case "Escape":
            closeLightbox();
            break;
    }
}
// ecoute les event declancher par le clavier et declenche les actions 
function nextItem() {
    const lightbox = document.querySelector(".lightbox");
    let lightboxKey = parseInt(lightbox.dataset.key);
    const works = getWorks();

    if (lightboxKey < works.length - 1) {
        lightboxKey += 1;
        lightbox.dataset.key = lightboxKey;
        loadLightbox()
    }
}
// permet de naviguer vers l'élément precedent 
function previousItem() {
    const lightbox = document.querySelector(".lightbox");
    let lightboxKey = parseInt(lightbox.dataset.key);

    if (lightboxKey > 0) {
        lightboxKey -= 1;
        lightbox.dataset.key = lightboxKey;
        loadLightbox()
    }
}
// fermeture de la lightbox 
function closeLightbox( ) {
    const lightbox = document.querySelector(".lightbox");
    const lightboxKey = parseInt(lightbox.dataset.key);

    IsLightboxKeyListenerActive = false;
    lightbox.classList.toggle('lightbox-show');
    tabindexSet(0);
    document.querySelectorAll(".thumb-img")[lightboxKey].focus();
}