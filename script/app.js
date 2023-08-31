const loadData = async () =>{
    
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const aiData = data.data.tools;
   
    spinerLoader(true)

    displayData(aiData)

}
const displayData = (data) =>{
    
    const cardContainer = document.getElementById('aiCardContainer');
  
    data.forEach((aiData) => {
        //   create div 
           const div = document.createElement('div');
           div.classList = `card   bg-base-100 shadow-xl`
        //     set div innerHTML
           div.innerHTML = `
           <figure class="px-10 pt-10">
           <img src="${aiData.image}" alt="aiHub Img" class="h-[200px] rounded-xl" />
         </figure>
         <div class=" px-8  space-y-4 mt-4 ">
         <div class="border-b-2 border-gray-300 pb-4 ">
          <ol class="list-decimal list-inside ">
         <h1 class='text-2xl font-bold'>Features </h1>
          <li>${aiData.features[0]}</li>
          <li>${aiData.features[1]}</li>
          <li>${aiData.features[2]}</li>
          </ol> 
          </div>

           <div class="flex w-full justify-between items-center py-8">
            <div class="space-y-3">
             <h1 class="text-[22px] font-bold">${aiData.name}</h1>
             <i class="fa-solid fa-calendar-days"></i>
             <span>${aiData.published_in}</span>
            </div>
            <div onClick="handleModal('${aiData.id}'); " class=" flex justify-center items-center cursor-pointer text-red-500 bg-gray-100 rounded-full p-4 w-10 h-10">
            <i class="fa-solid fa-arrow-right"></i>
            </div>
            
           </div>
           
         </div>
            `;
    //     append child 
    cardContainer.appendChild(div)

    });spinerLoader(false);


}
loadData()

//  show spinner 


const spinerLoader = (isloader) =>{
   
   const spinner = document.getElementById('spinerLoader');
   if(isloader){
    spinner.classList.remove('hidden')
   }else{
    spinner.classList.add('hidden')
   }


}


//  show modal data 


const handleModal = async (id) =>{
     const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
     const data = await res.json();
     const aiData = data.data;
     showModal(aiData)
     myModal.showModal()
}

//  show modal 

const showModal = (data) =>{
     const modalData = document.getElementById('modalData');
     modalData.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-4  ">
         <div class="border-2 space-y-4 border-red-600 p-3 bg-red-300">
          <h1 class="font-bold text-[22px] pb-4">${data.description}</h1>

            <div class="flex gap-4 flex-1 justify-evenly">
             <div class="text-center  py-4 w-1/3 px-4 bg-gray-100 rounded-md  text-orange-400">
             <h1 class="font-bold">${data?.pricing[0].price}</h1> 
             <h1 class="font-semibold">${data?.pricing[0].plan}</h1> 
             </div>
             <div class="text-center py-4 w-1/3 px-4 bg-gray-100 rounded-md  text-green-400">
             <h1 class="font-bold">${data?.pricing[1].price}</h1>
             <h1 class="font-semibold">${data?.pricing[1].plan}</h1>
              </div>
             <div class="text-center w-1/3 py-4 px-4 bg-gray-100 rounded-md text-red-400">
             <h1 class="font-bold">${data?.pricing[2].price}</h1>
             <h1 class="font-semibold">${data?.pricing[2].plan}</h1>
             </div>
            </div>
          
            <div class="flex gap-4 px-4 ">

             <div class="space-y-4 flex-1">
               <h1 class="text-2xl   font-bold">Features</h1>
               <ul class="list-disc list-inside">
                <li>${data.features['1'].feature_name}</li>
                <li>${data.features['2'].feature_name}</li>
                <li>${data.features['3'].feature_name}</li>
                </ul>
             </div>
             <div class="pl-4 flex-1 space-y-4">
             <h1 class="text-2xl font-bold">Integrations</h1>
             <ul class="list-disc list-inside">
              <li>${data.integrations[0]}</li>
              <li>${data.integrations[1]}</li>
              <li>${data.integrations[2]}</li>
              
              </ul>
             </div>
            
            </div>

         </div>
         <div class="flex  justify-evenly text-center gap-4 p-3 border-2">
           <div class="flex-1 space-y-4">
           <img src="${data.image_link[0]}" class="relative">
           <h1 class="text-2xl font-bold">${data.use_cases[0].name}</h1>
           <h1 class="font-semibold">${data.use_cases[0].description}</h1>
           
           </div>
          </div>
        
        </div>
     
     
     `

}