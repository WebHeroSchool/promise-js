let body = document.body;
let preloaderEl = document.getElementById('preloader');
setTimeout(function() {
   preloaderEl.classList.add('hidden');
}, 5000);
let d = new Date();
   let name = 'saifieva98';
   let url = `https://api.github.com/users/${name}`;
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