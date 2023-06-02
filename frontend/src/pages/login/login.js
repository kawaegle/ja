import React from 'react';

import './login.css';

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
        <div className='login'>
            <h1 className='titile_login'>JA Epitech Nancy</h1>
            <form className='form' onSubmit={(e) => handleRegister(e)}>
                <h2>Entrez vos informations :</h2>

                <input type="text" name="name" id="name" placeholder='prénom' />

                <input type="text" name="surname" id="surname" placeholder='nom de famille' />

                <button>Se connecter</button>
            </form>
        </div>
    );
}

export default Login;