export const navmenus = [
  {
    label: "Home",
    icon: "streamline-flex:home-2-solid",
    path: "/",
  },
  {
    label: "Create Token",
    icon: "icon-park-solid:add-one",
    path: "/create-token",
  },
  {
    label: "Open App",
    icon: "fluent:app-generic-24-filled",
    path: "/usr",
  },
]
export const sidemenus = [
  {
    label: "Main",
    path: "#",
    children: [
      {
        label: 'Dashboard',
        icon: 'material-symbols:bar-chart-rounded',
        path:'/usr'
      }
    ]
  },
  {
    label: "Projects",
    path: "#",
    children: [
      {
        label:'My Projects',
        icon:'hugeicons:blockchain-03',
        path:'/usr/project'
      },
      {
        label:'Create Project',
        icon:'hugeicons:blockchain-02',
        path:'/usr/project/create'
      },
    ]
  },
  {
    label: "Market",
    path: "#",
    children: [
      {
        label:'Token',
        icon:'fa-solid:coins',
        path:'/usr/tokens'
      },
      {
        label:'Presale',
        icon:'icons8:buy',
        path:'/usr/presale'
      },
    ]
  },
  {
    label: "Profile",
    path: "#",
    children: [
      {
        label:'Account',
        icon:'la:user-tag',
        path:'/usr/me'
      },
    ]
  },
]