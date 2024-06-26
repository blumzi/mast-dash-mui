// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import WeatherGraphs from '../components/WeatherGraphs';

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
      id: 'weather-graphs',
      title: 'Graphs',
      type: 'item',
      url: '/weather',
      icon: icons.FontSizeOutlined
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
