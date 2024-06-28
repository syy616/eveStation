//导入登录英文翻译
import { login_en as login } from "./module/login";
// 导入电站页英文翻译
import { station_en as station } from "./module/station/station";
// 导入电站页-系统模块英文翻译
import { system_en as system } from "./module/station/system";
// 导入电站页-收益模块英文翻译
import { income_en as income } from "./module/station/income";
// 导入电站页-能耗模块英文翻译
import { energy_en as energy } from "./module/station/energy";
// 导入电站页-能耗模块英文翻译
import { equipment_en as equipment } from "./module/station/equipment";
// 导入事件也英文翻译
import { event_en as event } from "./module/event/event";
import { history_en as history } from "./module/history/history";
import { mine_en as mine } from "./module/mine/mine";

import {
  menus_en as menus,
  topTitle_en as topTitle,
  allStation_en as allStation,
  stationType_en as stationType,
  stationData_en as stationData,
} from "./module/index";
import { systemPage_en as systemPage } from "./module/system/systemPage";

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
  history,
  mine,
};
