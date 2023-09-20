let IsLightboxKeyListenerActive = false;
document.addEventListener( 'keydown',
    function (event) {
        IsLightboxKeyListenerActive ? handleLightboxKeyDown(event) : undefined;
    }
);

function getWorks() {
    const worksNodes = document.querySelectorAll(".photograph-work>.thumb-imgfull");
    // Converti la nodelist en array, le call appelle la nodelist en tant que 'this' dans la méthode et array.prototype défini le type de 'this'
    return Array.prototype.slice.call(worksNodes);
}

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

function loadLightbox() {
    const lightbox = document.querySelector(".lightbox");
    const lightboxText = lightbox.querySelector("p");
    const works = getWorks();
    const currentWorkKey = lightbox.dataset.key;
    const currentText = works[currentWorkKey].querySelector("h2").textContent;
    const currentWork = works[currentWorkKey].querySelector(".thumb-img").cloneNode(true);
    currentWork.setAttribute("tabindex","4");
    currentWork.removeAttribute("onkeydown");
    currentWork.removeAttribute("aria-haspopup");

    if (currentWork.tagName.toLowerCase() === "video") {
        currentWork.setAttribute("controls","");
    }

    if (currentWorkKey < 1) {
        lightbox.querySelector(".previous").setAttribute("disabled","")
    } else if (currentWorkKey > works.length - 2) {
        lightbox.querySelector(".next").setAttribute("disabled","")
    } else {
        lightbox.querySelector(".previous").removeAttribute("disabled")
        lightbox.querySelector(".next").removeAttribute("disabled")
    }

    if (lightbox.querySelector(".thumb-img") != undefined) {
        lightbox.querySelector(".thumb-img").outerHTML = "";
    }

    lightbox.insertBefore(currentWork, lightboxText);
    lightbox.querySelector(".thumb-img").removeAttribute("onclick");
    lightboxText.textContent = currentText;
}

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

function previousItem() {
    const lightbox = document.querySelector(".lightbox");
    let lightboxKey = parseInt(lightbox.dataset.key);

    if (lightboxKey > 0) {
        lightboxKey -= 1;
        lightbox.dataset.key = lightboxKey;
        loadLightbox()
    }
}

function closeLightbox( ) {
    const lightbox = document.querySelector(".lightbox");
    const lightboxKey = parseInt(lightbox.dataset.key);

    IsLightboxKeyListenerActive = false;
    lightbox.classList.toggle('lightbox-show');
    tabindexSet(0);
    document.querySelectorAll(".thumb-img")[lightboxKey].focus();
}