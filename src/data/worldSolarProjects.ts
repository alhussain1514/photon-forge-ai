export interface WorldSolarProject {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  capacityMw: number;
  areaHectares: number;
  commissioned: string;
  fact: string;
  accent: string;
}

export const worldSolarProjects: WorldSolarProject[] = [
  {
    id: 'bhadla',
    name: 'Bhadla Solar Park',
    country: 'Rajasthan, India',
    countryFlag: '🇮🇳',
    capacityMw: 2245,
    areaHectares: 5700,
    commissioned: '2015–2020',
    fact: 'Built across the Thar Desert; one of the largest single solar parks on Earth by nameplate capacity.',
    accent: '#00F2FF',
  },
  {
    id: 'pavagada',
    name: 'Pavagada Solar Park',
    country: 'Karnataka, India',
    countryFlag: '🇮🇳',
    capacityMw: 2050,
    areaHectares: 5260,
    commissioned: '2019',
    fact: 'Built on leased farmland across five villages, giving landowners steady lease income instead of crop yield.',
    accent: '#FFD700',
  },
  {
    id: 'golmud',
    name: 'Golmud / Qinghai Solar Cluster',
    country: 'Qinghai, China',
    countryFlag: '🇨🇳',
    capacityMw: 2800,
    areaHectares: 6000,
    commissioned: '2011–ongoing',
    fact: 'Part of China\u2019s Qinghai renewable hub, sited on high-altitude desert plateau for intense, consistent irradiance.',
    accent: '#10B981',
  },
  {
    id: 'benban',
    name: 'Benban Solar Park',
    country: 'Aswan, Egypt',
    countryFlag: '🇪🇬',
    capacityMw: 1650,
    areaHectares: 3700,
    commissioned: '2019',
    fact: "Africa's largest solar park, cutting an estimated ~2 million tonnes of CO₂ annually.",
    accent: '#F59E0B',
  },
  {
    id: 'noor',
    name: 'Noor Ouarzazate Complex',
    country: 'Ouarzazate, Morocco',
    countryFlag: '🇲🇦',
    capacityMw: 580,
    areaHectares: 3000,
    commissioned: '2016–2018',
    fact: 'Combines concentrated solar power (CSP) with molten-salt storage, generating electricity after sunset.',
    accent: '#8B5CF6',
  },
  {
    id: 'mbr',
    name: 'Mohammed bin Rashid Al Maktoum Solar Park',
    country: 'Dubai, UAE',
    countryFlag: '🇦🇪',
    capacityMw: 2027,
    areaHectares: 7700,
    commissioned: '2013–ongoing',
    fact: 'Targeting 5,000 MW by 2030 — one of the largest single-site solar investments in the Gulf.',
    accent: '#F43F5E',
  },
];

export const worldRecordCapacityMw = Math.max(...worldSolarProjects.map((p) => p.capacityMw));
