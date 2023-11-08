// gere les event clavier liéé a les touches espace et entrée
// empeche les comportement par defaut 
function handleKeyDown(event) {
    switch (event.key) {
        case "Enter":
            return true;
            break;
        case " ":
            event.preventDefault();
            return true;
            break;
        default:
            return false;
            break;
    }
}
// pour gerer la touche espace 
function openlink(event) {
    if (event.key === " ") {
        event.preventDefault();
        window.open(event.currentTarget.href,'_self');// simule un clic sur un lien 
    }
}