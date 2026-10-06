export type Situation = {
  title: string;
  text: string;
};

export const situations: Situation[] = [
  {
    title: 'You need an interim CTO or CIO.',
    text: 'Someone has to hold the technology agenda through a change of people, ownership or direction, while a permanent search takes the time it takes.',
  },
  {
    title: 'Technology and the business have drifted.',
    text: 'The roadmap, the budget and what the organisation needs are no longer the same conversation.',
  },
  {
    title: 'Delivery is busy, and still late.',
    text: 'People are working. Releases, dependencies and decisions do not land when the business needs them.',
  },
  {
    title: 'Product and engineering are building past each other.',
    text: 'Work is happening. It is less clear who decides what good looks like, or which outcome the teams share.',
  },
  {
    title: 'A transformation needs an owner.',
    text: 'The intent is agreed. The work across technology, organisation and execution is not holding together.',
  },
  {
    title: 'The company outgrew how technology is run.',
    text: 'The old way of deciding, the team shape, the vendors, the architecture — some of it no longer fits.',
  },
  {
    title: 'A large technology decision needs a second view.',
    text: 'Architecture, a platform, sourcing or a vendor. From someone who is not defending the current plan.',
  },
  {
    title: 'An AI ambition needs a practical plan.',
    text: 'The organisation wants to use AI. It is less clear what to build, what to leave, and who would operate it.',
  },
  {
    title: 'One programme has to cross the business, product and technology.',
    text: 'Business, product and technology are still separate conversations, not one plan.',
  },
  {
    title: 'The board story and the delivery plan disagree.',
    text: 'What is presented to the board and what the delivery plan can do are not the same.',
  },
];
