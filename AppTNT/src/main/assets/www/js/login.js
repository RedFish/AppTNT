var storage = window.localStorage;

function onBodyLoad() {
	if (storage.getItem("firstname") != "") {
		var firstname = document.getElementById("firstname");
		var lastname = document.getElementById("lastname");
		var accountnumber = document.getElementById("accountnumber");
		firstname.value = storage.getItem("firstname");
		lastname.value = storage.getItem("lastname");
		accountnumber.value = storage.getItem("accountnumber");
	}

}

// Submit button
function submitClicked() {
	var firstname = document.getElementById("firstname");
	var lastname = document.getElementById("lastname");
	var accountnumber = document.getElementById("accountnumber");

	if (firstname.value == "" || lastname.value == ""
			|| accountnumber.value == "") {
		alert("Please, fill all the forms.");
	} else {
		storage.setItem("firstname", firstname.value);
		storage.setItem("lastname", lastname.value);
		storage.setItem("accountnumber", accountnumber.value);
		redirect();
	}

}

// redirect
function redirect() {
	window.location = "index.html";
}

function alertAccount() {
	alert(storage.getItem("firstname") + " " + storage.getItem("lastname"));
}