import './App.css';

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home/home';
import NotFound from './pages/notFound/notFound';
import Login from './pages/login/login';

function App() {

    const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged'));

    useEffect(() => {
        setIsLogged(localStorage.getItem('isLogged'));
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>

                    {console.log(isLogged)}

                    {isLogged ? (
                        <Route path="/" element={<Navigate to="/home" />} />
                    ) : (
                        <Route path="/" element={<Login />} />
                    )}
                    <Route path="*" element={<NotFound />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
