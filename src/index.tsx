import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App';
import { queryClient } from "./client"
import "./styles.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  </QueryClientProvider>
);
