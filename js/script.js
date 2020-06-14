function get_json_data(json_url,table) {
    // var json_url = 'example.json';
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            append_json(data);
        }
    }
    xmlhttp.open("POST", json_url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
function append_json(data) {
    data.forEach(function(object) {
  var tr = document.createElement('tr');
        tr.innerHTML =
            '<td > <input type="radio" value ="' + object.RendementDuPanneau + '" name="choice" /> </td>' +
            '<td>' + object.Fournisseur + '</td>' +
            '<td>' + object.Modele + '</td>' +
            '<td>' + object.PuissanceMaximale + '</td>' +
            '<td>' + object.RendementDuPanneau + '</td>';
            table.appendChild(tr);
    });
		var elements = document.getElementsByTagName('tr');
		for (var i = 0; i < elements.length; i++) {
				(elements)[i].addEventListener("click", function() {
						const rb = this.querySelector('input[name="choice"]');
						rb.checked = true;
						let selectedValue = rb.value;
						console.log(selectedValue);
				});
		}
}
}
async function lookupGridcodeByLatAndLong(lat, long){
	const response=await fetch('data/GHI_part01.json');
	const line=await response.json();
	var check =0;
	var result = line.find(x => x.Lat == lat && x.Long == long);
       if (result) {
      return result.GRIDCODE;
       }
			 else {
       var check = 1;
       }
			 if (check == 1)
			 {
				const response=await fetch('data/GHI_part02.json');
 				const line=await response.json();

 				var result = line.find(x => x.Lat == lat && x.Long == long);
 			       if (result) {
 			      return result.GRIDCODE;
 			       } else {
 			        check = 2
 			       }
			 }
			 if (check = 2)
			 {
				 const response=await fetch('data/GHI_part03.json');
 				const line=await response.json();

 				var result = line.find(x => x.Lat == lat && x.Long == long);
 			       if (result) {
 			      return result.GRIDCODE;
 			       } else {
 			      return new Error('No records found');
 			       }
			 }
}
$('#mySelect').change(function() {
	var tabPoly = $('#tablePoly').get(0);
var tabMono = $('#tableMono').get(0);
    if ($(this).val() === 'poly')
		 {  $("#monoTab").hide();
			  $("#polyTab").show();
        get_json_data('data/poly.json',tabPoly);
				console.log($('#gable').length);
    }
    if($(this).val() === 'mono')
		{
			  $("#polyTab").hide();
 			  $("#monoTab").show();
      get_json_data('data/mono.json',tabMono);
			cconsole.log($('#gable').length);
    }
});

  // $("form[name='calculeForm']").validate({
  //   // Specify validation rules
  //   rules: {
  //     // The key name on the left side is the name attribute
  //     // of an input field. Validation rules are defined
  //     // on the right side
  //     lat: "required",
  //     long: "required",
  //     surface:"required" ,
  //     chktype: "required"
  //   },
  //   // Specify validation error messages
  //   messages: {
  //     lat: "Veuillez indiquer Latitude",
  //     long: "Veuillez indiquer Longtitude",
  //     surface: "Veuillez enter la Surface",
  //     chktype: "Veuillez choisir le type de rendement"
  //   },
	//
  //   // Make sure the form is submitted to the destination defined
  //   // in the "action" attribute of the form when valid
  //   submitHandler: function(form) {
  //     form.submit();
  //   }
  // });
$("#Btn" ).click(function() {
   // var valid = $("form[name='calculeForm']").valid();
   // if (valid === false) {
   // }
   // else {
  var
  select = $("#mySelect").val(),
  surface = $("#surface").val(),
  type = parseInt( $('input[name=choice]:checked', '#formName').val());
	var lat = $("#lat").val(),
  long = $("#long").val();
	lookupGridcodeByLatAndLong(lat, long)
	.then(gridcode => {
		var ghi = gridcode
		console.log(ghi);
	  var result = (surface * ghi * (type/5))/100;
		$("#gable").hide();
	  $("#result").show();
	  $("#resultat").html(result);
		alert(result);
    console.log(result);
}).catch(err => {
console.log(err);
})
});
