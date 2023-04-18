import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { PublicLayout } from "../layouts/PublicLayout";

import { AboutPage } from "../features/about/AboutPage";
import { ClassesPage } from "../features/classes/ClassesPage";
import { PremiumClassesPage } from "../features/classes/PremiumClassesPage";
import { SchedulePage } from "../features/schedule/SchedulePage";
import { ErrorPage } from "../components/ErrorPage";
import { AuthRouter } from "../features/auth/routes/AuthRouter";
import { AuthRoutes } from "../features/auth/routes/AuthRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProfile } from "../features/user/UserProfile";
import { UserClassesTable } from "../features/user/UserClasses/UserClassesTable";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { Loader } from "../components/Loader";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminLayout } from "../layouts/AdminLayout";

import { AdminAboutUsPage } from "../features/admin/pages/AdminAboutUsPage";
import { AdminUsersPage } from "../features/admin/pages/AdminUsersPage";
import { AdminCategoriesPage } from "../features/admin/pages/AdminCategoriesPage";
import { AdminInstructorsPage } from "../features/admin/pages/AdminInstructorsPage";
import { AdminClassesPage } from "../features/admin/pages/AdminClassesPage";
import { SpecificClassPage } from "../features/classes/SpecificClassPage";
// import { userRoles } from './constants'

// se puede usar loader con react-router +6.4 :)

const userRoles = {
  guest: "guest",
  user: "user",
  admin: "admin",
};

export const AppRouter = () => {
  const { status } = useCheckAuth();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <AboutPage />,
        },
        {
          path: "/classes",
          element: <ClassesPage />,
        },
        {
          path: "/premiumclasses",
          element: <PremiumClassesPage />,
        },
        {
          path: "/class",
          element: <SpecificClassPage />,
        },
        {
          path: "/schedule",
          element: <SchedulePage />,
        },
        // TODO: protected route for ['guest', 'user', 'admin']
        {
          path: "/auth/*",
          element: (
            <ProtectedRoute expectedRoles={[userRoles.guest]}>
              <AuthRouter />
            </ProtectedRoute>
          ),
          children: AuthRoutes,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute expectedRoles={[userRoles.user, userRoles.admin]}>
              <UserProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/userclasses",
          element: (
            <ProtectedRoute expectedRoles={[userRoles.user, userRoles.admin]}>
              <UserClassesTable/>
            </ProtectedRoute>
          ),
        },
      ],
    },

    {
      path: "/admin",
      errorElement: <ErrorPage />,
      element: (
        <ProtectedRoute expectedRoles={[userRoles.admin]}>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { 
          index: true,
          element: <AdminAboutUsPage/>,
        }, 
        {
          path: "/admin/users",
          element: <AdminUsersPage />,
        },
        {
          path: "/admin/yoga-categories",
          element: <AdminCategoriesPage />,
        },
        {
          path: "/admin/instructors",
          element: <AdminInstructorsPage />,
        },
        {
          path: "/admin/classes",
          element: <AdminClassesPage />,
        },
        {
          path: "/admin/*",
          element: <Navigate to={'/admin'}/>,
        },
      ],
    },
    {
      path: '/*', 
      element: <Navigate to={'/'}/>
    }


  ]);

  if (status === "checking") return <Loader />;

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
};
