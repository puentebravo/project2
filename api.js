const jokeSearchBtn = document.getElementById("jokeSearchBTN");
const jokeResults = document.getElementById("joke-name");
const jokeList = document.getElementById("joke");
const joke1EL = document.getElementById("ranjoke1");
const howToMake = document.getElementById("howTo");
const jokeInstEL = document.getElementById("jokeInst");
const jokeImgEL = document.getElementById("joke-thumb")


function getJokes(){
    let randomQueryURL = "https://api.chucknorris.io/jokes/random"
    $.ajax({
        url: randomQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(response.randomjoke[0].strjoke);
        console.log(response.randomjoke[0].strjoke1)
        console.log(response.randomjoke[0].strjoke2)
        console.log(response.randomjoke[0].strjoke3)
        console.log(response.randomjoke[0].strjoke4)
        jokeResults.innerHTML = response.randomjoke[0].strjoke;
        jokeImgEL.setAttribute("src", response.randomjoke[0].strjokeThumb);
        jokeList.innerHTML = "Joke List: ";
        joke1EL.innerHTML = response.randomjoke[0].strjoke1;
        joke2EL.innerHTML = response.randomjoke[0].strjoke2;
        joke3EL.innerHTML = response.randomjoke[0].strjoke3;
        howTo.innerHTML = "How to make: ";
        jokeInstEL.innerHTML = response.randomjoke[0].strjokes;
    })
}

jokesearchBtn.addEventListener("click", function(){
    getJokes(); 
});
