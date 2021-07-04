
const FormCheckLabel = (SocialNumber,
    fNam,
    lName,
    phone,
    insamount,
    prevNum,
    prevID,) => {

    const SoNumber = SocialNumber;
    const FirstName = fNam;
    const LastName = lName;
    const phone_number = phone;
    const Insurance_amount = insamount;
    const Previous_insurance_number = prevNum;
    const Previous_insurance_id = prevID;

    if (SoNumber.length != 9 || !checknum(SoNumber)) {
        return "Social number is worng"
    }

    else if (!checkChar(LastName) || LastName.length == 0) {


        return "Last Name is worng"
    }

    else if (!checkChar(FirstName) || FirstName.length == 0) {
        return "First Name is worng"

    }

    else if (phone_number.length != 10 || !checknum(phone_number)) {
        return "phone number is worng"

    }

    else if (checkInsuranceAmount(Insurance_amount)) {
        return "Insurance amount is worng"

    }

    else if (!checknum(Previous_insurance_id)) {

        return "Previous insurance id is worng"

    }
    else if (!checknum(Previous_insurance_number)) {
        return "Previous insurance number is worng"

    }
    else {
        return "All fields  correct sending to DB";
    }
}



function checkChar(text) {
    var count = 0;
    var name = Array.from(text);
    for (var i = 0; i < text.length; i++) {
        if ((name[i] >= 'a' && name[i] <= 'z') || (name[i] >= 'A' && name[i] <= 'Z'))
            count++;
    }
    if (count == text.length)
        return true;
    return false;
}

function checkInsuranceAmount(text) {
    var count = 0;
    let insurance = Array.from(text);
    if (insurance[0] == '.' || insurance[0] == '$' || insurance[0] == ' ' || (insurance[0] == '.' && insurance[1] == '$') || (insurance[1] == '.' && insurance[0] == '$'))
        return true;
    if (insurance[text.length - 1] != '$') {
        for (var i = 0; i < text.length; i++) {
            if (insurance[i] == '.')
                count++;
            else if (insurance[i] < '0' || insurance[i] > '9')
                return true;
        }
        if (count > 1)
            return true;
        return false;
    }
    for (var i = 0; i < text.length - 1; i++) {
        if (insurance[i] == '.')
            count++;
        else if (insurance[i] < '0' || insurance[i] > '9')
            return true;
    }
    if (count > 1)
        return true;
    return false;
}

function checknum(text) {
    var arr = Array.from(text);
    for (var i = 0; i < text.length; i++) {
        if (arr[i] < '0' || arr[i] > '9')
            return false;
    }
    return true;
}
export default FormCheckLabel;
