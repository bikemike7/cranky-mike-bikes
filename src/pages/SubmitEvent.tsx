import { useEffect } from 'react';
import { SUBMIT_FORM_URL } from '@/lib/sheetEvents';

// Submissions go through the Google Form; /submit just forwards there.
const SubmitEvent = () => {
  useEffect(() => {
    window.location.replace(SUBMIT_FORM_URL);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <p className="font-heading text-3xl">TAKING YOU TO THE SUBMIT FORM…</p>
      <a href={SUBMIT_FORM_URL} className="font-mono text-xs underline mt-4 inline-block">
        Click here if nothing happens
      </a>
    </div>
  );
};

export default SubmitEvent;
