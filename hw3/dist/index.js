  const name = document.getElementById("name");
  const display_name = document.getElementById("display_name");
  const email = document.getElementById("email");
  const phone_number = document.getElementById("phone_number");
  const zipcode = document.getElementById("zipcode");
  const password = document.getElementById("password");
  const password_cfm = document.getElementById("password_cfm");
  
//for futher use
    $(window).load(function() {
        let timestamp = new Date().getTime() / 1000;
        //use this method to set value for elements in HTML
        document.getElementById("settime").value = timestamp;
        })
//create a function to validate the form
		$("#btn_reg").click(function() {
			if(!validateName(name)) {
				alert("Not a valid Name")
        return false
			}
			if(!validateEmail(email)) {
				alert("Not a valid Email")
        return false
			}
			if(!validatePhone(phone_number)) {
				alert("Not a valid Phone Number")
        return false
			}
			if(!validateBirthday(birthday)) {
				alert("Not a valid Birthday")
        return false
			}
			if(!validateZipcode(zipcode)) {
				alert("Not a valid Zipcode")
        return false
			}
			if(!validateAge(birthday)) {
				alert("Sorry you are under 18")
        return false
			}
			if(!validatePassword(password, password_cfm)) {
				alert("Not the same password")
        return false
			}	
      return true
		})

		function validateName(inputtxt) {  
  			var reg = /^[a-zA-Z0-9]+$/;  
  			if(inputtxt.value.match(reg)){  
       			return true;        
     		}  
   			else{         		 
       			return false;
       		}  
        }
    function validateEmail(inputtxt) {  
  			var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;  
  			if(inputtxt.value.match(reg)){  
       			return true;        
     		}  
   			else{         		 
       			return false;
       		}  
        }
		function validatePhone(inputtxt) {  
  			var reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
  			if(inputtxt.value.match(reg)){  
       			return true;        
     		}  
   			else{         		 
       			return false;
       		}  
        }
    function validateBirthday(inputtxt) {  
  			var reg = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;  
  			if(inputtxt.value.match(reg)){
       			return true;        
     		}  
   			else{         		 
       			return false;
       		}  
        }
    function validateAge(inputtxt) {

        	var year = Number(inputtxt.value.substr(6,4)); 
        	var month=Number(inputtxt.value.substr(0,2))-1;
        	var day=Number(inputtxt.value.substr(3,2));
        	var today = new Date();
        	var age = today.getFullYear() - year;
        	if(today.getMonth()<month || (today.getMonth()===month && today.getDate()<day)){age--;}
  			if(age >= 18){ 
       			return true;        
     		}  
   			else{        		 
       			return false;
       		}  
        }
    function validateZipcode(inputtxt) {  
  			var reg = /(^\d{5}$)|(^\d{5}-\d{4}$)/;  
  			if(inputtxt.value.match(reg)){  
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
        	else{
        		return true;
        	}
        }


        