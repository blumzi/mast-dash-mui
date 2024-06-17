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

// ==============================|| MENU ITEMS - Components ||============================== //

const components = {
  id: 'components',
  title: 'Components',
  type: 'group',
  children: [
    {
      id: 'components-units',
      title: 'Units',
      type: 'item',
      url: '/units',
      icon: icons.FontSizeOutlined
    },
    {
      id: 'components-spec',
      title: 'Spectrograph',
      type: 'item',
      url: '/spectrographs',
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

export default components;
