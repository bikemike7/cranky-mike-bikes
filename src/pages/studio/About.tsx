import { CtaLink, Section, StudioPhoto } from '@/components/studio/StudioUI';
import { STUDIO_AREA } from '@/lib/studio';

const VALUES = [
  {
    title: 'BIKES ARE FOR EVERYONE',
    body: 'Cargo bike, kid bike, garage-sale find or race machine — fall in love with it again.',
  },
  {
    title: 'HOW IT WORKS',
    body: 'We work together to understand your story and how two wheels can make it better. We work with you through the whole process. Pickup and delivery available.',
  },
  {
    title: 'EVERY REASON TO RIDE COUNTS',
    body: "Getting to work, going to the park, racing, or just starting out. Let's get you rolling.",
  },
  {
    title: 'BUILT AROUND THE RIDER',
    body: 'Consultations to help repairs and builds work for you — how you ride, how you fit, and what you can spend.',
  },
];

const About = () => (
  <>
    <div className="mb-8 grid gap-6 md:grid-cols-[3fr_2fr] md:items-center">
      <div>
        <h1 className="font-heading text-5xl md:text-7xl leading-none">
          LET'S GET <span className="bg-primary px-2 box-decoration-clone">ROLLING.</span>
        </h1>
        <p className="mt-5 text-base md:text-lg leading-relaxed">
          Cranky Mike's is a neighborhood bicycle repair and custom-build studio in {STUDIO_AREA}. We fix
          bikes, build bikes, and help people get the most out of riding them — no judgment for anyone
          who wants a better bike life.
        </p>
        <p className="font-mono text-xs text-muted-foreground mt-4 uppercase tracking-widest">
          By appointment only · {STUDIO_AREA}
        </p>
      </div>
      <StudioPhoto
        file="mike-street-ride.jpg"
        alt="Mike grinning as he walks a dead-baby tallbike through a crowd of riders"
        className="aspect-[4/5] max-h-[520px]"
      />
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

    <Section title="WHY CRANKY?">
      <p>
        We want to break down barriers that prevent people from doing the thing we love. Cranky Mike is
        pissed about traffic, car culture, intoxicated driving, limited infrastructure, and barriers to
        entry.
      </p>
      <p>
        That's what he's cranky about. Let's fix that together.
      </p>
    </Section>

    <Section title="HOW MIKE GOT HERE">
      <p>
        I started wrenching in 2017 at the ASUW bike shop. From there I apprenticed at Town Cycle in
        Oakland, where we built custom bikes and brought used bikes back to life to get more people in
        the community riding. This is where the bike love grew. The way Dave listened to everyone opened
        my eyes to real concerns that most people wouldn't tell a stranger, yet prevent them from riding.
      </p>
      <p>
        I then took a customer service role at Diamondback, where I painfully told customer after
        customer that their recently purchased e-bike was junk due to compatibility and proprietary
        issues. It was a huge pain point. I eventually graduated to an IT role where I could more
        effectively support the customer service team and local bike shops by solving communication and
        organization issues. I learned how the industry works and how easily small blockers can cascade
        into reduced ridership.
      </p>
      <p>
        Now I'm back to the ground level: fixing bikes for friends, creating custom builds for
        neighbors, and expanding to e-bikes and mobile service. Hopefully I won't be too cranky when we
        meet.
      </p>
      <p>
        For new friends, expect an experience that is different.
      </p>
    </Section>

    <Section title="THE BEST PART OF THE JOB">
      <div className="grid gap-5 sm:grid-cols-[3fr_2fr] sm:items-start">
        <div className="space-y-3">
          <p>
            I love turning non-cyclists into people who ride. My favorite moment is watching someone get on
            a bike that fits and is properly tuned, then discover how easy and fun it is to ride to work,
            to the park, to the gym, or to meet friends.
          </p>
          <p>
            I want to help the super-mom make sure she can rely on a cargo bike for school drop-offs. I
            help roadies win races and messengers win alleycats. Whatever your budget, experience, body
            type, or needs, you deserve to be listened to.
          </p>
        </div>
        <StudioPhoto
          file="mike-bamboo.jpg"
          alt="Mike smiling with a bike on a path through a tall bamboo forest"
          className="aspect-[3/4]"
        />
      </div>
    </Section>

    <Section title="GETTING STARTED">
      <p>
        Cranky Mike's is a private studio in {STUDIO_AREA}, not a public storefront, so there are no
        walk-ins. Send a text, tell me what's going on with your bike, and we'll set up a time. I'll
        share the exact address once your appointment is arranged. We also offer pickups and drop-offs
        on a case-by-case basis.
      </p>
      <div className="pt-2">
        <CtaLink to="/repair-studio/contact" primary>GET IN TOUCH</CtaLink>
      </div>
    </Section>
  </>
);

export default About;
