/*main val*/
let searchbtn=document.querySelector("#seach")
let homep=document.querySelector(".content")
let catebtn=document.querySelector("#Categories")
let areabtn=document.querySelector("#Area")
let Ingrbtn=document.querySelector("#Ingredients")
let Contactbtn=document.querySelector("#Contact")
let sideleft=document.querySelector(".sideleft")
let cont =document.querySelector(".content .row")
let searchmeal
console.log(sideleft);
$(function(){
  $(".loader").hide(1000,function(){
      $(".loading").slideUp(1000,function(){
          $("body").css("overflow","auto")
      })
  })
})
//sidebar logic
$(".open").on("click",function(e){
  $(".sideleft").animate({"width":"260px","padding":"1.5rem"},500)
  $(".open").addClass("d-none")
  $(".close").removeClass("d-none")
  $(".copyright").animate({"left":"20px"})
  $(".navitems").animate({"left":"22px"})
  $(".navitems li").animate({"top":"0px"},1000)
  
})
$(".close").on("click",function(){
  $(".sideleft").animate({"width":"0","padding":"0"},500)
  $(".open").removeClass("d-none")
  $(".close").addClass("d-none")
  $(".copyright").animate({"left":"-666px"})
  $(".navitems").animate({"left":"-666px"})
  $(".navitems li").animate({"top":"3000px"},500)

})
searchbtn.addEventListener("click",function(){
  document.querySelector(".searcInput").classList.replace("d-none","d-flex")
  document.querySelector(".content .row").classList.add("d-none")
  $(".sideleft").animate({"width":"0","padding":"0"},500)
  $(".open").removeClass("d-none")
  $(".close").addClass("d-none")
  $(".copyright").animate({"left":"-666px"})
  $(".navitems").animate({"left":"-666px"})
  $(".navitems li").animate({"top":"3000px"},500)
 
})

//getapi
let mealimg=document.querySelectorAll(".inner img")
async function getapi(){
  document.querySelector(".loading").style.display = "grid";
  try{
    let api=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let date=await api.json();
    display(date)
    detailsMeal(date.meals);
  }catch (error) {
    console.error("Error fetching data:", error);
  }finally {
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".content").style.display = "block";
  }
  
  // mealRecipes(date.meals[0])
  
}
getapi()
  function display(x) {
  let meals= x.meals;
  let container=document.querySelector(".content .row")
  let box="";
  for(let i=0;i<meals.length;i++){
    box +=`<div class="col-md-4 col-lg-3">
              <div class="inner">
                <div class="image">
                  <img src=${meals[i].strMealThumb} alt=""class="w-100">
                </div>
                <div class="overlay">
                  <h3 class="ps-1">${meals[i].strMeal}</h3>
                </div>
              </div>
            </div>
   `
    
  }
  container.innerHTML = box;
 return box
}
 async function detailsMeal(date) { 
 
  let meals =  document.querySelectorAll(".inner")

  let box="" 

  for (let i = 0; i < meals.length; i++) {
    meals[i].addEventListener("click", function(e) {
      $(".open").removeClass("d-none")
      $(".close").addClass("d-none")
      $(".sideleft").animate({"width":"0","padding":"0"},500)
    box +=`
    <div class="col-md-4">
            <div class="image  overflow-hidden">
              <img src=${date[i].strMealThumb} alt="" class="w-100 rounded-3">
              <h3>${date[i].strMeal}</h3>
            </div>
          </div>
          <div class="col-md-8">
            <h3>Instructions</h3>
            <p>
            ${date[i].strInstructions}
            </p>
              <div class="area text-capitalize fw-bold fs-4">area :<span class="area">   ${date[i].strArea}</span></div>
              <div class="area text-capitalize fw-bold fs-4">catecory :<span class="catecory">    ${date[i].strCategory}</span></div>
              <div class="recipes">
                <span class="fs-4">Recipes :</span>
                <div class="recipes-area d-flex flex-wrap gap-2 pt-2">
                 ${mealRecipes(date[i])}
                </div>
              </div>
              <div class="tag pt-3">
                <span class="fs-4 fw-bold text-capitalize pb-3 d-block">Tags :</span>
                <div class="tag-butns">
                  <button class="btn btn-success"><a href=${date[i].strSource} >Sorce</a></button>
                  <button class="btn btn-danger"><a href=${date[i].strYoutube}>YouTube</a></button>
                </div>
              </div>
          </div>
    `
   
    cont.innerHTML = box;
    });
}

}

