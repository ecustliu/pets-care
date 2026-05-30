"use client";

import { useCallback, useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";
import { reviews } from "@/data/site";

const AUTO_PLAY_MS = 5000;
const VISIBLE_COUNT = 3;
const PAGE_COUNT = Math.ceil(reviews.length / VISIBLE_COUNT);

export default function Reviews() {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((next: number) => {
    setPage((next + PAGE_COUNT) % PAGE_COUNT);
  }, []);

  const goPrev = useCallback(() => goTo(page - 1), [goTo, page]);
  const goNext = useCallback(() => goTo(page + 1), [goTo, page]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => goTo(page + 1), AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [paused, page, goTo]);

  const visible = reviews.slice(page * VISIBLE_COUNT, page * VISIBLE_COUNT + VISIBLE_COUNT);

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
              <div key={page} className="reviews-carousel-track">
                {visible.map((review) => (
                  <article key={review.author} className="review-card">
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
              {Array.from({ length: PAGE_COUNT }, (_, i) => (
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
      </div>
    </section>
  );
}
