export const conditionSections = {
  exterior: {
    label: "EXTERIOR",
    icon: "photo_camera",
    title: "Exterior Condition",
    items: [
      { key: "bodyPanels", label: "Body Panels" },
      { key: "glassMirrors", label: "Glass & Mirrors" },
      { key: "lightsSignals", label: "Lights & Signals" },
    ],
  },

  engine: {
    label: "ENGINE",
    icon: "precision_manufacturing",
    title: "Engine Condition",
    items: [
      { key: "engineBlock", label: "Engine Block" },
      { key: "transmission", label: "Transmission" },
    ],
  },

  hydraulics: {
    label: "HYDRAULICS",
    icon: "plumbing",
    title: "Hydraulics Condition",
    items: [
      { key: "hydraulicPump", label: "Hydraulic Pump" },
      { key: "cylinders", label: "Cylinders" },
    ],
  },

  underCarriage: {
    label: "UNDERCARRIAGE",
    icon: "directions_car",
    title: "Undercarriage Condition",
    items: [
      { key: "tracksWheels", label: "Tracks/Wheels" },
      { key: "suspension", label: "Suspension" },
    ],
  },

  functionalTest:{
    label:"FUNCTIONALTEST",
    icon:"play_circle",
    title:"Functional Test Condition",
    items:[
      {key:"engineStart", label:"Engine Start"},
      {key:"operationTest", label:"Operation Test"},
    ]
  }
};
