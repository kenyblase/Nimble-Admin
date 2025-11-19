import React, { useState } from "react";
import ItemsTab from '../../components/ItemTabs'
import { useGetSetting } from "../../utils/useApis/useSettingsApis/useGetSetting";
import LoadingSpinner from '../../components/LoadingSpinner'
import { useUpdateSetting } from "../../utils/useApis/useSettingsApis/useUpdateSetting";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Payment Methods");

  const tabs = [
    "Payment Methods",
    "Shipping Methods",
    // "Rules and regulations",
    "Admins access control",
    "Notification settings",
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Payment Methods":
        return <PaymentMethods />;
      case "Shipping Methods":
        return <ShippingMethods />;
      // case "Rules and regulations":
      //   return <RulesAndRegulations />;
      case "Admins access control":
        return <AdminsAccessControl />;
      case "Notification settings":
        return <NotificationSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-7 mb-5 flex flex-col gap-7">
      <div className="h-11 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#202224]">Settings</h1>
      </div>

      <div className="flex gap-8 items-start">
        {/* Left Tabs */}
        <div className="flex flex-col gap-1 py-8 w-60 bg-[#FFFFFF] rounded-2xl border border-[#E9F1FF]">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-6 cursor-pointer rounded-md ${
                activeTab === tab
                  ? "bg-[#FE7A36]/10 text-[#FE7A36] font-normal"
                  : "text-[#040C19] font-light hover:bg-[#E9F1FF]/40"
              }`}
            >
              <p className="text-sm whitespace-nowrap">{tab}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-14 p-8 bg-[#FFFFFF] rounded-2xl border border-[#E9F1FF] w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;

const PaymentMethods = () => {
  const { data, isLoading } = useGetSetting('payment_methods')
  const updateSetting = useUpdateSetting("payment_methods");

  const paymentMethods = data?.value || [];

  const toggleMethod = async(method) => {
    const updated = paymentMethods.includes(method)
      ? paymentMethods.filter((m) => m !== method)
      : [...paymentMethods, method];

    await updateSetting.mutateAsync(updated);
  };

  if(isLoading) return  <div className='w-full h-80 flex items-center justify-center'>
                          <div className='w-20 h-20'>
                            <LoadingSpinner size={'size-full'}/>
                          </div>
                        </div>
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-medium text-[#000000]">
        Payment Methods
      </h2>
      
      <div className="flex flex-col gap-4">

        {/* Wallet balance */}
        <div className="flex justify-between py-2">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              value="wallet_balance"
              checked={paymentMethods.includes("wallet_balance")}
              className="accent-[#0085FF] h-3 w-3 cursor-pointer"
              onChange={() => toggleMethod("wallet_balance")}
            />
            <p className="text-xs font-normal text-[#000000CC]">Wallet balance</p>
          </div>
        </div>

        {/* Crypto */}
        <div className="flex justify-between w-[368px] py-2">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              value="crypto"
              checked={paymentMethods.includes("crypto")}
              className="accent-[#0085FF] h-3 w-3 cursor-pointer"
              onChange={() => toggleMethod("crypto")}
            />
            <p className="text-xs font-normal text-[#000000CC]">Crypto currency</p>
          </div>

          {cryptoIconGroup}
        </div>

        {/* Bank transfer */}
        <div className="flex justify-between py-2">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              value="bank_transfer"
              checked={paymentMethods.includes("bank_transfer")}
              className="accent-[#0085FF] h-3 w-3 cursor-pointer"
              onChange={() => toggleMethod("bank_transfer")}
            />
            <p className="text-xs font-normal text-[#000000CC]">Bank transfer</p>
          </div>
        </div>

      </div>
    </div>
  );
};

const ShippingMethods = () => {
  const { data, isLoading } = useGetSetting('shipping_methods')
  const updateSetting = useUpdateSetting("shipping_methods");

  const shippingMethods = data?.value || [];

  const toggleMethod = async(method) => {
    const updated = shippingMethods.includes(method)
      ? shippingMethods.filter((m) => m !== method)
      : [...shippingMethods, method];

    await updateSetting.mutateAsync(updated);
  };

  if(isLoading) return  <div className='w-full h-80 flex items-center justify-center'>
                          <div className='w-20 h-20'>
                            <LoadingSpinner size={'size-full'}/>
                          </div>
                        </div>
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-medium text-[#000000]">
        Shipping Methods
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between py-2">
            <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value="bank_transfer"
                  checked={shippingMethods.includes("pickup")}
                  className="accent-[#0085FF] h-3 w-3 cursor-pointer"
                  onChange={() => toggleMethod("pickup")}
                />

                <p className="text-xs font-normal text-[#000000CC]">Pickup</p>
            </div>
        </div>
        <div className="flex justify-between w-[368px] py-2">
            <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value="bank_transfer"
                  checked={shippingMethods.includes("waybill")}
                  className="accent-[#0085FF] h-3 w-3 cursor-pointer"
                  onChange={() => toggleMethod("waybill")}
                />

                <p className="text-xs font-normal text-[#000000CC]">Waybill</p>
            </div>
        </div>
        <div className="flex justify-between py-2">
            <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value="bank_transfer"
                  checked={shippingMethods.includes("delivery")}
                  className="accent-[#0085FF] h-3 w-3 cursor-pointer"
                  onChange={() => toggleMethod("delivery")}
                />

                <p className="text-xs font-normal text-[#000000CC]">Delivery</p>
            </div>
        </div>
      </div>
    </div>
  );
};

const RulesAndRegulations = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-medium text-[#000000]">
        Rules and Regulations
      </h2>
      <p className="text-sm text-gray-600">
        Define your platform’s legal policies, usage terms, and compliance rules.
      </p>
    </div>
  );
};

const AdminsAccessControl = () => {
  const { data, isLoading } = useGetSetting("admin_roles");
  const updateSetting = useUpdateSetting("admin_roles");

  if (isLoading) return <div className='w-full h-80 flex items-center justify-center'>
                          <div className='w-20 h-20'>
                            <LoadingSpinner size={'size-full'}/>
                          </div>
                        </div>

  const roles = data?.value || [];

  const togglePermission = (roleName, permission) => {
    const updatedRoles = roles.map((role) => {
      if (role.role !== roleName) return role;

      return {
        ...role,
        permissions: role.permissions.includes(permission)
          ? role.permissions.filter((p) => p !== permission)
          : [...role.permissions, permission],
      };
    });

    updateSetting.mutate(updatedRoles);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-medium text-[#000000]">Admin Control</h2>

      <div className="flex gap-8 items-start">
        {roles.map((role) => (
          <div key={role.role} className="flex flex-col gap-4">
            <p className="text-base font-medium text-[#000000]">
              {role.role}
            </p>

            <div className="flex flex-col gap-4">
              {PERMISSIONS.map((permission) => (
                <div
                  key={permission}
                  className="flex gap-2 items-center"
                >
                  <input
                    type="checkbox"
                    className="accent-[#0085FF] h-3 w-3 cursor-pointer"
                    checked={role.permissions.includes(permission)}
                    onChange={() =>
                      togglePermission(role.role, permission)
                    }
                  />
                  <p className="text-xs font-normal text-[#000000CC]">
                    {PERMISSION_LABELS[permission]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  const [itemsActiveTab, setItemsActiveTab] = useState('In-App')
  const currentTab = itemsActiveTab === "In-App" ? "inApp" : "email";
  const { data, isLoading } = useGetSetting("notification_settings");
  const updateSetting = useUpdateSetting("notification_settings");
  const currentSettings = data?.value || {};

  if (isLoading) return <div className='w-full h-80 flex items-center justify-center'>
                          <div className='w-20 h-20'>
                            <LoadingSpinner size={'size-full'}/>
                          </div>
                        </div>


  const itemsTabs = [
    {label: 'In-App'},
    {label: 'Email'}
  ]

  const handleToggle = async(category, field) => {
    const updatedValue = {
      ...currentSettings,
      [currentTab]: {
        ...currentSettings[currentTab],
        [category]: {
          ...currentSettings[currentTab][category],
          [field]: !currentSettings[currentTab][category][field],
        },
      },
    };

    await updateSetting.mutateAsync(updatedValue);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-medium text-[#000000]">
        Notification Settings
      </h2>
      
      <ItemsTab itemsActiveTab={itemsActiveTab} ItemsTabs={itemsTabs} setItemsActiveTab={setItemsActiveTab}/>

      {Object.entries(NOTIFICATION_SECTIONS).map(([sectionName, config]) => (
        <div key={sectionName} className="flex flex-col gap-4 w-full">
          <p className="font-medium text-base text-[#000000]">{sectionName}</p>

          <div className="flex flex-col gap-3">
            {Object.entries(config.items).map(([field, label]) => {
              const checked =
                currentSettings?.[currentTab]?.[config.tabKey]?.[field];

              return (
                <div key={field} className="flex justify-between items-center">
                  <p className="text-[#000000] text-xs font-light">{label}</p>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggle(config.tabKey, field)}
                      className="sr-only peer"
                    />

                    <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#3652AD] transition-all duration-300"></div>
                    <div className="absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const PERMISSIONS = [
  "mediate_chat",
  "message_response",
  "view_listing",
  "listing_approval",
  "view_transactions",
  "payout_approval"
];

const PERMISSION_LABELS = {
  mediate_chat: "Mediate in dispute",
  message_response: "Read and respond to messages",
  view_listing: "View listing",
  listing_approval: "Reject or approve listing",
  view_transactions: "See transactions",
  payout_approval: "Approve payout requests",
};

const NOTIFICATION_SECTIONS = {
  Admin: {
    tabKey: "admin",
    items: {
      messages: "Messages",
      disputes: "Disputes",
      supportRequest: "Support Request",
    },
  },
  User: {
    tabKey: "user",
    items: {
      messages: "Messages",
      transactions: "Transactions",
      listing: "Listing",
    },
  },
  "Security and maintenance": {
    tabKey: "security",
    items: {
      userAccountChanges: "User account changes",
      bugFix: "Error or bug fix",
      maintenance: "System maintenance schedule",
    },
  },
};

const cryptoIconGroup = <svg width="108" height="24" viewBox="0 0 108 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_271_15200)">
<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#26A17B"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4415 13.0373V13.0358C13.359 13.0418 12.9337 13.0673 11.985 13.0673C11.2275 13.0673 10.6942 13.0448 10.5067 13.0358V13.038C7.59073 12.9098 5.41423 12.402 5.41423 11.7945C5.41423 11.1878 7.59073 10.68 10.5067 10.5495V12.5325C10.6972 12.546 11.2432 12.5783 11.9977 12.5783C12.903 12.5783 13.3567 12.5408 13.4415 12.5333V10.551C16.3515 10.6808 18.5227 11.1885 18.5227 11.7945C18.5227 12.402 16.3515 12.9083 13.4415 13.0373ZM13.4415 10.3448V8.57026H17.502V5.86426H6.44623V8.57026H10.5067V10.344C7.20673 10.4955 4.72498 11.1495 4.72498 11.9325C4.72498 12.7155 7.20673 13.3688 10.5067 13.521V19.2075H13.4415V13.5195C16.7362 13.368 19.212 12.7148 19.212 11.9325C19.212 11.1503 16.7362 10.497 13.4415 10.3448Z" fill="white"/>
</g>
<path d="M51.6409 14.9032C50.0381 21.3319 43.5259 25.244 37.0958 23.6411C30.6687 22.0381 26.7559 15.5269 28.3594 9.09853C29.9614 2.66906 36.4733 -1.24379 42.9014 0.359178C49.3312 1.96215 53.2436 8.47454 51.6409 14.9032Z" fill="#F7931A"/>
<path d="M45.2914 10.2913C45.5299 8.69442 44.3142 7.83619 42.6515 7.2634L43.1907 5.10025L41.8734 4.77201L41.3483 6.87823C41.0025 6.79187 40.6471 6.71048 40.2936 6.62985L40.8225 4.50988L39.5064 4.18164L38.9668 6.34403C38.6802 6.27869 38.3989 6.21411 38.126 6.14648L38.1276 6.1396L36.3116 5.68603L35.9611 7.09221C35.9611 7.09221 36.9379 7.31613 36.9177 7.32989C37.4512 7.46286 37.5478 7.81594 37.531 8.09564L36.915 10.5691L36.0536 14.0211C35.9883 14.1831 35.8228 14.4261 35.4502 14.3341C35.4632 14.3532 34.4929 14.0952 34.4929 14.0952L33.8391 15.6027L35.553 16.0299C35.8717 16.1097 36.1843 16.1934 36.4912 16.2721L35.9462 18.4601L37.2616 18.7884L37.8016 16.6237C38.1604 16.7211 38.5093 16.8113 38.8506 16.8958L38.3129 19.0501L39.6298 19.3784L40.1748 17.1946C42.4199 17.6195 44.109 17.4479 44.8187 15.4177C45.3915 13.7827 44.7904 12.8396 43.6092 12.2244C44.4702 12.0261 45.1183 11.4602 45.2914 10.2913ZM42.2827 14.5098C41.8753 16.1449 39.1227 15.2614 38.2296 15.0394L38.9526 12.1411C39.8453 12.3635 42.7073 12.8048 42.2827 14.5098ZM42.6897 10.2676C42.3183 11.7548 40.0269 10.9993 39.2832 10.814L39.9386 8.18544C40.6823 8.37077 43.0764 8.7162 42.6897 10.2676Z" fill="white"/>
<path d="M68 23.9986C74.6274 23.9986 80 18.6266 80 11.9998C80 5.37303 74.6274 0.000976562 68 0.000976562C61.3726 0.000976562 56 5.37303 56 11.9998C56 18.6266 61.3726 23.9986 68 23.9986Z" fill="#627EEA"/>
<path d="M68.3732 3.00098V9.65275L73.9961 12.1651L68.3732 3.00098Z" fill="white" fill-opacity="0.602"/>
<path d="M68.3732 3.00098L62.7495 12.1651L68.3732 9.65275V3.00098Z" fill="white"/>
<path d="M68.3732 16.4757V20.9954L73.9996 13.2119L68.3732 16.4757Z" fill="white" fill-opacity="0.602"/>
<path d="M68.3732 20.9954V16.4749L62.7495 13.2119L68.3732 20.9954Z" fill="white"/>
<path d="M68.3732 15.4286L73.9961 12.1641L68.3732 9.65332V15.4286Z" fill="white" fill-opacity="0.2"/>
<path d="M62.7499 12.165L68.3736 15.4296V9.6543L62.7499 12.165Z" fill="white" fill-opacity="0.602"/>
<path d="M96 0.000976562C102.627 0.000976562 108 5.37301 108 11.9998C108 18.6266 102.627 23.9986 96 23.9986C89.3726 23.9986 84 18.6266 84 11.9998C84 5.37301 89.3726 0.000976562 96 0.000976562Z" fill="#F0B90B"/>
<path d="M92.8949 10.7114L94.7119 8.90038L95.0952 8.51754L96.0031 7.60972L99.0952 10.7114L100.895 8.90038L96.0031 4.00098L91.0952 8.90038L92.8949 10.7114Z" fill="white"/>
<path d="M96.0047 10.1889L94.1974 11.9961L96.0047 13.8032L97.8121 11.9961L96.0047 10.1889Z" fill="white"/>
<path d="M99.0952 13.293L96.0019 16.3855L94.9159 15.2997L94.7161 15.0998L92.8949 13.293L91.0952 15.0929L96.0031 19.9924L100.895 15.0929L99.0952 13.293Z" fill="white"/>
<path d="M89.8069 10.1938L87.9996 12.001L89.8069 13.8081L91.6142 12.001L89.8069 10.1938Z" fill="white"/>
<path d="M102.193 10.1919L100.386 11.999L102.193 13.8062L104 11.999L102.193 10.1919Z" fill="white"/>
<defs>
<clipPath id="clip0_271_15200">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>