import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
    plugins: [react()],
    base: "/EPDSScreeningTool/", // Must match your GitHub repo name
})
