import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

export default defineConfig({
    plugins: [
        monkey({
            userscript: {
                name: 'Deny Cookies',
                namespace: "https://kfragkoulis.com/DenyCookies",
                version: '1.0.0',
                description: 'Deny cookie popups',
                match: ['*://*/*'],
                icon: 'example.com',
                grant: 'none',
                author: 'Konstantinos Fragkoulis',
            },
            entry: 'src/main.ts',
        }),
    ],
})