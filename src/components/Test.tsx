import React from "react";
import Select, { OptionProps } from "react-select";
import icon from "../assets/low.svg";
import { Priority } from "../Types";

// interface OptionTypeIcon {
//   id: string;
//   name: string;
//   icon: string;
// }

interface OptionTypeAvatar {
  id: string;
  name: string;
  avatar: string;
}

const customOptions1: Priority[] = [
  { id: 1, name: "Coffee", icon },
  { id: 2, name: "Apple", icon },
  { id: 3, name: "Beer", icon },
];

const customOptions2: OptionTypeAvatar[] = [
  { id: "4", name: "Tea", avatar: icon },
  { id: "5", name: "Orange", avatar: icon },
  { id: "6", name: "Wine", avatar: icon },
];

const customOptions3: OptionTypeAvatar[] = [
  { id: "7", name: "Milk", avatar: icon },
  { id: "8", name: "Banana", avatar: icon },
  { id: "9", name: "Soda", avatar: icon },
];

// Custom Option component for icon-based select
const CustomOptionIcon = ({ data, innerRef, innerProps }: OptionProps<Priority, false>) => {
  return (
    <div ref={innerRef} {...innerProps} className="custom-option" style={{cursor:"pointer"}}>
      <img src={data.icon} alt="" style={{ marginRight: "10px", width: "16px", height: "16px" }} />
      <span>{data.name}</span>
    </div>
  );
};

// Custom Option component for avatar-based selects
const CustomOptionAvatar = ({ data, innerRef, innerProps }: OptionProps<OptionTypeAvatar, false>) => {
  return (
    <div ref={innerRef} {...innerProps} className="custom-option">
      <img src={data.avatar} alt="" style={{ marginRight: "10px", width: "16px", height: "16px" }} />
      <span>{data.name}</span>
    </div>
  );
};

const Test: React.FC = () => {
  // Default values for each select
  const defaultOption1 = customOptions1.find(option => option.id === 2); // Apple
  const defaultOption2 = customOptions2.find(option => option.id === "5"); // Orange
  const defaultOption3 = customOptions3.find(option => option.id === "8"); // Banana
  
  // Common styles for all selects
  const selectStyles = {
    container: (baseStyles: any) => ({
      ...baseStyles,
      width: '260px',
      marginBottom: '16px', // Add some spacing between selects
    }),
    indicatorSeparator: (baseStyles: any) => ({
      ...baseStyles,
      display: 'none' // Hide the vertical line
    }),
  };

  return (
    <div>
      {/* First Select (with icon) */}
      <label htmlFor="">პრიორიტეტი</label>
      <Select<Priority>
        options={customOptions1}
        defaultValue={defaultOption1}
        getOptionValue={(option: Priority) => String(option.id)} // Convert number to string
        getOptionLabel={(option: Priority) => option.name}
        formatOptionLabel={(option: Priority) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={option.icon} alt="" style={{ marginRight: "10px", width: "16px", height: "16px" }} />
            {option.name}
          </div>
        )}
        styles={selectStyles}
        components={{ Option: CustomOptionIcon }}
      />

      {/* Second Select (with avatar) */}
      <Select<OptionTypeAvatar>
        options={customOptions2}
        defaultValue={defaultOption2}
        getOptionValue={(option: OptionTypeAvatar) => option.id}
        getOptionLabel={(option: OptionTypeAvatar) => option.name}
        formatOptionLabel={(option: OptionTypeAvatar) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={option.avatar} alt="" style={{ marginRight: "10px", width: "16px", height: "16px" }} />
            {option.name}
          </div>
        )}
        styles={selectStyles}
        components={{ Option: CustomOptionAvatar }}
      />

      {/* Third Select (with avatar) */}
      <Select<OptionTypeAvatar>
        options={customOptions3}
        defaultValue={defaultOption3}
        getOptionValue={(option: OptionTypeAvatar) => option.id}
        getOptionLabel={(option: OptionTypeAvatar) => option.name}
        formatOptionLabel={(option: OptionTypeAvatar) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={option.avatar} alt="" style={{ marginRight: "10px", width: "16px", height: "16px" }} />
            {option.name}
          </div>
        )}
        styles={selectStyles}
        components={{ Option: CustomOptionAvatar }}
      />
    </div>
  );
};

export default Test;