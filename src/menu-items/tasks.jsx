// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const tasks = {
  id: 'tasks',
  title: 'Tasks',
  type: 'group',
  children: [
    {
      id: 'tasks',
      title: 'Submited',
      type: 'item',
      url: '/tasks',
      icon: icons.FontSizeOutlined
    }
    // {
    //   id: 'safety-graphs',
    //   title: 'Graphs',
    //   type: 'item',
    //   url: '/safety-graphs',
    //   icon: icons.BgColorsOutlined
    // }
    // {
    //   id: 'util-shadow',
    //   title: 'Shadow',
    //   type: 'item',
    //   url: '/shadow',
    //   icon: icons.BarcodeOutlined
    // }
  ]
};

export default tasks;
