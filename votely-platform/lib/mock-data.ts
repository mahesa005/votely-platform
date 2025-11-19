export interface Election {
  id: string
  name: string
  description: string
  level: string
  location: string
  date: string
  status: 'Upcoming' | 'Active' | 'Finished'
}

export interface Candidate {
  id: string
  name: string
  party: string
  description: string
  image: string
  votes?: number
  totalVotes?: number
}

export const mockElections: Election[] = [
  {
    id: '1',
    name: 'Jakarta City Mayor Election 2024',
    description: 'Election to determine the next mayor of Jakarta for a 5-year term. Citizens of Jakarta are eligible to vote.',
    level: 'City',
    location: 'Jakarta',
    date: 'Nov 27, 2024 - 1:00 PM',
    status: 'Active',
  },
  {
    id: '2',
    name: 'West Java Governor Election 2024',
    description: 'Provincial election for West Java governor position. Eligible voters from all West Java municipalities.',
    level: 'Province',
    location: 'West Java',
    date: 'Dec 15, 2024 - 8:00 AM',
    status: 'Upcoming',
  },
  {
    id: '3',
    name: 'Indonesia Presidential Election 2024',
    description: 'National presidential election. All eligible Indonesian citizens nationwide can participate.',
    level: 'National',
    location: 'Indonesia',
    date: 'Oct 20, 2024 - 12:00 PM',
    status: 'Finished',
  },
]

export const mockCandidates: Record<string, Candidate[]> = {
  '1': [
    {
      id: '1-1',
      name: 'Anies Baswedan',
      party: 'Gerindra',
      description: 'Former Jakarta Governor with focus on infrastructure and education development',
      image: '/professional-headshot-of-male-politician-in-busine.jpg',
      votes: 42,
      totalVotes: 15230,
    },
    {
      id: '1-2',
      name: 'Pramono Anung',
      party: 'PDI-P',
      description: 'Current Vice Governor promoting sustainable urban development',
      image: '/professional-headshot-of-male-politician-in-suit.jpg',
      votes: 38,
      totalVotes: 13780,
    },
    {
      id: '1-3',
      name: 'Ridwan Kamil',
      party: 'Golkar',
      description: 'Former West Java Governor with tech-forward vision for Jakarta',
      image: '/professional-headshot-of-male-politician-modern-st.jpg',
      votes: 20,
      totalVotes: 7240,
    },
  ],
  '2': [
    {
      id: '2-1',
      name: 'Uu Ruzhanul Ulum',
      party: 'Gerindra',
      description: 'Focus on agricultural development and rural infrastructure',
      image: '/professional-headshot-politician-agricultural-back.jpg',
      votes: 45,
      totalVotes: 28500,
    },
    {
      id: '2-2',
      name: 'Kang Emil Dardak',
      party: 'Demokrat',
      description: 'Commitment to healthcare and education improvements',
      image: '/professional-headshot-politician-healthcare-focus.jpg',
      votes: 35,
      totalVotes: 22100,
    },
    {
      id: '2-3',
      name: 'Deddy Mizwar',
      party: 'PKS',
      description: 'Experience in governance with emphasis on cultural preservation',
      image: '/professional-headshot-mature-politician-cultural-b.jpg',
      votes: 20,
      totalVotes: 12650,
    },
  ],
  '3': [
    {
      id: '3-1',
      name: 'Prabowo Subianto',
      party: 'Gerindra',
      description: 'Defense and security focus with infrastructure development',
      image: '/professional-headshot-military-background-politici.jpg',
      votes: 58,
      totalVotes: 58200000,
    },
    {
      id: '3-2',
      name: 'Ganjar Pranowo',
      party: 'PDI-P',
      description: 'Economic development and social welfare emphasis',
      image: '/professional-headshot-politician-economic-focus.jpg',
      votes: 35,
      totalVotes: 35100000,
    },
    {
      id: '3-3',
      name: 'Anies Baswedan',
      party: 'PKB',
      description: 'Human development and institutional strengthening',
      image: '/professional-headshot-politician-human-development.jpg',
      votes: 7,
      totalVotes: 7000000,
    },
  ],
}
