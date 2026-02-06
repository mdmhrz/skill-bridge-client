import React from 'react';
import { SignupForm } from '../../../components/modules/auth/SignupForm';

const RegisterPage = () => {
    return (
        <div className='min-w-lg max-2xl:max-w-xl mx-auto'>
            <SignupForm></SignupForm>
        </div>
    );
};

export default RegisterPage;