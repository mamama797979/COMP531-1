	//define the display value
	var display_name = document.getElementById("display_name");
	var email = document.getElementById("email");
	var phone_number = document.getElementById("phone_number");
	var zipcode = document.getElementById("zipcode");
	var password = document.getElementById("password");
	var password_cfm = document.getElementById("password_cfm");
	//define the txt value
	var display_name_txt = document.getElementById("display_name_txt");
	var email_txt = document.getElementById("email_txt");
	var phone_number_txt = document.getElementById("phone_number_txt");
	var zipcode_txt = document.getElementById("zipcode_txt");
	var password_txt = document.getElementById("password_txt");
	var password_cfm_txt = document.getElementById("password_cfm_txt");
	//check validation
	var update_field = [];
	var result = [];
	var validation = function() {
			if(validateDisplayName(display_name_txt) === false) {
				alert("Not a valid Name");
				return false;
			}
			if(validateEmail(email_txt) === false) {
				alert("Not a valid Email");
				return false;
			}
			if(validatePhone(phone_number_txt) === false) {
				alert("Not a valid Phone Number");
				return false;
			}
			if(validateZipcode(zipcode_txt) === false) {
				alert("Not a valid Zipcode");
				return false;
			}
			if(validatePassword(password_txt, password_cfm_txt) === false) {
				alert("Not the same password");
				return false;
			}
			return true;
	}
	//
		function validateDisplayName(inputtxt) {  
  			var reg = /^[a-zA-Z0-9]+$/;  
  			if(inputtxt.value.match(reg)){
  				update_field.push(["display_name",inputtxt.value])
       			return true;        
     		}
     		else if(inputtxt.value == "") {
     			return true;
     		}
   			else{         		 
       			return false;
       		}  
        }
        function validateEmail(inputtxt) {  
  			var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;  
  			if(inputtxt.value.match(reg)){
  				update_field.push(["email",inputtxt.value])  
       			return true;        
     		}
     		else if(inputtxt.value == "") {
     			return true;
     		}
   			else{         		 
       			return false;
       		}  
        }
		function validatePhone(inputtxt) {  
  			var reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
  			if(inputtxt.value.match(reg)){
  				update_field.push(["phone_number",inputtxt.value])
       			return true;        
     		}
     		else if(inputtxt.value == "") {
     			return true;
     		}
   			else{         		 
       			return false;
       		}  
        }
        function validateZipcode(inputtxt) {  
  			var reg = /(^\d{5}$)|(^\d{5}-\d{4}$)/;  
  			if(inputtxt.value.match(reg)){  
  				update_field.push(["zipcode",inputtxt.value])
       			return true;        
     		}
     		else if(inputtxt.value == "") {
     			return true;
     		} 
   			else{         		 
       			return false;
       		}  
        }
        function validatePassword(password, password_confirmation) {
        	if(password.value != password_confirmation.value) {
        		return false;
        	}
        	if((password.value == "") && (password_confirmation.value == "")) {
     			return true;
     		}
        	else{
				update_field.push(["password",password.value])
        		update_field.push(["password_cfm",password_confirmation.value])
        		return true;
        	}
        }
	//onclick function
	$('#btn_update').click(function() {
		if(validation()){
			result = [];
			update_field.forEach(function(item){
				if(document.getElementById(item[0]).innerHTML != item[1]) {
					result.push("\n"+item[0]+" change from "+"\""+document.getElementById(item[0]).innerHTML+"\""+" to \""+item[1]+"\"");
					document.getElementById(item[0]).innerHTML = item[1];
				}				
			});
			if(result.length != 0){
				alert("Reminder: "+result.toString());
			}
			if(result.length == 0){
				alert("you didn't update anything");
			}
			//clear all the input field
			$(':input').val('');
		}
	})