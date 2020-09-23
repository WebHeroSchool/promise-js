   let body = document.body;
   let preloader = document.getElementById("preloader_preload");

   function fadeOutnojquery(el) {
      el.style.opacity = 1;
      var interpreloader = setInterval(function () {
         el.style.opacity = el.style.opacity - 0.05;
         if (el.style.opacity <= 0.05) {
            clearInterval(interpreloader);
            preloader.style.display = "none";
         }
      }, 16);
   }

   window.onload = function () {
      setTimeout(function () {
         fadeOutnojquery(preloader);
      }, 5000);
   };
   let d = new Date();
   let getName = () =>  {
      let url = window.location.toString();
      let g = url.split('=');
      let name = g[1];
      if (name === undefined) {
         name = 'saifieva98';
      }
   return name;
   }
   let url = `https://api.github.com/users/${getName()}`;
   let newDate = new Promise( (resolve, reject) => {
      setTimeout(() => d ? resolve(d) : reject('Ошибка'), 3000);
   })
   const getUrl = new Promise((resolve,reject) => {
      setTimeout(() => url ? resolve(url) : reject('Ошибка'), 5000);
   })
   Promise.all([newDate, getUrl])
      .then(([d, url]) => fetch(url))
      .then(res => res.json())
      .then(json => {
      let name = document.createElement('h1');
      if (json.name != null) {
         name.innerHTML = json.name;
      } else {
         name.innerHTML = 'Данные отсутствуют';
      }
      body.append(name);
      name.addEventListener("click", () => window.location = json.html_url);
      let description = document.createElement('p');
      if (json.bio != null) {
         description.innerHTML = json.bio;
      } else {
         description.innerHTML = 'Данные отсутствуют';
      }
      body.append(description);
      let img = new Image();
      img.src = json.avatar_url;
      body.append(img);
      let date = document.createElement('p');
      date.innerHTML = d;
      body.append(date);
         })
      .catch(err => console.log(err));
