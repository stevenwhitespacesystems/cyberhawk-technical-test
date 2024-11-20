import * as React from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthenticatedLayout } from "@/components/layouts/authenticated-layout";
import { useAuthStore } from "@/state/auth-store";
import NotFound from "@/components/not-found";
import axios from "axios";

export const Route = createFileRoute("/_auth")({
    component: AuthenticatedLayout,

    beforeLoad: async ({ location }) => {
        const token = useAuthStore.getState().token;
        if (token) {
            const response = await axios.get("/api/auth/verify", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                useAuthStore.setState({ token, user: response.data.data.user });
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                return;
            }
        }

        throw redirect({
            to: "/login",
            search: {
                redirect: location.href,
            },
        });
    },

    notFoundComponent: NotFound,
});
