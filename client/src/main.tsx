import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Loader from './components/Loader/Loder.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.scss'
import { ToastContainer } from 'react-toastify';

const App = lazy(() => import('./App.tsx'));

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <App />
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  </QueryClientProvider>,
)
