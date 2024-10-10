import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout"
import Error from './components/pages/error-page'
import { Login } from "./components/pages/login"
import './App.css'
import { SetupInterceptors } from "./interceptors"
import { Users } from "./components/pages/users"


function App() {
  SetupInterceptors();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Users />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/categories/create" element={
            <AdminProtectedRoute children={<CategoryCreation />} />} />
          <Route path="/categories" element={
            <AdminProtectedRoute children={<CategoryTable />} />} />
          <Route path="/products" element={
            <AdminProtectedRoute children={<ProductTable />} />} />
          <Route path="/products/create" element={
            <AdminProtectedRoute children={<ProductCreate />} />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          
          <Route path="/registration" element={<Registration />} /> */}
          <Route path="*" element={
            <Error
              status="404"
              title="404"
              subTitle="Вибачте, сторінкт на яку ви намагаєтесь перейти не існує."
            />} />
          <Route path="forbiden" element={
            <Error
              status="403"
              title="403"
              subTitle="В доступі відмовлено.Ви не маєте дозволу для доступу до цієї сторінки."
            />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
