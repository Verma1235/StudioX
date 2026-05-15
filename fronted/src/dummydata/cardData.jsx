const cardData = [
  {
    name: "Users",
    icon: "users",
    iconClr: "purple",
    iconBg: "pink",
    text: "Active acc.",
    data: { total: 45, active: 25, percentage: `${(25 * 100) / 45}` },
  },
  {
    name: "Dashboard",
    icon: "dashboard",
    iconClr: "blue",
    iconBg: "#a6eefda6",
    data: { total: 45, active: 25, percentage: `${(45 * 100) / 45}` },
  },
  {
    name: "Bookings",
    icon: "ticket",
    iconClr: "blue",
    iconBg: "#a6eefda6",
    text: "completed",
    data: { total: 45, active: 25, percentage: `${(4 * 100) / 45}` },
  },
  {
    name: "Blocked Users",
    icon: "blocked",
    iconClr: "red",
    iconBg: "#a6eefda6",
    text: "completed",
    data: { total: 45, active: 25, percentage: `${(25 * 100) / 45}` },
  }, {
    name: "Inactive",
    icon: "blocked",
    iconClr: "purple",
    iconBg: "#a6eefda6",
    text: "deleted",
    data: { total: 90, active: 25, percentage: `${(70 * 100) / 90}` },
  },
  {
    name: "basant",
    icon: "blocked",
    iconClr: "red",
    iconBg: "#a6eefda6",
    text: "deleted",
    data: { total: 70, active: 25, percentage: `${(70 * 100) / 90}` },
  },

];

// const temp = [
//   {
//     name: "Bookings",
//     icon: "ticket",
//     iconClr: "blue",
//     iconBg: "#a6eefda6",
//     text: "completed",
//     data: { total: 45, active: 25, percentage: `${(45 * 100) / 45}` },
//   },
//   {
//     name: "Blocked-Users",
//     icon: "blocked",
//     iconClr: "red",
//     iconBg: "#a6eefda6",
//     text: "completed",
//     data: { total: 45, active: 25, percentage: `${(45 * 100) / 45}` },
//   },
// ];
export { cardData };
