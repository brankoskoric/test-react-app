import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import keycloak from "./auth/Keycloak.tsx";
import React from "react";
import {ReactKeycloakProvider} from "@react-keycloak/web";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 2 * 1000 * 60, // 2 minutes
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReactKeycloakProvider authClient={keycloak} initOptions={{responseMode: 'query'}}>
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </React.StrictMode>
    </ReactKeycloakProvider>
)
