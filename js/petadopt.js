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
const petlisterror = setElementById('pet-list-error')
let activeCategory = null;
let pets = [];
let isLowToHigh = true; 

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
        <button onclick="handleCategoryFetch('${petcategory.category}', this)" class="border hover:rounded-full hover:bg-[#539ea3] hover:bg-opacity-25 transition-all duration-300 rounded-full p-4 flex justify-center gap-5 text-xl items-center min-w-full">
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
        .then(data => {
            pets = data.data;
            DisplayPetsData(pets);
        });
};


const LoadPets = async ()=> {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const data = await response.json();
        pets = data.pets;  // Assuming the response contains a 'pets' array
        DisplayPetsData(pets);
      } catch (error) {
        console.error('Error fetching pets data:', error);
      }
}



const DisplayPetsData = (pets)=> {
    console.log(pets)
    // Clear the container before appending new data
    if(!pets.length){
        petlistcontainer.innerHTML = '';
        petlisterror.innerHTML = `
            <div class="text-center min-h-[500px] max-w-full mx-auto bg-gray-200 flex justify-center items-center ">
          <div class="p-4">
            <div class="max-w-full flex justify-center items-center">
                <img class="w-[10%] object-obtain" src="./img/error.webp" />
            </div>
            <h2 class="text-[32px] font-bold">No Information Available</h2>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                its layout. The point of using Lorem Ipsum is that it has a.</p>
          </div>
        </div>
        
        `
    }
    else{
        petlistcontainer.innerHTML = '';
        petlisterror.innerHTML = '';
        pets.forEach(pet => {

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
                      <p>Price:${pet.price} </p>
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

function handleToggleSortByPrice() {


    // Toggle the sorting order
    isLowToHigh = !isLowToHigh;

    if (isLowToHigh) {
        pets.sort((a, b) => a.price - b.price);  // Low to high
        document.getElementById('sortbtn').textContent = 'Sort by Price (Low to High)';
    }else {
        pets.sort((a, b) => b.price - a.price);  // High to low
        document.getElementById('sortbtn').textContent = 'Sort by Price (High to Low)';
      }
    DisplayPetsData(pets);  // Update the displayed list after sorting
 
}



LoadPets();
LoadCategory();