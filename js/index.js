import $ from "./lib/jquery.js"

$(() => {
  let count = 0
  const app = $("#app")
  const h1 = $("h1")

  app.append($("<button>count: 0</button><p>^ button up above!</p>"))

  
  const button = $("button")
  button.css({
    backgroundColor: "red",
    borderRadius: "0.5rem",
    fontSize: "1.25rem",
    padding: "0.5rem",
    cursor: "pointer",
    outline: "none",
    border: "none",
    color: "#fff"
  })
  button.on("click", () => {
    button.text(`count: ${ ++count }`)
  })

  console.log(button.css("font-family"))
})