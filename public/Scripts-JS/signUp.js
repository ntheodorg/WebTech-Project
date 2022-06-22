import {getServerData} from "./getServerData.js";

const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');
const ageError = document.querySelector('.age.error');

function formEvent(settings){

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
    ageError.textContent = '';
        // Reset errors
        emailError.textContent = '';
        passwordError.textContent = '';

        // Get the values
        let json = {
            email: form.email.value,
            password: form.password.value,
            name: form.name.value,
            forename: form.forename.value,
            age: form.age.value
        }

        try {
            const res = await fetch(settings.sign.post.route, {
                method: settings.sign.post.method,
                body: JSON.stringify(json),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();

        if(data.errors) {
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
            ageError.textContent = data.errors.age;
        }
            if(data.errors) {
                emailError.textContent = data.errors.email;
                passwordError.textContent = data.errors.password;
            }

            if(data.user) {
                location.assign('/')
            }

        } catch (err) {
            console.log(err);
        }
    })
}

getServerData().then(({userData, serverSettings}) => {
    let settings = {
        sign:{
            post:{
                route:serverSettings.authRoutes.signup.route,
                method:serverSettings.authRoutes.signup.method
            }
        }
    }
    formEvent(settings);
})