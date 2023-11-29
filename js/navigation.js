// quiero que cuando le demos click al botón de busqueda, nos navegue hacia la página de search
searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});
// quiero que cuando le demos click al botón ver más, nos navegue hacia la página de tendencias
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});
// quiero que cuando le demos click a la flecha de ir hacia atras, nos lleve a la página del home
arrowBtn.addEventListener('click', () => {
    // location.hash = '#home';
    // con esto lo que hacemos es que cuando el usuario haya hecho varias consultas de películas, y le de la flecha para regresar, no lo lleve al home de una vez, sino que lo lleve a la anterior consulta, y luego a la anterior consulta hasta que finalmente lo lleve al home
    history.back();
})

// escuchamos el evento, dónde cuando cargue nuestra aplicación, le decimos que ejecute la función
window.addEventListener('DOMContentLoaded', navigator);
// escuchamos el evento, dónde cada vez que cambie el hash, le decimos que ejecute la función
window.addEventListener('hashchange', navigator);

function navigator() {
    console.log({ location });
    // le preguntamos si el location.hash empieza con la palabra "trends", es decir, yo quiero mostrar la lista de tendencias solamente si el hash de la url empieza por trends
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    // ahora le preguntamos si la página se encuentra en la sección de "search"
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
    // scrollTop es para que cuando le demos clic a un botón, nos coloque siempre el scroll en la parte de arriba y no nos toque estar subiendo el scroll manualmente
    // body es para que funcione en el body
    document.body.scrollTop = 0;
    // documentElement es para que funcione en todos los navegadores
    document.documentElement.scrollTop = 0;
}
function trendsPage() {
    console.log('Trends!!');
    
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias',
    getTrendingMovies();
}
function searchPage() {
    console.log('Search!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // ['#search', 'platzi']
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query); 
}
function movieDetailsPage() {
    console.log('Movie!!');
    // si queremos que aparezca
    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    // ['#movie', '234567']
    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
}
function categoriesPage() {
    console.log('Categories!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    // aqui si queremos que aparezca la flecha
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    // aqui queremos intercambiar la clase de estos dos elementos, entonces intercambiamos la clase
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    // ademas el formulario quiero ocultarlo en la sección de categorías
    searchForm.classList.add('inactive');
    // estos dos elementos los quiero ocultar
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    // para este elemento si quiero que aparezca
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    // de esta manera vamos a enviar el parametro "id" al archivo main.js, particularmente a la función "getMoviesByCategory(id)"
    // y en la url tenemos el id que queremos extraer, para eso necesitamos separar el id de todo el hash "#category=10751-Family"
    // para eso llamamos al método split y le decimos que me cree un array dónde cada nuevo elemento va a convertirse en un elemento de mi array con el separador del "=", es decir, de lo que alla en la url, lo que este antes del "=" va a ser un elemento, y lo que esté después del "=" va aser otro elemento
    // primero separo "#category"  "10751-Family", a la definición del array le coloco "_" en la primera posición porque esa parte no me interesa, solo le doy nombre a la segunda posición "categoryData"
    const [_, categoryData] = location.hash.split('=') // ['#category', 'id-name'] 
    // después separo "id" de "name", utilizando nuevamente el método split
    const [categoryId, categoryName] = categoryData.split('-');
    // ahora enviamos "categoryId" cómo paraemtro en la función que necesitamos enviarle al archivo de main
    getMoviesByCategory(categoryId);
    // con esta etiqueta insertamos el nombre de la categoría para que aparezca en el título de la sección de categorías
    headerCategoryTitle.innerHTML = categoryName;
}
function homePage() {
    console.log('Home!!');

    // queremos que en el home, nunca tenga la class="header-container", esa clase solo las vamos a utilizar pra la vista "detalles de una pelicula", entonces tenemos que quitarla
    headerSection.classList.remove('header-container--long');
    // tambien cuando entremos a la vista "detalles de una peliculas", vamos a tener que agregarle una imagen para tener el efecto del poster de la película, y cómo cada poster es distinto y tiene una url distinta, eso tenemos que hacerlo con javaScript, y por lo tanto tenemos que limpiar esa imagen (style.background) de nuestro header, cada vez que no estemos en la sección de movie-details, dejandolo vacio
    headerSection.style.background = '';
    // la flechita de echar para atras, no queremos que aparezca en el Home, en cambio si estamos en cualquier otra sección, si queremos poder devolvernos para atrás, para volver al home o a alguna otra sección dónde queramos devolvernos. Cómo queremos que la flecha no aparezca en ésta sección, entonces tenemos que agregarle la clase "inactive" que le pone display: none a éste elemento
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    // éste elemento queremos mostrarlo, entonces debemos quitarle la clase "inactive", para que se muestre, si es que la llega a tener, porque el titulo se debe mostrar si o si
    headerTitle.classList.remove('inactive');
    // éste elemento tambien queremos ocultarlo cuando no estemos en la sección de categorías
    headerCategoryTitle.classList.add('inactive');
    // este formulario tambien lo debe mostrar en el home
    searchForm.classList.remove('inactive');
    // estas dos secciones tambien se deben mostrar en el home
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    // estos dos elementos no se deben mostrar en el home
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesMoviesPreview();
}





