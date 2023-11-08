//factory 
// retourne les phots et videéo d'un photographe 
function photographerWorkFactory(data) {
    
  const { title, image, video, likes, date } = data;
  const picture = `assets/images/${image}`;
  const videoMedia = `assets/images/${video}`;
//creer et retourne un element html , representant les photos et video du photographe 
  function getMediaDOM() {
      var media = undefined;

      if( image != undefined ) {
          media = document.createElement( 'img' );
          media.src = picture;
          media.alt = title;
          media.setAttribute("loading", "lazy");
      } else if( video != undefined ) {
          media = document.createElement( 'video' );
          media.src = videoMedia;
          media.title = title;
          media.setAttribute("preload", "metadata");
      }

      media.setAttribute("onclick", "lightbox(event)");
      media.setAttribute("onkeydown", "handleKeyDown(event)?lightbox(event):undefined");
      media.setAttribute("aria-haspopup", "dialog");
    
      media.setAttribute("aria-label", title);
      media.setAttribute("tabindex", 0);
      media.dataset.date = date;
      media.className = 'thumb-img';

      return media
  }
// génère un element dom represntant le travail d'un photographe 
  function getUserWorkDOM() {
      const figure = document.createElement( 'figure' );
      figure.className = 'thumb-imgfull';
      
      var media = getMediaDOM();
    //creation d'une figcaption pour le titre les likes 
      const figcaption = document.createElement( 'figcaption' );

      const text = document.createElement( 'h2' );
      text.textContent = title;

      const divLikes = document.createElement( 'div' );
      divLikes.setAttribute("onclick", 'like(event)');
      divLikes.setAttribute("role", "button");
      divLikes.className = 'likes';
      divLikes.ariaLabel = 'likes';

      const numberLikes = document.createElement( 'span' );
      numberLikes.className = 'number-likes';
      numberLikes.textContent = likes;
      
      const imgLikes = document.createElement( 'img' );
      imgLikes.src = 'assets/icons/heart.svg';
      imgLikes.alt = 'likes';

      divLikes.appendChild(numberLikes);
      divLikes.appendChild(imgLikes);

      figcaption.appendChild(text);
      figcaption.appendChild(divLikes);

      figure.appendChild(media);
      figure.appendChild(figcaption);

      return figure;
  }

  return { getUserWorkDOM }
}