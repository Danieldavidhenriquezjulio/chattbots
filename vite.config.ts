import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    base: '/chattbots/',
    plugins: [
        react(),
        tailwindcss(),

    ],
    server: {
        allowedHosts: [
            'read-jose-automotive-contain.trycloudflare.com',
            'localhost',
            '.trycloudflare.com' // Permitir todos los subdominios de cloudflare
        ]
    }


})
