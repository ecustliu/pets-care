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
  const [page, setPage] = useState(0);
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

  const pageCount = Math.max(1, Math.ceil(reviews.length / VISIBLE_COUNT));

  const goTo = useCallback(
    (next: number) => {
      setPage((next + pageCount) % pageCount);
    },
    [pageCount],
  );

  const goPrev = useCallback(() => goTo(page - 1), [goTo, page]);
  const goNext = useCallback(() => goTo(page + 1), [goTo, page]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => goTo(page + 1), AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [paused, page, goTo]);

  useEffect(() => {
    if (page >= pageCount) {
      setPage(0);
    }
  }, [page, pageCount]);

  const pages = useMemo(() => {
    const result: ReviewDisplay[][] = [];
    for (let i = 0; i < pageCount; i++) {
      result.push(reviews.slice(i * VISIBLE_COUNT, i * VISIBLE_COUNT + VISIBLE_COUNT));
    }
    return result;
  }, [reviews, pageCount]);

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
                className="reviews-carousel-slider"
                style={{ transform: `translateX(-${page * 100}%)` }}
              >
                {pages.map((pageReviews, pageIndex) => (
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
                  aria-selected={i === page}
                  aria-label={`第 ${i + 1} 组评价`}
                  className={`reviews-carousel-dot${i === page ? " active" : ""}`}
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
