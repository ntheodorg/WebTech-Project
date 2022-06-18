const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');
const ageError = document.querySelector('.age.error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
    ageError.textContent = '';

    // Get the values
    let json = {
        email: form.email.value,
        password: form.password.value,
        name: form.name.value,
        forename: form.forename.value,
        age: form.age.value
    }

    try {
        const res = await fetch('/api/SignUp', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();

        if(data.errors) {
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
            ageError.textContent = data.errors.age;
        }

        if(data.user) {
            location.assign('/')
        }

    } catch (err) {
        console.log(err);
    }
})