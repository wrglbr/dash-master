import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Auth/Login.vue'),
    },
    {
      path: '/confirm-email',
      name: 'confirm-email',
      component: () => import('../views/Auth/confirmEmail.vue'),
    },
    {
      path: '/reset-password/:slug',
      name: 'reset-password',
      component: () => import('../views/Auth/resetPassword.vue'),
    },
    {
      path: '/email-success/:slug',
      name: 'email-success',
      component: () => import('../views/Auth/confirmToken.vue'),
    },
    // {
    //   path: '/department',
    //   name: 'department',
    //   component: () => import('../views/Budget/Department.vue'),
    //   meta: {
    //     requiresAuth: true,
    //   },
    // },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/Admin/AdminDashboard.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/unit-budget/:unit_id',
      name: 'unitBudget-details',
      component: () => import('../views/Budget/unitBudget.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/errors',
      name: 'errors',
      component: () => import('../views/Errors.vue'),
    },
    {
      path: '/unit-budgets',
      name: 'unit-budgets',
      component: () => import('../views/Budget/budgets.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/budget-dashboard',
      name: 'budget-dashboard',
      component: () => import('../views/Budget/Dashboard.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/budget-reports',
      name: 'budget-reports',
      component: () => import('../views/Budget/reports.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/report-details/:slug',
      name: 'report-details',
      component: () => import('../views/Budget/report_details.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/Admin/usersPage.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: () => import('../views/Admin/createUsers.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/update-user/:userId',
      name: 'update-user',
      component: () => import('../views/Admin/userUpdate.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/departments',
      name: 'departments',
      component: () => import('../views/Admin/Departments.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/divisions',
      name: 'divisions',
      component: () => import('../views/Admin/Divisions.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/salary-scale',
      name: 'salary-scale',
      component: () => import('../views/Budget/salary_scale.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/unit',
      name: 'unit',
      component: () => import('../views/Admin/Unit.vue'),
    },
    {
      path: '/budget-periods',
      name: 'budget-periods',
      component: () => import('../views/Budget/budget_periods.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/period/:period_id',
      name: 'period-details',
      component: () => import('../views/Budget/Details.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/new-budget-period',
      name: 'new-budget-period',
      component: () => import('../views/Budget/AddNewBudget.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/budget-settings',
      name: 'budget-settings',
      component: () => import('../views/Admin/BudgetSettings.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/activity-logs',
      name: 'activity-logs',
      component: () => import('../views/Admin/Logs.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/requisitions',
      name: 'requisitions',
      component: () => import('../views/Budget/item_requests.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/implementations',
      name: 'implementations',
      component: () => import('../views/Budget/implements.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/requisitions',
      name: 'admin-requisitions',
      component: () => import('../views/Admin/Requisition.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/budget-divisions',
      name: 'budget-divisions',
      component: () => import('../views/Budget/budget_divisions.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/budget_summary/:period_id',
      name: 'budget_summary',
      component: () => import('../views/Budget/budget_summary.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin-budget_summary/:period_id',
      name: 'admin-budget_summary',
      component: () => import('../components/Admin/budget_summary.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/implement-details/:budget_id',
      name: 'implement-details',
      component: () => import('../views/Budget/implement_details.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/department-budget-summary/:period_id/:depart_id',
      name: 'department-budget-summary',
      component: () => import('../views/Budget/department_summary.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin-department-budget-summary/:period_id/:depart_id',
      name: 'admin-department-budget-summary',
      component: () => import('../components/Admin/department_summary.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/division-budget-summary/:period_id/:div_id',
      name: 'division-budget-summary',
      component: () => import('../views/Budget/division_summary.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin-division-budget-summary/:period_id/:div_id',
      name: 'admin-division-budget-summary',
      component: () => import('../components/Admin/division_summary.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/department-detail/:depart_id',
      name: 'department-detail',
      component: () => import('../views/Admin/DepartmentDetail.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/unit-detail/unit_id',
      name: 'unit-detail',
      component: () => import('../views/Admin/unitDetailPage.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: () => import('../views/UserProfile.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '*',
      redirect: '/errors',
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    if (localStorage.getItem('auth')) {
      next('/home');
    }
  }


  if (to.meta.requiresAuth) {
    if (!localStorage.getItem('auth')) {
      next('/login');
    }
  }

  next();
});
export default router;
