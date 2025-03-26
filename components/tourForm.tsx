import { useState, useEffect } from "react";
import { X, Upload, Trash } from "lucide-react";
import Image from "next/image";
import { useTours } from "@/hooks/useTour";
import { useAuth } from "@/lib/auth-context";

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour?: {
    id?: string;
    title?: string;
    description?: string;
    location?: string;
    price?: number;
    images?: string[];
  };
}

export default function TourModal({ isOpen, onClose, tour }: TourModalProps) {
  const { createTour, updateTour } = useTours();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: 0,
    images: [],
    userId: user?.id || "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (tour) {
      setFormData({
        title: tour.title || "",
        description: tour.description || "",
        location: tour.location || "",
        price: tour.price || 0,
        images: tour.images || [],
        userId: user?.id || "",
      });
      setPreviewImages(tour.images || []);
    }
  }, [tour]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImageFiles([...imageFiles, ...selectedFiles]);

      // Create URL previews for the selected images
      const newPreviewImages = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages([...previewImages, ...newPreviewImages]);
    }
  };

  const removeImage = (index) => {
    // Remove from preview
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);

    // If it's a new image (not yet uploaded), remove from imageFiles too
    if (index < imageFiles.length) {
      const updatedFiles = [...imageFiles];
      updatedFiles.splice(index, 1);
      setImageFiles(updatedFiles);
    } else {
      // It's an existing image, remove from formData.images
      const existingIndex = index - imageFiles.length;
      const updatedImages = [...formData.images];
      updatedImages.splice(existingIndex, 1);
      setFormData({
        ...formData,
        images: updatedImages,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      if (tour) {
        // Update existing tour
        await updateTour(tour.id, formData, imageFiles);
      } else {
        // Create new tour
        await createTour(formData, imageFiles);
      }
      onClose();
    } catch (error) {
      console.error("Error saving tour:", error);
      alert("Failed to save tour. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-green-800 text-white">
          <h2 className="text-xl font-semibold">
            {tour ? "Edit Tour" : "Add New Tour"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-green-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tour Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Person ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min={0}
              step={0.01}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tour Images
            </label>

            <div className="flex flex-wrap gap-4 mb-4">
              {previewImages.map((img, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border rounded-md overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`Preview ${index}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              ))}

              <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                <Upload size={24} className="text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-sm text-gray-500">
              You can upload multiple images. Recommended size: 800x600px.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 disabled:bg-green-300"
            >
              {uploading ? "Saving..." : tour ? "Update Tour" : "Create Tour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
