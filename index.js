$(document).ready(function () {
  $.ajax({
      url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
      type: 'GET',
      success: function (data) {
          displayCategories(data.categories);
      },
      error: function (error) {
          console.error('Error:', error);
      }
  });
});

function displayCategories(categories) {
  let html = '';
  categories.forEach(category => {
      html += `
        <div class="flex flex-col justify-center items-center gap-8 py-6 px-6 rounded-2xl font-semibold bg-white shadow-md hover:bg-red-600 hover:shadow-2xl hover:text-white group id="category-${category.idCategory}">
          <img 
            class="rounded-full overflow-hidden w-[12.5rem]"
            src=${category.strCategoryThumb}
            alt=${category.strCategory}
          />
          <p class="text-lg sm:text-xl">${category.strCategory.substring(0, 17)}${category.strCategory.length > 17 ? '...' : '' }</p>
          <a class=" max-sm:text-sm bg-transparent hover:bg-white hover:bg-opacity-20 hover: py-3 px-6 rounded-full border-4 border-solid border-black group-hover:border-white font-bold uppercase" href="/category/index.html?category=${category.strCategory}" id="category-${category.idCategory}">Show</a>
        </div>
      `;
  });
  $('#data').html(html);
}