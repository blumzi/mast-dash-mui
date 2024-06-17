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

const safety = {
  id: 'safety',
  title: 'Safety',
  type: 'group',
  children: [
    {
      id: 'safety-data',
      title: 'Data',
      type: 'item',
      url: '/safety-data',
      icon: icons.FontSizeOutlined
    },
    {
      id: 'safety-graphs',
      title: 'Graphs',
      type: 'item',
      url: '/safety-graphs',
      icon: icons.BgColorsOutlined
    }
    // {
    //   id: 'util-shadow',
    //   title: 'Shadow',
    //   type: 'item',
    //   url: '/shadow',
    //   icon: icons.BarcodeOutlined
    // }
  ]
};

export default safety;
