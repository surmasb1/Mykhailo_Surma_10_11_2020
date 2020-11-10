
fetch('http://my-json-server.typicode.com/moviedb-tech/movies/list')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    movies= data
    DrawMovies(movies)
  });



const getFavoritMovies = ()=>{
  const moviesLocalStorage = myStorage.getItem('movies')
  if(moviesLocalStorage!== null){
    return JSON.parse(moviesLocalStorage)
  }
  return []
 }



 function arrayUnique(array) {
  let a = array.concat();
  for(let i=0; i<a.length; ++i) {
      for(let j=i+1; j<a.length; ++j) {
          if(a[i].id === a[j].id)
              a.splice(j--, 1);
      }
  }
  return a;
} 

function sortById(arr0) {
    arr0.sort((a, b) => a.id> b.id ? 1 : -1);
  }



const myStorage = window.localStorage; 
let Allmov = [];
let Allmovies= [];

function DrawMovies(Allmovies0){

let Allmovies = Allmovies0.map((mov)=>{
  return {...mov, flag:false}
});
  
let AllmoviesChange = arrayUnique(getFavoritMovies().concat(Allmovies));
  sortById(AllmoviesChange)
  AllMoviesDraw(AllmoviesChange)
  FavoritMoviesDraw(getFavoritMovies())


let setFavoritMovies = (movie)=>{
  let getmovies = getFavoritMovies()
  let arr = getmovies.map((mov)=> mov.id)
  let index = arr.indexOf(movie.id)
    if( index === -1 ){
      getmovies.push({...movie, flag:true})
console.log(getmovies)
    }else {
      getmovies.splice(index,1)
    }
  myStorage.setItem('movies', JSON.stringify(getmovies));
  FavoritMoviesDraw(getFavoritMovies())

  Allmov = arrayUnique(getFavoritMovies().concat(Allmovies))
  sortById(Allmov)
  AllMoviesDraw(Allmov)
}



function AllMoviesDraw(movies){
  let gallery = document.getElementById('gallery');
  gallery.innerHTML='';
  for(let i = 0; i < movies.length; i++){
    let card = document.createElement('div')
        card.classList.add('card');
            const div_img = document.createElement('div');
            div_img.classList.add('div_img');
                const img = document.createElement('img');
                img.classList.add('img')
                img.src=movies[i].img;
                img.alt='not found photo';
                const img_star = document.createElement('img');
                img_star.alt='not found photo';
                  if(movies[i].flag){
                    img_star.classList.add('star2')
                    img_star.src='../public/images/star2.svg'
                  } else {
                    img_star.classList.add('star1')
                    img_star.src='../public/images/star1.svg'
                  }
                  img_star.addEventListener('click', ()=>{setFavoritMovies(movies[i])})
            div_img.appendChild(img);
            div_img.appendChild(img_star);
        card.appendChild(div_img);
                let div_name = document.createElement('div');
                div_name.classList.add('name');
                div_name.innerHTML=movies[i].name;
                div_name.addEventListener('click', ()=>ShowModal(movies[i].id))
                let div_year = document.createElement('div');
                div_year.classList.add('year');
                div_year.innerHTML=movies[i].year;
        card.appendChild(div_name);
        card.appendChild(div_year);
    gallery.appendChild(card);
  };
}


 
function FavoritMoviesDraw(FavoritMovies){
    let ul_list = document.getElementById('list_ul');
    ul_list.innerHTML='';
    for(let i = 0; i < FavoritMovies.length; i++){
      const li_list = document.createElement('li')
      li_list.classList.add('list_li')
      li_list.innerHTML=FavoritMovies[i].name
        const img_close = document.createElement('img');
        img_close.classList.add('img_close')
        img_close.src='../public/images/del2.svg';
        img_close.alt='not found photo';
        img_close.addEventListener('click', ()=>{setFavoritMovies(FavoritMovies[i])})
      ul_list.appendChild(img_close)
      ul_list.appendChild(li_list)
    };        
   
}

  

function ShowModal (id){
fetch(`http://my-json-server.typicode.com/moviedb-tech/movies/list/${id}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    DrawModal(data)
  });

}



const modal = document.getElementById('modal'); 
const overlay = document.getElementById('overlay');
const btn =  document.getElementById('btn');
 

let modal_body = document.getElementById('modal_body');

function DrawModal(movie){
  let MovieModal = {...movie, flag:false};
  console.log('DrawModal')
    getFavoritMovies().map((mov)=>{
    if(mov.id === movie.id){
      MovieModal = {...movie, flag:true};
      console.log('getFavoritMovies')
    } 
    })
btn.addEventListener('click', () => closeModal(modal))

  modal_body.innerHTML=''
  let main = document.createElement('div');
  main.classList.add('main')
    let main_img = document.createElement('img');
    
    main_img.classList.add('img_modal')
    main_img.src=MovieModal.img;
    main_img.alt='not found photo';
    let main_info = document.createElement('div');
    main_info.classList.add('main_info')
      let main_name = document.createElement('div');
      main_name.innerHTML=MovieModal.name
      main_name.classList.add('main_name')
      let main_text = document.createElement('div');
      main_text.classList.add('main_text')
      main_text.innerHTML=MovieModal.description
      main_info.appendChild(main_name)
      main_info.appendChild(main_text)
  main.appendChild(main_img)
  main.appendChild(main_info)
modal_body.appendChild(main)
    let star_div = document.createElement('div')
    star_div.classList.add('star_div')
      let star = document.createElement('img')
      if(MovieModal.flag){ 
            star.classList.add('star')
            star.src='../public/images/star2.svg'
          } else {
            star.classList.add('star')
            star.src='../public/images/star1.svg'
          }
          star.addEventListener('click', ()=>{
            setFavoritMovies(MovieModal)
          DrawModal(MovieModal)
          console.log('img_star2.addEventListener')
          }) 
          let mov_year = document.createElement('div');
          mov_year.classList.add('mov_year');
          mov_year.innerHTML=MovieModal.year;
       star_div.appendChild(star)
       star_div.appendChild(mov_year)
    
modal_body.appendChild(star_div)
    let footer_div = document.createElement('div')
    footer_div.classList.add('footer_div');
      let genres = document.createElement('div')
      genres.classList.add('genres');
      for(let i = 0; i < MovieModal.genres.length; i++){
        let genre = document.createElement('div')
        genre.innerHTML=MovieModal.genres[i]
        genre.classList.add('genre');
        genres.appendChild(genre)
      }     
    footer_div.appendChild(genres)

    let actors = document.createElement('div')
    actors.classList.add('actors');

    let director = document.createElement('div')
    director.innerHTML=`Director - ${MovieModal.director}`
    director.classList.add('director');
    actors.appendChild(director)
    let actor_div = document.createElement('div')
    actor_div.classList.add('actor_div');
    actor_div.innerHTML='Staring: '
      for(let i = 0; i < MovieModal.genres.length; i++){
        let actor = document.createElement('div')
        actor.innerHTML=` ${MovieModal.starring[i]}  `
        actor.classList.add('actor');
        actor_div.appendChild(actor)
      }     
      actors.appendChild(actor_div)

    footer_div.appendChild(actors)

modal_body.appendChild(footer_div)
   
openModal(modal)

            
}



function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
      }
function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
      }


}









