// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, // Mock process.env
  },
});



// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//     include: ['@web3modal/wagmi/react', 'wagmi', 'viem'],
//   },
//   resolve: {
//     alias: {
//       '@': '/src',
//     },
//   },
//   build: {
//     commonjsOptions: {
//       include: [/node_modules/],
//     },
//   },
// });
