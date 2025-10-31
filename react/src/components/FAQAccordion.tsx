import React, { useState } from 'react';

const faqs = [
  {
    question: 'What materials do you use?',
    answer: 'We use ethically sourced horn, wood, and resin for all our crafts.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship worldwide with secure payment options.'
  },
  {
    question: 'Can I request custom designs?',
    answer: 'Absolutely! Contact us for bespoke orders tailored to your needs.'
  }
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section" data-react="faq">
      <h2>Frequently Asked Questions</h2>
      <ul className="faq-list">
        {faqs.map((faq, idx) => (
          <li key={idx} className="faq-item">
            <button
              className="faq-question btn-crafts toggle-crafts"
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              {faq.question}
            </button>
            <div
              id={`faq-answer-${idx}`}
              className="faq-answer"
              style={{ display: openIndex === idx ? 'block' : 'none' }}
              aria-hidden={openIndex !== idx}
            >
              {faq.answer}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FAQAccordion;
