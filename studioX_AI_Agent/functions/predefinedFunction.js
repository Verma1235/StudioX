function getWeatherDetails({city = ''}) {
    const cleanCity = city.trim().toLowerCase();
    if (cleanCity === 'saradhu') return '45°C';
    if (cleanCity === 'tandwa') return '35°C';
    if (cleanCity === 'hazaribagh') return '40°C';
    if (cleanCity === 'delhi') return '33°C';
    if (cleanCity === 'jharkhand') return '41°C';
    if (cleanCity === 'ramgarh') return '55°C';
    if (cleanCity === 'soparam') return '35°C';
    if (cleanCity === 'pakistan') return '100°C';
    return 'Weather details not found for this city.';
}

function toggleLight(mode = false) {
    if (mode) {
        return true;
    } else {
        return false;
    }
}

function dbuserquery({name = "dinesh"}) {
    const name1 = name.trim().toLowerCase();
    if (name1 === 'dinesh') return "Dinesh verma is the full stack developer and founder of StudioX ";
    if (name1 === 'deepak') return "Deepak verma is the brother of Dinesh verma";
    if (name1 === 'aditya') return "Dinesh verma is the full stack developer";
    return 'user details not found !';
}

function loginintoaccount({email='',password=''}){
    const email1 = email.trim();
    const password1=password.trim();

        if(email1==='vermadinesh9693@gmail.com' && password1 === 'DV123456') return true;
        return false;
}

export { getWeatherDetails, toggleLight, dbuserquery,loginintoaccount };