
const form = document.querySelector('#superUserForm');
const emailError = form.querySelector('.email.error');
const passwordError = form.querySelector('.password.error');
const success = document.querySelector('.success');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset errors
    emailError.textContent = '';
    passwordError.textContent = '';

    // Get the values
    const email = form.email.value;
    const password = form.password.value;

    try {
        const res = await fetch('/api/SignUp_SuperUser', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);

        if(data.errors) {
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
        }

        if(data.user) {
            success.textContent = 'SuperUser added with success!'
        }

    } catch (err) {
        console.log(err);
    }
})