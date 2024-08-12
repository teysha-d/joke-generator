document.addEventListener("DOMContentLoaded", function () {
  function displayJoke(response) {
    let jokeElement = document.querySelector("#joke");
    jokeElement.classList.remove("joke-loaded");
    jokeElement.innerHTML = response.data.answer;

    new Typewriter("#joke", {
      strings: response.data.answer,
      autoStart: true,
      cursor: null,
      delay: 20,
    });

    setTimeout(() => {
      jokeElement.classList.add("joke-loaded");
    }, 50);
  }

  function generateJoke(event) {
    event.preventDefault();
    let generatorButton = document.querySelector("#generate-joke-button");
    generatorButton.disabled = true;

    let apiKey = "a43ab0c5t7640e69ab4693092fo45cea";
    let context =
      "You are a funny AI Assistant that tells short and funny jokes. The joke must be provided in HTML format. Example: <p>This is a joke</p>";
    let prompt = "Generate a short and unique joke to make people laugh.";
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    let jokeElement = document.querySelector("#joke");
    jokeElement.innerHTML = "Loading.... please wait";

    axios.get(apiUrl).then((response) => {
      displayJoke(response);
      generatorButton.disabled = false;
    });
  }

  let generatorButton = document.querySelector("#generate-joke-button");
  generatorButton.addEventListener("click", generateJoke);
});
