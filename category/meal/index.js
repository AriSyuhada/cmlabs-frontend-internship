$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const mealIdParam = urlParams.get('meal');
  
  $('#nav-category').attr('href', `/category/index.html?category=${categoryParam}`);
  $('#nav-category').html(`<p class="font-semibold max-sm:text-xs">${categoryParam} Meals</p>`);

  $.ajax({
      url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealIdParam}`,
      type: 'GET',
      success: function (data) {
          displayCategories(data.meals);
      },
      error: function (error) {
          console.error('Error:', error);
      }
  });
});

function displayCategories(meals) {
  let html = '';
  meals.forEach(meal => {
    const youtubeUrl = meal.strYoutube != '' ? meal.strYoutube.replace('watch?v=', 'embed/') : '';

    $('#title-meal').html(meal.strMeal);
    $('#nav-meal').html(meal.strMeal);

    let ingredients = '';
    for (let i = 0; i <= 20; i++) {
      if (meal['strIngredient' + i] === '' || meal['strIngredient' + i] === null) continue;
  
      ingredients += `
        <li key={'ingredient ' + ${i}} class='list-disc'>
          <p class='capitalize'>${meal['strMeasure' + i]} ${meal['strIngredient' + i]}</p>
        </li>
      `;
    }

    const details = `
      <div class='grid grid-cols-1 gap-8 xl:grid-cols-2'>
        <div>
          <img 
            priority
            class='rounded-2xl w-full' 
            src=${meal.strMealThumb} 
            alt=${meal.strMeal} 
          />
          <h3 class='font-semibold text-lg sm:text-xl mt-2 text-red-500'>${meal.strArea} Culinary</h3>
        </div>
        <div class=''>
          <h4 class='text-3xl sm:text-4xl mb-5'>Instructions</h4>
          <p class='text-justify mb-5 indent-8'>${meal.strInstructions}</p>
          <h4 class='text-3xl sm:text-4xl mb-5'>Recipes</h4>
          <ul class='flex flex-col max-sm:pl-8 pl-6 sm:flex-row flex-wrap gap-4 sm:gap-8'>
            ${ingredients}
          </ul>
        </div>
      </div>
    `;
    $('#data-details').html(details);

    let tutorial = '';
    if (youtubeUrl != '') {
      tutorial += `
        <div id="data-tutorial" class="bg-white px-4 sm:px-8 py-12 rounded-xl shadow-xl mb-16">
          <h4 class='text-3xl sm:text-4xl mb-5 text-center'>Tutorials</h4>
          <div class='relative w-full overflow-hidden pt-[56.25%] mx-auto'>
            <iframe class='absolute top-0 left-0 bottom-0 right-0 w-full h-full border-none' title=${meal.strMeal} src=${youtubeUrl}></iframe>
          </div>
        </div>
      `
    }
    $(`${tutorial}`).insertAfter('#data-details');
    
  });
}