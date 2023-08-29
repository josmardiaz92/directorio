const xhr = new XMLHttpRequest();

xhr.open("POST", "../py/divisas/app.py");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send();

xhr.onload = function() {
  if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
    console.log(response);
  } else {
    console.log("Error: " + xhr.status);
  }
};