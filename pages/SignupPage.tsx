import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/Auth';
import { LogoIcon, UserIcon, BuildingStorefrontIcon } from '../components/Icons';
import { Profile } from '../types/database';

type Role = Profile['role'];

interface SignupPageProps {
    onSuccess: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [role, setRole] = useState<Role>('buyer');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();
    const { signup } = useAuth();

    useEffect(() => {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isPasswordValid = password.length >= 6;
        const isCompanyNameValid = role === 'supplier' ? companyName.trim() !== '' : true;
        setIsValid(isEmailValid && isPasswordValid && isCompanyNameValid);
    }, [email, password, role, companyName]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid || loading) return;

        setLoading(true);
        setError('');

        try {
            await signup(email, password, role, companyName);
            onSuccess();
            navigate(role === 'supplier' ? '/dashboard' : '/browse');
        } catch (err: any) {
            setError(err.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <LogoIcon className="h-12 w-auto text-primary mx-auto" />
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
                    Create your account
                </h2>
                 <p className="mt-2 text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="#/login" className="font-medium text-primary hover:text-primary-hover">
                       Sign in
                    </a>
                </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
                    <div className="grid grid-cols-2 gap-3">
                        <RoleButton icon={<UserIcon className="h-5 w-5 mr-2"/>} label="Buyer" value="buyer" selectedRole={role} onSelect={setRole} />
                        <RoleButton icon={<BuildingStorefrontIcon className="h-5 w-5 mr-2"/>} label="Supplier" value="supplier" selectedRole={role} onSelect={setRole} />
                    </div>
                </div>
                
                {role === 'supplier' && (
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input id="companyName" type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Your Company LLC" />
                    </div>
                )}

                <div>
                    <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input id="email-signup" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="you@company.com" />
                </div>
                <div>
                    <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700">Password</label>
                    <input id="password-signup" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="6+ characters" />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div>
                    <button type="submit" disabled={!isValid || loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </div>
            </form>
        </div>
    );
};


interface RoleButtonProps {
    icon: React.ReactNode;
    label: string;
    value: Role;
    selectedRole: Role;
    onSelect: (role: Role) => void;
}

const RoleButton: React.FC<RoleButtonProps> = ({ icon, label, value, selectedRole, onSelect }) => {
    const isSelected = selectedRole === value;
    return (
        <button
            type="button"
            onClick={() => onSelect(value)}
            className={`w-full inline-flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${
                isSelected 
                ? 'bg-primary border-transparent text-white shadow-sm' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
        >
            {icon}
            {label}
        </button>
    );
};

export default SignupPage;
