import hall1 from "../assets/gallery/hall1.jpg";
import hall2 from "../assets/gallery/hall2.jpg";
import hall3 from "../assets/gallery/hall3.jpg";

function GalleryPage() {
  const photos = [hall1, hall2, hall3];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-purple-700 text-center mb-8">
        Gallery
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Gallery ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition"
          />
        ))}
      </div>

      <p className="text-center text-gray-600 mt-8">
        Explore our banquet hall and event spaces.
      </p>
    </div>
  );
}

export default GalleryPage;