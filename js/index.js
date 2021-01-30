import $ from "./lib/jquery.js"

$(() => {
  console.log("document ready")
  const app = $("#app")
  const h1 = $("h1")
  // h1.css("font-size", "40px")
  // h1.on("click", () => console.log("ooof"))
  // console.log($(document.createElement("div")))
  h1.css({
    fontSize: "40px",
    color: "red"
  })
  
  const div = $("<div>Hello There this is a div</div>")
  app.append(div)
  // let parsed = $("<h1>Helo</h1>")
  // console.log(parsed.constructor.name)
  // console.log($(h1.nodes[0].node))
  // console.log(h1.css("font-size"))
  // console.log(h1)
  // console.log(h1.serialize())
})