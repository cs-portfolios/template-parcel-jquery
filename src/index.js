import $ from "jquery";

$(document).ready(function() {
  $("#root").html("").append(`
      <h1>Parcel for jQuery</h1>
      <button>Click me!</button>
    `);

  $(document).on("click", "button", function() {
    alert("Hello, Parcel");
  });
});
