"use client";
import React, { useState, useRef } from "react";

interface FAQSectionProps {
  paddingVertical?: boolean;
  paddingTop?: boolean;
  paddingBottom?: boolean;
  faqData: {
    question: string;
    answer: string;
  }[];
}

const FAQSection: React.FC<FAQSectionProps> = ({
  paddingVertical,
  paddingTop,
  paddingBottom,
  faqData,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const sectionClass = `
    faq 
    ${paddingVertical ? "padding-vertical" : ""} 
    ${paddingTop ? "padding-top" : ""} 
    ${paddingBottom ? "padding-bottom" : ""}
  `.trim();

  return (
    <section className={sectionClass}>
      <div className="faq__container container">
        <h2 className="faq__title">Frequently Asked Questions</h2>

        <div className="faq__list">
          {faqData.map((faq, index) => (
            <div key={index} className="faq__item">
              <button
                className="faq__question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>
                <img
                  src="/images/faq_arrow.svg"
                  alt="Expand"
                  className={`faq__icon ${
                    activeIndex === index ? "faq__icon--open" : ""
                  }`}
                />
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`faq__answer ${
                  activeIndex === index ? "faq__answer--open" : ""
                }`}
                // @ts-expect-error Type '(el: HTMLDivElement | null) => HTMLDivElement | null' is not assignable to type 'Ref<HTMLDivElement> | undefined'.
                ref={(el) => (contentRefs.current[index] = el)}
                style={{
                  height:
                    activeIndex === index
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px",
                }}
              >
                <div className="faq__answer-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
