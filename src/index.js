var jquery = require("jquery");
window.$ = window.jQuery = jquery;
require("jquery-ui-dist/jquery-ui.js");
import "./index.css";

$(function() {
  let $abtn = $(".add-task-btn");
  let $cbtn = $(".clear-all-btn");
  let $Tinput = $(".T-text");
  let $Dinput = $(".description");
  let $container = $(".todo-tasked-container");
  let $datepicker = $("#datepicker");
  let $connected = $(".todo-container");

  // 関数化すると楽！

  // const sortByDate = arr => {
  //   arr.sort((a, b) => {
  //     console.log(arr);
  //     let da = Date.parse(a.date);
  //     let db = Date.parse(b.date);
  //     console.log(da);
  //     console.log(db);
  //     console.log(a);
  //     console.log(b);
  //     if (da < db) {
  //       console.log("1");
  //       return -1;
  //     }
  //     if (da > db) {
  //       console.log("2");
  //       return 1;
  //     }
  //     console.log("3");
  //     return 0;
  //   });
  // };

  // let Pstore = JSON.parse(localStorage.getItem("TodoStore"))
  //   ? sortByDate(JSON.parse(localStorage.getItem("TodoStore")))
  //   : [];
  // console.log(sortByDate);
  // let Istore = JSON.parse(localStorage.getItem("i-Store"))
  //   ? sortByDate(JSON.parse(localStorage.getItem("i-Store")))
  //   : [];
  // let Cstore = JSON.parse(localStorage.getItem("c-Store"))
  //   ? sortByDate(JSON.parse(localStorage.getItem("c-Store")))
  //   : [];
  /*
  text,element,date,id
  */
  let Pstore = JSON.parse(localStorage.getItem("TodoStore")) || [];
  let Istore = JSON.parse(localStorage.getItem("i-Store")) || [];
  let Cstore = JSON.parse(localStorage.getItem("c-Store")) || [];

  const task = e => `
  <div class="todo-item"id=${e.id}>
   <div class="contained-item">
    <div class="task-header">${e.text}</div>
    <div class="task-date">${e.date}</div>
    <div class="task-description">${e.element}</div>
   </div>
   <input type="button" value="✖" class="del" style="width:30px">
  </div>`;
  const renderList = () => {
    console.log("4");
    const prevStoreIndex = $container.find(".todo-item").length;
    const prevStoreIndexI = $("#InProgress").find(".todo-item").length;
    const prevStoreIndexC = $("#Completed").find(".todo-item").length;
    Pstore.slice(prevStoreIndex).map((e, i) => {
      $container.append(task(e));
    });
    Istore.slice(prevStoreIndexI).map((e, i) => {
      $("#InProgress").append(task(e));
    });
    Cstore.slice(prevStoreIndexC).map((e, i) => {
      $("#Completed").append(task(e));
    });
  };

  if (Pstore) {
    console.log(Pstore);
    // sortByDate(JSON.parse(localStorage.getItem("TodoStore")));
    // console.log(sortByDate);
    renderList();
    sortableInit();
  }
  // if (Istore) {
  //   sortByDate(JSON.parse(localStorage.getItem("i-Store")));
  // }
  // if (Cstore) {
  //   sortByDate(JSON.parse(localStorage.getItem("c-Store")));
  // }
  const updateStore = () => {
    localStorage.setItem("TodoStore", JSON.stringify(Pstore));
    localStorage.setItem("i-Store", JSON.stringify(Istore));
    localStorage.setItem("c-Store", JSON.stringify(Cstore));
  };
  console.log(updateStore);
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
  const filterStore = ui => {
    Pstore = Pstore.filter((item, index) => {
      return item.id != ui.item.attr("id");
    });
    Cstore = Cstore.filter((item, index) => {
      return item.id != ui.item.attr("id");
    });
    Istore = Istore.filter((item, index) => {
      return item.id != ui.item.attr("id");
    });
  };
  const taskData = ui => {
    return {
      text: ui.item.find(".task-header").text(),
      element: ui.item.find(".task-description").text(),
      date: ui.item.find(".task-date").text(),
      id: parseInt(ui.item.attr("id"))
    };
  };
  $("#Pending").sortable({
    receive: function(event, ui) {
      filterStore(ui);
      Pstore.push(taskData(ui));
      updateStore();
    },
    update: function(event, ui) {}
  });
  $("#InProgress").sortable({
    receive: function(event, ui) {
      filterStore(ui);
      Istore.push(taskData(ui));
      updateStore();
    },
    update: function(event, ui) {}
  });
  $("#Completed").sortable({
    receive: function(event, ui) {
      filterStore(ui);
      Cstore.push(taskData(ui));
      updateStore();
    },
    update: function(event, ui) {}
  });
  // ソート更新したらPstoreとPendingの子要素の順番を取り出す
  // $("#Pending").on("sortupdate", function(event, ui) {
  //   console.log(5);
  //   for (var i = 0; i < Pstore.length; i++) {
  //     console.log(Pstore[i].id);
  //   }
  //   var newArray = [];
  //   var a = $("#Pending").children();
  //   for (var i = 0; i < a.length; i++) {
  //     console.log(a[i].id);
  //     newArray.push(a[i].id);
  //   }
  //   console.log(Pstore);
  // });

  $cbtn.on("click", function(event) {
    var result = window.confirm("Is it really good?");
    if (result) {
      event.preventDefault();
      Pstore = [];
      Istore = [];
      Cstore = [];
      updateStore();
      $container.empty();
      $connected.empty();
    } else {
    }
  });
  $(document).on("click", ".del", function() {
    let target = $(this).parent();
    let this_id = target.attr("id");
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
});