function mealRecipes(x) {
  let box=""

console.log("x =" , x);

    for(let t=0;t<20;t++){
      let exe="strMeasure" + (t + 1);
     let exe2="strIngredient" +(t+1)
     
  box +=` <div class=" rounded-2">${x[exe]} ${x[exe2]}</div>`
    }

  console.log(box);
  return box;
  
}

let searchN=document.querySelector(".searchname");
searchN.addEventListener("input",function(e){
  searchByNameOrf(searchN.value,"s");
})
let searchf=document.querySelector(".searchfrist");
searchf.addEventListener("input",function(e){
  searchByNameOrf(searchN.value,"f");
})
async function searchByNameOrf(x,y){
  document.querySelector(".content .row ").classList.remove("d-none")
  let api=await fetch(`https:www.themealdb.com/api/json/v1/1/search.php?${y}=${x}`)
  let resp=await api.json();
  let meal= resp.meals;
  

  let box="";
  if(meal=== null){
    console.log("no");
    
  }else{

    for(let i=0;i<meal.length;i++){
      box +=`<div class="col-md-4 col-lg-3">
                <div class="inner">
                  <div class="image">
                    <img src=${meal[i].strMealThumb} alt=""class="w-100">
                  </div>
                  <div class="overlay">
                    <h3 class="ps-1">${meal[i].strMeal}</h3>
                  </div>
                </div>
              </div>
     `
      
    }
    cont.innerHTML = box;
    detailsMeal(meal);
  }

}
async function displayCate(){
  let api=await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  let date=await api.json();
  let cate=date.categories
  // displayallcate(cate)
    cont.innerHTML=""
  console.log(date);
  let box="";
  for(let i=0;i<cate.length;i++){
    box +=`<div class="col-md-4 col-lg-3">
              <div class="inner bg-transparent">
                <div class="image">
                  <img src=${cate[i].strCategoryThumb} alt=""class="w-100">
                </div>
                <div class="overlay d-flex flex-column justify-content-center">
                  <h3 class="ps-1">${cate[i].strCategory}</h3>
                  <p class="pt-2 h-50 text-center">${cate[i].strCategoryDescription} </p>
                </div>
              </div>
            </div>
   `
    
  }
  
  cont.innerHTML = box;
  let domcount=document.querySelectorAll(".col-md-4")
  for(let i=0;i<domcount.length;i++){
    domcount[i].addEventListener("click",function(){
      displayallcate(cate[i].strCategory)
    })
   }
  
}
catebtn.addEventListener("click",function(){
  document.querySelector(".searcInput").classList.add("d-none")
  
  displayCate()
  $(".sideleft").animate({"width":"0","padding":"0"},500)
  $(".open").removeClass("d-none")
  $(".close").addClass("d-none")
  $(".copyright").animate({"left":"-666px"})
  $(".navitems").animate({"left":"-666px"})
  $(".navitems li").animate({"top":"3000px"},500)
})

 async function displayallcate(i){
  console.log(i);
  
  let api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${i}`);
  let date=await api.json();
  let allmeal= await date.meals;
  let box=""
  if(allmeal === null){
    console.log("no");
    
  }else{
    for(let t=0;t<allmeal.length;t++){
       box +=`<div class="col-md-4 col-lg-3">
                <div class="inner">
                  <div class="image">
                    <img src=${allmeal[t].strMealThumb} alt=""class="w-100">
                  </div>
                  <div class="overlay">
                    <h3 class="ps-1">${allmeal[t].strMeal}</h3>
                  </div>
                </div>
              </div>
     `
     cont.innerHTML=""
      cont.innerHTML = box;
    }
  }
  
  let domcount=document.querySelectorAll(".col-md-4")
  for(let i=0;i<domcount.length;i++){
    domcount[i].addEventListener("click",async function(){
      await displaydmeal(allmeal[i].strMeal)
    })
   }
  
  
}



async function displayArea(){
  let api=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
  let date=await api.json();
  let area=await date.meals
  console.log(area);
  let box="";
  for(let i=0;i<area.length;i++){
    box +=`<div class="col-md-4 col-lg-3">
              <div class="inner bg-transparent text-center">
                <div class="image">
                 <i class="fa-solid fa-house-laptop fa-4x"></i>
                </div>
                <div class="">
                  <h3 class="ps-1">${area[i].strArea}</h3>
                  
                </div>
              </div>
            </div>
   `
    
  }
  
  cont.innerHTML = box;
  let domcount=document.querySelectorAll(".col-md-4")
  for(let i=0;i<domcount.length;i++){
    domcount[i].addEventListener("click",function(){
      displayAmeal(area[i].strArea)
    })
   }
  
}

async function displayAmeal(i){
  console.log(i);
  
  let api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${i}`);
  let date=await api.json();
  let allmeal= date.meals;
  let box=""
  for(let t=0;t<allmeal.length;t++){
     box +=`<div class="col-md-4 col-lg-3">
              <div class="inner">
                <div class="image">
                  <img src=${allmeal[t].strMealThumb} alt=""class="w-100">
                </div>
                <div class="overlay">
                  <h3 class="ps-1">${allmeal[t].strMeal}</h3>
                </div>
              </div>
            </div>
   `
    cont.innerHTML = box;
  }
  let domcount=document.querySelectorAll(".col-md-4")
  for(let i=0;i<domcount.length;i++){
    domcount[i].addEventListener("click",async function(){
      await displaydmeal(allmeal[i].strMeal)
    })
   }
}
async function displaydmeal(x){
  console.log(x);
  
  let api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
  let finshapi= await api.json()
  let date= await finshapi.meals;
     console.log(date);
     

  detailsMeal2(date)
  
}
function detailsMeal2(date){
  let box=`
  <div class="col-md-4">
            <div class="image  overflow-hidden">
              <img src=${date[0].strMealThumb} alt="" class="w-100 rounded-3">
              <h3>${date[0].strMeal}</h3>
            </div>
          </div>
          <div class="col-md-8">
            <h3>Instructions</h3>
            <p>
            ${date[0].strInstructions}
            </p>
              <div class="area text-capitalize fw-bold fs-4">area :<span class="area">   ${date[0].strArea}</span></div>
              <div class="area text-capitalize fw-bold fs-4">catecory :<span class="catecory">    ${date[0].strCategory}</span></div>
              <div class="recipes">
                <span class="fs-4">Recipes :</span>
                <div class="recipes-area d-flex flex-wrap gap-2 pt-2">
                 ${mealRecipes(date[0])}
                </div>
              </div>
              <div class="tag pt-3">
                <span class="fs-4 fw-bold text-capitalize pb-3 d-block">Tags :</span>
                <div class="tag-butns">
                  <button class="btn btn-success"><a href=${date[0].strSource} >Sorce</a></button>
                  <button class="btn btn-danger"><a href=${date[0].strYoutube}>YouTube</a></button>
                </div>
              </div>
          </div>
  `
  cont.innerHTML = box
}

