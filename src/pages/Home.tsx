import React, { useState, useEffect } from 'react';
import { Star, Menu, X } from 'lucide-react';
import { toast } from 'sonner';
import logo from '../assets/logo-silverpin.png';
import uteImage from '../assets/ute.jpeg';
import ImageCarousel from '../components/ImageCarousel';
import { fetchLatestReviews, CustomerReview } from '../services/reviewsApi';
import '../styles/cascade.css';

// Use CustomerReview interface from reviewsApi
type Review = CustomerReview & { id?: number; comment?: string; };

const Home: React.FC = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  // Fetch reviews on component mount
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setReviewsLoading(true);
        setReviewsError(null);
        const latestReviews = await fetchLatestReviews(6);
        // Transform CustomerReview to Review format for compatibility
        const transformedReviews = latestReviews.map((review, index) => ({
          ...review,
          id: index + 1,
          comment: review.review // Map 'review' field to 'comment' for backward compatibility
        }));
        setReviews(transformedReviews);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        setReviewsError('Failed to load customer reviews from NoCowboys. Please try again later.');
      } finally {
        setReviewsLoading(false);
      }
    };

    loadReviews();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    toast.success('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('overflow-hidden');
  };

  const services = [
    {
      icon: "fas fa-home",
      title: "Residential Electrical",
      description: "Complete home electrical services including wiring, outlets, lighting, and safety inspections."
    },
    {
      icon: "fas fa-building",
      title: "Commercial Solutions",
      description: "Professional electrical installations and maintenance for businesses and commercial properties."
    },
    {
      icon: "fas fa-clock",
      title: "Emergency Services",
      description: "24/7 emergency electrical repairs and troubleshooting when you need it most."
    }
  ];

  // Portfolio images are now handled by the ImageCarousel component

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 100px;
        }
        body {
          font-family: 'Inter', sans-serif;
          color: #333;
          line-height: 1.6;
        }
        .silverpin-red {
          color: #E73337;
        }
        .silverpin-red-bg {
          background-color: #E73337;
        }
        .silverpin-dark {
          color: #0F1A2A;
        }
        .silverpin-dark-bg {
          background-color: #0F1A2A;
        }
        .hero-section {
          background: linear-gradient(rgba(15, 26, 42, 0.9), rgba(15, 26, 42, 0.9)), url('${uteImage}') no-repeat center bottom;
          background-size: cover;
          min-height: 90vh;
        }
        .floating-contact {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 99;
        }
        .service-card {
          transition: all 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .contact-form input,
        .contact-form textarea {
          transition: border-color 0.3s ease;
        }
        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: #E73337;
          outline: none;
        }
        .btn-primary {
          background-color: #E73337;
          color: white;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          background-color: #d42d31;
          transform: translateY(-2px);
        }
        .cta-section {
          background: linear-gradient(rgba(15, 26, 42, 0.9), rgba(15, 26, 42, 0.9)), url('https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=electrical%20tools%20and%20equipment%20professional%20electrical%20work%20background&image_size=landscape_16_9') no-repeat center center;
          background-size: cover;
        }
        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 999 !important;
          background-color: white !important;
        }
        #mobileMenu {
          z-index: 1000 !important;
        }
        .sticky-header .nav-link {
          position: relative;
          display: inline-block;
        }
        .sticky-header .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: #E73337;
          transition: width 0.3s ease;
        }
        .sticky-header .nav-link:hover::after {
          width: 100%;
        }
        .sticky-header #mobileMenuBtn {
          display: none;
        }
        @media (max-width: 1024px) {
          .sticky-header #mobileMenuBtn {
            display: block !important;
          }
        }
        .pulsing-btn {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(231, 51, 55, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(231, 51, 55, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(231, 51, 55, 0);
          }
        }
        .zoom-on-hover:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
      `}</style>
      
      <div className="min-h-screen bg-white">
        {/* Sticky Header */}
        <header className="sticky-header bg-white shadow-md">
          {/* Quick Contact Bar */}
          <div className="quick-contact py-2">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-6">
                  <span className="flex items-center">
                    <i className="fas fa-phone mr-2"></i>
                    0800 SILVERPIN
                  </span>
                  <span className="flex items-center">
                    <i className="fas fa-envelope mr-2"></i>
                    info@silverpinelectrical.co.nz
                  </span>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                  <span>Follow Us:</span>
                  <a href="#" className="hover:text-red-400">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="hover:text-red-400">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto py-4 px-4 md:px-6">
            <nav className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="#" className="flex items-center">
                  <img src={logo} alt="Silver Pin Electrical Logo" className="h-14" />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button id="mobileMenuBtn" onClick={toggleMobileMenu} className="lg:hidden text-gray-700 hover:text-red-600 focus:outline-none">
                <i className="fas fa-bars text-2xl"></i>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center justify-between flex-grow ml-10">
                <div className="flex space-x-8">
                  <a href="#" className="nav-link font-medium text-gray-700 hover:text-red-600 transition-all relative">Home</a>
                  <a href="#who-we-are" className="nav-link font-medium text-gray-700 hover:text-red-600 transition-all relative">Who We Are</a>
                  <a href="#what-we-do" className="nav-link font-medium text-gray-700 hover:text-red-600 transition-all relative">What We Do</a>
                  <a href="#why-choose-us" className="nav-link font-medium text-gray-700 hover:text-red-600 transition-all relative">Why Choose Us?</a>
                  <a href="#team" className="nav-link font-medium text-gray-700 hover:text-red-600 transition-all relative">Team</a>
                </div>
                <div className="flex items-center space-x-6">
                  <a href="tel:0273375190" className="flex items-center text-gray-700 hover:text-red-600 transition-all">
                    <i className="fas fa-phone-alt mr-2 text-red-600"></i>
                    <span className="font-medium">027 337 5190</span>
                  </a>
                  <a href="#contact" className="btn-primary px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300">Contact Us</a>
                </div>
              </div>

              {/* Mobile Menu (Hidden by default) */}
              <div id="mobileMenu" className={`fixed inset-0 bg-white z-50 lg:hidden ${isMenuOpen ? '' : 'hidden'}`}>
                <div className="container mx-auto px-4 py-6">
                  <div className="flex justify-between items-center mb-8">
                    <a href="#" className="flex items-center">
                      <img src={logo} alt="Silver Pin Electrical Logo" className="h-12" />
                    </a>
                    <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-red-600 focus:outline-none">
                      <i className="fas fa-times text-2xl"></i>
                    </button>
                  </div>
                  <div className="flex flex-col space-y-6">
                    <a href="#" className="text-xl font-medium text-gray-800 hover:text-red-600 transition-all">Home</a>
                    <a href="#who-we-are" className="text-xl font-medium text-gray-800 hover:text-red-600 transition-all">Who We Are</a>
                    <a href="#what-we-do" className="text-xl font-medium text-gray-800 hover:text-red-600 transition-all">What We Do</a>
                    <a href="#why-choose-us" className="text-xl font-medium text-gray-800 hover:text-red-600 transition-all">Why Choose Us?</a>
                    <a href="#team" className="text-xl font-medium text-gray-800 hover:text-red-600 transition-all">Team</a>
                    <div className="pt-6 border-t border-gray-200">
                      <a href="tel:0273375190" className="flex items-center text-xl font-medium text-gray-800 hover:text-red-600 mb-6">
                        <i className="fas fa-phone-alt mr-3 text-red-600"></i>
                        027 337 5190
                      </a>
                      <a href="#contact" className="btn-primary w-full text-center px-6 py-4 rounded-full font-semibold shadow-lg">Contact Us</a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section 
          className="flex items-center justify-center text-white h-[70vh] bg-cover bg-no-repeat relative"
          style={{
            backgroundImage: `url(${uteImage})`,
            backgroundPosition: 'calc(50% + 16px) 40%'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-80"></div>
            <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Professional Electrical Services
              <span className="block silverpin-red">You Can Trust</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Licensed electricians providing reliable, safe, and efficient electrical solutions for homes and businesses across Auckland.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
                Get Free Quote
              </a>
              <a href="tel:0273375190" className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center">
                <i className="fas fa-phone-alt mr-2"></i>
                Call Now: 027 337 5190
              </a>
            </div>
          </div>
        </section>

        {/* Quick Contact Bar */}
        <section className="silverpin-red-bg text-white py-4">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <div className="flex items-center mb-2 md:mb-0">
                <i className="fas fa-phone-alt mr-2"></i>
                <span className="font-medium">Emergency Service: 027 337 5190</span>
              </div>
              <div className="flex items-center mb-2 md:mb-0">
                <i className="fas fa-envelope mr-2"></i>
                <span className="font-medium">silverpinelectrical@gmail.com</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-clock mr-2"></i>
                <span className="font-medium">24/7 Emergency Service</span>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section id="what-we-do" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 silverpin-dark">
                What We Do
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive electrical services for residential and commercial clients across Auckland.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="service-card bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="silverpin-red-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-clock text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 silverpin-dark">24/7 Emergency Electrical Services</h3>
                  <p className="text-gray-600">Round-the-clock emergency electrical repairs and troubleshooting when you need it most. Fast response times guaranteed for urgent electrical issues.</p>
                </div>
              </div>
              
              <div className="service-card bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="silverpin-red-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-home text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 silverpin-dark">Comprehensive Residential and Commercial Electrical Solutions</h3>
                  <p className="text-gray-600">Complete electrical services for homes, businesses, and commercial properties. From simple repairs to complex installations.</p>
                </div>
              </div>
              
              <div className="service-card bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="silverpin-red-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-tools text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 silverpin-dark">Electrical Maintenance and Repair Services</h3>
                  <p className="text-gray-600">Professional maintenance and repair services to keep your electrical systems running safely and efficiently.</p>
                </div>
              </div>
              
              <div className="service-card bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="silverpin-red-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-hammer text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 silverpin-dark">Renovation Electrical Work</h3>
                  <p className="text-gray-600">Specialized electrical services for home and commercial renovations, ensuring your upgraded spaces meet modern electrical standards.</p>
                </div>
              </div>
              
              <div className="service-card bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="silverpin-red-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-lightbulb text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 silverpin-dark">Lighting System Upgrades and Installations</h3>
                  <p className="text-gray-600">Modern lighting solutions including LED upgrades, smart lighting systems, and custom lighting installations for any space.</p>
                </div>
              </div>
              
              <div className="service-card bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="silverpin-red-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-bolt text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 silverpin-dark">Power System Upgrades and Installations</h3>
                  <p className="text-gray-600">Electrical panel upgrades, circuit installations, and power distribution solutions to meet your growing electrical needs.</p>
                </div>
              </div>
              
              <div className="service-card bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="silverpin-red-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-thermometer-half text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 silverpin-dark">Heat Pump Installation Services</h3>
                  <p className="text-gray-600">Professional electrical installation and setup for heat pump systems, ensuring efficient and safe operation for your heating and cooling needs.</p>
                </div>
              </div>
              
              <div className="service-card bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="silverpin-red-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-wind text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 silverpin-dark">Ventilation System Electrical Work</h3>
                  <p className="text-gray-600">Electrical installations and connections for ventilation systems, exhaust fans, and air circulation equipment.</p>
                </div>
              </div>
              
              <div className="service-card bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="silverpin-red-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-shield-alt text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 silverpin-dark">Alarm System Installations and Maintenance</h3>
                  <p className="text-gray-600">Complete electrical setup for security alarm systems, smoke detectors, and safety monitoring equipment with ongoing maintenance support.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section id="who-we-are" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 silverpin-dark">
                  Who We Are
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Silver Pin Electrical is Auckland's trusted electrical contractor, providing comprehensive electrical services to residential and commercial clients. With over 15 years of experience, our team of licensed electricians is committed to delivering safe, reliable, and efficient electrical solutions.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  We pride ourselves on our attention to detail, professional workmanship, and exceptional customer service. From simple repairs to complex installations, we approach every project with the same level of dedication and expertise.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold silverpin-red mb-2">15+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold silverpin-red mb-2">500+</div>
                    <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold silverpin-red mb-2">100%</div>
                    <div className="text-gray-600">Licensed & Insured</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold silverpin-red mb-2">24/7</div>
                    <div className="text-gray-600">Emergency Service</div>
                  </div>
                </div>
              </div>
              <div>
                <img src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20electrician%20team%20working%20on%20electrical%20installation%20with%20safety%20equipment%20and%20tools&image_size=square_hd" alt="Silver Pin Electrical Team" className="rounded-lg shadow-lg zoom-on-hover" />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 silverpin-dark">
                Why Choose Silver Pin Electrical?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're committed to providing exceptional electrical services with a focus on safety, quality, and customer satisfaction.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="silverpin-red-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-certificate text-white text-3xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 silverpin-dark">Licensed & Certified</h3>
                <p className="text-gray-600">All our electricians are fully licensed, certified, and regularly trained on the latest electrical codes and safety standards.</p>
              </div>
              
              <div className="text-center">
                <div className="silverpin-red-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-clock text-white text-3xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 silverpin-dark">24/7 Emergency Service</h3>
                <p className="text-gray-600">Electrical emergencies don't wait for business hours. We're available 24/7 to handle urgent electrical issues safely and efficiently.</p>
              </div>
              
              <div className="text-center">
                <div className="silverpin-red-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-shield-alt text-white text-3xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 silverpin-dark">Fully Insured</h3>
                <p className="text-gray-600">We carry comprehensive insurance coverage to protect you and your property, giving you complete peace of mind.</p>
              </div>
              
              <div className="text-center">
                <div className="silverpin-red-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-thumbs-up text-white text-3xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-4 silverpin-dark">Quality Guarantee</h3>
                <p className="text-gray-600">We stand behind our work with a comprehensive warranty and guarantee on all electrical installations and repairs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* NoCowboys Live Reviews Section */}
        <section id="nocowboys-reviews" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 silverpin-dark">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it - see what our satisfied customers have to say about our electrical services.
              </p>
            </div>
            
            {reviewsLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                <p className="mt-4 text-gray-600">Loading customer reviews...</p>
              </div>
            ) : reviewsError ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{reviewsError}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn-primary px-6 py-3 rounded-lg"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow h-72 flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                        <span className="ml-2 text-gray-600 text-sm">({review.rating}/5)</span>
                      </div>
                      <p className="text-gray-700 mb-4 italic flex-1 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical'}}>"{review.comment}"</p>
                      <div className="border-t pt-4 mt-auto">
                        <p className="font-semibold silverpin-dark">{review.name}</p>
                        <p className="text-sm text-gray-600">{review.service}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center mb-4">
                      <img 
                        src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=NoCowboys%20logo%20professional%20review%20platform%20badge&image_size=square" 
                        alt="NoCowboys Reviews" 
                        className="w-16 h-16 mr-4"
                      />
                      <div>
                        <h3 className="text-xl font-bold silverpin-dark">Verified Reviews</h3>
                        <p className="text-gray-600">Powered by NoCowboys.co.nz</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">
                      All our reviews are independently verified through NoCowboys, New Zealand's trusted platform for finding reliable tradespeople.
                    </p>
                    <a 
                      href="https://www.nocowboys.co.nz/businesses/silver-pin-electrical-services?utm_source=nc_search#ratings" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary px-8 py-3 rounded-lg inline-flex items-center hover:scale-105 transition-transform"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      View All Reviews on NoCowboys
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section text-white py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Contact us today for a free consultation and quote. Our expert electricians are ready to help with all your electrical needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
                Get Free Quote
              </a>
              <a href="tel:0273375190" className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center">
                <i className="fas fa-phone-alt mr-2"></i>
                Call Now: 027 337 5190
              </a>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 silverpin-dark">
                Our Recent Work
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse through our portfolio of completed electrical projects and installations.
              </p>
            </div>
            
            <ImageCarousel autoPlay={true} autoPlayInterval={5000} />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Ready to get started? Contact us today for professional electrical services and free quotes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-red-500 text-xl mt-1 mr-4"></i>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Service Areas</h3>
                    <p className="text-gray-300">
                      Auckland, Hamilton, Tauranga, and surrounding regions
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-phone text-red-500 text-xl mt-1 mr-4"></i>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Phone</h3>
                    <p className="text-gray-300">
                      <a href="tel:0273375190" className="hover:text-red-400 transition-colors">
                        027 337 5190
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-envelope text-red-500 text-xl mt-1 mr-4"></i>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <p className="text-gray-300">
                      <a href="mailto:silverpinelectrical@gmail.com" className="hover:text-red-400 transition-colors">
                        silverpinelectrical@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-clock text-red-500 text-xl mt-1 mr-4"></i>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
                    <div className="text-gray-300">
                      <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                      <p>Saturday: 8:00 AM - 4:00 PM</p>
                      <p>Sunday: Emergency calls only</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 pt-6">
                  <span className="text-gray-300">Follow Us:</span>
                  <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                    <i className="fab fa-facebook-f text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                    <i className="fab fa-linkedin-in text-xl"></i>
                  </a>
                </div>
              </div>
            
               {/* Contact Form */}
               <div className="bg-gray-800 p-8 rounded-lg">
                 <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                 <form className="space-y-6" action="https://usebasin.com/f/b67214c2b374" method="POST">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                         Name *
                       </label>
                       <input
                         type="text"
                         id="name"
                         name="name"
                         required
                         className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                         placeholder="Your Name"
                       />
                     </div>
                     <div>
                       <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                         Email *
                       </label>
                       <input
                         type="email"
                         id="email"
                         name="email"
                         required
                         className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                         placeholder="Your Email"
                       />
                     </div>
                   </div>
                   
                   <div>
                     <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                       Phone
                     </label>
                     <input
                       type="tel"
                       id="phone"
                       name="phone"
                       className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                       placeholder="Your Phone Number"
                     />
                   </div>
                   
                   <div>
                     <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                       Subject *
                     </label>
                     <input
                       type="text"
                       id="subject"
                       name="subject"
                       required
                       className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                       placeholder="Subject"
                     />
                   </div>
                   
                   <div>
                     <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                       Message *
                     </label>
                     <textarea
                       id="message"
                       name="message"
                       rows={5}
                       required
                       className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                       placeholder="Your Message"
                     ></textarea>
                   </div>
                   
                   <button
                     type="submit"
                     className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
                   >
                     <i className="fas fa-paper-plane mr-2"></i>
                     Send Message
                   </button>
                 </form>
               </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center mb-4">
                  <i className="fas fa-bolt text-red-500 text-2xl mr-3"></i>
                  <span className="text-2xl font-bold">Silver Pin Electrical</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Professional electrical services across New Zealand. We are licensed, insured, and committed to providing safe, reliable electrical solutions for residential and commercial clients.
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <i className="fas fa-certificate text-red-500"></i>
                  <span className="text-sm text-gray-300">Licensed Electrical Contractor</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-shield-alt text-red-500"></i>
                  <span className="text-sm text-gray-300">Fully Insured & Bonded</span>
                </div>
              </div>
              
              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Our Services</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-red-400 transition-colors">Residential Electrical</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">Commercial Solutions</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">Emergency Services</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">Safety Inspections</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">Smart Home Systems</a></li>
                </ul>
              </div>
              
              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#home" className="hover:text-red-400 transition-colors">Home</a></li>
                  <li><a href="#about" className="hover:text-red-400 transition-colors">About Us</a></li>
                  <li><a href="#services" className="hover:text-red-400 transition-colors">Services</a></li>
                  <li><a href="#team" className="hover:text-red-400 transition-colors">Our Team</a></li>
                  <li><a href="#contact" className="hover:text-red-400 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm mb-4 md:mb-0">
                  © 2024 Silver Pin Electrical. All rights reserved.
                </p>
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
