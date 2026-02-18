import type { SellFormData } from '../../../types/home';

type CheckList = SellFormData['checkList'];

export const conditionSections: {
  [K in keyof CheckList]: {
    icon: string;
    title: string;
    label: string;
    items: {
      key: keyof CheckList[K];
      label: string;
    }[];
  };
} = {
  exterior: {
    label: 'sell.form.conditionCheckList.exteriorLabel',
    icon: 'photo_camera',
    title: 'sell.form.conditionCheckList.exterior.title',
    items: [
      { key: 'bodyPanels', label: 'sell.form.conditionCheckList.exterior.bodyPanels' },
      { key: 'glassMirrors', label: 'sell.form.conditionCheckList.exterior.glassMirrors' },
      { key: 'lightsSignals', label: 'sell.form.conditionCheckList.exterior.lightsSignals' },
    ],
  },

  engine: {
    label: 'sell.form.conditionCheckList.engineLabel',
    icon: 'precision_manufacturing',
    title: 'sell.form.conditionCheckList.engine.title',
    items: [
      { key: 'engineBlock', label: 'sell.form.conditionCheckList.engine.engineBlock' },
      { key: 'transmission', label: 'sell.form.conditionCheckList.engine.transmission' },
    ],
  },

  hydraulics: {
    label: 'sell.form.conditionCheckList.hydraulicsLabel',
    icon: 'plumbing',
    title: 'sell.form.conditionCheckList.hydraulics.title',
    items: [
      { key: 'hydraulicPump', label: 'sell.form.conditionCheckList.hydraulics.hydraulicPump' },
      { key: 'cylinders', label: 'sell.form.conditionCheckList.hydraulics.cylinders' },
    ],
  },

  underCarriage: {
    label: 'sell.form.conditionCheckList.underCarriageLabel',
    icon: 'directions_car',
    title: 'sell.form.conditionCheckList.underCarriage.title',
    items: [
      { key: 'tracksWheels', label: 'sell.form.conditionCheckList.underCarriage.tracksWheels' },
      { key: 'suspension', label: 'sell.form.conditionCheckList.underCarriage.suspension' },
    ],
  },

  functionalTest: {
    label: 'sell.form.conditionCheckList.functionalTestLabel',
    icon: 'play_circle',
    title: 'sell.form.conditionCheckList.functionalTest.title',
    items: [
      { key: 'engineStart', label: 'sell.form.conditionCheckList.functionalTest.engineStart' },
      { key: 'operationTest', label: 'sell.form.conditionCheckList.functionalTest.operationTest' },
    ],
  },
};
