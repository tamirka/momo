import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { Profile } from '../types/database';

export type User = SupabaseUser & Profile;

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string, role: Profile['role'], companyName: string) => Promise<any>;
  logout: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getActiveSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        if (session?.user) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
            if (profile) {
                setUser({ ...session.user, ...profile });
            }
        }
        setLoading(false);
    };
    
    getActiveSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
            setUser(profile ? { ...session.user, ...profile } : null);
        } else {
            setUser(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  
  const login = (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };
  
  const signup = async (email: string, password: string, role: Profile['role'], companyName: string) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) throw authError;
    if (!authData.user) throw new Error("Signup successful, but no user data returned.");
    
    const { error: profileError } = await supabase.from('profiles').insert([{
        id: authData.user.id,
        email,
        role,
        company_name: companyName,
    }]);
    
    if (profileError) throw profileError;
    
    // Refresh user state after signup
    if (authData.session) {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', authData.user.id).single();
      setUser(profile ? { ...authData.user, ...profile } : null);
    }

    return authData;
  };

  const logout = () => {
    return supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};