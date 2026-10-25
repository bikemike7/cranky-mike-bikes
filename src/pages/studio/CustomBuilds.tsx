import { BulletList, CtaLink, PageTitle, Section, Steps, StudioPhoto } from '@/components/studio/StudioUI';

const GETTING_TO_KNOW_YOU = [
  "How you'll actually use the bike",
  'Your body size and fit',
  'Your budget',
  'Your personal style',
  'What would make riding exciting — and easy — for you',
];

const PROCESS = [
  {
    title: 'WE TALK',
    body: 'Before anything gets ordered, I get to know you and what you want out of riding.',
  },
  {
    title: 'PICK A FRAME',
    body: 'New or used, depending on the project. The frame sets the direction for everything else.',
  },
  {
    title: 'CHOOSE THE PARTS',
    body: "Components come from secondhand sources or new through distributors — whatever makes the most sense for your bike and your budget.",
  },
  {
    title: 'CHECK IN ALONG THE WAY',
    body: "We check in together at each important stage, so the build stays headed where you want it.",
  },
  {
    title: 'RIDE IT',
    body: 'You get a bike that fits, works, and feels like yours.',
  },
];

const CustomBuilds = () => (
  <>
    <PageTitle lead="CUSTOM" highlight="BUILDS" sub="Built with you, not sold to you" />

    <Section title="A BIKE BUILT FOR ONE PERSON: YOU">
      <p>
        A custom build is a collaboration, not a sales pitch. There's no catalog and no one-size-fits-all
        package. We figure out what you need, then build a bike that fits your body, your riding, and
        your style.
      </p>
      <p>
        The goal is simple: find the easiest path to you falling in love with your new bike.
      </p>
    </Section>

    <div className="grid gap-3 sm:grid-cols-2 mb-4">
      <StudioPhoto
        file="colnago-road-bike.jpg"
        alt="Silver vintage Colnago road bike with black drop bars leaning against a garage door"
        className="aspect-[4/3]"
      />
      <StudioPhoto
        file="bridgestone-road-bike.jpg"
        alt="Gray Bridgestone road bike with deep black wheels locked to a city bike rack"
        className="aspect-[4/3]"
      />
    </div>

    <Section title="IT STARTS WITH YOU">
      <BulletList items={GETTING_TO_KNOW_YOU} />
    </Section>

    <Section title="HOW A BUILD COMES TOGETHER">
      <Steps steps={PROCESS} />
    </Section>

    <Section title="SMART PARTS, NOT FLASHY ONES">
      <p>
        Custom doesn't have to mean expensive. A good used frame and well-chosen secondhand parts can
        make a fantastic bike. When new parts are the right call, I'll explain why. Every choice is
        about fit, function, and value — not hype.
      </p>
    </Section>

    <Section title="NO IDEA WHAT YOU WANT? PERFECT.">
      <p>
        You don't need a spec sheet or a parts list to start. "I want something comfy for getting to
        work" is plenty. Tell me how you want to ride and we'll figure out the rest together.
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <CtaLink to="/repair-studio/contact" primary>START THE CONVERSATION</CtaLink>
        <CtaLink to="/repair-studio/for-sale">SEE WHAT'S FOR SALE</CtaLink>
      </div>
    </Section>
  </>
);

export default CustomBuilds;
