import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, Maximize, MapPin, Bath, Coffee, Wifi, ArrowLeft, IndianRupee } from "lucide-react";
import { ApartmentProps } from "@/components/ApartmentCard";
import BookingForm from "@/components/BookingForm";

// Sample apartments data
const allApartments: ApartmentProps[] = [
  {
    id: "1",
    name: "Deluxe Sea View Suite",
    description: "Luxurious suite with panoramic sea views, modern amenities, and a private balcony.",
    price: 180,
    capacity: 2,
    size: 45,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Balcony"]
  },
  {
    id: "2",
    name: "Premium Family Apartment",
    description: "Spacious apartment ideal for families, with full kitchen and stunning coastal views.",
    price: 250,
    capacity: 4,
    size: 75,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    location: "Second row",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Washing Machine"]
  },
  {
    id: "3",
    name: "Executive Beach Studio",
    description: "Elegant studio with direct beach access, modern design, and premium finishes.",
    price: 150,
    capacity: 2,
    size: 35,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Kitchenette", "Bathroom", "Air Conditioning", "TV"]
  },
  {
    id: "4",
    name: "Luxury Penthouse Suite",
    description: "Exclusive top-floor suite with expansive terrace and panoramic sea views.",
    price: 350,
    capacity: 4,
    size: 90,
    image: "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=800&h=600&fit=crop",
    location: "Beachfront",
    features: ["Wi-Fi", "Full Kitchen", "2 Bathrooms", "Air Conditioning", "TV", "Terrace", "Jacuzzi"]
  },
  {
    id: "5",
    name: "Classic Double Room",
    description: "Comfortable hotel room with modern amenities and partial sea views.",
    price: 120,
    capacity: 2,
    size: 28,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
    location: "Hotel building",
    features: ["Wi-Fi", "Bathroom", "Air Conditioning", "TV", "Mini Fridge"]
  },
  {
    id: "6",
    name: "Garden View Apartment",
    description: "Peaceful apartment surrounded by lush gardens, just a short walk from the beach.",
    price: 160,
    capacity: 3,
    size: 55,
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop",
    location: "Garden area",
    features: ["Wi-Fi", "Kitchen", "Bathroom", "Air Conditioning", "TV", "Terrace"]
  },
];

export default function ApartmentDetails() {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState<ApartmentProps | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Find the apartment with the matching ID
    const foundApartment = allApartments.find(apt => apt.id === id);
    setApartment(foundApartment || null);
  }, [id]);

  if (!apartment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="container text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Apartment Not Found</h1>
            <p className="mb-6">We couldn't find the apartment you're looking for.</p>
            <Button onClick={() => navigate('/apartments')}>Return to Apartments</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Use translated name and description if available
  const translatedName = t.apartmentDescriptions[apartment.id]?.name 
    ? t.apartmentDescriptions[apartment.id].name 
    : apartment.name;
    
  const translatedDescription = t.apartmentDescriptions[apartment.id]?.description 
    ? t.apartmentDescriptions[apartment.id].description 
    : apartment.description;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section with Image */}
        <section className="relative h-[60vh]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${apartment.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
          <div className="container h-full relative z-10 flex flex-col justify-end pb-10">
            <Button 
              variant="outline" 
              onClick={() => navigate('/apartments')} 
              className="mb-4 w-fit bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Apartments
            </Button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {translatedName}
            </h1>
            <div className="flex items-center text-white/90 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg">{apartment.location}</span>
            </div>
          </div>
        </section>
        
        {/* Details Section */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8 animate-fade-in">
                {/* Overview */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Overview</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {translatedDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      <span>{apartment.capacity} {apartment.capacity === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <div className="flex items-center">
                      <Maximize className="h-5 w-5 text-primary mr-2" />
                      <span>{apartment.size} m²</span>
                    </div>
                    <div className="flex items-center">
                      <IndianRupee className="h-5 w-5 text-primary mr-2" />
                      <span>₹{apartment.price} / {t.booking.summary.night}</span>
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {apartment.features.map((feature, index) => (
                      <div key={index} className="flex items-center p-3 rounded-lg bg-muted">
                        {feature === "Bathroom" && <Bath className="h-5 w-5 mr-3 text-primary" />}
                        {feature === "Kitchen" && <Coffee className="h-5 w-5 mr-3 text-primary" />}
                        {feature === "Wi-Fi" && <Wifi className="h-5 w-5 mr-3 text-primary" />}
                        {feature !== "Bathroom" && feature !== "Kitchen" && feature !== "Wi-Fi" && 
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                            <span className="text-xs text-primary">✓</span>
                          </div>
                        }
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Description</h2>
                  <div className="prose max-w-none text-muted-foreground">
                    <p>
                      Enjoy your stay in this beautiful {apartment.name.toLowerCase()} located in the {apartment.location.toLowerCase()} area. 
                      The {apartment.size} m² space is perfect for {apartment.capacity} guests, offering modern amenities and 
                      all the comforts you need for a relaxing vacation.
                    </p>
                    <p className="mt-4">
                      The apartment features {apartment.features.join(", ")}, ensuring a comfortable 
                      and convenient stay. The location provides easy access to the beach, local 
                      restaurants, and attractions.
                    </p>
                    <p className="mt-4">
                      Book now to secure your stay in this highly sought-after accommodation!
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Booking Form */}
              <div className="animate-fade-in [animation-delay:300ms]">
                <div className="sticky top-24">
                  <div className="glass-card p-6 rounded-xl mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold">₹{apartment.price}</span>
                      <span className="text-muted-foreground">per night</span>
                    </div>
                    <BookingForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
