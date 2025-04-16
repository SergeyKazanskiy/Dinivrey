import { SystemStyleObject } from "@chakra-ui/react";


export const profileStyles: { [key: string]: any } = {
  title: { color: "#444444", fontSize: "18px", fontWeight: "semibold"},
  background: {backgroundColor: "#ECF2C8",opacity: 0.7},
  button: { backgroundColor: "#4CAF50", color: "white",_hover: {backgroundColor: "#45a049",},},
};

export const widgetStyles: { [key: string]: any } = {
  title: { color: "#DB3939", fontSize: "18px", fontWeight: "semibold"},
  text: { color: "#5694F2", fontSize: "14px", fontWeight: "semibold"},
  value: { color: "#F29F56", fontSize: "14px", fontWeight: "semibold"},
  score: { color: "green", fontSize: "13px", fontWeight: "semibold"},
  alert: { color: "#444444", fontSize: "16px", fontWeight: "semibold"},
  selected: { borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1, borderRadius: "8px"},
};

export const screenStyles: { [key: string]: any } = {
  widget: { color: "#DB3939", fontSize: "20px", fontWeight: "medium",
    backgroundColor: "#FFFFFF", borderRadius: "10px" },
  tab: { color: "#555555", fontSize: "18px", fontWeight: "bold" },
};

export const sidebarStyles: { [key: string]: any } = {
  title: { color: "#F29F56", fontSize: "44px", fontWeight: "bold" },
  link: { color: "#555555", fontSize: "18px", fontWeight: "medium" },
    linkHover: {backgroundColor: "rgb(146, 230, 244)" },
    linkFocus: { backgroundColor: "rgb(115, 226, 246)" },
    linkActive: { backgroundColor: "rgb(115, 226, 246)", color: "white" },
  group: { color: "#DB3939", fontSize: "18px", fontWeight: "bold" },
};
