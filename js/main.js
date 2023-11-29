
// async function getTrendingMoviesPreview() {
//     const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
//     const data = await res.json();
//     const movies = data.results;
//     console.log(data);
    
//     // ahora con esta arrow function vamos a recorrer cada uno de los elementos del objeto
//     movies.forEach(movie => {
//     // ahora lo que quiero hacer es entrar a la sección "trendingPreview" y al article "trendingPreview-movieList", y crear un div "movie-container" y un img con la imagen por cada una de las películas del objeto        
        
//         const movieContainer = document.createElement('div');
//         movieContainer.classList.add('movie-container');        

//         const movieImg = document.createElement('img');
//         movieImg.classList.add('movie-img');
//         // agregamos el atributo 'alt', dónde su valor será la propiedad title del objeto que tiene los datos 
//         movieImg.setAttribute('alt', movie.title);
//         // agregamos el atributo 'src', dónde su valor será la url de la api de imagenes concatenada con la propiedad poster_path del objeto, que contienen el archivo de la imagen
//         movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
        
//         // añadimos el hijo 'movieImg' al padre 'movieContainer'
//         movieContainer.appendChild(movieImg);

//         // seleccionamos el article dónde ubicaremos el hijo 'movieContainer'
//         const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
//         // añadimos el hijo 'movieContainer' al padre 'trendingPreviewMoviesContainer'
//         trendingPreviewMoviesContainer.appendChild(movieContainer);
//     });
    
// }
// async function getCategoriesMoviesPreview() {
//     const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
//     const data = await res.json();
//     // le cambiamos la variable por categorias que es el nombre que elegimos, y le ponemos genres porque es el nombre que le dan en la documentación
//     const categories = data.genres;
//     console.log(data);
    
//     categories.forEach(category => {
//     // ahora lo que quiero hacer es entrar a la sección "categoriesPreview" y al article "categoriesPreview-list", y crear un div "category-container" y un h3 "category-title"        
        
//         const categoryContainer = document.createElement('div');
//         categoryContainer.classList.add('category-container');        

//         const categoryTitle = document.createElement('h3');
//         categoryTitle.classList.add('category-title'); 
//         // agregamos el atributo 'id', dónde su valor será el texto "id" concatenado con la propiedad id del objeto genre
//         categoryTitle.setAttribute('id', 'id' + category.id);
        
//         // ahora insertamos como texto el nombre de la categoria, que también es la propiedad name del objeto genre
//         const categoryTitleText = document.createTextNode(category.name);
//         categoryTitle.appendChild(categoryTitleText);

//         // añadimos el hijo 'categoryTitle' al padre 'categoryContainer'
//         categoryContainer.appendChild(categoryTitle);

//         // seleccionamos el article dónde ubicaremos el hijo 'categoryContainer'
//         const categoriesPreviewContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
//         // añadimos el hijo 'categoryContainer' al padre 'categoriesPreviewContainer'
//         categoriesPreviewContainer.appendChild(categoryContainer);
//     });
    
// }
// getTrendingMoviesPreview();
// getCategoriesMoviesPreview();


const api = axios.create({
    // para empezar a usar axios vamos crear una variable y voy a decirle que sea igual a una nueva instancia de axios
    // axios nos deja agregar aquella parte de la url que siempre se va a repetir
    baseURL: 'https://api.themoviedb.org/3/',
    // axios tambien nos deja poner los headers
    headers: {
        'Content-Type': 'application/json;charset=utf-8',    
    },
    // axios tambien nos permite guardar la variable dónde tenemos guardada la clave de nuestra api, para no estarla colocando siempre
    params: {
        'api_key': API_KEY,
    },
});

