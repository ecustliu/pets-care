"use client";

import { FormEvent, useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";
import { contactInfo, petTypes, serviceOptions } from "@/data/site";

type ContactProps = {
  selectedService: string;
};

type BookingForm = {
  ownerName: string;
  phone: string;
  petName: string;
  petType: string;
  service: string;
  date: string;
  time: string;
  notes: string;
};

function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDefaultBookingDateTime() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return {
    date: formatLocalDate(tomorrow),
    time: "09:00",
  };
}

export default function Contact({ selectedService }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<BookingForm>(() => {
    const { date, time } = getDefaultBookingDateTime();
    return {
      ownerName: "",
      phone: "",
      petName: "",
      petType: "",
      service: selectedService,
      date,
      time,
      notes: "",
    };
  });

  useEffect(() => {
    if (selectedService) {
      setForm((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const today = formatLocalDate(new Date());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  return (
    <section className="contact" id="contact">
      <div className="section-inner">
        <FadeIn className="section-header">
          <span className="section-tag">预约咨询</span>
          <h2>给毛孩子预约一次洗护吧</h2>
          <p>填写表单，我们将在 30 分钟内与您联系确认预约时间</p>
        </FadeIn>
        <div className="contact-grid">
          <FadeIn className="contact-info">
            {contactInfo.map((item) => (
              <div key={item.title} className="contact-item">
                <div className="icon">{item.icon}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </FadeIn>
          <FadeIn className="contact-form">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ownerName">您的姓名</label>
                    <input
                      id="ownerName"
                      type="text"
                      placeholder="请输入姓名"
                      required
                      value={form.ownerName}
                      onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">联系电话</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="请输入手机号"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="petName">宠物名字</label>
                    <input
                      id="petName"
                      type="text"
                      placeholder="毛孩子叫什么？"
                      required
                      value={form.petName}
                      onChange={(e) => setForm({ ...form, petName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="petType">宠物类型</label>
                    <select
                      id="petType"
                      required
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
                </div>
                <div className="form-group">
                  <label htmlFor="service">预约服务</label>
                  <select
                    id="service"
                    required
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option value="">请选择服务套餐</option>
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">期望日期</label>
                    <input
                      id="date"
                      type="date"
                      required
                      min={today}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">具体时间</label>
                    <input
                      id="time"
                      type="time"
                      required
                      min="09:00"
                      max="21:00"
                      step="900"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="notes">备注说明</label>
                  <textarea
                    id="notes"
                    placeholder="如有特殊需求或宠物注意事项，请在此说明..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>
                {error && (
                  <p style={{ color: "#e74c3c", marginBottom: 16, fontSize: "0.9rem" }}>
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={loading}
                >
                  {loading ? "提交中..." : "提交预约"}
                </button>
              </form>
            ) : (
              <div className="form-success show">
                <div className="icon">🎉</div>
                <h3>预约提交成功！</h3>
                <p>我们已收到您的预约信息，客服将在 30 分钟内与您联系确认。</p>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
