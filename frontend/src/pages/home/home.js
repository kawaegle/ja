import React, { useState, useEffect } from "react";

import './home.css';

import { AiOutlineArrowDown } from "react-icons/ai";

const Home = () => {

    const [asso, setAsso] = useState([]);
    const [listHoraire, setListHoraire] = useState([]);
    const [listActivite, setListActivite] = useState([]);
    const [expandedActivity, setExpandedActivity] = useState(null);

    const [name_current, setName] = useState(localStorage.getItem('name'));
    const [surname_current, setSurname] = useState(localStorage.getItem('surname'));

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

    const formatHoraire = (horaire) => {
        const [datePart, timePart] = horaire.split(' ');
        const [hour, minute] = timePart.split(':');
        return `${hour}h${minute}`;
    }

    const handleRegistActivity = async (id) => {

        const name = name_current;
        const surname = surname_current;

        const data = {
            id,
            name,
            surname
        };

        const response = await fetch("http://localhost:6969/act_register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    
        const responseJson = await response.json();
        console.log(responseJson);
    }



    const disconnect = () => {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('name');
        localStorage.removeItem('surname');
        window.location.href = "/";
    }


    useEffect(() => {
        handleGetAsso();
        handleGetHoraire();
        handleGetActivite();
    }, []);

    console.log(asso);
    console.log(listHoraire);
    console.log(listActivite);

    return (
        <div className="Home">

            <div className="bienvenue">
                <h1>JA Epitech</h1>
                <h2>Bienvenue sur le site de la JA Epitech {name_current}!</h2>
            </div>

            <p className="subtitle">Inscrivez vous sur notre plateforme pour les différentes activitées du jour !</p>
            
            <button className="disconnect" onClick={disconnect}>
                Se déconnecter
            </button>

            <button className="show_activities">
                Voir mes activitées
            </button>

            <div className="list_activities">
                <h2>Les activitées du jour:</h2>
                <div className="content_list_activities">
                    <div className="list_activities">
                        {listActivite.map((activite) => (
                            <div
                                className={`activite ${expandedActivity === activite.id ? 'expanded' : ''}`}
                                key={activite.id}
                                onClick={() =>
                                    setExpandedActivity((prevState) =>
                                        prevState === activite.id ? null : activite.id
                                    )
                                }
                            >
                                <div className="activite">
                                    <div className="activite_name">
                                        <h3>{activite.name}</h3>
                                        <AiOutlineArrowDown className="down" />
                                    </div>
                                    <div className="activite_desc">
                                        <p>{activite.description}</p>
                                    </div>

                                    <div className="activite_date">
                                        {listHoraire.map((horaire) => (
                                            <div className="horaire" key={horaire.activity_id}>
                                                {horaire.activity_id === activite.id ? (
                                                    <div className="horaires">
                                                        <p>debut: {formatHoraire(horaire.debut)}</p>
                                                        <p>fin: {formatHoraire(horaire.fin)}</p>
                                                        <button onClick={() => handleRegistActivity(horaire.id)}>
                                                            s'incrire
                                                        </button>
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>


            </div>

            <div className="presAsso">
                <h2>Les différentes associations d'Epitech Nancy:</h2>
            </div>

            <div className="content_list_asso">

                <div className="asso_list">
                    {asso.map((asso) => (
                        <div className="asso">
                            <div className="asso_name">
                                <h3>{asso.name}</h3>
                            </div>
                            <div className="asso_desc">
                                <p>{asso.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="footer">
                <div className="content_footer">
                    <p>
                        site internet de la JA Epitech Nancy
                    </p>

                    <p>
                        2023@Epitech
                    </p>
                    <p>
                        all rights reserved
                    </p>
                </div>

                <div className="beside_footer">
                    <p>
                        made by the most of the best people of the world
                    </p>
                </div>
            </div>

        </div>
    );
}

export default Home;