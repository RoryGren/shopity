const container = document.querySelector(".container")
const coffees = [
	{ name: "HolyMoly", image: "images/icons/icon-18x18.png" },
	{ name: "Perspiciatis", image: "images/coffee1.jpg" },
	// { name: "Voluptatem", image: "images/coffee2.jpg" },
	// { name: "Explicabo", image: "images/coffee3.jpg" },
	// { name: "Rchitecto", image: "images/coffee4.jpg" },
	// { name: " Beatae", image: "images/coffee5.jpg" },
	// { name: " Vitae", image: "images/coffee6.jpg" },
	// { name: "Inventore", image: "images/coffee7.jpg" },
	// { name: "Veritatis", image: "images/coffee8.jpg" },
	{ name: "Accusantium", image: "images/coffee9.jpg" },
]

const shoppingList = ((localStorage.getItem('shoppityList') === null)) ? localStorage.getItem('shoppityList') : "list.shoppity";

const showShoppingLists = () => {
	let output = ""
	// coffees.forEach(
	//   ({ name, image }) =>
	// 	(output += `
	// 			<div class="card">
	// 			  <img class="card--avatar" src=${image} />
	// 			  <h1 class="card--title">${name}</h1>
	// 			  <a class="card--link" href="#">Taste</a>
	// 			</div>
	// 			`)
	// )
	// container.innerHTML = output
}
  
document.addEventListener("DOMContentLoaded", showShoppingLists)
  
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("serviceWorker.js")
		.then(registration => {
			console.log("service worker registered");
			console.log(registration);
		})
		.catch(error => {
			console.log("service worker not registered");
			console.log(error);
		})
}
updateOnlineStatus();

function addItem(){
	var taskName = document.querySelector("#task").value;
	var taskListUI = ` <li class="checklist-entry list-group-item flex-column align-items-start py-4 px-4">
						<div class="checklist-item checklist-item-success checklist-item-checked">
							<div class="checklist-info">
								<h5 data-type="header" class="checklist-title mb-0">${taskName}</h5>
							</div>
							<div>
								<div class="custom-control custom-checkbox custom-checkbox-success"><input id="${taskName}" type="checkbox"  class="custom-control-input" /><label for="${taskName}"
										class="custom-control-label"></label></div>
							</div>
						</div>
					</li>`
	var todoList = document.querySelector('.todo-list');
	todoList.insertAdjacentHTML('beforeend',taskListUI);
}


window.addEventListener('load', function() {
	window.addEventListener('online',  updateOnlineStatus);
	window.addEventListener('offline', updateOnlineStatus);
  });


  function updateOnlineStatus() {

	const element = document.querySelector(".status");
	// Update the DOM to reflect the current status
	if (navigator.onLine) {
		element.classList.remove("offline");
		element.classList.add("online");
		element.innerText = "Online";
	} else {
		element.classList.remove("online");
		element.classList.add("offline");
		element.innerText = "Offline";
	}
}