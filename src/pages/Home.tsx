import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Zap, Home as HomeIcon, Building, Wrench, Shield, Award, Users, CheckCircle, Star, Menu, X } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const services = [
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "24/7 Emergency Services",
      description: "Round-the-clock electrical emergency response for urgent repairs and safety issues."
    },
    {
      icon: <HomeIcon className="w-8 h-8 text-orange-500" />,
      title: "Residential Electrical",
      description: "Complete home electrical services including wiring, outlets, and lighting installations."
    },
    {
      icon: <Building className="w-8 h-8 text-orange-500" />,
      title: "Commercial Solutions",
      description: "Professional electrical services for businesses, offices, and commercial properties."
    },
    {
      icon: <Wrench className="w-8 h-8 text-orange-500" />,
      title: "Electrical Installations",
      description: "Expert installation of electrical systems, panels, and specialized equipment."
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "Safety Inspections",
      description: "Comprehensive electrical safety inspections and compliance certifications."
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "Power Solutions",
      description: "Backup power systems, generators, and uninterruptible power supply installations."
    },
    {
      icon: <HomeIcon className="w-8 h-8 text-orange-500" />,
      title: "Smart Home Integration",
      description: "Modern smart home electrical systems and automation solutions."
    },
    {
      icon: <Building className="w-8 h-8 text-orange-500" />,
      title: "Industrial Electrical",
      description: "Heavy-duty industrial electrical services and machinery installations."
    },
    {
      icon: <Wrench className="w-8 h-8 text-orange-500" />,
      title: "Maintenance & Repairs",
      description: "Ongoing electrical maintenance and repair services for all systems."
    }
  ];

  const portfolioItems = [
    {
      title: "Commercial Office Complex",
      description: "Complete electrical installation for 50,000 sq ft office building",
      image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20office%20building%20electrical%20installation%20professional%20lighting%20systems&image_size=landscape_4_3"
    },
    {
      title: "Residential Smart Home",
      description: "Full smart home electrical system with automation",
      image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20smart%20home%20electrical%20panel%20automation%20system%20residential&image_size=landscape_4_3"
    },
    {
      title: "Industrial Power Upgrade",
      description: "High-voltage industrial electrical system upgrade",
      image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=industrial%20electrical%20power%20systems%20high%20voltage%20equipment%20professional&image_size=landscape_4_3"
    },
    {
      title: "Emergency Generator Installation",
      description: "Backup power system for critical facilities",
      image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=emergency%20backup%20generator%20electrical%20installation%20professional%20power%20system&image_size=landscape_4_3"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: "Licensed & Certified",
      description: "Fully licensed electricians with industry certifications and ongoing training."
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: "24/7 Availability",
      description: "Round-the-clock emergency services when you need us most."
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Safety First",
      description: "Committed to the highest safety standards and best practices."
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Experienced Team",
      description: "Over 15 years of combined experience in electrical services."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">Silver Pin Electrical</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Home
                </button>
                <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Services
                </button>
                <button onClick={() => scrollToSection('quote')} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Get Quote
                </button>
                <button onClick={() => scrollToSection('portfolio')} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Portfolio
                </button>
                <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  About
                </button>
                <button onClick={() => scrollToSection('contact')} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Contact
                </button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button onClick={() => scrollToSection('home')} className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left">
                Services
              </button>
              <button onClick={() => scrollToSection('quote')} className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left">
                Get Quote
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('about')} className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left">
                About
              </button>
              <button onClick={() => scrollToSection('contact')} className="block bg-blue-600 text-white px-3 py-2 text-base font-medium w-full text-left rounded-md">
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.8), rgba(30, 64, 175, 0.8)), url('https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20electrical%20service%20van%20truck%20with%20equipment%20modern%20electrical%20tools%20professional%20electrician%20vehicle&image_size=landscape_16_9')`
          }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Professional Electrical Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Trusted electrical solutions for residential, commercial, and industrial needs. Available 24/7 for emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('quote')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Free Quote
            </button>
            <a 
              href="tel:+64-21-123-4567"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Call Now: 021 123 4567
            </a>
          </div>
        </div>
       </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive electrical services for all your residential, commercial, and industrial needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Quote Section */}
      <section id="quote" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Your Free Quote</h2>
            <p className="text-xl text-gray-600">
              Tell us about your electrical needs and we'll provide a detailed quote within 24 hours.
            </p>
          </div>
          
          <form action="https://formsubmit.co/info@silverpinelectrical.co.nz" method="POST" className="bg-gray-50 p-8 rounded-lg">
            <input type="hidden" name="_subject" value="New Quote Request from Silver Pin Electrical Website" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://anthonyxiao.github.io/silverpin/" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="021 123 4567"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Required *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a service</option>
                  <option value="24/7 Emergency Services">24/7 Emergency Services</option>
                  <option value="Residential Electrical">Residential Electrical</option>
                  <option value="Commercial Solutions">Commercial Solutions</option>
                  <option value="Electrical Installations">Electrical Installations</option>
                  <option value="Safety Inspections">Safety Inspections</option>
                  <option value="Power Solutions">Power Solutions</option>
                  <option value="Smart Home Integration">Smart Home Integration</option>
                  <option value="Industrial Electrical">Industrial Electrical</option>
                  <option value="Maintenance & Repairs">Maintenance & Repairs</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Project Details *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please describe your electrical needs, project scope, timeline, and any specific requirements..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md text-lg font-semibold transition-colors"
            >
              Submit Quote Request
            </button>
          </form>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look at some of our recent electrical projects and installations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-lg text-gray-600 mb-6">
                Silver Pin Electrical Services is a trusted electrical contractor serving residential, commercial, 
                and industrial clients throughout New Zealand. With over 15 years of combined experience, our team 
                of licensed electricians is committed to delivering safe, reliable, and professional electrical solutions.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We pride ourselves on our attention to detail, commitment to safety, and dedication to customer 
                satisfaction. From emergency repairs to complex installations, we approach every project with the 
                same level of professionalism and expertise.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">Emergency Service</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">100%</div>
                  <div className="text-sm text-gray-600">Licensed & Insured</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20electrician%20team%20working%20on%20electrical%20panel%20safety%20equipment%20modern%20tools&image_size=portrait_4_3"
                alt="Professional electrician team"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Silver Pin Electrical?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're committed to providing exceptional electrical services with a focus on safety, quality, and customer satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white rounded-full">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-blue-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
              <p className="text-xl text-gray-300 mb-8">
                Ready to start your electrical project? Contact us today for a free consultation and quote.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-orange-500 mr-4" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-300">021 123 4567</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-orange-500 mr-4" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-300">info@silverpinelectrical.co.nz</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-orange-500 mr-4" />
                  <div>
                    <div className="font-semibold">Service Area</div>
                    <div className="text-gray-300">Auckland & Surrounding Areas</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-orange-500 mr-4" />
                  <div>
                    <div className="font-semibold">Hours</div>
                    <div className="text-gray-300">24/7 Emergency Service Available</div>
                    <div className="text-gray-300">Mon-Fri: 7:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-800 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Emergency Service</h3>
                <p className="text-gray-300 mb-6">
                  Electrical emergencies can't wait. Our 24/7 emergency service ensures you get the help you need, when you need it.
                </p>
                <a
                  href="tel:+64-21-123-4567"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Call Emergency Line
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-orange-500 mr-2" />
              <span className="text-2xl font-bold">Silver Pin Electrical</span>
            </div>
            <p className="text-gray-400">
              &copy; 2024 Silver Pin Electrical Services. All rights reserved. Licensed Electrical Contractor.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}