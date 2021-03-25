export default function () {
  return [
    {
      title: 'Dashboard',
      to: {
        name: 'admin-dashboard',
      },
      htmlBefore: '<i class="material-icons">view_module</i>',
      htmlAfter: '',
    },
    {
      title: 'Users',
      htmlBefore: '<i class="material-icons">person</i>',
      to: {
        name: 'users',
      },
    },
    {
      title: 'Budget Settings',
      htmlBefore: '<i class="material-icons">settings</i>',
      to: {
        name: 'budget-settings',
      },
    },
    {
      title: 'Divisions Setup',
      htmlBefore: '<i class="material-icons">format_align_justify</i>',
      to: {
        name: 'divisions',
      },
    },
    {
      title: 'Departments',
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: {
        name: 'departments',
      },
    },
    {
      title: 'Units',
      htmlBefore: '<i class="material-icons">ballot</i>',
      to: {
        name: 'unit',
      },
    },
    {
      title: 'Budget Reports',
      htmlBefore: '<i class="material-icons">emoji_people</i>',
      to: {
        name: 'budget-reports',
      },
    },
    {
      title: 'Activity Logs',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: {
        name: 'activity-logs',
      },
    },
  ];
}
