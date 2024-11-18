import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserState {
    created_at: string;
    email: string;
    email_verified_at: string | null;
    id: number;
    name: string;
    updated_at: string;
}

interface AuthStore {
    token: string | null;
    user: UserState | null;
    setAuth: (token: string, user: UserState) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            setAuth: (token, user) => set({ token, user }),
            clearAuth: () => set({ token: null, user: null }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                token: state.token,
                user: state.user,
            }),
        }
    )
);
