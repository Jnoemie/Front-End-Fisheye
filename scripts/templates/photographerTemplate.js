//factory 
// affichage d'un photographe 
function photographerFactory(data) {

  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;
// carte de visite du phototgraphe 
  function getUserCardDOM() {
      const article = document.createElement( 'article' );
      article.className = 'thumb-photographer';

      const linkUser = document.createElement( 'a' );
      linkUser.href = `photographer.html?photographer=${id}`;
      linkUser.ariaLabel = name;
      linkUser.setAttribute("onkeydown","openlink(event)");
      
      const img = getUserPictureDOM();

      const h2 = document.createElement( 'h2' );
      h2.textContent = name;

      const location = document.createElement( 'p' );
      location.textContent = `${city}, ${country}`;

      const tag = document.createElement( 'p' );
      tag.textContent = tagline;

      const dailyPrice = document.createElement( 'p' );
      dailyPrice.textContent = `${price}€/jour`;

      linkUser.appendChild(img);
      linkUser.appendChild(h2);
      article.appendChild(linkUser);

      article.appendChild(location);
      article.appendChild(tag);
      article.appendChild(dailyPrice);

      return (article);
  }
// profil du photographe 
  function getUserProfilDOM() {
      const profil = document.createElement( 'div' );
      profil.className = 'photographer-profile';

      const h1 = document.createElement( 'h1' );
      h1.textContent = name;

      const location = document.createElement( 'h2' );
      location.textContent = `${city}, ${country}`;
      const tag = document.createElement( 'p' );
      tag.textContent = tagline;

      
      profil.appendChild(h1);
      profil.appendChild(location);
      profil.appendChild(tag);
      
      return (profil);
  }
// img du photographe 
  function getUserPictureDOM() {
      const img = document.createElement( 'img' );
      img.setAttribute("src", picture);
      img.setAttribute("alt", name);
      img.setAttribute("loading", "lazy");
      img.className = 'user';
      
      return (img);
  }
  
  return { getUserCardDOM, getUserProfilDOM, getUserPictureDOM, price }
}