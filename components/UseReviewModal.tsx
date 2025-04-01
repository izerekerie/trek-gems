import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useReviews } from "@/hooks/useReview";

const ReviewModal = ({ isOpen, selectedTour, closeModal, userId, review }) => {
  const { createReview, updateReview } = useReviews();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (review) {
      setRating(review.rating || 5);
      setComment(review.comment || "");
    }
  }, [review]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (review) {
        await updateReview(review.id, { rating, comment });
      } else {
        await createReview({
          userId,
          tourId: selectedTour.id,
          rating,
          comment,
        });
      }
      alert("Review saved successfully!");
      closeModal();
    } catch (error) {
      alert("Failed to save review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg font-semibold">
            {review ? "Edit Review" : "Add Review"} for {selectedTour?.title}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Stars
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 disabled:bg-green-300"
            >
              {loading
                ? "Saving..."
                : review
                ? "Update Review"
                : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
