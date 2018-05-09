
export default [
  // MAIN PAGE OR MANAGING ROUTIINES
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      { path: '', component: () => import('pages/Index') },
      { path: 'routines/:category', component: () => import('pages/RoutineViewer') },
      { path: 'my-routines', component: () => import('pages/RoutineManager'), meta: { requiresAuth: true} },
      { path: 'account', component: () => import('pages/Account'), meta: { requiresAuth: true} },
      { path: 'manage-routine', component: () => import('pages/Routine'), meta: { requiresAuth: true } },
      { path: 'manage-routine/:id', component: () => import('pages/Routine'), meta: { requiresAuth: true } },
      { path: 'view-routine/:user/:id', component: () => import('pages/viewRoutine') }
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
