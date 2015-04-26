var lat=-999;
var long=-999;


//Submit button
function submitClicked(){

	var textarea = document.getElementById("description").value;
	var submitbtn = document.getElementById("submit_btn");


	var Checkbox1 = document.getElementById("Checkbox1");
	var Checkbox2 = document.getElementById("Checkbox2");
	var Checkbox3 = document.getElementById("Checkbox3");
	var Checkbox4 = document.getElementById("Checkbox4");
	var Checkbox5 = document.getElementById("Checkbox5");
	var Checkbox6 = document.getElementById("Checkbox6");
	var Checkbox7 = document.getElementById("Checkbox7");
	var Checkbox8 = document.getElementById("Checkbox8");

	if(!Checkbox1.checked &&!Checkbox2.checked &&!Checkbox3.checked &&!Checkbox4.checked &&!Checkbox5.checked &&!Checkbox6.checked &&!Checkbox7.checked &&!Checkbox8.checked){
		alert("Please, select at least one damage.");
	}
	else if(textarea == "") {//field missing
		alert("Please, enter description.");
	}
	else if(!document.getElementById("gps").checked && document.getElementById("location").value == ""){
		alert("Please, enter a location.");
	}
	else {//OK
		submitbtn.innerHTML = "Updating...";

		if(document.getElementById("gps").checked)
		{
			//setup geoloc
			var locOptions = {
					timeout : 20000,
					enableHighAccuracy : true
			};
			//get the current location
			navigator.geolocation.getCurrentPosition(onGeolocationSuccessMapFindMe, onGeolocationError, locOptions);
		}
		else
		{
			save();
		}

	}
}

//geoloc success
function onGeolocationSuccessMapFindMe(loc) {
	lat = loc.coords.latitude;
	loc.coords.longitude;
	save();
}

//geoloc fail
function onGeolocationError(e) {
	var submitbtn = document.getElementById("submit_btn");
	submitbtn.innerHTML = "Submit report";
	alert("Currently no Geolocation information is available" + 
	" for your device.\n\nTry again later or enter your location manually.");
}

//save claim
function save(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = mm+'/'+dd+'/'+yyyy;
	

	var me = 1; //me
	if(document.getElementById('optionsRadios2').checked) {//other
		me=0;
	}

	var textarea = document.getElementById("description").value;


	var Checkbox1 = document.getElementById("Checkbox1").checked;
	var Checkbox2 = document.getElementById("Checkbox2").checked;
	var Checkbox3 = document.getElementById("Checkbox3").checked;
	var Checkbox4 = document.getElementById("Checkbox4").checked;
	var Checkbox5 = document.getElementById("Checkbox5").checked;
	var Checkbox6 = document.getElementById("Checkbox6").checked;
	var Checkbox7 = document.getElementById("Checkbox7").checked;
	var Checkbox8 = document.getElementById("Checkbox8").checked;

	var location = document.getElementById("location").value;

	var claims;
	/*
	try{
		
		if(Storage.prototype.getObj("claimskey")==null)
		{
			claims = new Array();
		}
		else
		{
			claims = Storage.prototype.getObj("claimskey");
		}
	}
	catch(err){
		claims = new Array();
	}
	*/
	var key = "newkey";
	var obj;
	obj = JSON.parse(localStorage.getItem(key));
	if(obj == null) obj = [];
	
	// ID_customer		date		ID_claim	me?		8*damages	desc 	lat	long 	location
	var array = ["id",today,Math.floor((Math.random()*999999)+10000),me,Checkbox1,Checkbox2,Checkbox3,Checkbox4,Checkbox5,Checkbox6,Checkbox7,Checkbox8,textarea,lat,long,location];
	console.log('array: ' + array);
	obj=array.concat(obj);
	
	localStorage.setItem(key, JSON.stringify(obj));
	
	console.log('res=',JSON.parse(localStorage.getItem(key)));
	redirect();
}

//redirect (submition complete)
function redirect(){
	//go to list report
	window.location = "existingreports.html" ; //works only with IE
}

var jsonify=function(o){
    var seen=[];
    var jso=JSON.stringify(o, function(k,v){
        if (typeof v =='object') {
            if ( !seen.indexOf(v) ) { return '__cycle__'; }
            seen.push(v);
        } return v;
    });
    return jso;
};

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, jsonify(obj))
}

Storage.prototype.getObj = function(key) {
	return JSON.parse(this.getItem(key))
}