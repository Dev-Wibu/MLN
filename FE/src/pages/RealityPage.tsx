import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, BarChart3, Camera, DollarSign, Edit, ExternalLink, TrendingUp, Youtube } from "lucide-react";
import { useState } from "react";

const RealityPage = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const caseStudies = [
    {
      id: "freelancer",
      title: "Freelancer",
      icon: Edit,
      description: "Lập trình viên, designer, writer tự do",
      income: "Thu nhập phụ thuộc vào project",
      platform: "Upwork, Fiverr, Freelancer.com",
      exploitation: [
        "Platform chiếm 10-20% phí giao dịch",
        "Không có bảo hiểm, phúc lợi",
        "Cạnh tranh giá xuống đáy toàn cầu",
        "Thuật toán quyết định visibility",
      ],
      illusion: "Tự do làm việc, tự chọn khách hàng",
      reality: "Phụ thuộc hoàn toàn vào platform, không có quyền thương lượng",
      stats: {
        platformRevenue: "$4.5 tỷ/năm (Upwork)",
        averageEarning: "$15-25/giờ",
        platformCut: "20%",
      },
    },
    {
      id: "youtuber",
      title: "YouTuber",
      icon: Youtube,
      description: "Content creator trên YouTube",
      income: "Thu nhập từ ads, sponsor, membership",
      platform: "YouTube (Google)",
      exploitation: [
        "YouTube giữ 45% doanh thu quảng cáo",
        "Thuật toán kiểm soát reach và monetization",
        "Demonetization bất cứ lúc nào",
        "Phải theo quy tắc nghiêm ngặt của platform",
      ],
      illusion: "Sáng tạo tự do, xây dựng thương hiệu cá nhân",
      reality: "Nô lệ của thuật toán, không kiểm soát được thu nhập",
      stats: {
        platformRevenue: "$28.8 tỷ/năm (YouTube ads)",
        averageEarning: "$3-5/1000 views",
        platformCut: "45%",
      },
    },
    {
      id: "tiktoker",
      title: "TikToker",
      icon: Camera,
      description: "Content creator trên TikTok",
      income: "Live stream gifts, brand partnerships",
      platform: "TikTok (ByteDance)",
      exploitation: [
        "TikTok giữ 50% gifts từ live stream",
        "Thuật toán hoàn toàn bí mật",
        "Không có monetization ổn định",
        "Dữ liệu cá nhân bị khai thác tối đa",
      ],
      illusion: "Viral dễ dàng, fame nhanh chóng",
      reality: "Công cụ tạo content miễn phí cho BigTech",
      stats: {
        platformRevenue: "$18.2 tỷ/năm (TikTok)",
        averageEarning: "$20-40/1M views",
        platformCut: "50%",
      },
    },
  ];

  const bigTechData = [
    {
      company: "Meta (Facebook)",
      revenue: "$134.9 tỷ",
      userBase: "3.88 tỷ",
      revenuePerUser: "$34.76",
      creatorCut: "",
    },
    {
      company: "Google (Alphabet)",
      revenue: "$307.4 tỷ",
      userBase: "4+ tỷ",
      revenuePerUser: "$76.85",
      creatorCut: "YouTube: 55%",
    },
    {
      company: "Apple",
      revenue: "$383.3 tỷ",
      userBase: "2+ tỷ",
      revenuePerUser: "$191.65",
      creatorCut: "App Store: 70%",
    },
    {
      company: "ByteDance (TikTok)",
      revenue: "$120+ tỷ",
      userBase: "1.67 tỷ",
      revenuePerUser: "$71.86",
      creatorCut: "Live gifts: 50%",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">Thực tiễn hiện nay</h1>
          <p className="text-xl text-amber-700 max-w-4xl mx-auto">
            Phân tích về Freelancer, YouTuber, TikToker - những người tưởng rằng mình tự do nhưng thực chất đang bị bóc lột trong hình thức mới của kỷ
            nguyên số.
          </p>
        </div>

        {/* Case Studies */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {caseStudies.map((caseStudy) => {
            const IconComponent = caseStudy.icon;
            const isSelected = selectedCase === caseStudy.id;

            return (
              <Card
                key={caseStudy.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                  isSelected ? "border-amber-400 shadow-lg" : "border-amber-200"
                }`}
                onClick={() => setSelectedCase(isSelected ? null : caseStudy.id)}
              >
                <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-amber-200 rounded-full">
                      <IconComponent className="w-6 h-6 text-amber-800" />
                    </div>
                    {caseStudy.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-amber-800 mb-4">{caseStudy.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-amber-700">{caseStudy.income}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-amber-700">{caseStudy.platform}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4 border-amber-300 text-amber-700 hover:bg-amber-50">
                    {isSelected ? "Ẩn chi tiết" : "Xem chi tiết"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Selected Case Study Details */}
        {selectedCase && (
          <Card className="mb-12 border-2 border-amber-300">
            <CardContent className="p-8">
              {(() => {
                const caseStudy = caseStudies.find((c) => c.id === selectedCase);
                if (!caseStudy) return null;

                return (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-amber-900 mb-2">Phân tích chi tiết: {caseStudy.title}</h3>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                        {caseStudy.platform}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            Các hình thức bóc lột:
                          </h4>
                          <ul className="space-y-2">
                            {caseStudy.exploitation.map((item, index) => (
                              <li key={index} className="text-amber-800 text-sm flex items-start gap-2">
                                <span className="text-red-600 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h4 className="font-bold text-green-800 mb-2">💭 Ảo tưởng:</h4>
                          <p className="text-green-700 text-sm">{caseStudy.illusion}</p>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                          <h4 className="font-bold text-red-800 mb-2">⚡ Thực tế:</h4>
                          <p className="text-red-700 text-sm">{caseStudy.reality}</p>
                        </div>

                        <div>
                          <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-blue-600" />
                            Số liệu thống kê:
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-amber-700">Doanh thu platform:</span>
                              <span className="font-semibold text-amber-900">{caseStudy.stats.platformRevenue}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-amber-700">Thu nhập trung bình:</span>
                              <span className="font-semibold text-amber-900">{caseStudy.stats.averageEarning}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-amber-700">Platform chiếm:</span>
                              <span className="font-semibold text-red-600">{caseStudy.stats.platformCut}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}

        {/* Big Tech vs Creator Income Comparison */}
        <Card className="mb-12 border-amber-200">
          <CardHeader className="bg-gradient-to-r from-red-100 to-orange-100">
            <CardTitle className="text-2xl text-amber-900 text-center">So sánh lợi nhuận Big Tech vs Thu nhập Creator</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <p className="text-amber-800 text-center mb-6">Dữ liệu năm 2023 - Nguồn: Báo cáo tài chính công ty công khai</p>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-amber-200">
                      <th className="text-left py-3 px-4 text-amber-900">Công ty</th>
                      <th className="text-left py-3 px-4 text-amber-900">Doanh thu</th>
                      <th className="text-left py-3 px-4 text-amber-900">Người dùng</th>
                      <th className="text-left py-3 px-4 text-amber-900">Doanh thu/User</th>
                      <th className="text-left py-3 px-4 text-amber-900">Chia cho Creator</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bigTechData.map((company, index) => (
                      <tr key={index} className="border-b border-amber-100 hover:bg-amber-50">
                        <td className="py-3 px-4 font-semibold text-amber-900">{company.company}</td>
                        <td className="py-3 px-4 text-amber-800">{company.revenue}</td>
                        <td className="py-3 px-4 text-amber-800">{company.userBase}</td>
                        <td className="py-3 px-4 text-amber-800 font-semibold">{company.revenuePerUser}</td>
                        <td className="py-3 px-4 text-amber-800">{company.creatorCut || "Không có"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-green-100 p-6 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-3">📈 Big Tech:</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Tỷ USD doanh thu mỗi năm</li>
                    <li>• Lợi nhuận ròng 20-30%</li>
                    <li>• Kiểm soát toàn bộ chuỗi giá trị</li>
                    <li>• Có quyền thay đổi luật chơi bất cứ lúc nào</li>
                  </ul>
                </div>

                <div className="bg-red-100 p-6 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-3">💸 Creator trung bình:</h4>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• Thu nhập không ổn định</li>
                    <li>• Phụ thuộc hoàn toàn vào thuật toán</li>
                    <li>• Không có quyền thương lượng</li>
                    <li>• Cạnh tranh với hàng triệu người khác</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports and Sources */}
        <Card className="border-amber-200">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
            <CardTitle className="text-xl text-amber-900 flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Nguồn tham khảo chính thống
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-amber-900 mb-3">Báo cáo học thuật:</h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• "Platform Capitalism" - Nick Srnicek (2017)</li>
                  <li>• "The Age of Surveillance Capitalism" - Shoshana Zuboff (2019)</li>
                  <li>• Báo cáo ILO về Platform Economy (2021)</li>
                  <li>• Research MIT về Gig Economy (2023)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-amber-900 mb-3">Dữ liệu thống kê:</h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• SEC Filings của các công ty công khai</li>
                  <li>• Statista Global Platform Economy Report</li>
                  <li>• Creator Economy Report 2023</li>
                  <li>• World Bank Digital Development Report</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-amber-800 text-sm">
                <strong>Lưu ý:</strong> Tất cả số liệu được trích dẫn từ các nguồn chính thống và có thể kiểm chứng. Mục đích là phân tích khách quan
                các mối quan hệ kinh tế trong nền tảng số, không phải tấn công cá nhân hay tổ chức nào.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealityPage;
