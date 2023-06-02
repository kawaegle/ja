import React, { useState, useEffect } from 'react';

import './creneau.css';

function Creneau() {
    const [name_current, setName] = useState(localStorage.getItem('name'));
    const [surname_current, setSurname] = useState(localStorage.getItem('surname'));

    const [registerList, setRegisterList] = useState([]);
    const [asso, setAsso] = useState([]);
    const [listHoraire, setListHoraire] = useState([]);
    const [listActivite, setListActivite] = useState([]);
    const [activites, setActivites] = useState([]);


    const handleGetRegister = async () => {
        fetch("http://localhost:6969/register")
            .then((response) => response.json())
            .then((response) => setRegisterList(response))
            .catch((err) => console.log(err));
    };


    const handleGetAsso = async () => {
        fetch("http://localhost:6969/associations")
            .then((response) => response.json())
            .then((response) => setAsso(response))
            .catch((err) => console.log(err));
    };

    const handleGetHoraire = async () => {
        fetch("http://localhost:6969/horaires")
            .then((response) => response.json())
            .then((response) => setListHoraire(response))
            .catch((err) => console.log(err));
    };

    const handleGetActivite = async () => {
        fetch("http://localhost:6969/activites")
            .then((response) => response.json())
            .then((response) => setListActivite(response))
            .catch((err) => console.log(err));
    };

    const fetchActivite = async (id) => {
        const response = await fetch(`http://localhost:6969/act_register/${id}`);
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        handleGetAsso();
        handleGetHoraire();
        handleGetActivite();
        handleGetRegister();

        const fetchAllActivites = async () => {
            const activitesArray = [];
            for (let id = 1; id <= 15; id++) {
                const activite = await fetchActivite(id);
                activitesArray.push(activite);
            }
            setActivites(activitesArray);
        };

        fetchAllActivites();
    }, []);

    const formatHoraire = (horaire) => {
        const [datePart, timePart] = horaire.split(' ');
        const [hour, minute] = timePart.split(':');
        return `${hour}h${minute}`;
    }

    return (
        <div className='creneau'>
            <div className="bienvenue">
                <h1>JA Epitech</h1>
                <h2>Bienvenue sur le site de la JA Epitech {name_current}!</h2>
            </div>

            <button className="show_activities" onClick={() => window.location.href = "/"}>
                Retourner au Home
            </button>

            <div className='acti'>
                <h1>Les créneaux :</h1>
                {listActivite.map((activite) => (
                    <div className='acti_box' key={activite.id}>
                        <h2>{activite.name}</h2>
                        <h3>{activite.description}</h3>

                        {listHoraire.map((horaire) => {
                            if (horaire.activity_id === activite.id) {
                                const filteredActivites = activites.filter(
                                    (activiteHoraire) => activiteHoraire.act_id === horaire.Id
                                );

                                return (
                                    <div className='horaire' key={horaire.id}>
                                        <p>{formatHoraire(horaire.debut)}</p>
                                        {filteredActivites.map((activiteHoraire) => (
                                            <div key={activiteHoraire.Id}>
                                                {activiteHoraire.map((activite) => (
                                                    <div>
                                                        {horaire.id === activite.act_id ? (
                                                            <div>
                                                                {registerList.map((register) => (
                                                                    <div>
                                                                        {console.log(register)}
                                                                        {register.Id === activite.user_id ? (
                                                                            <p>{register.name} {register.surname}</p>
                                                                        ) : (
                                                                            <p></p>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>

                                                        ) : (
                                                            <p></p>
                                                        )
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Creneau;
