import MainLayout from "../layout/MainLayout";

const router = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Not found</div>,
    children: [
      {
        path: "/inicio",
        element: <h1>asdfasd</h1>,
      },
    ],
  },
];

export { router };
