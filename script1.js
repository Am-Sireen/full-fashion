document.addEventListener('DOMContentLoaded', function() {
   document.getElementById('glam').addEventListener('click', function() {
    document.getElementById('dressesSection').style.display = 'block';
    document.getElementById('othersSection').style.display = 'none';
    // גלול לטבלה של שמלות
    document.getElementById('dressesSection').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('magic').addEventListener('click', function() {
    document.getElementById('othersSection').style.display = 'block';
    document.getElementById('dressesSection').style.display = 'none';
    // גלול לטבלה של הבגדים האחרים
    document.getElementById('othersSection').scrollIntoView({ behavior: 'smooth' });
});


    function scrollToCollection() {
        document.getElementById('image-buttons-container').scrollIntoView({ behavior: 'smooth' });
    }

    document.getElementById('scroll-button').addEventListener('click', scrollToCollection);
    
    // Add event listener for GetAllCustomers button to prevent form submission
    document.getElementById('getAllCustomers').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        getAllCustomers();
    });
    
    // Add event listener for Delete button to prevent form submission
    document.getElementById('delete').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        removeIdFunc();
    });
    
}); // this closes the DOMContentLoaded function!

    // פונקציית ניקוי שדות
    function cleanForm(){
        document.getElementById('fname').value = '';
        document.getElementById('lname').value = '';
        document.getElementById('email').value = '';
        document.getElementById('emailconfirm').value = '';
        document.getElementById('id').value = '';
        document.getElementById('phoneNumber').value = '';
        document.getElementById('cardid').value = '';
        document.getElementById('cvv').value = '';
        // איפוס תאריכים
        document.getElementById('expyear').value = '2025';
        document.getElementById('expmonth').value = '1';
		document.getElementById('txt1').value = '';
        //clean cart
        for (var i = 1; i < 25; i++) {
            var str1 = 'size' + i.toString();
            document.getElementById(str1).value = 'XS';
            var str2 = 'item' + i.toString();
            document.getElementById(str2).checked = '';
        }
}

var selectedClothes = [];
function checkout() {
selectedClothes = [];
    var firstName = document.getElementById('fname').value.trim();
    var lastName = document.getElementById('lname').value.trim();
    var email = document.getElementById('email').value.trim();
    var emailConfirm = document.getElementById('emailconfirm').value.trim();
    var id = document.getElementById('id').value.trim();
    var phone = document.getElementById('phoneNumber').value.trim();
    var cardNumber = document.getElementById('cardid').value.trim();
    var cvv = document.getElementById('cvv').value.trim();
    var expYear = document.getElementById('expyear').value;
    var expMonth = document.getElementById('expmonth').value;
    var feedback = document.getElementById('txt1').value.trim();
    var clothes = document.getElementsByName('clothes');

   var hasSelected = false;

   for (var i = 1; i <= 24; i++) {
       var checkbox = document.getElementById("item" + i);
       if (checkbox && checkbox.checked) {
         var nameElement = document.getElementById("name" + i);
         var sizeElement = document.getElementById("size" + i);
         if (nameElement && sizeElement) {
             // trim() מסיר רווחים מיותרים מההתחלה והסוף של הטקסט, כדי לוודא שאין רווחים לא רצויים
             var name = nameElement.textContent.trim();
             var size = sizeElement.value;
             selectedClothes.push(name + " (Size: " + size + ")");
             hasSelected = true;
            }
        }
   }

    var alertMsg = "";

    if (firstName === '') alertMsg += "Please enter your first name.\n";
    if (lastName === '') alertMsg += "Please enter your last name.\n";

    // בדיקה אם השם כולל רק אותיות
    if (!onlyLetters(firstName)) alertMsg += "First name must contain only letters.\n";
    if (!onlyLetters(lastName)) alertMsg += "Last name must contain only letters.\n";

    if (email === '') alertMsg += "Please enter your email.\n";
    if (!checkEmail(email)) {
        alertMsg += "Email must contain both '@' and '.'.\n";
    }
    if (emailConfirm === '' || email !== emailConfirm) alertMsg += "Emails do not match.\n";
    if (id.length !== 9) alertMsg += "Please enter a valid ID.\n";
    if (phone.length !== 10) alertMsg += "Please enter a valid phone number.\n";
    if (cardNumber.length !== 16) alertMsg += "Please enter a valid credit card number.\n";
    if (cvv.length !== 3) alertMsg += "Please enter a valid CVV.\n";
    if (selectedClothes.length === 0) alertMsg += "Please choose at least one piece.\n";

    if (alertMsg !== '') {
        alert(alertMsg);
        return;
    }

// Check if the visa is expired (i.e., expiration month is between 1 and 4 in the year 2025)
if (parseInt(expYear) === 2025 && parseInt(expMonth) >= 1 && parseInt(expMonth) <= 4) {
    alert("The visa is expired");
    return;
}


    var resultText = "Thank you " + firstName + ' ' + lastName + "!<br><br>";
    resultText += "Your payment has been successfully processed.<br><br>";
    resultText += "Card ending with: " + cardNumber.slice(-4) + "<br><br>";
    resultText += "Cvv: " +cvv + "<br><br>";
    resultText += "Expiration: " + expMonth + "/" + expYear + "<br><br>";
    resultText += "Feedback: " + (feedback ? feedback : "No feedback given.") + "<br><br>";
    resultText += "Clothes selected:<br>" + selectedClothes.join("<br>") + "<br><br>";

    document.getElementById('res').innerHTML = resultText;
    processInfo(id, firstName, lastName, cardNumber, cvv, expMonth, expYear, feedback, selectedClothes.join("<br>"));
}

// remove spaces before and after str
function trim (str){
     return str.replace (/^\s+|\s+$/g, '');
}

function getAllCustomers(){
	var customerTable = getCustomersDb();
	var textPrint = '';
	for(i=0; i<customerTable.length; i++){
		var customer = customerTable[i];
		var fullName = customer[1] + ' ' + customer[2];
		textPrint += 'id: ' + customer[0] + ', named ' + fullName;
		textPrint += ' card details ';
                textPrint += ' card number ' + customer[3] + ' cvv ' + customer[4];
                textPrint += ' expMonth ' + customer[5] + ' expYear ' + customer[6];
         	textPrint += ' feedback ' + customer[7];
                textPrint += ' selectedClothes ' + customer[8];

		textPrint += '</br></br>';
	}
	document.getElementById('res').innerHTML = textPrint;
}

function removeIdFunc() {
	var id = document.getElementById('deleteId').value;
	removeIdFromDb(id);
}
    
function onlyLetters(str) {
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);

        // קוד ASCII לאותיות גדולות (A-Z): 65–90
        // קוד ASCII לאותיות קטנות (a-z): 97–122
        if (!((code >= 65 && code <= 90) || (code >= 97 && code <= 122))) {
            return false;
        }
    }
    return true;
}

function checkEmail(email) {
    var hasAt = false;
    var hasDot = false;

    for (var i = 0; i < email.length; i++) {
        if (email[i] === '@') {
            hasAt = true;
        } else if (email[i] === '.') {
            hasDot = true;
        }
    }

    return hasAt && hasDot;
}
