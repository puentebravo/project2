const $jokeTitle = $(".joke-title");
const $jokeText = $(".joke-textarea");
const $saveJokeBtn = $(".save-joke");
const $newJokeBtn = $(".new-joke");
const $jokeList = $(".list-container .list-group");
const $deleteBtn = $(".delete-joke");

let activeJoke = {};

const getJokes = () => {
  return $.ajax({
    url: "/api/jokes",
    method: "GET",
  });
};

const saveJoke = (joke) => {
  return $.ajax({
    url: "/api/jokes",
    data: joke,
    method: "POST",
  });
};

const deleteJoke = () => {
  return $.ajax({
    url: "api/jokes/" + id,
    method: "DELETE",
  });
};

const renderActiveJoke = () => {
  $saveJokeBtn.hide();

  if (activeJoke.id) {
    $jokeTitle.attr("readonly", true);
    $jokeText.attr("readonly", true);
    $jokeTitle.val(activeJoke.title);
    $jokeText.val(activeJoke.text);
  } else {
    $jokeTitle.attr("readonly", false);
    $jokeText.attr("readonly", false);
    $jokeTitle.val("");
    $jokeText.val("");
  }
};

const handleJokeSave = () => {
  const newJoke = {
    title: $jokeTitle.val(),
    text: $jokeText.val(),
  };

  saveJoke(newJoke).then(() => {
    getAndRenderJokes();
    renderActiveJoke();
  });
};

const handleJokeDelete = (event) => {
  event.stopPropagation();

  const joke = $(this).parent(".list-group-item").data();
  if (activeJoke === joke.id) {
    activeJoke = {};
  }

  deleteJoke(joke.id).then(() => {
    getAndRenderJokes();
    renderActiveJoke();
  });
};

const handleJokeView = () => {
  activeJoke = $(this).data();
  renderActiveJoke();
};

const handleNewJokeView = () => {
  activeJoke = {};
  renderActiveJoke();
};

const renderJokeList = (jokes) => {
  $jokeList.empty();

  const jokeListItems = [];

  const create$li = (text, withDeleteButton = true) => {
    const $li = $("<li class='list-group-item>");
    const $span = $("<span>").text(text);
    $li.append($span);

    if (withDeleteButton) {
      const $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
      $li.append($delBtn);
    }
    return $li;
  };

  if (jokes.length === 0) {
    jokeListItems.push(create$li("No saved jokes", false));
  }

  jokes.forEach((joke) => {
    const $li = create$li(joke.title).data(joke);
    jokeListItems.push($li);
  });

  $jokeList.append(jokeListItems);
};

const getAndRenderJokes = () => {
  return getJokes().then(renderJokeList);
};

$saveJokeBtn.on("click", handleJokeSave);
$jokeList.on("click", ".list-group-item", handleJokeView);
$newJokeBtn.on("click", handleNewJokeView);
$jokeList.on("click", ".delete-note", handleJokeDelete);
$jokeTitle.on("keyup", handleRenderSaveBtn);
$jokeText.on("keyup", handleRenderSaveBtn);

getAndRenderJokes();

$deleteBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");

    fetch(`/api/jokes/${id}`, {
      method: "DELETE",
    }).then((res) => {
      location.reload();
    });
  });
});
