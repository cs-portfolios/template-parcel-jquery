$(function() {
  let $abtn = $(".add-task-btn");
  let $cbtn = $(".clear-all-btn");
  let $Tinput = $(".T-text");
  let $Dinput = $(".description");
  let $container = $(".todo-tasked-container");
  let $datepicker = $("#datepicker");
  let $connected = $(".todo-container");
  let text = $Tinput.val();
  let element = $Dinput.val();
  let date = $datepicker.val();

  let Pstore = JSON.parse(localStorage.getItem("TodoStore")) || [];
  let Istore = JSON.parse(localStorage.getItem("i-Store")) || [];
  let Cstore = JSON.parse(localStorage.getItem("c-Store")) || [];

  const renderList = () => {
    const prevStoreIndex = $container.find(".todo-item").length;
    Pstore.slice(prevStoreIndex).map((e, i) => {
      $container.append(`
      <div class="todo-item"id=${e.id}>
       <div class="contained-item">
        <div class="task-header">${e.text}</div>
        <div class="task-date">${e.date}</div>
        <div class="task-description">${e.element}</div>
       </div>
       <input type="button" value="✖" class="del" style="width:30px">
      </div>`);
    });
    Istore.slice(prevStoreIndex).map((e, i) => {
      $("#InProgress").append(`
      <div class="todo-item"id=${e.id}>
       <div class="contained-item">
        <div class="task-header">${e.text}</div>
        <div class="task-date">${e.date}</div>
        <div class="task-description">${e.element}</div>
       </div>
       <input type="button" value="✖" class="del" style="width:30px">
      </div>`);
    });
    Cstore.slice(prevStoreIndex).map((e, i) => {
      $("#Completed").append(`
      <div class="todo-item"id=${e.id}>
       <div class="contained-item">
        <div class="task-header">${e.text}</div>
        <div class="task-date">${e.date}</div>
        <div class="task-description">${e.element}</div>
       </div>
       <input type="button" value="✖" class="del" style="width:30px">
      </div>`);
    });
  };

  if (Pstore) {
    renderList();
    sortableInit();
  }

  const updateStore = () => {
    localStorage.setItem("TodoStore", JSON.stringify(Pstore));
    localStorage.setItem("i-Store", JSON.stringify(Istore));
    localStorage.setItem("c-Store", JSON.stringify(Cstore));
    console.log(updateStore);
  };

  function sortableInit() {
    $("#Pending,#InProgress,#Completed")
      .sortable({
        connectWith: ".connectedSortable"
      })
      .disableSelection();
  }

  $abtn.on("click", function(event) {
    event.preventDefault();
    let text = $Tinput.val();
    let element = $Dinput.val();
    let date = $datepicker.val();

    if (text.trim().length > 0) {
      Pstore.push({
        text: $Tinput.val(),
        element: $Dinput.val(),
        date: $datepicker.val(),
        id: Date.now()
      });
      updateStore();
      renderList();
    } else {
      alert("Title can not be empty");
    }
    $Tinput.val("");
    $Dinput.val("");
    $datepicker.val("");
    sortableInit();
  });

  $("#Pending").on("sortreceive", function(event, ui) {
    Pstore = Pstore.filter((item, index) => {
      return item.id != ui.item.attr("id");
    });
    Cstore = Cstore.filter((item, index) => {
      return item.id != ui.item.attr("id");
    });
    Istore = Istore.filter((item, index) => {
      return item.id != ui.item.attr("id");
    });
    Pstore.push({
      text: ui.item.find(".task-header").text(),
      element: ui.item.find(".task-description").text(),
      date: ui.item.find(".task-date").text(),
      id: parseInt($(".todo-item").attr("id"))
    });
    updateStore();
  });

  $("#InProgress").on("sortreceive", function(event, ui) {
    Pstore = Pstore.filter((item, index) => {
      return item.id != ui.item.attr("id");
    });
    Cstore = Cstore.filter((item, index) => {
      return item.id != ui.item.attr("id");
    });
    Istore = Istore.filter((item, index) => {
      return item.id != ui.item.attr("id");
    });
    Istore.push({
      text: ui.item.find(".task-header").text(),
      element: ui.item.find(".task-description").text(),
      date: ui.item.find(".task-date").text(),
      id: parseInt($(".todo-item").attr("id"))
    });
    updateStore();
  });

  $("#Completed").on("sortreceive", function(event, ui) {
    Pstore = Pstore.filter((item, index) => {
      return item.id != ui.item.attr("id");
    });
    Cstore = Cstore.filter((item, index) => {
      return item.id != ui.item.attr("id");
    });
    Istore = Istore.filter((item, index) => {
      return item.id != ui.item.attr("id");
    });
    Cstore.push({
      text: ui.item.find(".task-header").text(),
      element: ui.item.find(".task-description").text(),
      date: ui.item.find(".task-date").text(),
      id: parseInt($(".todo-item").attr("id"))
    });
    updateStore();
  });

  $cbtn.on("click", function(event) {
    event.preventDefault();
    Pstore = [];
    Istore = [];
    Cstore = [];
    updateStore();
    $container.empty();
    $connected.empty();
  });
  $(document).on("click", ".del", function() {
    var target = $(this).parent();
    target.remove();
  });
});

// const taskMove = store => {
//   return obj => {
//     obj.on("sortreceive", function(event, ui) {
//       Pstore = Pstore.filter((item, index) => {
//         return item.id != ui.item.attr("id");
//       });
//       Istore = Istore.filter((item, index) => {
//         return item.id != ui.item.attr("id");
//       });
//       Cstore = Cstore.filter((item, index) => {
//         return item.id != ui.item.attr("id");
//       });
//       store.push({
//         text: ui.item.find(".task-header").text(),
//         element: ui.item.find(".task-description").text(),
//         date: ui.item.find(".task-date").text(),
//         id: parseInt(ui.item.attr("id"))
//       });
//       updateStore();
//     });
//   };
// };
// const Pending = taskMove(Pstore);
// const InProgress = taskMove(Istore);
// const Completed = taskMove(Cstore);
// Pending($("#Pending"));
// InProgress($("#InProgress"));
// Completed($("#Completed"));

$(document).on("click", ".del", function() {
  let target = $(this).parent();
  let this_id = target.attr("id");
  console.log(this_id);
  Pstore.map((item, index) => {
    let item_id = item.id;
    if (item_id == this_id) {
      Pstore.splice(index, 1);
    }
  });
  Istore.map((item, index) => {
    let item_id = item.id;
    if (item_id == this_id) {
      Istore.splice(index, 1);
    }
    console.log(Istore);
  });
  Cstore.map((item, index) => {
    let item_id = item.id;
    if (item_id == this_id) {
      Cstore.splice(index, 1);
    }
  });
  updateStore();
  target.remove();
});

const c = [
  {
    text: "hellow",
    date: "2018/4/22"
  },
  {
    text: "world",
    date: "2018/4/24"
  }
];
c(a, b);
let ma = date.parse();
let mb = date.parse();
if (ma < mb) {
  return -1;
}
if (ma > mb) {
  return 1;
}
return 0;
