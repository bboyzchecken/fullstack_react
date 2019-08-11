export default {
  items: [
    {
      title: true,
      name: 'เมนูหลัก',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'จัดการสมาชิก',
      url: '/dashboard',
      icon: 'icon-user',
    },
    {
      name: 'เพิ่มสมาชิก',
      url: '/add_user',
      icon: 'icon-plus',
    },
  ],
};
