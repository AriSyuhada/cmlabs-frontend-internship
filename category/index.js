$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');

  $('#title-category').html(`${categoryParam} <span class="text-red-600">Meals</span>`);
  $('#nav-category').html(`${categoryParam} Meals`);
  $('#slogan-category').html(`Savor Superior Flavor: Unveiling the Finest Selections from Our ${categoryParam} Category<br/><span class="text-red-600">A Culinary Symphony of Unforgettable Tastes!</span>`);

  $.ajax({
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryParam}`,
      type: 'GET',
      success: function (data) {
          displayCategories(data.meals, categoryParam);
      },
      error: function (error) {
          console.error('Error:', error);
      }
  });
});

function displayCategories(meals, categoryParam) {
  let html = '';
  meals.forEach(meal => {
      html += `
        <div class="flex flex-col justify-center items-center gap-8 py-6 px-6 rounded-2xl font-semibold bg-white shadow-md hover:bg-red-600 hover:shadow-2xl hover:text-white group max-w-[248px]">
          <img 
            priority
            class="rounded-full overflow-hidden w-[12.5rem]"
            src=${meal.strMealThumb}
            alt=${meal.strMeal}
          />
          <p class="text-lg sm:text-xl whitespace-normal break-words text-center">${meal.strMeal.substring(0, 17)}${meal.strMeal.length > 17 ? '...' : ''}</p>
          <a class=" max-sm:text-sm bg-transparent hover:bg-white hover:bg-opacity-20 hover: py-3 px-6 rounded-full border-4 border-solid border-black group-hover:border-white font-bold uppercase" href="/category/meal/index.html?category=${categoryParam}&meal=${meal.idMeal}" id="meal-${meal.idMeal}">Recipe</a>
        </div>
      `;
  });
  $('#data').html(html);
}