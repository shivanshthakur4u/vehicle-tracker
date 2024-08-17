import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import SettingsIcon from "@mui/icons-material/Settings";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { Popup } from "react-leaflet";

const VehicleInfo = ({ info, onConfigButtonClick }) => {
  const iconData = [
    {
      id: 1,
      name: "Key",
      icon: VpnKeyIcon,
    },
    {
      id: 2,
      name: "Battery",
      icon: BatteryFullIcon,
    },
    {
      id: 3,
      name: "ACunit",
      icon: AcUnitIcon,
    },
    {
      id: 4,
      name: "Oil",
      icon: LocalGasStationIcon,
    },
    {
      id: 5,
      name: "Lock",
      icon: LockIcon,
    },
  ];
  return (
    <Popup>
      <div className="font-sans w-64 p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-blue-600">{info.status}</span>
          <div>
            <span className="text-green-600">{info.timestamp}</span>
            <div onClick={onConfigButtonClick} className="cursor-pointer">
              <SettingsIcon className="cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="text-gray-600 text-xs mb-3">{info.address}</div>

        <div className="flex justify-between mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{info.speed.toFixed(2)}</div>
            <div className="text-xs text-gray-600">Speed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{info.distance.toFixed(2)}</div>
            <div className="text-xs text-gray-600">Distance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {info.battery === 100 ? "100%" : `${info.battery.toFixed(2)}%`}
            </div>
            <div className="text-xs text-gray-600">Battery</div>
          </div>
        </div>

        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Total Running</span>
            <span>{info.totalTime}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Stoppage</span>
            <span>{info.idleTime}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Idle</span>
            <span>{info.idleTime}</span>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          {iconData.map((icon) => (
            <div
              key={icon.id}
              className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center"
            >
              <div className="text-red-500 text-center">
                {React.createElement(icon?.icon, {
                  style: { fontSize: "16px" },
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popup>
  );
};

export default VehicleInfo;
