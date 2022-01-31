const recipes = ["gingerbread", "pasta", "cupcakes"]
let recipesStored = 0

//save a recipe to storage
$(".save").click(function(){
    let getRecipe = $(this).parents(".card").parent();
    let fullRecipe = getRecipe.html();
    let recipeName = $(this).parents(".container")[0].id;
    $(this).slideUp(800).slideDown(800)
    let key = $(this)[0].id
    localStorage.setItem(key, "Saved!")
    $(this)[0].innerHTML = localStorage.getItem(key)
    localStorage.setItem(recipeName, fullRecipe)
    getSaveCount()
    alert("You have " + recipesStored + " recipes saved!")
 });

 //Update saved button to show Saved
 $(function updateButtons() {
    let buttonIds = []
    $(".save").each(function(){ buttonIds.push(this.id)})
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        if (buttonIds.includes(key)) {
            $("#"+ key)[0].innerHTML = localStorage.getItem(key)
        }
    }
})
 
 //calculate how many items are in storage
function getSaveCount() {
    recipesStored = 0
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (recipes.includes(key)) {
            recipesStored = recipesStored + 1  
        }
    }
}        

//add recipes to the Saved Recipes page
function addRecipes() {
    let savePage = document.getElementById("savedArea");
    
    savePage.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (recipes.includes(key)) {
            savePage.innerHTML = savePage.innerHTML + localStorage.getItem(key);
            let mainElem = savePage.getElementsByClassName("main")
            $(mainElem).addClass("menu");
            let bodyElem = savePage.getElementsByClassName("main-body")
            $(bodyElem).addClass("menu-body");
            let addDeleteBtn = $('#' +key).find(".title")
            addDeleteBtn[0].innerHTML = addDeleteBtn[0].innerHTML + ("<span class='delete'><button type='button' class='btn btn-danger'>Delete</button></span>")       
        }
    }
}

//collapse saved items(animation/chain)
$(document).on("click", ".card", function() {
    let index = $(this).index()
    let currentMenu = $(".menu").eq(index)
    let currentBody = $(".menu-body").eq(index)
    
    if(currentBody.css("display") == "block") {
        currentBody.slideUp()
    }
    else {
        $(".menu-body").slideUp()
        currentBody.slideDown()
    }
});
    
//animation when deleting an item from the save page
$(document).on("click", ".delete", function() {
    let getElem = $(this).parents(".card")
    let elemId = getElem[0].id
    $(getElem).animate({backgroundColor: "rgb(190, 119, 119)"}).effect("drop", {direction: 'left'}, 500)
    localStorage.removeItem(elemId)
    localStorage.removeItem(elemId+"-save") 
})    

//add or remove like
let likeCount = 0
$(document).on("click", ".like", function() {
    let likeCard = $(this).parent(".like-sect").children("span")[0]
    let storageId = likeCard.id
    localStorage.setItem(storageId,likeCount)
    if (localStorage.getItem(storageId) == 0) {
        likeCount = 1
        localStorage.setItem(storageId, likeCount)
        likeCard.innerHTML = "1 Like"
    }
    else if (localStorage.getItem(storageId) !=  0) {
        likeCount = 0
        localStorage.setItem(storageId,likeCount)
        likeCard.innerHTML = "0 Likes"
    }
})

//add a comment to the page
$(document).on("click", ".comment", function() {
    let commentCard = $(this).parent().siblings(".comment-sect")
    let getText = $(this).parent().siblings(".text-box").children().val()
    let comment = $(this).parent().siblings(".text-box").children().attr("id")
    localStorage.setItem(comment, getText)
    let addComment = localStorage.getItem(comment)
    commentCard[0].innerHTML = commentCard[0].innerHTML + "<div><p>" + addComment + "</p></div>"
})

//create a dropdown menu on the navbar and animate when hovered over
$(".hover").hover (function() {
    $(".hover-body").slideDown()
}, function() { 
    $(".hover-body").slideUp()
})




