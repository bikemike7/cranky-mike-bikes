import { BulletList, CtaLink, PageTitle, Section, Steps } from '@/components/studio/StudioUI';

const SERVICES = [
  'Tune-ups and adjustments',
  'Flat tires and tube replacement',
  'Drivetrain and brake work',
  'Wheel truing and wheel builds',
  'Parts installation and upgrades',
  'Vintage bike restoration',
  'Full overhauls',
  'E-bike repairs and troubleshooting (case by case)',
  'Safety checks and basic maintenance',
  'General diagnosis and troubleshooting',
  "Kids' bikes and tandems",
];

const PROCESS = [
  { title: 'SEND A TEXT', body: "Tell me about your bike and what's going on. That's it — no forms." },
  {
    title: 'WE TALK IT THROUGH',
    body: "I'll usually get back to you the same day with a few questions. Photos help a lot.",
  },
  {
    title: 'SET UP A HANDOFF',
    body: 'We pick a time for you to drop the bike off, or for me to pick it up, depending on where you are and what my schedule looks like.',
  },
  { title: 'ASSESSMENT + ESTIMATE', body: 'I look the bike over in person and give you an estimate.' },
  {
    title: 'NO SURPRISE WORK',
    body: "If it needs more labor or parts than we discussed, I'll check with you before doing anything extra.",
  },
  {
    title: 'BACK ON THE ROAD',
    body: 'You pick up your bike, or we arrange a handoff that works for both of us.',
  },
];

const Repairs = () => (
  <>
    <PageTitle lead="FULL-SERVICE" highlight="REPAIRS" sub="By appointment · No walk-ins" />

    <Section title="WHAT I WORK ON">
      <p>
        Road, commuter, cargo, vintage, kids' bikes, tandems — all kinds of bikes and a wide range of
        jobs, depending on the project and the space I have available.
      </p>
      <BulletList items={SERVICES} />
    </Section>

    <Section title="TEXT FIRST. PLEASE DON'T JUST SHOW UP.">
      <p>
        This is a private studio, not a storefront. All service is by appointment, so please get in
        touch before bringing your bike over. Walk-ins aren't accepted (and you wouldn't have the
        address anyway).
      </p>
    </Section>

    <Section title="HOW IT WORKS">
      <Steps steps={PROCESS} />
    </Section>

    <Section title="ABOUT ESTIMATES">
      <p>
        Estimates are a starting point, not a guaranteed quote. It's tough to know exactly what a bike
        needs until it's on the stand. I estimate conservatively on purpose: if the job turns out
        simpler than expected, you pay less. If it needs more, I'll ask first.
      </p>
    </Section>

    <Section title="E-BIKES">
      <p>
        I'm happy to take a look at e-bikes, but they're handled case by case. Every e-bike and its
        electrical system is different, so I can't promise that every one can be diagnosed, repaired,
        or serviced here. I also only have room for one e-bike at a time. Text me what you're riding and
        what's going on, and I'll be straight with you about whether I'm the right fit.
      </p>
    </Section>

    <Section title="WHEN A SPECIALIST IS THE BETTER CALL">
      <p>
        I do full-service bike work. But some jobs, like advanced suspension rebuilds or certain
        high-end systems, need specialized tools or expertise. When another shop would do a better job
        on something, I'll tell you and point you their way. Better that than guessing on your bike.
      </p>
    </Section>

    <Section title="SOMETHING FEEL OFF AFTERWARD?">
      <p>
        If your bike doesn't feel right or starts making a weird noise after service, reach out. I'm
        happy to take another look and make it right.
      </p>
    </Section>

    <div className="flex flex-wrap gap-3 mt-6">
      <CtaLink to="/repair-studio/contact" primary>BOOK A REPAIR</CtaLink>
      <CtaLink to="/repair-studio/faq">READ THE FAQ</CtaLink>
    </div>
  </>
);

export default Repairs;
