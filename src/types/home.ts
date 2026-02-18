export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface Testimonial {
  readonly name: string;
  readonly role: string;
  readonly message: string;
  readonly image: string;
}

export interface Auction {
  readonly _id?: string;
  readonly title: string;
  readonly description?: string;
  readonly date: string;
  readonly time: string;
  readonly location: AuctionLocation;
  readonly images: readonly string[];
  readonly startDate: string;
  readonly type?: string;
  readonly status?: string;
}

export interface AuctionLocation {
  readonly state?: string;
  readonly city?: string;
  readonly address?: string;
  readonly _id: string;
}

export interface NewAuction {
  readonly _id: number;
  readonly title?: string;
  readonly description?: string;
  readonly date?: string;
  readonly time?: string;
  readonly location?: AuctionLocation;
  readonly startDate: string;
  readonly images?: string[];
  readonly thumbnails?: string[];
  readonly status?: string;
  readonly startingPrice?: string;
  readonly soldFor?: string;
  readonly duration?: string;
  readonly bids?: number;
}

export interface Category {
  readonly id: string;
  readonly title: string;
  readonly image: string;
}

export interface ProductSpec {
  readonly label: string;
  readonly value: string;
}

export interface Product {
  readonly name: string;
  readonly image?: string;
  readonly badge?: string;
  readonly specs?: readonly ProductSpec[];
  readonly price?: string;
}

export const auctionKeys = {
  all: ['auctions'] as const,
  latest: () => [...auctionKeys.all, 'latest'] as const,
};

export interface SellFormData {
  title: string;
  category: string;
  description?: string;
  basicDetails: {
    year?: string;
    make?: string;
    model?: string;
    manufacturer?: string;
    engineHours?: string;
    mileage?: string;
  };
  general: {
    grossPower?: string;
    operatingWeight?: string;
    tireTrackSize?: string;
    suspension?: string;
    transmission?: string;
    engineType: string;
    fuelType?: string;
    cabType?: string;
    tireTrackWear?: string;
  };
  condition: {
    overallCondition?: string;
    exteriorColor: string;
    interiorColor: string;
    jumpStartRequired?: string;
    batteriesHoldCharge?: string;
    parkingBrakeWorks?: string;
  };
  engineCondition: {
    overAllCondition?: string;
    oilLevelOk?: string;
    anyLeaks?: string;
    engineNoise?: string;
    coolantLevel?: string;
    coldStartQuality?: string;
    checkEngineLight?: string;
    smokeColor?: string;
  };
  hydraulics: {
    hydraulicPumpCondition: string;
    cylinderLeaks: string;
    hoseCondition: string;
    hydraulicResponse: string;
    hydraulicsDamage: string;
  };
  cabElectronics: {
    dashboardFunctional: string;
    acHeaterWorking: string;
    displayErrors: string;
    seatCondition: string;
    controlsWorking: string;
    lightsWorking: string;
    sensorsWorking: string;
  };
  checkList: {
    exterior: {
      bodyPanels: string;
      bodyPanelsImages: string[];
      glassMirrors: string;
      glassMirrorsImages: string[];
      lightsSignals: string;
      lightsSignalsImages: string[];
    };
    engine: {
      engineBlock: string;
      engineBlockImages: string[];
      transmission: string;
      transmissionImages: string[];
    };
    hydraulics: {
      hydraulicPump: string;
      hydraulicPumpImages: string[];
      cylinders: string;
      cylindersImages: string[];
    };
    underCarriage: {
      tracksWheels: string;
      tracksWheelsImages: string[];
      suspension: string;
      suspensionImages: string[];
    };
    functionalTest: {
      engineStart: string;
      engineStartImages: string[];
      operationTest: string;
      operationTestImages: string[];
    };
  };
  media: {
    exteriorImages: string[];
    engineCompartMentImages: string[];
    underCarriageTracksImages: string[];
    cabInteiorImages: string[];
    otherAttachments: string[];
    videos: string[];
  };
  additionalInformation: {
    equipmentIdentity: {
      vinNumber: string;
      manufacturerDate: string;
      modelYearConfirmation: string;
      equipmentHasDamage: string;
      maintainenceRecords: string;
      warrantyAvailable: string;
    };
    location: {
      address: string;
    };
    ownership: {
      ownershipProof: string[];
      invoiceBillOfSale: string[];
      governmentRegistration: string[];
      emissionTest: string[];
      insurance: string[];
      maintenanceLog: string[];
    };
  };
}
