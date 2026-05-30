"use client";

import { FormEvent, useState } from "react";
import FadeIn from "@/components/FadeIn";
import { petTypes } from "@/data/site";
import { servicePackageOptions } from "@/types/service-package";
import type { ServicePackage } from "@/types/service-package";

export default function ReviewForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stars, setStars] = useState(5);
  const [form, setForm] = useState({
    authorName: "",
    petInfo: "",
    content: "",
    petType: "",
    packageType: "" as ServicePackage | "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          stars,
          packageType: form.packageType || undefined,
          petType: form.petType || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "提交失败，请稍后重试");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "提交失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <FadeIn className="review-form-success">
        <div className="icon">🎉</div>
        <h3>感谢您的评价！</h3>
        <p>我们已收到您的反馈，审核通过后将展示在首页。</p>
      </FadeIn>
    );
  }

  return (
    <FadeIn className="review-form">
      <h3>分享您的体验</h3>
      <p>服务完成后，欢迎留下真实评价，帮助更多毛孩子家长做选择</p>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="reviewAuthor">您的称呼</label>
            <input
              id="reviewAuthor"
              type="text"
              placeholder="如：李女士"
              required
              value={form.authorName}
              onChange={(e) => setForm({ ...form, authorName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reviewPet">宠物信息</label>
            <input
              id="reviewPet"
              type="text"
              placeholder="品种 · 名字，如：柯基 · 土豆"
              required
              value={form.petInfo}
              onChange={(e) => setForm({ ...form, petInfo: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="reviewPetType">宠物类型（选填）</label>
            <select
              id="reviewPetType"
              value={form.petType}
              onChange={(e) => setForm({ ...form, petType: e.target.value })}
            >
              <option value="">请选择</option>
              {petTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="reviewPackage">体验套餐（选填）</label>
            <select
              id="reviewPackage"
              value={form.packageType}
              onChange={(e) =>
                setForm({ ...form, packageType: e.target.value as ServicePackage | "" })
              }
            >
              <option value="">请选择</option>
              {servicePackageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>评分</label>
          <div className="review-star-picker" role="group" aria-label="评分">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className={`review-star-btn${value <= stars ? " active" : ""}`}
                aria-label={`${value} 星`}
                onClick={() => setStars(value)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="reviewContent">评价内容</label>
          <textarea
            id="reviewContent"
            placeholder="分享您的洗护体验..."
            required
            minLength={10}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>
        {error && <p className="review-form-error">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "提交中..." : "提交评价"}
        </button>
      </form>
    </FadeIn>
  );
}
