// Data Access Tier - logic related to the data access tier

function processInfo(id, firstName, lastName, cardNumber, cvv, expMonth, expYear, feedback, selectedClothes) {
	var dbString = stringify(id, firstName, lastName, cardNumber, cvv, expMonth, expYear, feedback, selectedClothes);
	localStorage.setItem(id, dbString);
}

function stringify(id, firstName, lastName, cardNumber, cvv, expMonth, expYear, feedback, selectedClothes) {
    var nameStr = 'firstName:' + firstName.trim();
    var lastNameStr = 'lastName:' + lastName.trim();
    var cardStr = 'cardNumber:' + cardNumber.trim();
    var cvvStr = 'cvv:' + cvv.trim();
    var expStr = 'expiry:' + expMonth + '/' + expYear;
    var feedbackStr = 'feedback:' + feedback.trim();
    var clothesStr = 'selectedClothes:' + selectedClothes; // selectedClothes is already a string

    // מחרוזת סופית - בלי סוגריים מיותרים
    let dbStr = nameStr + ', ' + lastNameStr + ', ' + cardStr + ', ' + cvvStr + ', ' + expStr + ', ' + feedbackStr + ', ' + clothesStr;

    return dbStr;
}

function getCustomersDb() {
    var orders = [];

    for (let i = 0; i < localStorage.length; i++) {
        var customerId = localStorage.key(i);
        var customerInfo = localStorage.getItem(customerId);

        var tmpCustomer = [];
        tmpCustomer[0] = customerId;
        tmpCustomer[1] = getFirstName(customerInfo);
        tmpCustomer[2] = getLastName(customerInfo);
        tmpCustomer[3] = getCardNumber(customerInfo);
        tmpCustomer[4] = getCvv(customerInfo);
        tmpCustomer[5] = getExpMonth(customerInfo);
        tmpCustomer[6] = getExpYear(customerInfo);
        tmpCustomer[7] = getFeedback(customerInfo);
        tmpCustomer[8] = getSelectedClothes(customerInfo);


        orders[i] = tmpCustomer;
    }

    return orders;
}

function removeIdFromDb(id) {
    if (localStorage.getItem(id)) {
         localStorage.removeItem(id);
         alert("Order with ID " + id + " was successfully deleted.");
    } else {
         alert("No order found with ID " + id + ".");
    }
}


function getFirstName(data) {
    var start = data.indexOf('firstName:') + 'firstName:'.length;
    var end = data.indexOf(', lastName:');
    return data.substring(start, end).trim();
}

function getLastName(data) {
    var start = data.indexOf('lastName:') + 'lastName:'.length;
    var end = data.indexOf(', cardNumber:');
    return data.substring(start, end).trim();
}

function getCardNumber(data) {
    var start = data.indexOf('cardNumber:') + 'cardNumber:'.length;
    var end = data.indexOf(', cvv:');
    return data.substring(start, end).trim();
}

function getCvv(data) {
    var start = data.indexOf('cvv:') + 'cvv:'.length;
    var end = data.indexOf(', expiry:');
    return data.substring(start, end).trim();
}

function getExpMonth(data) {
    var expiry = getExpiry(data); // מחזירה את המחרוזת "03/2026"
    return expiry.split('/')[0]; // מחזיר "03"
}

function getExpYear(data) {
    var expiry = getExpiry(data);
    return expiry.split('/')[1]; // מחזיר "2026"
}

function getExpiry(data) {
    var start = data.indexOf('expiry:') + 'expiry:'.length;
    var end = data.indexOf(', feedback:');
    return data.substring(start, end).trim();
}

function getFeedback(data) {
    var start = data.indexOf('feedback:') + 'feedback:'.length;
    var end = data.indexOf(', selectedClothes:');
    return data.substring(start, end).trim();
}

function getSelectedClothes(data) {
    var start = data.indexOf('selectedClothes:') + 'selectedClothes:'.length;
    return data.substring(start).trim();
}
