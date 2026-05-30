"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import FadeIn from "@/components/FadeIn";
import ReviewForm from "@/components/ReviewForm";
import { reviews as fallbackReviews } from "@/data/site";
import type { ReviewDisplay } from "@/types/review";
import { toReviewDisplay, toReviewDisplayFromStatic } from "@/types/review";

const AUTO_PLAY_MS = 5000;
const VISIBLE_COUNT = 3;

const fallbackDisplay: ReviewDisplay[] = fallbackReviews.map(toReviewDisplayFromStatic);

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewDisplay[]>(fallbackDisplay);
  const [slideIndex, setSlideIndex] = useState(1);
  const [noTransition, setNoTransition] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetch("/api/reviews?featured=true&limit=15")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.reviews?.length) {
          setReviews(data.reviews.map(toReviewDisplay));
        }
      })
      .catch(() => {});
  }, []);

  const pages = useMemo(() => {
    const result: ReviewDisplay[][] = [];
    const pageCount = Math.max(1, Math.ceil(reviews.length / VISIBLE_COUNT));
    for (let i = 0; i < pageCount; i++) {
      result.push(reviews.slice(i * VISIBLE_COUNT, i * VISIBLE_COUNT + VISIBLE_COUNT));
    }
    return result;
  }, [reviews]);

  const pageCount = pages.length;
  const canLoop = pageCount > 1;

  const extendedPages = useMemo(() => {
    if (!canLoop) return pages;
    return [pages[pageCount - 1], ...pages, pages[0]];
  }, [canLoop, pageCount, pages]);

  const activePage = useMemo(() => {
    if (!canLoop) return 0;
    if (slideIndex === 0) return pageCount - 1;
    if (slideIndex === pageCount + 1) return 0;
    return slideIndex - 1;
  }, [canLoop, pageCount, slideIndex]);

  useEffect(() => {
    setSlideIndex(canLoop ? 1 : 0);
    setNoTransition(false);
  }, [canLoop, pageCount]);

  const goNext = useCallback(() => {
    if (!canLoop) return;
    setSlideIndex((current) => current + 1);
  }, [canLoop]);

  const goPrev = useCallback(() => {
    if (!canLoop) return;
    setSlideIndex((current) => current - 1);
  }, [canLoop]);

  const goTo = useCallback(
    (targetPage: number) => {
      if (!canLoop) return;
      setSlideIndex(targetPage + 1);
    },
    [canLoop],
  );

  useEffect(() => {
    if (paused || !canLoop) return;
    const timer = setInterval(goNext, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [paused, canLoop, goNext]);

  const handleTransitionEnd = () => {
    if (!canLoop) return;

    if (slideIndex === 0) {
      setNoTransition(true);
      setSlideIndex(pageCount);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoTransition(false));
      });
      return;
    }

    if (slideIndex === pageCount + 1) {
      setNoTransition(true);
      setSlideIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoTransition(false));
      });
    }
  };

  return (
    <section id="reviews">
      <div className="section-inner">
        <FadeIn className="section-header">
          <span className="section-tag">用户评价</span>
          <h2>毛孩子家长的真实反馈</h2>
          <p>超过 8000 位宠物主人的信赖之选</p>
        </FadeIn>

        <FadeIn>
          <div
            className="reviews-carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <button
              type="button"
              className="reviews-carousel-btn reviews-carousel-btn--prev"
              aria-label="上一组评价"
              onClick={goPrev}
            >
              ‹
            </button>

            <div className="reviews-carousel-viewport">
              <div
                className={`reviews-carousel-slider${noTransition ? " reviews-carousel-slider--instant" : ""}`}
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedPages.map((pageReviews, pageIndex) => (
                  <div key={pageIndex} className="reviews-carousel-page">
                    {pageReviews.map((review) => (
                      <article key={review.id} className="review-card">
                        <div className="review-stars">{"★".repeat(review.stars)}</div>
                        <blockquote>{review.quote}</blockquote>
                        <div className="review-author">
                          <div className="avatar">{review.avatar}</div>
                          <div>
                            <strong>{review.author}</strong>
                            <span>{review.pet}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="reviews-carousel-btn reviews-carousel-btn--next"
              aria-label="下一组评价"
              onClick={goNext}
            >
              ›
            </button>

            <div className="reviews-carousel-dots" role="tablist" aria-label="评价切换">
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === activePage}
                  aria-label={`第 ${i + 1} 组评价`}
                  className={`reviews-carousel-dot${i === activePage ? " active" : ""}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        <ReviewForm />
      </div>
    </section>
  );
}
