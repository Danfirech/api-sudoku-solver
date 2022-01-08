const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");

const squares = 81;
const submission = [];

for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");

  //Created inputs
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", "1");
  inputElement.setAttribute("max", "9");
  puzzleBoard.appendChild(inputElement);
}

const joinValues = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value) {
      submission.push(input.value);
    } else {
      submission.push(".");
    }
  });
  console.log(submission);
};

const populateValues = (isSolvable, solution) => {
  const inputs = document.querySelectorAll("input");
  if (isSolvable && solution) {
    inputs.forEach((input, i) => {
      input.value = solution[i];
    });
  }
};

const solve = () => {
  joinValues();
  const data = submission.join("");
  console.log("data", data);
  var options = {
    method: "POST",
    url: "https://solve-sudoku.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "solve-sudoku.p.rapidapi.com",
      "x-rapidapi-key": "227ba1bed6msh67dcdf76b435e79p1cd122jsn7a2b05476f1e",
    },
    data: {
      puzzle: data,
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      populateValues(response.data.solvable, response.data.solution);
    })
    .catch((error) => {
      console.error(error);
    });
};

solveButton.addEventListener("click", solve);
