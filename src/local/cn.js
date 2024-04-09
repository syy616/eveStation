import {
  menus_cn as menus,
  topTitle_cn as topTitle,
  allStation_cn as allStation,
  stationType_cn as stationType,
  stationData_cn as stationData,
} from "./module/index";

// 导入登录页中文翻译
import { login_cn as login } from "./module/login";
// 导入电站页中文翻译
import { station_cn as station } from "./module/station/station";
// 导入电站页-系统模块中文翻译
import { system_cn as system } from "./module/station/system";
// 导入电站页-收益模块中文翻译
import { income_cn as income } from "./module/station/income";
// 导入电站页-能耗模块中文翻译
import { energy_cn as energy } from "./module/station/energy";
// 导入电站页-能耗模块中文翻译
import { equipment_cn as equipment } from "./module/station/equipment";
// 导入事件也英文翻译
import { event_cn as event } from "./module/event/event";
import { systemPage_cn as systemPage } from "./module/system/systemPage";

export default {
  menus,
  topTitle,
  allStation,
  stationType,
  stationData,
  login,
  station,
  system,
  systemPage,
  income,
  energy,
  equipment,
  event,
};
