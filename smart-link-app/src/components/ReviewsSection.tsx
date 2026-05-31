"use client";

import { useState, useRef, useEffect } from "react";

interface Review {
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewsSectionProps {
  slug: string;
  reviews: Review[];
  isDemo: boolean;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "text-sm" : "text-lg";
  return (
    <span className={`${sizeClass}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "text-yellow-400" : "text-gray-200"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ReviewForm({ slug, isDemo, onSuccess }: { slug: string; isDemo: boolean; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!comment.trim()) {
      setError("Please write a comment");
      return;
    }

    if (isDemo) {
      // Store in localStorage
      const reviewsKey = `smartlink_reviews_${slug}`;
      const existing = JSON.parse(localStorage.getItem(reviewsKey) || "[]");
      existing.push({
        customer_name: name.trim(),
        rating,
        comment: comment.trim(),
        created_at: new Date().toISOString().split("T")[0],
      });
      localStorage.setItem(reviewsKey, JSON.stringify(existing));
      setSubmitted(true);
      setName("");
      setRating(0);
      setComment("");
      setError("");
      onSuccess();
    } else {
      // Live mode — would submit to Supabase
      setError("Reviews require a connected database");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6 bg-green-50 rounded-xl border border-green-200">
        <p className="text-green-700 font-medium">✓ Thank you! Your review has been submitted.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm text-green-600 hover:text-green-700 underline"
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Your rating:</span>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="text-2xl transition-transform hover:scale-110 focus:outline-none"
            >
              <span className={star <= (hoveredRating || rating) ? "text-yellow-400" : "text-gray-300"}>
                ★
              </span>
            </button>
          ))}
        </div>
      </div>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <textarea
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
      >
        Submit Review
      </button>
    </form>
  );
}

export default function ReviewsSection({ slug, reviews, isDemo }: ReviewsSectionProps) {
  const [showForm, setShowForm] = useState(false);

  // Load demo reviews from localStorage
  const [localReviews, setLocalReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (isDemo) {
      const reviewsKey = `smartlink_reviews_${slug}`;
      const stored = JSON.parse(localStorage.getItem(reviewsKey) || "[]");
      setLocalReviews(stored);
    }
  }, [slug, isDemo]);

  const allReviews = [...reviews, ...localReviews];
  const avgRating = allReviews.length > 0
    ? Math.round((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length) * 10) / 10
    : 0;

  if (!isDemo && allReviews.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xl font-semibold text-gray-900">
          Reviews
        </h2>
        {allReviews.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(avgRating)} size="md" />
            <span className="text-gray-600 font-medium">{avgRating}</span>
            <span className="text-gray-400 text-sm">({allReviews.length})</span>
          </div>
        )}
      </div>

      {allReviews.length > 0 && (
        <div className="space-y-3 mb-6">
          {allReviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                    {review.customer_name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-900 text-sm">{review.customer_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} size="sm" />
                  <span className="text-xs text-gray-400">{formatDate(review.created_at)}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-100 pt-4">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors font-medium text-sm"
          >
            {allReviews.length > 0 ? "Write a Review" : "Be the first to review"}
          </button>
        ) : (
          <ReviewForm
            slug={slug}
            isDemo={isDemo}
            onSuccess={() => {
              // Reload local reviews
              if (isDemo) {
                const reviewsKey = `smartlink_reviews_${slug}`;
                setLocalReviews(JSON.parse(localStorage.getItem(reviewsKey) || "[]"));
              }
            }}
          />
        )}
      </div>

      {isDemo && (
        <p className="text-center text-xs text-gray-400 mt-3">
          Demo mode — reviews are stored in your browser
        </p>
      )}
    </section>
  );
}
