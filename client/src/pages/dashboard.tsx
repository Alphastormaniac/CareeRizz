import { useQuery } from "@tanstack/react-query";
import NavigationHeader from "@/components/navigation-header";
import StatsOverview from "@/components/stats-overview";
import ResumeAnalysis from "@/components/resume-analysis";
import LearningPathway from "@/components/learning-pathway";
import PortfolioBuilder from "@/components/portfolio-builder";
import MentorshipSection from "@/components/mentorship-section";
import InterviewPrep from "@/components/interview-prep";
import PaymentSection from "@/components/payment-section";
import type { User } from "@shared/schema";

export default function Dashboard() {
  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/user"]
  });

  if (userLoading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-linkedin-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load user data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <NavigationHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dark mb-2">
            Welcome back, {user.firstName}!
          </h2>
          <p className="text-gray-600">Continue your career journey with personalized AI insights</p>
        </div>

        <StatsOverview user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <ResumeAnalysis />
            <LearningPathway />
            <PortfolioBuilder />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <MentorshipSection />
            <InterviewPrep />
            <PaymentSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-dark mb-4">CareerAI India</h3>
              <p className="text-gray-600 text-sm">Empowering careers with AI-driven insights and personalized learning paths.</p>
            </div>
            <div>
              <h4 className="font-semibold text-dark mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-linkedin-blue">Skills Analysis</a></li>
                <li><a href="#" className="hover:text-linkedin-blue">Course Library</a></li>
                <li><a href="#" className="hover:text-linkedin-blue">Mentorship</a></li>
                <li><a href="#" className="hover:text-linkedin-blue">Portfolio Builder</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-dark mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-linkedin-blue">Help Center</a></li>
                <li><a href="#" className="hover:text-linkedin-blue">Contact Us</a></li>
                <li><a href="#" className="hover:text-linkedin-blue">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-linkedin-blue">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-dark mb-3">Connect</h4>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-600 hover:text-linkedin-blue">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-linkedin-blue">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-linkedin-blue">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600 text-sm">&copy; 2024 CareerAI India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
