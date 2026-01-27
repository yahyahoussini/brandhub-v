import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CanonicalLink } from "@/components/CanonicalLink";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SkipToContent } from "@/components/a11y/SkipToContent";

// Lazy load all pages for optimal bundle splitting
const Index = lazy(() => import("./pages/Index"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Terms = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ServiceProgramming = lazy(() => import("./pages/ServiceProgramming"));
const ServiceGraphics = lazy(() => import("./pages/ServiceGraphics"));
const ServiceContent = lazy(() => import("./pages/ServiceContent"));
const ServiceBusiness = lazy(() => import("./pages/ServiceBusiness"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const LocationMorocco = lazy(() => import("./pages/LocationMorocco"));
const LocationSpain = lazy(() => import("./pages/LocationSpain"));
const LocationSaudiArabia = lazy(() => import("./pages/LocationSaudiArabia"));
const LocationCasablanca = lazy(() => import("./pages/locations/Casablanca"));
const LocationRabat = lazy(() => import("./pages/locations/Rabat"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const UIUXShowcase = lazy(() => import("./pages/UIUXShowcase"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages - separate chunk for admin-only users
const AdminLayout = lazy(() => import("./components/admin/AdminLayout").then(m => ({ default: m.AdminLayout })));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
const SimpleBlogGenerator = lazy(() => import("./pages/admin/SimpleBlogGenerator"));
const QuickBlogGenerator = lazy(() => import("./pages/admin/QuickBlogGenerator"));
const AutoBlogGenerator = lazy(() => import("./pages/admin/AutoBlogGenerator"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminSEO = lazy(() => import("./pages/admin/AdminSEO"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminClients = lazy(() => import("./pages/admin/AdminClients"));
const AdminServices = lazy(() => import("./pages/admin/AdminServices"));
const AdminServiceDetails = lazy(() => import("./pages/admin/AdminServiceDetails"));
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminApiKeys = lazy(() => import("./pages/admin/AdminApiKeys"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminRevenue = lazy(() => import("./pages/admin/AdminRevenue"));
const AdminMarketing = lazy(() => import("./pages/admin/AdminMarketing"));
const AdminEmail = lazy(() => import("./pages/admin/AdminEmail"));

// Page loading fallback with shimmer effect
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-6">
      <div className="space-y-4 w-64">
        <div className="shimmer h-12 rounded-lg" />
        <div className="shimmer h-12 w-3/4 rounded-lg" />
        <div className="shimmer h-12 w-1/2 rounded-lg" />
      </div>
      <p className="text-muted-foreground text-sm">Chargement...</p>
    </div>
  </div>
);

// Configure React Query with optimized defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SkipToContent />
          <CanonicalLink />
          <div id="main-content" tabIndex={-1} className="outline-none">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/services/programming" element={<ServiceProgramming />} />
                <Route path="/services/graphics" element={<ServiceGraphics />} />
                <Route path="/services/content" element={<ServiceContent />} />
                <Route path="/services/business" element={<ServiceBusiness />} />
                <Route path="/services/:category/:id" element={<ServiceDetail />} />
                <Route path="/maroc" element={<LocationMorocco />} />
                <Route path="/espana" element={<LocationSpain />} />
                <Route path="/saudi-arabia" element={<LocationSaudiArabia />} />
                <Route path="/locations/casablanca" element={<LocationCasablanca />} />
                <Route path="/locations/rabat" element={<LocationRabat />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/ui-showcase" element={<UIUXShowcase />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="blog" element={<AdminBlogEditor />} />
                  <Route path="blog/generate" element={<SimpleBlogGenerator />} />
                  <Route path="blog/quick-generate" element={<QuickBlogGenerator />} />
                  <Route path="blog/auto-generate" element={<AutoBlogGenerator />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="seo" element={<AdminSEO />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="clients" element={<AdminClients />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="services/:id" element={<AdminServiceDetails />} />
                  <Route path="inquiries" element={<AdminInquiries />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="api-keys" element={<AdminApiKeys />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="revenue" element={<AdminRevenue />} />
                  <Route path="marketing" element={<AdminMarketing />} />
                  <Route path="email" element={<AdminEmail />} />
                </Route>

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
