import { CtaLink, Section } from '@/components/studio/StudioUI';
import { STUDIO_AREA } from '@/lib/studio';

const VALUES = [
  {
    title: 'BIKES ARE FOR EVERYONE',
    body: 'Cargo bike, kid bike, garage-sale find or race machine — if you ride it, I want to help you ride it better.',
  },
  {
    title: 'HONEST ADVICE. NO UPSELL.',
    body: "I'll tell you what your bike actually needs, and I won't sell you something you don't.",
  },
  {
    title: 'EVERY REASON TO RIDE COUNTS',
    body: 'Getting to work, getting to the park, getting some exercise, or getting obsessive about gear. All equally valid.',
  },
  {
    title: 'BUILT AROUND THE RIDER',
    body: 'Repairs and builds are tailored to you — how you ride, how you fit, and what you can spend.',
  },
];

const About = () => (
  <>
    <div className="mb-8">
      <h1 className="font-heading text-5xl md:text-7xl leading-none">
        BIKES FOR EVERYONE.{' '}
        <span className="bg-primary px-2 box-decoration-clone">GATEKEEPERS CAN WALK.</span>
      </h1>
      <p className="mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
        Cranky Mike's is a neighborhood bicycle repair and custom-build studio in {STUDIO_AREA}. I fix
        bikes, build bikes, and help people get the most out of riding them — whether you're
        commuting, hauling kids, chasing fitness, or just want the thing to stop squeaking.
      </p>
      <p className="font-mono text-xs text-muted-foreground mt-4 uppercase tracking-widest">
        Private studio · By appointment only · {STUDIO_AREA}
      </p>
    </div>

    <div className="grid gap-3 sm:grid-cols-2 mb-8">
      <CtaLink to="/repair-studio/repairs" primary>REPAIRS</CtaLink>
      <CtaLink to="/repair-studio/custom-builds" primary>CUSTOM BUILDS</CtaLink>
      <CtaLink to="/repair-studio/for-sale">FOR SALE</CtaLink>
      <CtaLink to="/repair-studio/contact">CONTACT</CtaLink>
    </div>

    <div className="grid gap-3 md:grid-cols-2 mb-4">
      {VALUES.map((v) => (
        <div key={v.title} className="border border-primary bg-card p-5">
          <h2 className="font-heading text-2xl leading-none mb-2">{v.title}</h2>
          <p className="text-sm text-muted-foreground">{v.body}</p>
        </div>
      ))}
    </div>

    <Section title="SO WHY CRANKY?">
      <p>
        Because cycling in Seattle can feel way more complicated than it should. Shop counters that
        make you feel dumb for asking. Jargon nobody explains. The quiet assumption that real cyclists
        spend thousands of dollars and wear a lot of spandex.
      </p>
      <p>
        That's what I'm cranky about. Never you. I'd much rather spend my energy knocking down those
        barriers so more people can enjoy riding.
      </p>
    </Section>

    <Section title="HOW I GOT HERE">
      <p>
        I started wrenching in 2017 at the ASU Dub bike shop. From there I apprenticed at Town Cycle in
        Oakland, where we built custom bikes and brought used bikes back to life to get more people in
        the community riding. That's where it clicked for me: a solid used bike and a mechanic who
        actually listens can do more for cycling than any ad campaign.
      </p>
      <p>
        Then I went corporate. At Diamondback, I worked in customer service and information systems,
        streamlining the bike experience for riders and for the small businesses behind them — bike
        shops, repair outlets, and people building bike infrastructure. I learned how the industry works
        from the inside, and how easily it loses sight of the person actually riding the bike.
      </p>
      <p>
        So I went back to basics: fixing bikes for friends, building bikes for the people around me,
        and working with neighbors. That's Cranky Mike's.
      </p>
      <p>
        What that means for you: real shop-floor experience, a community-minded approach to used and
        custom bikes, and enough time inside the industry to know which hype to ignore.
      </p>
    </Section>

    <Section title="THE BEST PART OF THE JOB">
      <p>
        I love turning non-cyclists into people who ride. My favorite moment is watching someone get on
        a bike that fits and is properly tuned, then discover how easy and fun it is to ride to work,
        to the park, to the gym, or to meet friends.
      </p>
      <p>
        I want to help the commuter mom on a cargo bike just as much as the gearhead with a race bike.
        Whatever your budget, experience, body type, or ride, you deserve to be listened to.
      </p>
    </Section>

    <Section title="GETTING STARTED">
      <p>
        Cranky Mike's is a private studio in {STUDIO_AREA}, not a public storefront, so there are no
        walk-ins. Send a text, tell me what's going on with your bike, and we'll set up a time. I'll
        share the exact address once your appointment is arranged.
      </p>
      <div className="pt-2">
        <CtaLink to="/repair-studio/contact" primary>GET IN TOUCH</CtaLink>
      </div>
    </Section>
  </>
);

export default About;
