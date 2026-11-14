export type PostKind = 'news' | 'event' | 'article';

export const postKindLabels: Record<PostKind, string> = { news: 'News', event: 'Event', article: 'Article' };

/** A News & Events post. Named EventItem for history; `kind` says what it is. */
export type EventItem = {
  kind: PostKind;
  slug: string;
  title: string;
  createdAt: string;
  eventDate: string;
  eventDateStart: string;
  excerpt: string;
  body: string[];
  image: string;
  sourceUrl: string;
  sourceLabel: string;
};

const baseEvents: Omit<EventItem, 'kind'>[] = [
  {
    slug: 'factory-visit-baui-spine-taiwan',
    title: 'Strategic Insight: Exploring Innovation at the Baui Spine Factory, Taiwan',
    createdAt: '2026-05-07T09:31:00+07:00',
    eventDate: 'December 15, 2026',
    eventDateStart: '2026-12-15',
    excerpt:
      'A high-level factory visit focused on manufacturing standards, implant innovation, and direct validation of Baui Spine production quality.',
    body: [
      'On December 15, 2026, a high-level industrial visit was conducted at the Baui Spine manufacturing facility in Taiwan. The visit featured Dr. dr. Wawan Mulyawan, Sp.BS(K), Subspes. N-TB, FINSS, FINPS, AAK, one of Indonesia’s leading consultants in neurosurgery.',
      'The visit focused on direct observation of production standards and the technology used in the development of spinal medical devices. From raw material selection to precision testing, the inspection highlighted how manufacturing quality supports safety and clinical performance.',
      'This event reflects Arjaya Langgeng Medika’s commitment to bringing globally validated spinal technology into the Indonesian healthcare market through close collaboration with trusted manufacturers.'
    ],
    image: '/images/client/events/factory-visit-baui-spine.png',
    sourceUrl: 'https://drive.google.com/drive/folders/1W-vejUjt6tPyBdmCfpE80LG18VeMmRPj?usp=sharing',
    sourceLabel: 'Open event folder'
  },
  {
    slug: 'grand-launching-neuronavigation',
    title: 'Advancing Surgical Excellence: The Official Launch of Spinal Neuronavigation Technology',
    createdAt: '2026-05-04T18:35:39+07:00',
    eventDate: 'December 11, 2025',
    eventDateStart: '2025-12-11',
    excerpt:
      'The official introduction of spinal neuronavigation through technical sessions and live demonstrations focused on surgical precision and patient safety.',
    body: [
      'The official launch of spinal neuronavigation introduced a real-time surgical guidance system designed to deliver sub-millimeter accuracy in complex spinal procedures.',
      'The event highlighted key clinical advantages including more precise implant placement, improved visualization of critical anatomy, support for minimally invasive techniques, and reduced exposure to repeated intraoperative X-rays.',
      'This launch marked Arjaya Langgeng Medika’s commitment to expanding access to advanced surgical navigation technology and improving the standard of care for spine procedures in Indonesia.'
    ],
    image: '/images/client/events/grand-launching-neuronavigation.png',
    sourceUrl: 'https://drive.google.com/drive/folders/1_-zmm8jesPB_lQLj33udJcJRW2amcCT-?usp=sharing',
    sourceLabel: 'Open event folder'
  },
  {
    slug: 'bess-training-indonesia',
    title: 'Pioneering Spinal Endoscopy: The Launch of BESS Training in Indonesia',
    createdAt: '2026-05-06T16:50:33+07:00',
    eventDate: 'August 15-16, 2025',
    eventDateStart: '2025-08-15',
    excerpt:
      'The first specialized BESS training program in Indonesia introduced dual-portal spinal endoscopy to orthopedic and neurosurgical specialists.',
    body: [
      'The launch of BESS training in Indonesia marked an important step in expanding minimally invasive spinal surgery capabilities for local orthopedic and neurosurgical teams.',
      'The program focused on the dual-portal approach used in Biportal Endoscopic Spine Surgery, emphasizing high-definition visibility, procedural precision, reduced tissue trauma, and faster patient recovery.',
      'By combining technology access with hands-on education, this event reinforced Arjaya Langgeng Medika’s role in helping bridge global surgical innovation with local clinical expertise.'
    ],
    image: '/images/client/events/bess-course.png',
    sourceUrl: 'https://drive.google.com/drive/folders/1zt5rj6k2pM_6zj761TdXxVqaVW_T4cmV?usp=sharing',
    sourceLabel: 'Open event folder'
  },
  {
    slug: 'traufix-second-workshop',
    title: 'Advancing Trauma Care with the TRAUFIX 2nd Workshop',
    createdAt: '2026-05-06T09:47:09+07:00',
    eventDate: 'July 15, 2025',
    eventDateStart: '2025-07-15',
    excerpt:
      'A hands-on trauma workshop centered on intramedullary nailing, long-bone fracture fixation, and instrument mastery for orthopedic teams.',
    body: [
      'The TRAUFIX 2nd Workshop provided intensive training focused on long-bone trauma care and practical expertise in intramedullary nailing techniques.',
      'Participants worked through fracture fixation scenarios involving femur, tibia, and humerus cases, while also discussing reduction challenges, distal locking accuracy, and operating room efficiency.',
      'The workshop demonstrated Arjaya Langgeng Medika’s continued commitment to supporting orthopedic education and improving trauma care outcomes through high-quality instruments and structured training.'
    ],
    image: '/images/client/events/traufix-second-workshop.png',
    sourceUrl: 'https://drive.google.com/drive/folders/1vmzk5UOGrlg52NLNTzgrU7pofLHUO1Bb?usp=sharing',
    sourceLabel: 'Open event folder'
  }
];

export const events: EventItem[] = baseEvents
  .map((event) => ({ kind: 'event' as const, ...event }))
  .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export const getEvent = (slug: string) => events.find((event) => event.slug === slug);
