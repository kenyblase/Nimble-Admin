import { useState } from "react";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    receiveSystemNotification: true,
    showNotificationBanner: false,
    messageSound: true,
    pushNotificationSound: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="text-sm text-gray-800">
      {/* System Notification */}
      <h2 className="font-semibold text-2xl text-[#2E2E2E] mb-2">System Notification</h2>
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xl text-[#666666]">Receive system notification</span>
        <Toggle
          enabled={settings.receiveSystemNotification}
          onClick={() => toggleSetting("receiveSystemNotification")}
        />
      </div>
      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold text-xl text-[#666666]">Show notification banner</span>
        <Toggle
          enabled={settings.showNotificationBanner}
          onClick={() => toggleSetting("showNotificationBanner")}
        />
      </div>

      {/* Notification Sounds */}
      <h2 className="font-semibold text-2xl text-[#2E2E2E] mb-2">Notification sounds</h2>
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-xl text-[#666666]">Message</span>
        <Toggle
          enabled={settings.messageSound}
          onClick={() => toggleSetting("messageSound")}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="font-semibold text-xl text-[#666666]">Push notification</span>
        <Toggle
          enabled={settings.pushNotificationSound}
          onClick={() => toggleSetting("pushNotificationSound")}
        />
      </div>
    </div>
  );
}

function Toggle({ enabled, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-22 h-12 flex items-center rounded-lg p-1 transition-colors duration-200 ${
        enabled ? "bg-[#EBF2FF] border border-[#669AFF]" : "bg-[#F5F5F5] border border-[#EBEBEB]"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-sm shadow-md transform transition-transform duration-200 ${
          enabled ? "bg-[#0057FF] translate-x-10" : "bg-[#BFBFBF] translate-x-0"
        }`}
      />
    </button>
  );
}