// creamos una función madre para las películas y asignamos parámetros a través de los cuales se enviaran los argumentos en las funciones hijas
function createMovies(movies, container) {
    // llamamos la variable y la vaciamos para que no se duplique la información de las peliculas, cada vez que le damos click a los botones
    container.innerHTML = '';

    // ahora con esta arrow function vamos a recorrer cada uno de los elementos del objeto
    movies.forEach(movie => {
        // creamos un div "movie-container" y un img con la imagen por cada una de las películas del objeto        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');        
        // con esta función cuando el usuario le da click a cualquiera de las peliculas, en cualquier vista, captura el hash de la pelicula, "'#movie=897087'"
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });
        
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        // agregamos el atributo 'alt', dónde su valor será la propiedad title del objeto que tiene los datos 
        movieImg.setAttribute('alt', movie.title);
        // agregamos el atributo 'src', dónde su valor será la url de la api de imagenes concatenada con la propiedad poster_path del objeto, que contienen el archivo de la imagen
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);    
        // añadimos el hijo 'movieImg' al padre 'movieContainer'
        movieContainer.appendChild(movieImg);
        // añadimos el hijo 'movieContainer' al padre que se recibe en el parametro 'container' de ésta función
        container.appendChild(movieContainer);
    });
}
// creamos otra función madre para las categorías
function createCategories(categories, container) {
    // llamamos la variable y la vaciamos para que no se duplique la información de las categorias, cada vez que le damos click a los botones
    container.innerHTML = "";
    categories.forEach(category => {
        // creamos un div "category-container" y un h3 "category-title"            
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');        
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title'); 
        // agregamos el atributo 'id', dónde su valor será el texto "id" concatenado con la propiedad id del objeto genre
        categoryTitle.setAttribute('id', 'id' + category.id);
        // también necesitamos que cuando el usuario le de click a cada una de las categorías, lo lleve a la página de categorias con el id de la categoria seleccionada y el nombre de la categoria
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        // ahora insertamos como texto el nombre de la categoria, que también es la propiedad name del objeto genre
        const categoryTitleText = document.createTextNode(category.name);
        categoryTitle.appendChild(categoryTitleText);
        // añadimos el hijo 'categoryTitle' al padre 'categoryContainer'
        categoryContainer.appendChild(categoryTitle);
        // añadimos el hijo 'categoryContainer' al padre que se recibe en el parametro 'container' de ésta función
        container.appendChild(categoryContainer);
    });


}
async function getTrendingMoviesPreview() {
    // ya no hay necesidad de colocar toda la url completa ni la api, tampoco hay necesidad de usar fetch
    // tampoco hay necesidad de definar la data en una constante, sino que axios lo saca automaticamente
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(data);
    // ahora invocamos la función madre, y le agregamos los respectivos argumentos
    createMovies(movies, trendingMoviesPreviewList);
}
async function getCategoriesMoviesPreview() {
    // ya no hay necesidad de colocar toda la url completa ni la api, tampoco hay necesidad de usar fetch
    // tampoco hay necesidad de definar la data en una constante, sino que axios lo saca automaticamente
    const { data } = await api('genre/movie/list');
    // le cambiamos la variable por categorias que es el nombre que elegimos, y le ponemos genres porque es el nombre que le dan en la documentación
    const categories = data.genres;
    console.log(data);
    // ahora invocamos la función madre, y le agregamos los respectivos argumentos
    createCategories(categories, categoriesPreviewList);
}
async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        // ya estamos enviando parametros de manera general en nuestra constante api, pero podemos enviar más parametros de manera individual en esta constante, para que nos quede más organizado
        // adentro podemos enviar en forma de objeto {}, los parametros que queremos enviar
        // el nombre del parámetro "with_genres" lo encontramos en la documentación
        // con id, podemos enviarle los id de las categorias que queramos filtrar, para nuestras películas, para eso vamos a recibir el parámetro "getMoviesByCategory(id)"
        // entonces es responsabilidad del archivo de navigation.js, en particular de la función "categoriesPage()" enviar el id  
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    console.log(data);
    // ahora invocamos la función madre, y le agregamos los respectivos argumentos
    createMovies(movies, genericSection);
}
async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {  
        params: {
            // query es el parametro que encontramos en la documentación, y query también es el nombre del parámetro de nuestra función, también se le podría colocar únicamente "query," y sería más que suficiente
            query,
        },
    });
    const movies = data.results;
    console.log(data);
    
    createMovies(movies, genericSection);
}
async function getTrendingMovies() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(data);
    // ahora invocamos la función madre, y le agregamos los respectivos argumentos
    createMovies(movies, genericSection);
}
async function getMovieById(id) {
    // aqui puedo renombrar la constante data a movie, porque estoy hablando de cada una de las películas
    const { data: movie } = await api('movie/' + id);
    
    // con este código, cargamos la imagen de fondo de la película
    movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    console.log(movieImgUrl); 
    // el linear-gradient es para que se pinte un gradiente oscuro encima de la imagen de la película, y se pueda ver siempre la flecha blanca de hacia atrás, independientemente del color de fondo de la imagen de la película
    headerSection.style.background = `
        linear-gradient(
            180deg,
            rgba(0,0,0,0.35) 19.27%,
            rgba(0,0,0,0) 29.17%
        ),
        url(${movieImgUrl})
    `;
    
    // aqui llamamos las tres etiquetas y le colocamos de texto el campo que se encuentra en la documentación de la API
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    // con esta llamamos las categorias de cada película
    createCategories(movie.genres, movieDetailCategoriesList);
    
    // con esta llamamos a la función de las películas relacionadas
    getRelatedMoviesId(id);
}
async function getRelatedMoviesId(id) {
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
}