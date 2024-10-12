const getElementById = (id, Value)=> {
    document.getElementById(id).innerText = Value;
    return Value;
}

const setElementById = (id)=>{
    const result = document.getElementById(id)
    return result
}

const petcategorycontainer = setElementById('pet-category-container')
const petlistcontainer = setElementById('pet-list-container')
let activeCategory = null;

const LoadCategory = ()=> {
    const uri = 'https://openapi.programming-hero.com/api/peddy/categories'
    fetch(uri)
    .then(response => response.json())
    .then(data => 
        DisplayCategory(data.categories)
    )
    
}

const DisplayCategory = (data) => {
    petcategorycontainer.innerHTML = '';  // Clear the container
    data.forEach(petcategory => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="handleCategoryFetch('${petcategory.category}', this)" class="border hover:rounded-full hover:bg-[#539ea3] hover:bg-opacity-25 transition-all duration-300 rounded-full p-2 flex justify-evenly items-center min-w-[200px]">
            <img class="min-w-[40px] object-cover" src="${petcategory.category_icon}" alt="" />
            <h3 class="font-bold">${petcategory.category}</h3>
        </button>
        `;
        petcategorycontainer.appendChild(div);
    });
};


const handleCategoryFetch = (category, button) => {
    // Handle active category style
    if (activeCategory) {
        activeCategory.classList.remove('bg-[#539ea3]', 'bg-opacity-50');
    }
    button.classList.add('bg-[#539ea3]', 'bg-opacity-50');
    activeCategory = button;

    // Fetch pets data based on category
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then(response => response.json())
        .then(data => DisplayPetsData(data.data));
};


const LoadPets = ()=> {
    const uri = 'https://openapi.programming-hero.com/api/peddy/pets'
    fetch(uri)
    .then(response => response.json())
    .then(data => 
    {
        DisplayPetsData(data.pets)
    }
    )
}
const DisplayPetsData = (data)=> {
    if(!data.length){
        petlistcontainer.innerHTML = '';
        petlistcontainer.innerHTML = '<h2>No Data Found</h2>'
    }
    else{
        petlistcontainer.innerHTML = '';
    data.forEach(pet => {
        const div = document.createElement('div')
        div.innerHTML = `
                        <div class="card border bg-base-100 hover:shadow-xl transition-all duration-700">
                    <figure class="px-5 pt-5">
                      <img
                        src=${pet.image}
                        alt="Shoes"
                        class="rounded-xl w-full " />
                    </figure>
                    <div class="card-body text-left ">
                      <h2 class="card-title">${pet.pet_name}</h2>
                      <p>${pet.pet_details.slice(0,60)}...</p>
                      <div class="card-actions">
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
        `
        petlistcontainer.appendChild(div)
    })
    }

}
LoadPets();
LoadCategory();