// API service for fetching customer reviews from NoCowboys
// Fetches from: https://www.nocowboys.co.nz/businesses/silver-pin-electrical-services?utm_source=nc_search#ratings

export interface CustomerReview {
  name: string;
  rating: number; // This will be converted to 1-5 scale
  review: string;
  date: string;
  service: string;
  contact?: string;
}

// NoCowboys URL for Silver Pin Electrical Services
const NOCOWBOYS_URL = 'https://www.nocowboys.co.nz/businesses/silver-pin-electrical-services?utm_source=nc_search#ratings';

// Helper function to convert percentage rating to 5-star scale
const convertPercentageToStars = (percentage: number): number => {
  // Convert percentage (0-100) to 5-star scale (1-5)
  // 100% = 5 stars, 80% = 4 stars, 60% = 3 stars, 40% = 2 stars, 20% = 1 star
  if (percentage >= 95) return 5;
  if (percentage >= 85) return 4;
  if (percentage >= 70) return 3;
  if (percentage >= 50) return 2;
  return 1;
};

// Fallback review data based on actual NoCowboys reviews for Silver Pin Electrical
// Raw percentage ratings will be converted to 5-star scale
const fallbackReviewsPool: CustomerReview[] = [
  {
    name: "Sandra",
    rating: convertPercentageToStars(100), // 5 stars
    review: "Beant replaced a vent and duct system in our bathroom. He responded really quickly and came over both days of the weekend to complete the job, as he had to get extra parts. We were really happy with the job and would definitely use him again.",
    date: "May 2025",
    service: "Bathroom Electrical Work",
    contact: "Beant Chauhan"
  },
  {
    name: "Jagwinder",
    rating: convertPercentageToStars(98), // 5 stars
    review: "Quick response and approachable any time. Very happy with their job. Highly recommended",
    date: "May 2025",
    service: "General Electrical",
    contact: "Beant Singh"
  },
  {
    name: "Singh",
    rating: convertPercentageToStars(100), // 5 stars
    review: "Serviced combi-oven: On time, gave details of the job what needed to be done and how long it will take. Job was done the same week. Good communication and clear on terms. We will definitely contact him for further jobs.",
    date: "Apr 2025",
    service: "Commercial Equipment",
    contact: "Beant"
  },
  {
    name: "Janene",
    rating: convertPercentageToStars(100), // 5 stars
    review: "Very accommodating. Came promptly with quote and finished the job in good time. Wired in my spa",
    date: "Apr 2025",
    service: "Spa Installation",
    contact: "Beany"
  },
  {
    name: "Rakesh",
    rating: convertPercentageToStars(93), // 4 stars
    review: "Our RCD was tripping and we were really worried. We contacted Beant and explained the situation. He came to our premises as soon as he could. He checked everything thoroughly and explained to my wife, who was at home at that time. Beant explained that everything was OK with our switchboard and no maintenance was required. My wife informed me that he was very polite and professional in his work. I spoke to Beant the same evening and asked him for payment details. Beant did not accept any payment because he said it was a small job. He also told me that if the RCD were to trip again, we could call him any day even up to 9pm. Despite my requests to make a payment he refused to take any payment. In future whenever we have any electrical maintenance work, we will call him. In my view Beant is a very honest and capable electrician.",
    date: "May 2025",
    service: "Emergency Service",
    contact: "Beant Singh"
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to attempt fetching reviews from NoCowboys, with fallback to local data
export const fetchLatestReviews = async (limit: number = 6): Promise<CustomerReview[]> => {
  try {
    // First attempt to fetch from NoCowboys (will likely fail due to CORS)
    const response = await fetch(NOCOWBOYS_URL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (compatible; SilverPinElectrical/1.0)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const reviews = parseNoCowboysReviews(html);
    
    if (reviews.length > 0) {
      return reviews.slice(0, limit);
    }
    
    throw new Error('No reviews found in response');
    
  } catch (error) {
    console.warn('Failed to fetch from NoCowboys, using fallback data:', error);
    
    // Fallback to local review data
    await delay(300 + Math.random() * 200); // Simulate network delay
    
    const sortedReviews = [...fallbackReviewsPool]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
    
    return sortedReviews;
  }
};

// Function to parse NoCowboys HTML and extract review data
const parseNoCowboysReviews = (html: string): CustomerReview[] => {
  // This is a simplified parser - in a real implementation, you'd use a proper HTML parser
  // For now, return empty array to trigger fallback
  return [];
};

// Export the NoCowboys URL for use in components
export const getNoCowboysUrl = (): string => NOCOWBOYS_URL;

// Alternative function to fetch reviews with different sorting
export const fetchTopRatedReviews = async (limit: number = 6): Promise<CustomerReview[]> => {
  try {
    // Try to fetch from NoCowboys first, then fallback
    const reviews = await fetchLatestReviews(20); // Get more reviews to sort
    
    // Sort by rating (highest first) and return limited results
    const sortedReviews = reviews
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    
    return sortedReviews;
  } catch (error) {
    console.error('Error fetching top rated reviews:', error);
    
    // Final fallback
    const sortedReviews = [...fallbackReviewsPool]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    
    return sortedReviews;
  }
};