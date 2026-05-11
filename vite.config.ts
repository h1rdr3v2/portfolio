import { defineConfig } from "vite"
import { nitro } from "nitro/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		tsConfigPaths(),
		tanstackStart({
			srcDirectory: "src",
			router: {
				routesDirectory: "app",
			},
		}),
		nitro(),
		viteReact(),
	],
	nitro: {},
})
