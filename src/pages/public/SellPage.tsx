import { TopBanner, Header, Footer } from '../../components/layout';
import type { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';

// Import images
import sellBanner from '../../assets/images/sell-banner.png';
import type { SellFormData } from '../../types/home';
import BasicInfo from '../../components/SellForms/BasicInfoForm';
import Details from '../../components/SellForms/DetailsForm';
import ConditionChecklist from '../../components/SellForms/ConditionCheckListForm';
import { useTranslation } from '../../i18n';
import MediaForm from '../../components/SellForms/MediaForm';

  const dropdownOptions = {
    transmission: [
      { id: 1, value: "Automatic" },
      { id: 2, value: "Manual" },
      { id: 3, value: "Hydrostatic" },
    ],
    engineType: [
      { id: 1, value: "Diesel" },
      { id: 2, value: "Gasoline" },
      { id: 3, value: "Electric" },
      { id: 4, value: "Hybrid" },
    ],
    fuelType: [
      { id: 1, value: "Diesel" },
      { id: 2, value: "Gasoline" },
      { id: 3, value: "Propane" },
    ],
    cabType: [
      { id: 1, value: "Enclosed" },
      { id: 2, value: "Open" },
      { id: 3, value: "ROPS" },
    ],
    suspension:[
      { id: 1, value: "track" },
      { id: 2, value: "wheel" },
      { id: 3, value: "combined" },
    ],
    overAllCondition:[
      {id:1, value:'Excellent'},
      {id:2, value:'Good'},
      {id:3, value:'Fair'},
      {id:4, value:'Poor'},
    ],
    exteriorColor:[
      {id:1, value:'red'},
      {id:1, value:'black'},
      {id:1, value:'other'},
    ],
    yesNo:[
      {id:1,value:'yes'},
      {id:2,value:'no'}
    ],
    coldStartQuality:[
      {id:1, value:'start easily'},
      {id:2, value:'normal'},
      {id:3, value:'difficult'},
      {id:4, value:"won't start"},
    ],
    engineNoise:[
      {id:1, value:'Quiet'},
      {id:2, value:'Normal'},
      {id:3, value:'Loud'},
      {id:4, value:'Very Loud'},
    ]
  };
const SellPage = (): JSX.Element => {
  const {t}=useTranslation();
  const [currentStep,setCurrentStep] = useState<number>(0);
const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<SellFormData>({
  title: '',
  category: '',
  description: '',
   year: '',
  make: '',
  model: '',
  manufacturer: '',
  engineHours:'',
  mileage:'',
  grossPower:'',
  operatingWeight:'',
  tireTrackSize:'',
  suspension:'',
  transmission:'',
  engineType:'',
  fuelType:'',
  cabType:'',
  overallCondition:'',
  exteriorColor:'',
  interiorColor:'',
  batteriesHoldCharge:'',
  jumpStartRequired:'',
  parkingBrakeWorks:'',
  engineCondition:{
    overAllCondition:'',
    oilLevelOk:'',
    anyLeaks:'',
    coolantLevel:'',
    smokeColor:'',
    engineNoise:'',
    coldStartQuality:'',
    checkEngineLight:''
  },
   hydraulics:{
  hydraulicPumpCondition:'',
  cylinderLeaks:'',
  hoseCondition:'',
  hydraulicResponse:'',
  hydraulicsDamage:'',
 },
 cabElectronics:{
  dashboardFunctional:'',
  acHeaterWorking:'',
  displayErrors:'',
  seatCondition:'',
  controlsWorking:'',
  lightsWorking:'',
  sensorsWorking:'',
 },
 checkList:{
   exterior: {
  bodyPanels: "",
  bodyPanelsImages: [],
  glassMirrors: "",
  glassMirrorsImages: [],
  lightsSignals: "",
  lightsSignalsImages: [],
},
engine:{
  engineBlock:"",
  engineBlockImages:[],
  transmission:'',
  transmissionImages:[],
},
hydraulics:{
    hydraulicPump:"",
    hydraulicPumpImages:[],
    cylinders:"",
    cylindersImages:[]
  },
  underCarriage:{
    tracksWheels:"",
    tracksWheelsImages:[],
    suspension:"",
    suspensionImages:[]
  },
  functionalTest:{
    engineStart:"",
    engineStartImages:[],
    operationTest:"",
    operationTestImages:[]
  }
 },
  media:{
  exteriorImages:[],
  engineCompartMentImages:[],
  underCarriageTracksImages:[],
  cabInteiorImages:[],
  otherAttachments:[],
  videos:[],
 }

});

const nextStep = () => {
  if (currentStep < steps.length - 1) {
    setCurrentStep(prev => prev + 1);
     requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
  console.log(formData,'12345')
};

const prevStep = () => {
  if (currentStep > 0) {
    setCurrentStep(prev => prev - 1);
   requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
};

const renderStep = () => {
  switch (currentStep) {
    case 0:
      return (
         
        
        <BasicInfo
          formData={formData}
          setFormData={setFormData}
        />
      );
      case 1:
        return(
          <Details formData={formData}
          handleChange={handleChange}
          options={dropdownOptions}/>
        )
      case 2:
        return(
          <ConditionChecklist formData={formData}
          handleChange={handleChange}/>
        )
      case 3:
        return(
          <MediaForm formData={formData}
          setFormData={setFormData}/>
        )
    
    default:
      return null;
  }
};

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  const keys = name.split(".");

  setFormData(prev => {
    const updated = { ...prev };
    let current: any = updated;

    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;

    return updated;
  });
};



  const steps = [
    { id: 0, icon: 'info', label: t('sell.steps.basicInfo') },
    { id: 1, icon: 'description', label: t('sell.steps.details') },
    { id: 2, icon: 'fact_check', label: t('sell.steps.condition') },
    { id: 3, icon: 'photo_library', label: t('sell.steps.media') },
    { id: 4, icon: 'add_box', label: t('sell.steps.additional') },
    { id: 5, icon: 'payments', label: t('sell.steps.price') },
    { id: 6, icon: 'visibility', label: t('sell.steps.review') },
  ];

 
  return (
    <>
      <TopBanner />
      <Header />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>


      {/* Banner Section */}
      <div className="relative bg-gray-800 h-64 flex items-center justify-center overflow-hidden br-30">
        <img
          alt="Construction background"
          className="absolute inset-0 w-full h-full"
          src={sellBanner}
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white tracking-tight uppercase">
            {t('sell.title')}
          </h1>
          <div className="mt-2 text-primary font-medium text-sm flex items-center justify-center gap-2">
            <span className="text-white">{t('sell.breadCrumbs.home')}</span>
            <span className="material-icons text-xs text-white">
              chevron_right
            </span>
            <span className="text-white">{t('sell.breadCrumbs.sellInventory')}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-black mb-8 uppercase tracking-tight border-b-4 border-primary w-fit pb-2">
            {t('sell.subtitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-dark-gray p-8 rounded-2xl flex items-center gap-6 text-white group hover:translate-y-[-4px] transition-all border-b-4 border-primary">
              <span className="text-7xl font-black text-primary/40 group-hover:text-primary transition-colors">
                1
              </span>
              <p className="font-bold text-lg leading-tight uppercase">
                {t('sell.card.card1')}
              </p>
            </div>
            <div className="bg-dark-gray p-8 rounded-2xl flex items-center gap-6 text-white group hover:translate-y-[-4px] transition-all border-b-4 border-primary">
              <span className="text-7xl font-black text-primary/40 group-hover:text-primary transition-colors">
                2
              </span>
              <p className="font-bold text-lg leading-tight uppercase">
                {t('sell.card.card2')}
              </p>
            </div>
            <div className="bg-dark-gray p-8 rounded-2xl flex items-center gap-6 text-white group hover:translate-y-[-4px] transition-all border-b-4 border-primary">
              <span className="text-7xl font-black text-primary/40 group-hover:text-primary transition-colors">
                3
              </span>
              <p className="font-bold text-lg leading-tight uppercase">
                {t('sell.card.card3')}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px bg-slate-300 dark:bg-slate-700 flex-grow"></div>
            <span className="font-black text-2xl text-slate-400">OR</span>
            <div className="h-px bg-slate-300 dark:bg-slate-700 flex-grow"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="bg-dark-gray p-8 rounded-2xl flex items-center gap-6 text-white group hover:translate-y-[-4px] transition-all border-b-4 border-primary">
              <span className="text-7xl font-black text-primary/40 group-hover:text-primary transition-colors">
                1
              </span>
              <p className="font-bold text-lg leading-tight uppercase">
                {t('sell.card.card1OR')}
              </p>
            </div>
            <div className="bg-dark-gray p-8 rounded-2xl flex items-center gap-6 text-white group hover:translate-y-[-4px] transition-all border-b-4 border-primary">
              <span className="text-7xl font-black text-primary/40 group-hover:text-primary transition-colors">
                2
              </span>
              <p className="font-bold text-lg leading-tight uppercase">
                {t('sell.card.card2OR')}
              </p>
            </div>
            <div className="bg-dark-gray p-8 rounded-2xl flex items-center gap-6 text-white group hover:translate-y-[-4px] transition-all border-b-4 border-primary">
              <span className="text-7xl font-black text-primary/40 group-hover:text-primary transition-colors">
                3
              </span>
              <p className="font-bold text-lg leading-tight uppercase">
                {t('sell.card.card3OR')}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-black uppercase tracking-tight">
              {t('sell.getStarted')}
            </h2>
            <p className="text-slate-500 mt-2">
              {t('sell.completeForm')}{' '}
              <span className="text-primary font-bold">860-222-3393</span>
            </p>
          </div>

          <div
          ref={formRef}
           className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            {/* Progress Stepper */}
            <div className="bg-[#DE9A4F33] dark:bg-slate-900/50 p-8 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mx-auto">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          index <= currentStep
                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                        }`}
                      >
                        <i className="material-icons">{step.icon}</i>
                      </div>
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          index === currentStep
                            ? 'text-primary'
                            : 'text-slate-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex items-center px-6">
                        <div
                          className={`w-10 h-[2px] ${index < currentStep
                              ? 'bg-primary'
                              : 'bg-slate-400 dark:bg-slate-600'
                            }`}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8 lg:p-8">
              {/* Dynamic Form Content */}
              {renderStep()}
   <div className="mt-8 pt-4 flex justify-between items-center">
        {prevStep && (
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep===0}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all
      ${
        currentStep === 0
          ? "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 opacity-50 cursor-not-allowed"
          : "bg-[#151515] text-white hover:bg-[#222222]"
      }
    `}
          >
            <i className="material-icons">arrow_back</i> {t('common.previous')}
          </button>
        )}

        <button
          type="button"
          onClick={nextStep}
          className="flex items-center gap-2 px-10 py-3 bg-primary hover:bg-orange-600 text-white rounded-full font-bold shadow-lg shadow-primary/30 transition-all transform hover:scale-105"
        >
          {t('common.next')} <i className="material-icons">arrow_forward</i>
        </button>
      </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SellPage;
