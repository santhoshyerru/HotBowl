import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
            <p className="text-xl text-gray-600">Page not found!</p>
            <h3 className="text-2xl text-gray-800">{error.status}</h3>
        </div>
    );
}

export default Error;