areabtn.addEventListener("click",function(){
  document.querySelector(".searcInput").classList.add("d-none")
  displayArea()
  $(".sideleft").animate({"width":"0","padding":"0"},500)
  $(".open").removeClass("d-none")
  $(".close").addClass("d-none")
  $(".copyright").animate({"left":"-666px"})
  $(".navitems").animate({"left":"-666px"})
  $(".navitems li").animate({"top":"3000px"},500)
})



async function displayingr(){
  let api=await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
  let date=await api.json();
  let ingr=await date.meals;
  let box="";
  for(let i=0;i<ingr.length;i++){
    box +=`<div class="col-md-4 col-lg-3">
              <div class="inner bg-transparent text-center">
                <div class="image">
                 <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                </div>
                <div class="">
                  <h3 class="ps-1">${ingr[i].strIngredient}</h3>
                  <p class="ps-1 desc">${ingr[i].strDescription}</p>
                  
                </div>
              </div>
            </div>
   `
    
  }
  
  cont.innerHTML = box;
  let domcount=document.querySelectorAll(".col-md-4")
  for(let i=0;i<domcount.length;i++){
    domcount[i].addEventListener("click",function(){
      displayAingr(ingr[i].strIngredient)
    })
   }
  
}
async function displayAingr(i){
  let api=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${i}`);
  let date=await api.json();
  let allmeal=await date.meals;
  console.log(allmeal);
  
  let box=""
  for(let t=0;t<allmeal.length;t++){
     box +=`<div class="col-md-4 col-lg-3">
              <div class="inner">
                <div class="image">
                  <img src=${allmeal[t].strMealThumb} alt=""class="w-100">
                </div>
                <div class="overlay">
                  <h3 class="ps-1">${allmeal[t].strMeal}</h3>
                </div>
              </div>
            </div>
   `
    cont.innerHTML = box;
  }
  let domcount=document.querySelectorAll(".col-md-4")
  for(let i=0;i<domcount.length;i++){
    domcount[i].addEventListener("click",async function(){
      await displaydmeal(allmeal[i].strMeal)
    })
   }

  
  
}
Ingrbtn.addEventListener("click",function(){
  document.querySelector(".searcInput").classList.add("d-none")
  displayingr()
  $(".sideleft").animate({"width":"0","padding":"0"},500)
  $(".open").removeClass("d-none")
  $(".close").addClass("d-none")
  $(".copyright").animate({"left":"-666px"})
  $(".navitems").animate({"left":"-666px"})
  $(".navitems li").animate({"top":"3000px"},500)
})

let  nameinput;
let emailInput;
let phoneInput;
let ageInput;
let passwordInput;
let repasswordInput;
let btn;
Contactbtn.addEventListener("click",function(){
  $(".sideleft").animate({"width":"0","padding":"0"},500)
  $(".open").removeClass("d-none")
  $(".close").addClass("d-none")
  $(".copyright").animate({"left":"-666px"})
  $(".navitems").animate({"left":"-666px"})
  $(".navitems li").animate({"top":"3000px"},500)
  
  cont.innerHTML=`
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameinput"  type="email" class="form-control nameinput" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" type="number" class="form-control " placeholder="Enter Your Age" >
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>
  `
  nameinput=document.querySelector("#nameinput");
  emailInput=document.querySelector("#emailInput")
  phoneInput=document.querySelector("#phoneInput");
  ageInput=document.querySelector("#ageInput");
  passwordInput=document.querySelector("#passwordInput");
  repasswordInput=document.querySelector("#repasswordInput")
  btn=document.querySelector("#submitBtn")
 let nameRegex = /^[A-Za-z\s]+$/;
 const phoneRegex = /^\+?[0-9]{10,15}$/;
 const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
 const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
nameinput.addEventListener("keyup",checkname)
function checkname(){
  if (nameRegex.test(this.value)) {
    document.querySelector("#nameAlert").classList.add("d-none")
    return true
  } else {
  document.querySelector("#nameAlert").classList.remove("d-none")
  return false

  }
}
phoneInput.addEventListener("keyup",function(){
  if (phoneRegex.test(this.value)) {
    document.querySelector("#phoneAlert").classList.add("d-none")
  
  } else {
  document.querySelector("#phoneAlert").classList.remove("d-none")
  }
})
passwordInput.addEventListener("keyup",function(){
  if (passwordRegex.test(this.value)) {
    document.querySelector("#passwordAlert").classList.add("d-none")
 
  } else {
  document.querySelector("#passwordAlert").classList.remove("d-none")
  }
})
emailInput.addEventListener("keyup",function(){
  if (emailRegex.test(this.value)) {
    document.querySelector("#emailAlert").classList.add("d-none")

  } else {
  document.querySelector("#emailAlert").classList.remove("d-none")
  }
})
repasswordInput.addEventListener("keyup",function(){
  if (passwordInput.value === repasswordInput.value) {
    document.querySelector("#repasswordAlert").classList.add("d-none")
  } else {
  document.querySelector("#repasswordAlert").classList.remove("d-none")
  }
})
btn.setAttribute("disabled",true)
if(checkname()){
  btn.removeAttribute("disabled")
}
})







