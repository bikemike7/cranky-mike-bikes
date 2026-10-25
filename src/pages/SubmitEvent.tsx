import { SUBMIT_FORM_URL } from '@/lib/sheetEvents';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Check } from 'lucide-react';
import { EVENT_TAGS, type EventTag } from '@/types/event';
import { useSubmitEvent } from '@/hooks/useEvents';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import TagBadge from '@/components/TagBadge';

const submitSchema = z.object({
  name: z.string().trim().min(1, 'Event name is required').max(200, 'Too long'),
  date: z.string().min(1, 'Date is required'),
  start_time: z.string().min(1, 'Start time is required'),
  finish_time: z.string().min(1, 'End time is required'),
  location: z.string().trim().min(1, 'Location is required').max(500, 'Too long'),
  description: z.string().trim().min(1, 'Description is required').max(2000, 'Too long'),
  external_link: z.string().url('Must be a valid URL').max(500).optional().or(z.literal('')),
  tags: z.array(z.string()).min(1, 'Select at least one tag'),
  host_name: z.string().trim().min(1, 'Host name is required').max(200, 'Too long'),
  host_phone: z.string().trim().max(20, 'Too long').optional().or(z.literal('')),
  submitter_name: z.string().trim().min(1, 'Your name is required').max(200, 'Too long'),
  submitter_phone: z.string().trim().max(20, 'Too long').optional().or(z.literal('')),
});

type SubmitEventFormData = z.infer<typeof submitSchema>;

const SubmitEvent = () => {
  if (typeof window !== "undefined") window.location.replace(SUBMIT_FORM_URL);
  const [submitted, setSubmitted] = useState(false);
  const submitEvent = useSubmitEvent();

  const form = useForm<SubmitEventFormData>({
    resolver: zodResolver(submitSchema),
    defaultValues: {
      name: '', date: '', start_time: '', finish_time: '',
      location: '', description: '', external_link: '',
      tags: [], host_name: '', host_phone: '',
      submitter_name: '', submitter_phone: '',
    },
  });

  const onSubmit = async (data: SubmitEventFormData) => {
    try {
      await submitEvent.mutateAsync({
        name: data.name,
        date: data.date,
        start_time: data.start_time,
        finish_time: data.finish_time,
        location: data.location,
        description: data.description,
        external_link: data.external_link || null,
        tags: data.tags,
        host_name: data.host_name,
        host_phone: data.host_phone || null,
        submitter_name: data.submitter_name,
        submitter_phone: data.submitter_phone || null,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg text-center">
        <div className="border border-primary p-8">
          <Check className="mx-auto text-primary mb-4" size={48} />
          <h1 className="font-heading text-4xl text-foreground mb-3">SUBMITTED</h1>
          <p className="text-muted-foreground mb-6">
            Your event has been submitted for review. We'll get it posted once it's approved.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline font-mono text-sm">
            ← BACK TO EVENTS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-lg">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-xs uppercase tracking-wide mb-6"
      >
        <ArrowLeft size={14} />
        BACK TO EVENTS
      </Link>

      <h1 className="font-heading text-5xl text-foreground leading-none mb-2">
        SUBMIT AN <span className="text-primary">EVENT</span>
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        No account needed. Fill it out, we'll review it, and get it posted.
      </p>

      {submitEvent.isError && (
        <div className="border border-destructive p-4 mb-6">
          <p className="text-sm text-destructive">
            Failed to submit. Please try again.
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-heading text-lg tracking-wide">EVENT NAME</FormLabel>
              <FormControl><Input placeholder="e.g. Midnight Alleycat" {...field} className="bg-muted border-border" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-heading text-lg tracking-wide">DATE</FormLabel>
              <FormControl><Input type="date" {...field} className="bg-muted border-border" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="grid grid-cols-2 gap-3">
            <FormField control={form.control} name="start_time" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-heading text-lg tracking-wide">START</FormLabel>
                <FormControl><Input type="time" {...field} className="bg-muted border-border" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="finish_time" render={({ field }) => (
              <FormItem>
                <FormLabel className="font-heading text-lg tracking-wide">END</FormLabel>
                <FormControl><Input type="time" {...field} className="bg-muted border-border" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="location" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-heading text-lg tracking-wide">LOCATION</FormLabel>
              <FormControl><Input placeholder="Full address or known spot" {...field} className="bg-muted border-border" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-heading text-lg tracking-wide">DESCRIPTION</FormLabel>
              <FormControl>
                <Textarea placeholder="What's happening? What should people bring?" rows={4} {...field} className="bg-muted border-border resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="external_link" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-heading text-lg tracking-wide">LINK</FormLabel>
              <FormDescription className="text-xs text-muted-foreground">Instagram, website, ticket page, etc.</FormDescription>
              <FormControl><Input placeholder="https://..." {...field} className="bg-muted border-border" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="tags" render={({ field }) => (
            <FormItem>
              <FormLabel className="font-heading text-lg tracking-wide">TAGS</FormLabel>
              <FormDescription className="text-xs text-muted-foreground">Pick all that apply</FormDescription>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {EVENT_TAGS.map((tag) => (
                  <TagBadge
                    key={tag}
                    tag={tag}
                    active={field.value.includes(tag)}
                    onClick={() => {
                      const newTags = field.value.includes(tag)
                        ? field.value.filter((t: string) => t !== tag)
                        : [...field.value, tag];
                      field.onChange(newTags);
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )} />

          <div className="border-t border-border pt-5 mt-6">
            <p className="font-heading text-xl text-foreground mb-4">HOST INFO</p>
            <div className="space-y-4">
              <FormField control={form.control} name="host_name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-lg tracking-wide">HOST NAME</FormLabel>
                  <FormControl><Input placeholder="Name or crew" {...field} className="bg-muted border-border" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="host_phone" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-lg tracking-wide">HOST PHONE</FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">🔒 Private — only visible to moderator</FormDescription>
                  <FormControl><Input placeholder="(optional)" {...field} className="bg-muted border-border" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          <div className="border-t border-border pt-5 mt-6">
            <p className="font-heading text-xl text-foreground mb-4">YOUR INFO</p>
            <div className="space-y-4">
              <FormField control={form.control} name="submitter_name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-lg tracking-wide">YOUR NAME</FormLabel>
                  <FormControl><Input placeholder="Who's submitting this?" {...field} className="bg-muted border-border" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="submitter_phone" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-lg tracking-wide">YOUR PHONE</FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">🔒 Private — in case we need to reach you</FormDescription>
                  <FormControl><Input placeholder="(optional)" {...field} className="bg-muted border-border" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          <Button type="submit" className="w-full font-heading text-lg tracking-wide py-6" disabled={submitEvent.isPending}>
            <Send size={18} />
            {submitEvent.isPending ? 'SUBMITTING...' : 'SUBMIT FOR REVIEW'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SubmitEvent;
