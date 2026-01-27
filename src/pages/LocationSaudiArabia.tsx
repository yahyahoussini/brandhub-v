import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, TrendingUp, Globe, Users, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LocationSaudiArabia = () => {
  return (
    <>
      <Helmet>
        <title>شركة تصميم مواقع السعودية | تطوير الويب والعلامة التجارية في الرياض، جدة، الدمام</title>
        <meta name="description" content="وكالة تطوير الويب في السعودية متخصصة في العلامات التجارية والتصميم الجرافيكي والتسويق الرقمي. خدمات للشركات في الرياض وجدة والدمام وجميع أنحاء السعودية." />
        <meta name="keywords" content="تصميم مواقع السعودية, تطوير ويب السعودية, علامة تجارية السعودية, تصميم جرافيك السعودية, تسويق رقمي السعودية, انشاء موقع الرياض, وكالة رقمية جدة, مطور ويب الدمام" />
        <link rel="canonical" href="https://yourdomain.com/saudi-arabia" />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">المملكة العربية السعودية</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                وكالة تطوير الويب والعلامات التجارية في السعودية
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                شريكك الرقمي في السعودية لتطوير الويب، العلامات التجارية، التصميم الجرافيكي والتسويق الرقمي.
                نرافق الشركات الصغيرة والكبيرة في الرياض، جدة، الدمام وجميع أنحاء السعودية في تحولها الرقمي.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gradient-accent" asChild>
                  <a href="https://wa.me/212703026422?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D9%86%D8%A7%20%D9%85%D9%87%D8%AA%D9%85%20%D8%A8%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9.%20%D8%A3%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83%D9%85%20%D9%85%D9%86%20%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9." target="_blank" rel="noopener noreferrer">
                    تواصل معنا في السعودية
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/services/programming">
                    خدماتنا في السعودية
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services in Saudi Arabia */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                خدمات تطوير الويب في السعودية
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                حلول رقمية متكاملة للشركات السعودية في الرياض، جدة، الدمام، مكة، المدينة وجميع أنحاء المملكة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">تطوير الويب السعودية</h3>
                  <p className="text-muted-foreground">
                    إنشاء مواقع ويب احترافية، متاجر إلكترونية وتطبيقات ويب مخصصة للشركات السعودية.
                    تقنيات حديثة وتحسين SEO للسوق السعودي.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">العلامة التجارية والتصميم الجرافيكي</h3>
                  <p className="text-muted-foreground">
                    إنشاء هوية بصرية، تصميم شعارات، دليل العلامة التجارية ومواد التسويق للعلامات السعودية.
                    تصميم يعكس جوهر شركتك في السعودية.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">التسويق الرقمي السعودية</h3>
                  <p className="text-muted-foreground">
                    استراتيجيات SEO، إعلانات Google، إدارة وسائل التواصل الاجتماعي وتسويق المحتوى للشركات في السعودية.
                    زد من ظهورك على الإنترنت في السوق السعودي.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">استشارات الاستراتيجية الرقمية</h3>
                  <p className="text-muted-foreground">
                    دعم استراتيجي للتحول الرقمي لشركتك في السعودية.
                    تحليل، تدقيق وتوصيات مخصصة.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">التجارة الإلكترونية السعودية</h3>
                  <p className="text-muted-foreground">
                    متاجر إلكترونية متكاملة مع بوابة دفع آمنة مناسبة للسوق السعودي.
                    حلول WooCommerce و Shopify وتطوير مخصص.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">تطبيقات الويب والموبايل</h3>
                  <p className="text-muted-foreground">
                    تطوير تطبيقات ويب تقدمية (PWA) وتطبيقات موبايل لنظامي iOS و Android
                    للشركات السعودية.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Major Cities */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                موجودون في جميع مدن السعودية
              </h2>
              <p className="text-xl text-muted-foreground">
                خدمات تطوير الويب والعلامات التجارية متاحة في جميع أنحاء المملكة
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                "الرياض", "جدة", "الدمام", "مكة المكرمة",
                "المدينة المنورة", "الخبر", "الطائف", "تبوك",
                "القطيف", "أبها", "الجبيل", "الأحساء"
              ].map((city) => (
                <Card key={city} className="text-center shadow-card hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold">{city}</h3>
                    <p className="text-sm text-muted-foreground">تطوير الويب</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our Agency */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                لماذا تختار وكالتنا في السعودية؟
              </h2>

              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">خبرة في السوق السعودي</h3>
                        <p className="text-muted-foreground">
                          معرفة عميقة بالسوق السعودي، سلوكيات المستهلكين والخصوصيات الثقافية
                          لحلول رقمية مناسبة للشركات السعودية.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">تقنيات متطورة</h3>
                        <p className="text-muted-foreground">
                          تطوير ويب بأحدث التقنيات: React و Node.js و WordPress و Shopify.
                          مواقع سريعة وآمنة ومحسنة لـ SEO في السعودية.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">دعم مخصص</h3>
                        <p className="text-muted-foreground">
                          فريق متاح بالعربية، دعم سريع ومرافقة مستمرة بعد التسليم.
                          نحن هنا لنجاحك في السعودية.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">أسعار تنافسية</h3>
                        <p className="text-muted-foreground">
                          أسعار شفافة ومناسبة للسوق السعودي. نسبة ممتازة بين السعر والجودة لخدمات
                          تطوير الويب والعلامات التجارية الاحترافية.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                تواصل مع وكالتنا في السعودية
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-card">
                  <CardContent className="p-6 text-center">
                    <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">هاتف</h3>
                    <a href="tel:+212703026422" className="text-muted-foreground hover:text-primary" dir="ltr">
                      +212 607 076 940
                    </a>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6 text-center">
                    <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">البريد الإلكتروني</h3>
                    <a href="mailto:contact@youragency.com" className="text-muted-foreground hover:text-primary" dir="ltr">
                      contact@youragency.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">واتساب</h3>
                    <a
                      href="https://wa.me/212703026422?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%AA%D8%AD%D8%AF%D8%AB%20%D9%85%D8%B9%D9%83%D9%85%20%D8%A8%D8%AE%D8%B5%D9%88%D8%B5%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      محادثة مباشرة
                    </a>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-muted-foreground">
                وكالة تطوير الويب والعلامات التجارية في خدمة الشركات السعودية منذ عدة سنوات.
                حول تواجدك الرقمي في السعودية بحلولنا الاحترافية.
              </p>
            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default LocationSaudiArabia;
