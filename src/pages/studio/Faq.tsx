import { CtaLink, PageTitle } from '@/components/studio/StudioUI';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// To add or edit a question, change this list — the page updates automatically.
const FAQS = [
  {
    q: "Where is Cranky Mike's located?",
    a: "In a private studio in Wallingford, Seattle. I'll share the exact location once we've set up an appointment.",
  },
  {
    q: 'Do I need an appointment?',
    a: "Yes. Everything is by appointment and walk-ins aren't accepted. That said, if you happen to see me working, feel free to say hi.",
  },
  {
    q: 'How do I get started?',
    a: "Send me a text. I'll usually follow up the same day, ask a few questions, and maybe ask for photos. Then we'll set up a drop-off or pickup.",
  },
  {
    q: 'How much will my repair cost?',
    a: "It depends on the bike and the work it needs. I'll give you an estimate after looking at it, usually in person. Estimates are preliminary, and if it turns out to need more than we discussed, I'll check with you before doing anything extra.",
  },
  {
    q: 'How long will a repair take?',
    a: "It really varies by project. I need to see the bike before I can give you a useful answer, so we'll talk timing once I've had a look.",
  },
  {
    q: 'Do you work on all types of bikes?',
    a: "A wide range: commuter, road, vintage, kids', tandem, and more. Whether a specific project is a good fit depends on the work it needs. For highly specialized jobs, like advanced suspension rebuilds, I may point you to a specialist.",
  },
  {
    q: 'Do you repair e-bikes?',
    a: "Sometimes. E-bikes are assessed case by case, and I can't guarantee every model or problem can be diagnosed or repaired here. Studio space is tight (one e-bike at a time), so text me about your bike before we set anything up.",
  },
  {
    q: 'Can you build a custom bike for me?',
    a: "Yes. We start with a conversation about you: how you'll use the bike, fit, budget, and style. Then we work on it together the whole way through.",
  },
  {
    q: 'Does a custom build have to be expensive?',
    a: "Nope. A build can use a used frame and secondhand parts, new parts, or a mix. We'll figure out what makes sense for your budget and how you ride.",
  },
  {
    q: 'Do you work on used or vintage bikes?',
    a: "Yes. Used bikes, vintage restorations, and secondhand parts are a big part of what I do. The bike and the repairs it needs will determine what's practical.",
  },
  {
    q: 'Can I bring my own parts?',
    a: "I do parts installation and upgrades. Just tell me what parts you have and what you're planning before we set up the appointment, and we'll go from there.",
  },
  {
    q: 'Do you offer pickup and drop-off?',
    a: "Possibly, depending on where you are and my availability. Text me and we'll sort out the logistics.",
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Cash and Venmo.',
  },
  {
    q: "What if my bike doesn't feel right after a repair?",
    a: "Get in touch. If it doesn't feel right or starts making a weird noise after service, I'm happy to take another look.",
  },
  {
    q: 'Do you sell bikes and parts?',
    a: "Yes. Check the For Sale page for current listings with photos, descriptions, and prices.",
  },
  {
    q: "Will you tell me if I don't need a repair or upgrade?",
    a: "Yes. Honest advice is the whole point. I don't want you paying for things you don't need.",
  },
  {
    q: "I'm new to riding (or my bike is cheap). Will you still help me?",
    a: "Absolutely. Whatever your budget, experience, body type, or bike, you'll be listened to. Helping new riders is one of my favorite parts of the job.",
  },
];

const Faq = () => (
  <>
    <PageTitle lead="FREQUENTLY ASKED" highlight="QUESTIONS" sub="The short answers" />

    <Accordion type="multiple" className="border border-border px-5 mb-6">
      {FAQS.map((f) => (
        <AccordionItem key={f.q} value={f.q} className="border-border last:border-b-0">
          <AccordionTrigger className="font-heading text-xl md:text-2xl tracking-wide text-left hover:no-underline">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-base leading-relaxed text-muted-foreground">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>

    <div className="flex flex-wrap gap-3">
      <CtaLink to="/repair-studio/contact" primary>STILL GOT QUESTIONS? TEXT ME</CtaLink>
    </div>
  </>
);

export default Faq;
