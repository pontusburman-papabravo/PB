export type Situation = {
  title: string;
  text: string;
};

export const situations: Situation[] = [
  {
    title: 'You need an interim CTO or CIO.',
    text: 'Someone has to hold technology leadership through a change of people, ownership or direction, without waiting out a long search.',
  },
  {
    title: 'Technology and the business are no longer aligned.',
    text: 'Roadmaps, budgets and what the organisation actually needs have drifted apart, and the gap is now visible in decisions.',
  },
  {
    title: 'Delivery is too slow or too unpredictable.',
    text: 'People are busy. Releases, dependencies and decisions still do not land when the business needs them.',
  },
  {
    title: 'Product and engineering lack a common direction.',
    text: 'Teams are building, but not towards the same outcome, and it is unclear who decides what “good” looks like.',
  },
  {
    title: 'A transformation needs stronger leadership.',
    text: 'The intent is agreed. The work across technology, organisation and execution is not holding together.',
  },
  {
    title: 'The organisation has outgrown its technology operating model.',
    text: 'What worked at an earlier stage — ways of deciding, team shape, vendors, architecture — no longer fits how the company works.',
  },
  {
    title: 'A major technology decision needs an independent view.',
    text: 'Architecture, platform, sourcing or vendor choices need someone who is not defending an existing position.',
  },
  {
    title: 'An AI ambition has to become practical work.',
    text: 'The organisation wants to use AI. It is less clear what to build, what to leave alone, and how it would run in operations.',
  },
  {
    title: 'A critical programme crosses business, product and technology.',
    text: 'It needs leadership that can keep those perspectives in the same conversation, and in the plan.',
  },
  {
    title: 'Boardroom discussions and delivery reality need to meet.',
    text: 'The strategy is discussed at one altitude and the work happens at another. Someone has to be credible in both.',
  },
];
