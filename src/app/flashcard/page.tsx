"use client";
import { useMemo, useRef, useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaPause,
  FaPlay,
  FaStar,
} from "react-icons/fa";
import { MdFullscreen, MdShuffle } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import Link from "next/link";

export default function FlashcardPage() {
  const qaData = useMemo(
    () => [
      {
        question:
          "Are the functions of microtubules and centrioles related to spindle fibres?",
        answer:
          "Yes. The microtubules make cilia and spindle fibres. Centrioles assemble the spindle fibres during nuclear division.",
      },
      {
        question:
          "What are plasmodesmata as seen in an eukaryotic cell? What is their main function?",
        answer:
          "Plasmodesmata are the channels present in a cell wall that connect the neighbouring cells. Their main function is to allow molecules and substances to freely move back and forth as needed.",
      },
      {
        question: "What is the name of the outer membrane of a vacuole?",
        answer:
          "The outer membrane of a vacuole is called tonoplast. Alternatively, it can also be referred to as a vacuolar membrane.",
      },
      {
        question:
          "In a eukaryotic cell, what is the site of gas exchange and active transport?",
        answer:
          "In a eukaryotic cell, the cell surface membrane and mitochondrial membrane are the sites for gas exchange. Active transport of molecules or ions are also carried out by the tonoplast/vacuolar membrane, nuclear envelope or nuclear membrane besides the cell surface membrane and the mitochondrial membrane.",
      },
      {
        question: "Are viruses living or non-living entities?",
        answer:
          "Viruses are placed at the borderline of living and non-living things due to their dual nature. Within a living host organism, they behave as living organisms and can replicate but outside a living host they remain as dead particles.",
      },
      {
        question:
          "Do viruses have both deoxyribose and ribose sugars in their nucleotides like bacteria?",
        answer:
          "No. This is the very basic nature of all viruses. They have either DNA or RNA as their nucleic acid but never both.",
      },
      {
        question:
          "Are triglycerides polar or nonpolar molecules? Why are they not soluble in water?",
        answer:
          "Triglycerides are non-polar and hydrophobic in nature. Being non-polar, they possess no net charge in them. Since they are hydrophobic they are not soluble in water.",
      },
    ],
    []
  );

  const [cards, setCards] = useState(qaData);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [flippedCardIdx, setFlippedCardIdx] = useState<number | null>(null);
  const [isFlippedOnce, setIsFlippedOnce] = useState(false);

  const swiperRef = useRef<SwiperCore | null>(null);

  const totalSlides = cards.length;

  const nextCard = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const prevCard = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const toggleShuffle = () => {
    setIsShuffled((prev) => {
      const next = !prev;
      if (next) {
        const shuffled = [...cards].sort(() => Math.random() - 0.5);
        setCards(shuffled);
      } else {
        setCards(qaData);
      }
      setSlideIndex(0);
      setIsSoundOn(false);
      setFlippedCardIdx(null);
      return next;
    });
  };

  // Flip handler
  const handleFlip = (idx: number) => {
    setFlippedCardIdx((prev) => (prev === idx ? null : idx));
  };

  // Autoplay effect
  useEffect(() => {
    if (!isPlaying) return;
    let timeout: NodeJS.Timeout;

    if (flippedCardIdx !== slideIndex) {
      timeout = setTimeout(() => {
        setFlippedCardIdx(slideIndex);
        setIsFlippedOnce(true);
      }, 3000); // show question for 3s
    } else {
      timeout = setTimeout(() => {
        if (slideIndex < cards.length - 1) {
          setFlippedCardIdx(null);
          if (swiperRef.current) {
            swiperRef.current.slideNext();
          }
        } else {
          setIsPlaying(false); // stop at last card
        }
      }, 3000); // show answer for 3s
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, slideIndex, flippedCardIdx, cards.length]);

  useEffect(() => {
    if (isPlaying) {
      setFlippedCardIdx(null);
    }
  }, [slideIndex, isPlaying]);

  return (
    <div className="container flashcard-page">
      <h1 className="flashcard-page__heading">
        CIE A Level - Biology Flashcards
      </h1>
      <h2 className="flashcard-page__subheading">Cell Structure</h2>
      <div className="header-card-container">
        <div className="header-card-container__head-cards">
          {[
            {
              src: "/images/flash-cards/flash-card.png",
              label: "Revision Notes",
            },
            {
              src: "/images/flash-cards/learn-icon.png",
              label: "Learn with Videos",
            },
            {
              src: "/images/flash-cards/test-icon.png",
              label: "Test Yourself",
            },
          ].map(({ src, label }) => (
            <Link href="https://www.homeschool.asia/" key={label}>
              <div className="cards" key={label}>
                <img
                  src={src}
                  alt="Flash Card Icon"
                  className="flash-card-icon"
                />
                <h1 className="card-heading">{label}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flip-card-container">
        <Swiper
          direction="horizontal"
          loop={false}
          slidesPerView={1}
          spaceBetween={150}
          allowTouchMove={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setSlideIndex(swiper.activeIndex);
            setFlippedCardIdx(null);
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {cards.map((card, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`flip-card ${
                  flippedCardIdx === idx ? " flipped" : ""
                }`}
                onClick={() => {
                  handleFlip(idx);
                  setIsFlippedOnce(true);
                }}
              >
                <div className="flip-card-inner">
                  {/* Front Side */}
                  <div className="flip-card-front">
                    {/* <div
                      className="action-icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="btn"
                        onClick={() => setIsSoundOn(!isSoundOn)}
                      >
                        {isSoundOn ? (
                          <HiOutlineSpeakerXMark size={20} color="white" />
                        ) : (
                          <HiOutlineSpeakerWave size={20} color="white" />
                        )}
                      </button>
                      <button
                        className="btn"
                        onClick={() => setIsStarred(!isStarred)}
                      >
                        {isStarred ? (
                          <FaStar size={20} fill="white" />
                        ) : (
                          <BiStar size={20} fill="white" />
                        )}
                      </button>
                    </div> */}
                    <div className="card-content">
                      <h1 className="main-text">{card.question}</h1>
                    </div>
                    {isPlaying || isShuffled ? (
                      <div className={`bottom-text`}>
                        {isPlaying && isShuffled
                          ? "Autoplay and Shuffle are active"
                          : isPlaying
                          ? "Autoplay is active"
                          : isShuffled
                          ? "Shuffle mode is active"
                          : null}
                      </div>
                    ) : (
                      <div
                        className={`bottom-text ${
                          isFlippedOnce ? "disable-bottom-text" : ""
                        }`}
                      >
                        Tap to flip and see the answer
                      </div>
                    )}
                  </div>
                  {/* Back Side */}
                  <div className="flip-card-back">
                    {/* <div
                      className="action-icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="btn"
                        onClick={() => setIsSoundOn(!isSoundOn)}
                      >
                        {isSoundOn ? (
                          <HiOutlineSpeakerXMark size={20} color="white" />
                        ) : (
                          <HiOutlineSpeakerWave size={20} color="white" />
                        )}
                      </button>
                      <button
                        className="btn"
                        onClick={() => setIsStarred(!isStarred)}
                      >
                        {isStarred ? (
                          <FaStar size={20} fill="white" />
                        ) : (
                          <BiStar size={20} fill="white" />
                        )}
                      </button>
                    </div> */}
                    <div className="card-content">
                      <h1 className="main-text">{card.answer}</h1>
                    </div>
                    {isPlaying ||
                      (isShuffled && (
                        <div className={`bottom-text`}>
                          {isPlaying && isShuffled
                            ? "Autoplay and Shuffle are active"
                            : isPlaying
                            ? "Autoplay is active"
                            : isShuffled
                            ? "Shuffle mode is active"
                            : null}
                        </div>
                      ))}
                    {/* <div className={`bottom-text`}>
                      Tap to flip and see the question
                    </div> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="card-action-buttons-container">
          <div className="card-action-buttons-container__buttons-layout play-buttons">
            <button
              className={`btn ${isPlaying && "active-div"}`}
              onClick={() => {
                setIsPlaying((prev) => !prev);
                setFlippedCardIdx(null);
              }}
            >
              {isPlaying ? (
                <FaPause size={20} className="activeAction" />
              ) : (
                <FaPlay size={20} fill="#586380" />
              )}
            </button>

            <button
              className={`btn ${isShuffled && "active-div"}`}
              onClick={toggleShuffle}
            >
              <MdShuffle
                size={26}
                className={`shuffle-btn ${isShuffled ? "activeAction" : ""}`}
              />
            </button>
          </div>

          <div className="card-action-buttons-container__buttons-layout">
            <button
              className={`btn arrow-btn swiper-button-prev ${
                slideIndex === 0 ? "disable-nav-btn" : ""
              }`}
              onClick={prevCard}
              disabled={slideIndex === 0}
            >
              <FaArrowLeft size={20} fill="#586380" />
            </button>

            <h3 className="pagination">
              {slideIndex + 1} / {cards.length}
            </h3>

            <button
              className={`btn arrow-btn swiper-button-next ${
                slideIndex === totalSlides - 1 ? "disable-nav-btn" : ""
              }`}
              onClick={() => {
                {
                  nextCard(), setIsFlippedOnce(true);
                }
              }}
            >
              <FaArrowRight size={20} fill="#586380" />
            </button>
          </div>

          {/* <div className="card-action-buttons-container__buttons-layout">
            <button className="btn">
              <MdFullscreen size={26} fill="#586380" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
