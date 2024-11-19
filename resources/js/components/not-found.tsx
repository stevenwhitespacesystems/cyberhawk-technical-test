import { Link } from "@tanstack/react-router";

function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-xl text-gray-500">
                Sorry, the page you are looking for does not exist.
            </p>
            <p className="text-sm text-gray-500 mt-6">
                {"Navigate back to our "}
                <Link href="/login" className="text-blue-500 hover:underline">
                    Login
                </Link>
                .
            </p>
        </main>
    );
}

export default NotFound;
