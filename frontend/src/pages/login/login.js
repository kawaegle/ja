import React from 'react';

function Login() {

    const handleRegister = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const surname = e.target.surname.value;

        const data = {
            name,
            surname
        };

        const response = await fetch("http://localhost:6969/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();
        console.log(responseJson);

        if (responseJson) {
            localStorage.setItem('isLogged', true);
            localStorage.setItem('name', name);
            localStorage.setItem('surname', surname);
            window.location.href = "/";
        }
    };

    return (
        <div>
            <h1>Page de connexion</h1>
            <form onSubmit={(e) => handleRegister(e)}>
                <label htmlFor="name">prénom</label>
                <input type="text" name="name" id="name" />

                <label htmlFor="surname">nom de famille</label>
                <input type="text" name="surname" id="surname" />

                <button>Se connecter</button>
            </form>
        </div>
    );
}

export default Login;