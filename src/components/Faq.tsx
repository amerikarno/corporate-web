type TFaq = {
  questionIndex: number;
  onSet: (index: number) => void;
  question: string;
  asnwer: string;
  selectedFaq: number;
};
export function FaqAccordion({
  questionIndex,
  onSet,
  question,
  asnwer,
  selectedFaq,
}: TFaq) {
  return (
    <div
      className={`hs-accordion ${
        questionIndex === selectedFaq ? "active" : ""
      }`}
    >
      <button
        className="hs-accordion-toggle hs-accordion-active:text-primary hs-accordion-active:pb-3 pb-0 pt-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-primary dark:text-gray-200 dark:hover:text-white/80"
        aria-controls="hs-basic-always-open-collapse-three"
        type="button"
        onClick={() => onSet(questionIndex)}
      >
        <svg
          className="hs-accordion-active:hidden hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.62421 7.86L13.6242 7.85999"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <path
            d="M8.12421 13.36V2.35999"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
        <svg
          className="hs-accordion-active:block hs-accordion-active:text-primary hs-accordion-active:group-hover:text-primary hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-white/70"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.62421 7.86L13.6242 7.85999"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
        {question}
      </button>
      <div
        className={`hs-accordion-content ${
          questionIndex === selectedFaq ? "block" : "hidden"
        } w-full overflow-hidden transition-[height] duration-300`}
        aria-labelledby="hs-basic-always-open-heading-three"
      >
        <p className="text-gray-900 dark:text-gray-200 pl-6 pt-2">{asnwer}</p>
      </div>
    </div>
  );
}
