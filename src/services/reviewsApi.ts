// Mock API service for fetching customer reviews
// In a real implementation, this would connect to an actual API like Google Reviews, NoCowboys, etc.

export interface CustomerReview {
  name: string;
  rating: number;
  review: string;
  date: string;
  service: string;
}

// Mock review data pool - simulates a larger dataset
const mockReviewsPool: CustomerReview[] = [
  {
    name: "Sandra",
    rating: 100,
    review: "Excellent service! The team was professional and completed the bathroom electrical work perfectly. Highly recommend!",
    date: "May 2025",
    service: "Bathroom Electrical Work"
  },
  {
    name: "Jagwinder",
    rating: 98,
    review: "Very satisfied with the electrical work. Quick response and fair pricing.",
    date: "May 2025",
    service: "General Electrical"
  },
  {
    name: "Singh",
    rating: 100,
    review: "Professional installation of commercial equipment. Great attention to detail.",
    date: "Apr 2025",
    service: "Commercial Equipment"
  },
  {
    name: "Janene",
    rating: 100,
    review: "Perfect spa installation! The electricians were knowledgeable and efficient.",
    date: "Apr 2025",
    service: "Spa Installation"
  },
  {
    name: "Rakesh",
    rating: 93,
    review: "Emergency service was prompt and effective. Fixed the issue quickly.",
    date: "May 2025",
    service: "Emergency Service"
  },
  {
    name: "Michelle",
    rating: 100,
    review: "Outstanding work on our home renovation electrical needs. Very professional team.",
    date: "Jun 2025",
    service: "Home Renovation"
  },
  {
    name: "David",
    rating: 95,
    review: "Great service for our office electrical upgrade. Clean work and on time.",
    date: "Jun 2025",
    service: "Office Electrical"
  },
  {
    name: "Sarah",
    rating: 100,
    review: "Excellent installation of outdoor lighting. Transformed our garden beautifully.",
    date: "Jun 2025",
    service: "Outdoor Lighting"
  },
  {
    name: "Michael",
    rating: 97,
    review: "Professional and reliable. Fixed our electrical issues efficiently.",
    date: "Jun 2025",
    service: "Electrical Repair"
  },
  {
    name: "Emma",
    rating: 100,
    review: "Amazing service! The team installed our new electrical panel perfectly.",
    date: "Jul 2025",
    service: "Panel Installation"
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API function to fetch latest reviews
export const fetchLatestReviews = async (limit: number = 6): Promise<CustomerReview[]> => {
  try {
    // Simulate network delay
    await delay(800 + Math.random() * 400); // 800-1200ms delay
    
    // Simulate occasional API errors (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Failed to fetch reviews from server');
    }
    
    // Sort by date (newest first) and return limited results
    const sortedReviews = [...mockReviewsPool]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
    
    return sortedReviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

// Alternative function to fetch reviews with different sorting
export const fetchTopRatedReviews = async (limit: number = 6): Promise<CustomerReview[]> => {
  try {
    await delay(600 + Math.random() * 300);
    
    if (Math.random() < 0.05) {
      throw new Error('Failed to fetch top rated reviews');
    }
    
    // Sort by rating (highest first) and return limited results
    const sortedReviews = [...mockReviewsPool]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    
    return sortedReviews;
  } catch (error) {
    console.error('Error fetching top rated reviews:', error);
    throw error;
  }
};