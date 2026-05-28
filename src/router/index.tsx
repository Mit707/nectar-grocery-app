import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { SplashPage } from '../pages/SplashPage'
import { OnboardingPage } from '../pages/auth/OnboardingPage'
import { SignInPage } from '../pages/auth/SignInPage'
import { MobileNumberPage } from '../pages/auth/MobileNumberPage'
import { VerificationPage } from '../pages/auth/VerificationPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { SignUpPage } from '../pages/auth/SignUpPage'
import { SelectLocationPage } from '../pages/auth/SelectLocationPage'
import { HomePage } from '../pages/home/HomePage'
import { ExplorePage } from '../pages/explore/ExplorePage'
import { CategoryPage } from '../pages/category/CategoryPage'
import { SearchPage } from '../pages/search/SearchPage'
import { ProductDetailPage } from '../pages/product/ProductDetailPage'
import { CartPage } from '../pages/cart/CartPage'
import { FavoritesPage } from '../pages/favorites/FavoritesPage'
import { AccountPage } from '../pages/account/AccountPage'
import { OrderSuccessPage } from '../pages/order/OrderSuccessPage'
import { OrderFailedPage } from '../pages/order/OrderFailedPage'

export const router = createBrowserRouter([
  { path: '/', element: <SplashPage /> },
  { path: '/onboarding', element: <OnboardingPage /> },
  {
    path: '/auth',
    children: [
      { index: true, element: <Navigate to="/auth/signin" replace /> },
      { path: 'signin', element: <SignInPage /> },
      { path: 'mobile', element: <MobileNumberPage /> },
      { path: 'verify', element: <VerificationPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'location', element: <SelectLocationPage /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: '/home', element: <HomePage /> },
      { path: '/explore', element: <ExplorePage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/category/:categoryId', element: <CategoryPage /> },
      { path: '/product/:productId', element: <ProductDetailPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/favorites', element: <FavoritesPage /> },
      { path: '/account', element: <AccountPage /> },
    ],
  },
  { path: '/order/success', element: <OrderSuccessPage /> },
  { path: '/order/failed', element: <OrderFailedPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
])
