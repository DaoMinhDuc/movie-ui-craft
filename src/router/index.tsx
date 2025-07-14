import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Import pages
const Index = lazy(() => import('@/pages/Index'));
const MovieDetail = lazy(() => import('@/pages/MovieDetail'));
const WatchMovie = lazy(() => import('@/pages/WatchMovie'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Loader2 className="h-10 w-10 animate-spin text-primary" />
  </div>
);

// Create routes
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Index />
      </Suspense>
    ),
  },
  {
    path: '/movie/:id',
    element: (
      <Suspense fallback={<PageLoader />}>
        <MovieDetail />
      </Suspense>
    ),
  },
  {
    path: '/watch/:id/:episode',
    element: (
      <Suspense fallback={<PageLoader />}>
        <WatchMovie />
      </Suspense>
    ),
  },
  {
    path: '/category/:category',
    element: (
      <Suspense fallback={<PageLoader />}>
        <CategoryPage />
      </Suspense>
    ),
  },
  {
    path: '/search',
    element: (
      <Suspense fallback={<PageLoader />}>
        <SearchPage />
      </Suspense>
    ),
  },
  {
    path: '/auth',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AuthPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
