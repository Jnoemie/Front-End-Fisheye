let IsFormContactKeyListenerActive = false;
document.addEventListener( 'keydown',
    function (event) {
        if (event.key === "Escape") {
            IsFormContactKeyListenerActive ? closeModal() : undefined;
        }
    }
);
// ouverture modal 
function displayModal() {
    const modal = document.getElementById("contact_modal");
    tabindexSet(-1);
	modal.classList.add("modal-show");
    modal.querySelector("img").focus();

    IsFormContactKeyListenerActive = true;
}
//fermeture modal 
function closeModal() {
    const modal = document.getElementById("contact_modal");
    tabindexSet(0);
	modal.classList.remove("modal-show");
    setTimeout( () => document.querySelector("main .contact_button").focus() , 50);
    IsFormContactKeyListenerActive = false;
}
// recherche du bon photographe pour mettre son nom
function getPhotographerId() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params.photographer;
}
//extrait les valeur saisie dans le formulaire 
function getFormData() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let yourMessage = document.getElementById("yourMessage").value;
    let data = {firstName, lastName, email, yourMessage};
    resetFormData();

    return data;
}
//reinitialise les champs du formaulaire 
function resetFormData() {
    document.getElementById("firstName").value   =
    document.getElementById("lastName").value    =
    document.getElementById("email").value       =
    document.getElementById("yourMessage").value = '';
}
//empeche l'envoie par defaut du formulaire , recupere les donnée de getFormdata 
function sendForm(event) {
    event.preventDefault();

    console.log(getFormData());
    // Envoyer 'data' à l'email du photographe avec l'id de getPhotographerId()

    closeModal();
    return false;
}