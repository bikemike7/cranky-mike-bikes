import { BulletList, PageTitle, Section } from '@/components/studio/StudioUI';
import TextMike from '@/components/studio/TextMike';
import { STUDIO_AREA, STUDIO_PHONE } from '@/lib/studio';

const WHAT_TO_SEND = [
  'What kind of bike you have',
  "What's going on with it",
  "What work you're interested in (or what you want built)",
  'A few photos, if you can',
];

const Contact = () => (
  <>
    <PageTitle lead="GET IN" highlight="TOUCH" sub="Text first · By appointment only" />

    <Section title="SEND A TEXT">
      <p>
        Texting is the easiest way to reach me. I usually get back to you the same day — though I'm
        one person with greasy hands, so no promises.
      </p>
      {STUDIO_PHONE || import.meta.env.DEV ? (
        <div className="pt-1">
          <TextMike label="GET IN TOUCH" />
        </div>
      ) : (
        <p className="font-mono text-xs uppercase text-muted-foreground">Number coming soon.</p>
      )}
    </Section>

    <Section title="WHAT TO SAY">
      <p>No forms, no account, no pressure. A first message can be as simple as this:</p>
      <BulletList items={WHAT_TO_SEND} />
      <p className="text-muted-foreground">
        Don't know the technical words for what's wrong? Totally fine. "It makes a clunky noise when I
        pedal hard" is a perfectly good description.
      </p>
    </Section>

    <Section title="WHERE + HOW">
      <BulletList
        items={[
          `${STUDIO_AREA}`,
          'Private studio, appointment only — not a storefront',
          "Exact address shared once we've set up a time",
          'Pickup and drop-off may be possible, depending on where you are and my availability',
        ]}
      />
    </Section>
  </>
);

export default Contact;
