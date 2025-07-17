import BgGradient from "@/components/common/bg-gradient";
import EmptySummaryState from "@/components/summaries/empty-summary-state";
import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { hasReachedUploadLimit, getPriceId } from "@/lib/user";
import { pricingPlans } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus, Sparkles, FileText, TrendingUp } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return redirect("/sign-in");
  }

  const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(userId);
  const summaries = await getSummaries(userId);
  
  // Get user's current plan
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const priceId = email ? await getPriceId(email) : null;
  const currentPlan = pricingPlans.find((plan) => plan.priceId === priceId);
  const planName = currentPlan ? currentPlan.name : 'Free';
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-100/20 via-transparent to-emerald-100/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/10 to-emerald-500/10 border border-rose-200/50 mb-6">
              <Sparkles className="w-4 h-4 text-rose-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Powered by AI</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Your{" "}
              <span className="bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                Summaries
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Transform your PDFs into concise, actionable insights with AI-powered summarization
            </p>
            
            {!hasReachedLimit && (
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <Link href="/upload" className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  New Summary
                </Link>
              </Button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{summaries.length}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Total Summaries</h3>
              <p className="text-sm text-gray-600">Documents processed</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{uploadLimit - summaries.length}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Remaining</h3>
              <p className="text-sm text-gray-600">Uploads left</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{planName}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Current Plan</h3>
              <p className="text-sm text-gray-600">Upgrade for more</p>
            </div>
          </div>

          {/* Upgrade Banner */}
          {hasReachedLimit && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">Upgrade to Pro for Unlimited Access</h3>
                    <p className="text-rose-100">
                      You've reached your upload limit. Upgrade to Pro for unlimited uploads and advanced features.
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-rose-600 hover:bg-rose-50 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                  >
                    <Link href="/#pricing" className="flex items-center">
                      Upgrade Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {summaries.length === 0 ? (
          <div className="text-center py-16">
            <EmptySummaryState />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Recent Summaries</h2>
              <div className="text-sm text-gray-600">
                {summaries.length} of {uploadLimit} uploads used
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {summaries.map((summary, idx) => (
                <div
                  key={idx}
                  className="group transform hover:scale-105 transition-all duration-300"
                >
                  <SummaryCard summary={summary} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to summarize more documents?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our AI-powered summarizer uses advanced algorithms to quickly and accurately extract the most important information from your PDF files.
          </p>
          {!hasReachedLimit && (
            <Button
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/upload" className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create New Summary
              </Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}