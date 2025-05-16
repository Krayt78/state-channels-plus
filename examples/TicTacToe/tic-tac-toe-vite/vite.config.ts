import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        sourcemap: true
    },
    resolve: {
        alias: {
            // This tells Vite that when it encounters an import path starting with '@/',
            // it should interpret '@/' as pointing to the 'dist/src' directory
            // within the '@peer3/state-channels-plus' dependency.
            "@": path.resolve(
                __dirname, // Current directory (examples/TicTacToe/tic-tac-toe-vite)
                "node_modules/@peer3/state-channels-plus/dist/src"
            )
        }
    }
});
