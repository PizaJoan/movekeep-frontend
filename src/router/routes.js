
export default [
  // MAIN PAGE OR MANAGING ROUTIINES
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      { path: '', component: () => import('pages/Index') },
      { path: 'routines/:category', component: () => import('pages/RoutineViewer') },
      { path: 'my-routines', component: () => import('pages/RoutineManager'), meta: { requiresAuth: true} }
    ],
  },

  // LOGIN OR CREATE ACCOUNT
  {
    path: '/',
    component: () => import('layouts/SecondaryLayout'),
    children: [
      { path: 'login', component: () => import('pages/Login') },
      { path: 'create', component: () => import('pages/CreateAccount') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404'),
  },
];
