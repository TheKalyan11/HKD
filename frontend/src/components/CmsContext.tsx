"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface CmsContextType {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  role: 'admin' | 'staff' | null;
  setRole: (role: 'admin' | 'staff' | null) => void;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  pageContent: Record<string, any>;
  fetchPageContent: (pageId: string) => Promise<void>;
  updatePageField: (pageId: string, section: string, field: string, value: string) => void;
  savePageContent: (pageId: string) => Promise<boolean>;
  isLoading: boolean;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) throw new Error("useCms must be used within a CmsProvider");
  return context;
};

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [editMode, setEditMode] = useState(false);
  const [role, setRole] = useState<'admin' | 'staff' | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [pageContent, setPageContent] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Restore session from localStorage on startup
  useEffect(() => {
    const savedToken = localStorage.getItem('hkd_admin_token');
    const savedRole = localStorage.getItem('hkd_admin_role');
    if (savedToken && savedRole) {
      setToken(savedToken);
      setRole(savedRole as any);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cms/auth/login`, {
        email,
        password
      });
      const { token: jwtToken, user } = response.data;
      
      setToken(jwtToken);
      setRole(user.role);
      localStorage.setItem('hkd_admin_token', jwtToken);
      localStorage.setItem('hkd_admin_role', user.role);
      return true;
    } catch (error) {
      console.error("Sign-in failed:", error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setEditMode(false);
    localStorage.removeItem('hkd_admin_token');
    localStorage.removeItem('hkd_admin_role');
  };

  const fetchPageContent = async (pageId: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cms/pages/${pageId}`);
      setPageContent(prev => ({
        ...prev,
        [pageId]: response.data
      }));
    } catch (error) {
      console.error(`Failed to load visual page sections for ${pageId}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePageField = (pageId: string, section: string, field: string, value: string) => {
    setPageContent(prev => {
      const updatedPage = { ...prev[pageId] };
      if (!updatedPage[section]) {
        updatedPage[section] = {};
      }
      updatedPage[section][field] = value;
      return {
        ...prev,
        [pageId]: updatedPage
      };
    });
  };

  const savePageContent = async (pageId: string): Promise<boolean> => {
    if (!token) return false;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/cms/pages/${pageId}`,
        pageContent[pageId],
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return true;
    } catch (error) {
      console.error(`Failed to save visual CMS page content for ${pageId}:`, error);
      return false;
    }
  };

  return (
    <CmsContext.Provider value={{
      editMode,
      setEditMode,
      role,
      setRole,
      token,
      login,
      logout,
      pageContent,
      fetchPageContent,
      updatePageField,
      savePageContent,
      isLoading
    }}>
      {children}
    </CmsContext.Provider>
  );
};
