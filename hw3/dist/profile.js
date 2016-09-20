	
	//define the display value
	const display_name = document.getElementById("display_name");
	const email = document.getElementById("email");
	const phone_number = document.getElementById("phone_number");
	const zipcode = document.getElementById("zipcode");
	const password = document.getElementById("password");
	const password_cfm = document.getElementById("password_cfm");
	//define the txt value
	const display_name_txt = document.getElementById("display_name_txt");
	const email_txt = document.getElementById("email_txt");
	const phone_number_txt = document.getElementById("phone_number_txt");
	const zipcode_txt = document.getElementById("zipcode_txt");
	const password_txt = document.getElementById("password_txt");
	const password_cfm_txt = document.getElementById("password_cfm_txt");
	var contents_pwd = password.innerHTML;
	var contents_pwd_cfm = password_cfm.innerHTML;
	//replace the content to
	$(window).load(function(){	
		password.innerHTML = contents_pwd.replace(/./g, '*');
		password_cfm.innerHTML = contents_pwd_cfm.replace(/./g, '*');
		$("#btn_main_page").click(function(){
		window.location.href = 'main.html'
		})
		$("#lbl_updt_img").click(function(){
		$("#btn_updt_img").css("visibility","visible")
		$("#btn_updt_img").css("display","inline");
		})
	})
	
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
			update_field.forEach(function(item){
				if(document.getElementById(item[0]).innerHTML != item[1]) {
					document.getElementById(item[0]).innerHTML = item[1];
				}				
			});
			//clear all the input field
			$(':input').val('');
			//replace the password 
			//get the content again after update pwd
			var contents_pwd = password.innerHTML;
			var contents_pwd_cfm = password_cfm.innerHTML;	
			password.innerHTML = contents_pwd.replace(/./g, '*');
			password_cfm.innerHTML = contents_pwd_cfm.replace(/./g, '*');
		}
	})