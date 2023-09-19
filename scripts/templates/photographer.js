function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
  
    const picture = `assets/photographers/${portrait}`;
  
    function getUserCardDOM() {
      const article = document.createElement("article");
      article.setAttribute("role", "region");
      article.setAttribute('tabindex', '-1');
  
      const linkPhotographer = document.createElement("a");
      linkPhotographer.setAttribute("href", `./photographer.html?id=${id}`);
      linkPhotographer.setAttribute("aria-label", name);
      linkPhotographer.setAttribute("role", "link");
      linkPhotographer.setAttribute("title", `Visiter la page de profil ${name} ?`)
  
      const imgPhotographer = document.createElement("img");
      imgPhotographer.setAttribute("src", picture);
     
     
      const namePhotographer = document.createElement("h2");
      namePhotographer.textContent = name;
  
      const infosPhotographer = document.createElement('div');
      infosPhotographer.setAttribute('tabindex', '0');
  
      const locationPhotographer = document.createElement("div");
      locationPhotographer.textContent = `${city},${country}`;
      locationPhotographer.setAttribute("aria-label", "Ville et pays du photographe");
  
  
      const taglinePhotographer = document.createElement("div");
      taglinePhotographer.textContent = tagline;
      taglinePhotographer.setAttribute("aria-label", "Tag line");
  
      const pricePhotographer = document.createElement("div");
      pricePhotographer.textContent = `${price}€/jour`;
      pricePhotographer.setAttribute("aria-label", "Prix par jour");
  
  
  
      article.appendChild(linkPhotographer);
      linkPhotographer.appendChild(imgPhotographer);
      linkPhotographer.appendChild(namePhotographer);
      article.appendChild(infosPhotographer);
      infosPhotographer.appendChild(locationPhotographer);
      infosPhotographer.appendChild(taglinePhotographer);
      infosPhotographer.appendChild(pricePhotographer);
      return article;
    }
    
  
    return { name, picture, price, getUserCardDOM};
  }
  
  
  