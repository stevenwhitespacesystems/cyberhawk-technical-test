import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
    loader: async () => {
        throw redirect({
            to: "/login",
            search: true,
            hash: true,
        });
    },
});

function Index() {
    return null;
}
