"use client"

import {signIn} from 'next-auth/react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = (event.currentTarget.elements.namedItem('username') as HTMLInputElement).value;
        const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
        await signIn('credentials', {username: username, password: password, callbackUrl: `/`});
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Anmelden</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input name="username" type="text" className="form-control" id="username"
                                           placeholder="Usernamen eingeben" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Passwort</label>
                                    <input name="password" type="password" className="form-control" id="password"
                                           placeholder="Passwort eingeben" required/>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Absenden</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;