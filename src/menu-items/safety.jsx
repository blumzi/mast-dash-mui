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
      title: 'Weather graphs',
      type: 'item',
      url: 'http://10.23.1.25:3000/d/dk8DxsWVz/neot-smadar-weather?orgId=1&refresh=10s',
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
