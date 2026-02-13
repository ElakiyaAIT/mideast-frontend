export type ProductStatus = 'for_sale' | 'sold' | 'auction';
export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  status: ProductStatus;
  specs: {
    weight: string;
    power: string;
    speed: string;
    engine: string;
    hours: string;
    location: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'HTM 905 Truck',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAup1md660oMYDfsNn6ODn29gJquoNNSq3X2TGhZHoY-eB3gOyJNzir4HHNf_PoFnSaJT4Qdyr91jrBe0hJ4mZMD1vZ3oD8S-UG8bazfBSCvrimvv34tFnkSY_w-pWVQN6gF_ap1VmzylXwjWnEAG7m4TABL4aNG_xIs7cRDCosduQuI5Sq8sLo5EbasVCunjLEu85PIYWRUlGc04weZYxODHSFaFELRrgiAuDRHXvGVZmRgxl8mBJ-YEP-Hr-90QI5Dd8LVkxcFPg',
    price: 35199,
    status: 'for_sale',
    specs: {
      weight: '3,780 kg',
      power: '185 kW',
      speed: '50 km/h',
      engine: 'BN455',
      hours: '6,839',
      location: 'Ohio',
    },
  },

  {
    id: '2',
    title: 'HTM 905 Truck',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAup1md660oMYDfsNn6ODn29gJquoNNSq3X2TGhZHoY-eB3gOyJNzir4HHNf_PoFnSaJT4Qdyr91jrBe0hJ4mZMD1vZ3oD8S-UG8bazfBSCvrimvv34tFnkSY_w-pWVQN6gF_ap1VmzylXwjWnEAG7m4TABL4aNG_xIs7cRDCosduQuI5Sq8sLo5EbasVCunjLEu85PIYWRUlGc04weZYxODHSFaFELRrgiAuDRHXvGVZmRgxl8mBJ-YEP-Hr-90QI5Dd8LVkxcFPg',
    price: 35199,
    status: 'for_sale',
    specs: {
      weight: '3,780 kg',
      power: '185 kW',
      speed: '50 km/h',
      engine: 'BN455',
      hours: '6,839',
      location: 'Ohio',
    },
  },

  {
    id: '3',
    title: 'HTM 905 Truck',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAup1md660oMYDfsNn6ODn29gJquoNNSq3X2TGhZHoY-eB3gOyJNzir4HHNf_PoFnSaJT4Qdyr91jrBe0hJ4mZMD1vZ3oD8S-UG8bazfBSCvrimvv34tFnkSY_w-pWVQN6gF_ap1VmzylXwjWnEAG7m4TABL4aNG_xIs7cRDCosduQuI5Sq8sLo5EbasVCunjLEu85PIYWRUlGc04weZYxODHSFaFELRrgiAuDRHXvGVZmRgxl8mBJ-YEP-Hr-90QI5Dd8LVkxcFPg',
    price: 35199,
    status: 'for_sale',
    specs: {
      weight: '3,780 kg',
      power: '185 kW',
      speed: '50 km/h',
      engine: 'BN455',
      hours: '6,839',
      location: 'Ohio',
    },
  },

  {
    id: '4',
    title: 'HTM 905 Truck',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxTesejM2bBuU9EifwADO-Hw7PBJuclvdBsLw3K3FEMUUimjjbwgvKmlXDD81_nLs-S0hNM7OOuvnmHw5BXOyoHgNQZNOh9mZsVdpBO0q0Z1K0vx5D-FtJ7SFULX2W3zn0mPL8Yo77zzYQGOdJ_ywsG95mHDan7TsEs9XKeLgNPlYTTm5FpLLEMS6_JJfUWOIzDbRRxDKd1bTcOXoULecNy1WcUMSuwkRleqH8uBtOoSRRNd7S4uugDssO-1kdScGZDozR-96Ca7k',
    price: 35199,
    status: 'for_sale',
    specs: {
      weight: '3,780 kg',
      power: '185 kW',
      speed: '50 km/h',
      engine: 'BN455',
      hours: '6,839',
      location: 'Ohio',
    },
  },

  {
    id: '5',
    title: 'HTM 905 Truck',
    image:
     'https://lh3.googleusercontent.com/aida-public/AB6AXuCBZBAZ1K1_8EsfRd-cC6QSwF8B52FjylUZxy_Co6Y4GmTuZEHhst8NXI6qYocpZDQVSf2xwQg65SYwCowr5jKfpgRgLrtt9lGNE_xtGjiOfrQt7Q0eH85jivTw6lihoo2kxRcfdu2cXVwD_KMe6BJPa3PvG7tFGoKj579hN7vK0pQzzxkTgxr_NXqPcnfUjF43s97fyK47kNz4Ji_y657vYlHgegBy-OCHNCAYDVMR6LCmrr8cWyF1dabTXrGUJlPxH4ujIdp2SFU',
    price: 35199,
    status: 'for_sale',
    specs: {
      weight: '3,780 kg',
      power: '185 kW',
      speed: '50 km/h',
      engine: 'BN455',
      hours: '6,839',
      location: 'Ohio',
    },
  },

  {
    id: '1',
    title: 'HTM 905 Truck',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAup1md660oMYDfsNn6ODn29gJquoNNSq3X2TGhZHoY-eB3gOyJNzir4HHNf_PoFnSaJT4Qdyr91jrBe0hJ4mZMD1vZ3oD8S-UG8bazfBSCvrimvv34tFnkSY_w-pWVQN6gF_ap1VmzylXwjWnEAG7m4TABL4aNG_xIs7cRDCosduQuI5Sq8sLo5EbasVCunjLEu85PIYWRUlGc04weZYxODHSFaFELRrgiAuDRHXvGVZmRgxl8mBJ-YEP-Hr-90QI5Dd8LVkxcFPg',
    price: 35199,
    status: 'for_sale',
    specs: {
      weight: '3,780 kg',
      power: '185 kW',
      speed: '50 km/h',
      engine: 'BN455',
      hours: '6,839',
      location: 'Ohio',
    },
  },
];



export const PRODUCT_BADGE_MAP: Record<
  ProductStatus,
  { label: string; className: string }
> = {
  for_sale: {
    label: 'For Sale',
    className: 'bg-orange-400',
  },
  sold: {
    label: 'Sold',
    className: 'bg-slate-500',
  },
  auction: {
    label: 'Auction',
    className: 'bg-purple-500',
  },
};
