import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpandableCard from "@/components/ui/expandable-card";
import { ArrowRight, ChevronDown, ChevronUp, Coins, Factory, Lightbulb, Smartphone, UserCheck, UsersRound, Wrench } from "lucide-react";
import { useState } from "react";

interface CaseStudy {
  id: number;
  title: string;
  icon: React.ReactNode;
  items: {
    question: string;
    answer: string;
    highlight?: boolean;
  }[];
  conclusion: string;
}

interface SolutionOption {
  id: number;
  title: string;
  description: string;
  examples: string[];
  pros: string[];
  cons: string[];
}

const ExamplePage = () => {
  const [expandedCase, setExpandedCase] = useState<number | null>(null);
  const [expandedSolution, setExpandedSolution] = useState<number | null>(null);
  const [expandedStruggle, setExpandedStruggle] = useState<string | null>(null);
  const [expandedSurplus, setExpandedSurplus] = useState<string | null>(null);
  const [expandedExploitation, setExpandedExploitation] = useState<string | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "Grab Driver",
      icon: <Smartphone className="w-6 h-6" />,
      items: [
        { question: "Anh sở hữu gì?", answer: "Xe máy, điện thoại, sức lao động" },
        { question: "Grab sở hữu gì?", answer: "App, thuật toán phân phối chuyến, data khách hàng, hệ thống thanh toán" },
        { question: "Ai quyết định giá cước?", answer: "Grab (dynamic pricing)", highlight: true },
        { question: "Ai quyết định anh nhận chuyến nào?", answer: "Thuật toán của Grab", highlight: true },
        { question: "Nếu Grab đuổi anh khỏi app thì sao?", answer: "Anh mất toàn bộ khách hàng", highlight: true },
      ],
      conclusion: "Anh driver tưởng tự do nhưng thực chất phụ thuộc hoàn toàn vào Grab.",
    },
    {
      id: 2,
      title: "YouTuber/Content Creator",
      icon: <Factory className="w-6 h-6" />,
      items: [
        { question: "Bạn sở hữu:", answer: "Content, camera, máy tính" },
        { question: "YouTube sở hữu:", answer: "Nền tảng, thuật toán recommend, hệ thống quảng cáo, data viewer" },
        { question: "Ai quyết định video bạn có view không?", answer: "Thuật toán YouTube", highlight: true },
        { question: "Ai quyết định bạn có kiếm tiền được không?", answer: "YouTube (monetization policy)", highlight: true },
        { question: "Nếu YouTube ban channel bạn?", answer: "Bạn mất hết audience", highlight: true },
      ],
      conclusion: "Bạn làm content miễn phí cho YouTube, YouTube kiếm tiền từ quảng cáo trên content của bạn.",
    },
    {
      id: 3,
      title: "Shop trên Shopee",
      icon: <Coins className="w-6 h-6" />,
      items: [
        { question: "Bạn sở hữu:", answer: "Hàng hóa, kho" },
        { question: "Shopee sở hữu:", answer: "Platform, data khách hàng, hệ thống thanh toán, thuật toán ranking" },
        { question: "Ai quyết định shop bạn được hiển thị?", answer: "Thuật toán Shopee", highlight: true },
        { question: "Ai quyết định phí bạn phải trả?", answer: "Shopee", highlight: true },
        { question: "Nếu Shopee ban shop bạn?", answer: "Bạn mất customer base", highlight: true },
      ],
      conclusion: "Bạn phụ thuộc hoàn toàn vào nền tảng để tiếp cận khách hàng.",
    },
  ];

  const modernMeansOfProduction = [
    {
      title: "Platform",
      traditional: "Máy móc, nhà xưởng",
      modern: "App, website",
      example: "Facebook, Grab, Shopee",
    },
    {
      title: "Big Data",
      traditional: "Vốn",
      modern: "Thông tin khách hàng, hành vi tiêu dùng",
      example: "Google biết bạn tìm kiếm gì, Amazon biết bạn mua gì",
    },
    {
      title: "Algorithm",
      traditional: "Quản đốc",
      modern: "Quyết định ai thành công, ai thất bại",
      example: "Thuật toán YouTube quyết định video nào được đề xuất",
    },
    {
      title: "Network Effect",
      traditional: "Thị trường độc quyền",
      modern: "Càng nhiều user, platform càng có giá trị",
      example: "Facebook càng nhiều người dùng càng khó cạnh tranh",
    },
  ];

  const modernSurplusValue = [
    {
      worker: "YouTuber",
      value: "Video 1 triệu view",
      revenue: "50 triệu doanh thu quảng cáo",
      received: "15-20 triệu",
      extracted: "30-35 triệu (60-70%)",
    },
    {
      worker: "Grab driver",
      value: "Chuyến xe 100k",
      revenue: "100.000đ",
      received: "75.000đ (trừ xăng, bảo dưỡng xe)",
      extracted: "25.000đ (25%) + data khách hàng",
    },
    {
      worker: "Shop Shopee",
      value: "Đơn hàng 10 triệu",
      revenue: "10.000.000đ",
      received: "~9.000.000đ",
      extracted: "3-6% phí + phí quảng cáo + phí logistics",
    },
  ];

  const modernExploitation = [
    {
      type: "Không lương cơ bản",
      description: "Chỉ có % hoa hồng, không có thu nhập ổn định",
    },
    {
      type: "Chuyển rủi ro",
      description: "Xe hỏng, không có khách → tự chịu",
    },
    {
      type: "Khai thác data",
      description: "Platform biết rõ khách hàng của bạn hơn chính bạn",
    },
    {
      type: "Làm việc 24/7",
      description: "Không có giờ nghỉ, không có phép, gọi là 'tự do'",
    },
    {
      type: "Ý thức giai cấp bị mờ ám",
      description: "Tự gọi là 'entrepreneur' → khó đoàn kết đấu tranh",
    },
  ];

  const solutionOptions: SolutionOption[] = [
    {
      id: 1,
      title: "Tự xây dựng platform",
      description: "Sở hữu tư liệu sản xuất thật sự",
      examples: [
        "Thay vì bán trên Shopee → Tự làm website riêng",
        "Thay vì YouTube → Tự host video trên server riêng",
        "Thay vì chạy Grab → Tự tạo app taxi",
      ],
      pros: ["Độc lập hoàn toàn", "Không bị chiếm đoạt giá trị"],
      cons: ["Cần vốn khủng", "Không có network effect", "Khó cạnh tranh với big tech"],
    },
    {
      id: 2,
      title: "Sở hữu tập thể (Cooperative)",
      description: "Tập thể sở hữu và quản lý platform",
      examples: [
        "Driver hợp tác xã: Tất cả driver góp vốn tạo app chung, lợi nhuận chia đều",
        "Creator collective: Các YouTuber cùng tạo platform riêng, tự quản lý quảng cáo",
        "Freelancer union: Đàm phán tập thể với platform về phí, quyền lợi",
      ],
      pros: ["Sức mạnh tập thể", "Chia sẻ chi phí và rủi ro", "Dân chủ trong quản lý"],
      cons: ["Khó tổ chức", "Cần nhiều người đồng thuận", "Vẫn khó cạnh tranh về quy mô"],
    },
  ];

  const struggleTypes = {
    individual: {
      title: "Đấu tranh cá nhân (hạn chế)",
      methods: ["Diversify platform (không phụ thuộc 1 nền tảng)", "Build personal brand để có negotiation power"],
      limitation: "Vẫn không thay đổi cấu trúc quyền lực",
    },
    collective: {
      title: "Đấu tranh tập thể (hiệu quả hơn)",
      examples: [
        {
          name: "Grab driver Thái Lan đình công 2019",
          description: "Yêu cầu giảm phí platform, tăng giá cước → Thành công một phần",
        },
        {
          name: "YouTuber boycott 2017",
          description: "Khi YouTube thay đổi monetization policy → YouTube phải điều chỉnh",
        },
        {
          name: "Uber driver California",
          description: "Đấu tranh để được công nhận là employee, có quyền lợi như nhân viên chính thức",
        },
      ],
      methods: [
        "Strike/Boycott: Tập thể ngừng làm việc",
        "Lobbying: Pressure chính phủ ban hành luật bảo vệ gig worker",
        "Alternative building: Tạo platform thay thế",
      ],
    },
    government: {
      title: "Vai trò của nhà nước",
      examples: [
        "EU: Digital Services Act - quy định platform phải minh bạch thuật toán",
        "California: AB5 law - bắt buộc một số gig worker được coi là employee",
        "Trung Quốc: Quy định platform không được bóc lột driver quá mức",
      ],
      conclusion: "Đấu tranh giai cấp hiện đại cần cả legal framework",
    },
  };

  const toggleCase = (id: number) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  const toggleSolution = (id: number) => {
    setExpandedSolution(expandedSolution === id ? null : id);
  };

  const toggleStruggle = (type: string) => {
    setExpandedStruggle(expandedStruggle === type ? null : type);
  };

  const toggleSurplus = (worker: string) => {
    setExpandedSurplus(expandedSurplus === worker ? null : worker);
  };

  const toggleExploitation = (type: string) => {
    setExpandedExploitation(expandedExploitation === type ? null : type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">Tự do hay phụ thuộc?</h1>
          <p className="text-xl text-amber-700 max-w-4xl mx-auto">
            Một góc nhìn về tự do thực sự của người lao động trong kỷ nguyên số, từ lăng kính lý thuyết giai cấp.
          </p>
        </div>

        {/* Case Studies */}
        <Card className="mb-12 border-amber-200">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
            <CardTitle className="text-2xl text-amber-900 text-center">Các ví dụ cụ thể</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              {caseStudies.map((caseStudy) => (
                <div key={caseStudy.id} className="border border-indigo-200 rounded-lg overflow-hidden">
                  <Button
                    onClick={() => toggleCase(caseStudy.id)}
                    variant="ghost"
                    className="w-full flex justify-between items-center p-4 bg-amber-50 hover:bg-amber-100 text-left h-auto"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 rounded-full text-amber-600">{caseStudy.icon}</div>
                      <span className="font-semibold text-lg text-amber-800">{caseStudy.title}</span>
                    </div>
                    {expandedCase === caseStudy.id ? (
                      <ChevronUp className="h-5 w-5 text-amber-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-amber-600" />
                    )}
                  </Button>

                  {expandedCase === caseStudy.id && (
                    <div className="p-6 bg-white">
                      <div className="space-y-4">
                        {caseStudy.items.map((item, idx) => (
                          <div
                            key={`case-item-${item.question.substring(0, 10).replace(/\s/g, "-")}-${idx}`}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
                          >
                            <div className="font-medium text-indigo-800">{item.question}</div>
                            <div className={`${item.highlight ? "text-red-600 font-semibold" : "text-indigo-600"}`}>{item.answer}</div>
                          </div>
                        ))}

                        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <h4 className="font-semibold text-indigo-900 mb-2">Kết luận:</h4>
                          <p className="text-indigo-800">{caseStudy.conclusion}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Connection with Marx-Lenin Theory */}
        <Card className="mb-12 border-amber-200">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100">
            <CardTitle className="text-2xl text-amber-900 text-center">Kết nối với lý thuyết Mác-Lenin</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* Modern Means of Production */}
            <ExpandableCard title="Tư liệu sản xuất thời đại mới" className="mb-8" defaultExpanded={false}>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-amber-100">
                      <th className="p-3 text-left text-amber-800 border border-amber-200">Loại tư liệu</th>
                      <th className="p-3 text-left text-amber-800 border border-amber-200">Truyền thống (Marx)</th>
                      <th className="p-3 text-left text-amber-800 border border-amber-200">Hiện đại</th>
                      <th className="p-3 text-left text-amber-800 border border-amber-200">Ví dụ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modernMeansOfProduction.map((item, idx) => (
                      <tr key={`production-${item.title.replace(/\s/g, "-")}-${idx}`} className={idx % 2 === 0 ? "bg-white" : "bg-indigo-50"}>
                        <td className="p-3 border border-indigo-200 font-medium">{item.title}</td>
                        <td className="p-3 border border-indigo-200">{item.traditional}</td>
                        <td className="p-3 border border-indigo-200 text-indigo-700">{item.modern}</td>
                        <td className="p-3 border border-indigo-200 text-indigo-600">{item.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ExpandableCard>

            {/* New Class Diagram */}
            <ExpandableCard title="Giai cấp mới" className="mb-8" defaultExpanded={false}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="text-center font-semibold text-lg text-indigo-900">Xưa</div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-red-100 w-full p-4 rounded-lg text-center">
                      <div className="font-semibold text-red-800 mb-2">Tư bản</div>
                      <div className="text-sm text-red-700">Sở hữu nhà máy, máy móc</div>
                    </div>
                    <ArrowRight className="rotate-90 w-8 h-8 text-indigo-500" />
                    <div className="bg-blue-100 w-full p-4 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 mb-2">Công nhân</div>
                      <div className="text-sm text-blue-700">Bán sức lao động</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center font-semibold text-lg text-indigo-900">Nay</div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-purple-100 w-full p-4 rounded-lg text-center">
                      <div className="font-semibold text-purple-800 mb-2">Platform Owner</div>
                      <div className="text-sm text-purple-700">Facebook, Grab, Shopee</div>
                    </div>
                    <ArrowRight className="rotate-90 w-8 h-8 text-indigo-500" />
                    <div className="bg-green-100 w-full p-4 rounded-lg text-center">
                      <div className="font-semibold text-green-800 mb-2">Platform Worker</div>
                      <div className="text-sm text-green-700">Driver, Creator, Seller</div>
                    </div>
                  </div>
                </div>
              </div>
            </ExpandableCard>

            {/* Modern Surplus Value */}
            <ExpandableCard title="Thặng dư giá trị thời đại mới" className="mb-8" defaultExpanded={false}>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 mb-6">
                <p className="text-indigo-800">
                  Marx nói công nhân tạo ra giá trị 1000 đồng nhưng chỉ được trả 600 đồng, 400 đồng còn lại là thặng dư giá trị mà tư bản chiếm đoạt.
                </p>
              </div>

              <div className="space-y-4">
                {modernSurplusValue.map((item, idx) => (
                  <div key={`surplus-item-${item.worker.replace(/\s/g, "-")}-${idx}`} className="border border-indigo-200 rounded-lg overflow-hidden">
                    <Button
                      onClick={() => toggleSurplus(item.worker)}
                      variant="ghost"
                      className="w-full flex justify-between items-center p-3 bg-indigo-100 hover:bg-indigo-200 text-left h-auto"
                    >
                      <span className="font-medium text-indigo-900">{item.worker}</span>
                      {expandedSurplus === item.worker ? (
                        <ChevronUp className="h-5 w-5 text-indigo-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-indigo-600" />
                      )}
                    </Button>

                    {expandedSurplus === item.worker && (
                      <div className="p-4 space-y-2 bg-white">
                        <div className="flex justify-between">
                          <span className="text-indigo-700">Tạo ra:</span>
                          <span className="font-medium">{item.value}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-indigo-700">Doanh thu:</span>
                          <span className="font-medium">{item.revenue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-indigo-700">Người lao động nhận:</span>
                          <span className="font-medium">{item.received}</span>
                        </div>
                        <div className="flex justify-between text-red-600 font-medium">
                          <span>Platform chiếm đoạt:</span>
                          <span>{item.extracted}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                <h4 className="font-semibold text-indigo-900 mb-2">Kết luận:</h4>
                <p className="text-indigo-800">Thặng dư giá trị được chiếm đoạt một cách tinh vi hơn trong kỷ nguyên platform.</p>
              </div>
            </ExpandableCard>

            {/* Hidden Class Nature */}
            <ExpandableCard title="Tính chất giai cấp che giấu" className="mb-8" defaultExpanded={false}>
              <div className="p-5 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-indigo-800 mb-4">Điều nguy hiểm là những platform worker này không tự nhận mình là 'công nhân':</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li className="text-indigo-700">Họ tự gọi là 'entrepreneur', 'business owner'</li>
                  <li className="text-indigo-700">Tâm lý 'tôi làm chủ bản thân' → khó đoàn kết</li>
                  <li className="text-indigo-700">Platform khuyến khích tâm lý này: 'Bạn là CEO của chính mình'</li>
                </ul>
                <p className="text-indigo-800 font-medium mt-4">→ Ý thức giai cấp bị mờ ám, khó đấu tranh tập thể</p>
              </div>
            </ExpandableCard>

            {/* Modern Exploitation */}
            <ExpandableCard title="Bóc lột kiểu mới" className="mb-8" defaultExpanded={false}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modernExploitation.map((item, idx) => (
                  <div key={`exploitation-${item.type.replace(/\s/g, "-")}-${idx}`} className="border border-indigo-200 rounded-lg overflow-hidden">
                    <Button
                      onClick={() => toggleExploitation(item.type)}
                      variant="ghost"
                      className="w-full flex justify-between items-center p-3 bg-indigo-100 hover:bg-indigo-200 text-left h-auto"
                    >
                      <span className="font-medium text-indigo-900">{item.type}</span>
                      {expandedExploitation === item.type ? (
                        <ChevronUp className="h-5 w-5 text-indigo-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-indigo-600" />
                      )}
                    </Button>

                    {expandedExploitation === item.type && (
                      <div className="p-4 bg-white">
                        <p className="text-indigo-700">{item.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ExpandableCard>
          </CardContent>
        </Card>

        {/* Solutions */}
        <Card className="mb-12 border-amber-200">
          <CardHeader className="bg-gradient-to-r from-yellow-100 to-amber-100">
            <CardTitle className="text-2xl text-amber-900 text-center">Vậy freelancer có cách nào tự do thật sự?</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-indigo-900 mb-6">1. Sở hữu tư liệu sản xuất thật sự</h3>

              {solutionOptions.map((option) => (
                <div key={option.id} className="border border-indigo-200 rounded-lg overflow-hidden">
                  <Button
                    onClick={() => toggleSolution(option.id)}
                    variant="ghost"
                    className="w-full flex justify-between items-center p-4 bg-indigo-50 hover:bg-indigo-100 text-left h-auto"
                  >
                    <span className="font-semibold text-lg text-indigo-800">{option.title}</span>
                    {expandedSolution === option.id ? (
                      <ChevronUp className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-indigo-600" />
                    )}
                  </Button>

                  {expandedSolution === option.id && (
                    <div className="p-6 bg-white">
                      <p className="text-indigo-800 mb-4">{option.description}</p>

                      <div className="mb-4">
                        <h4 className="font-medium text-indigo-900 mb-2">Ví dụ:</h4>
                        <ul className="space-y-2 list-disc pl-5">
                          {option.examples.map((example, idx) => (
                            <li key={`example-${example.substring(0, 10).replace(/\s/g, "-")}-${idx}`} className="text-indigo-700">
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-green-800 mb-2">Ưu điểm:</h4>
                          <ul className="space-y-2 list-disc pl-5">
                            {option.pros.map((pro, idx) => (
                              <li key={`pro-${pro.substring(0, 10).replace(/\s/g, "-")}-${idx}`} className="text-green-700">
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-red-800 mb-2">Thách thức:</h4>
                          <ul className="space-y-2 list-disc pl-5">
                            {option.cons.map((con, idx) => (
                              <li key={`con-${con.substring(0, 10).replace(/\s/g, "-")}-${idx}`} className="text-red-700">
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <h3 className="text-xl font-bold text-indigo-900 mt-8 mb-6">2. Nếu không tự do được thì sao?</h3>

              {/* Struggle Types */}
              <div className="space-y-6">
                {/* Individual Struggle */}
                <div className="border border-indigo-200 rounded-lg overflow-hidden">
                  <Button
                    onClick={() => toggleStruggle("individual")}
                    variant="ghost"
                    className="w-full flex justify-between items-center p-4 bg-indigo-50 hover:bg-indigo-100 text-left h-auto"
                  >
                    <div className="flex items-center gap-3">
                      <UserCheck className="h-5 w-5 text-indigo-600" />
                      <span className="font-semibold text-lg text-indigo-800">{struggleTypes.individual.title}</span>
                    </div>
                    {expandedStruggle === "individual" ? (
                      <ChevronUp className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-indigo-600" />
                    )}
                  </Button>

                  {expandedStruggle === "individual" && (
                    <div className="p-6 bg-white">
                      <ul className="space-y-2 list-disc pl-5">
                        {struggleTypes.individual.methods.map((method, idx) => (
                          <li key={`struggle-method-${method.substring(0, 10).replace(/\s/g, "-")}-${idx}`} className="text-indigo-700">
                            {method}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 p-3 bg-amber-50 rounded-lg text-amber-800 border border-amber-200">
                        <span className="font-medium">Hạn chế:</span> {struggleTypes.individual.limitation}
                      </div>
                    </div>
                  )}
                </div>

                {/* Collective Struggle */}
                <div className="border border-indigo-200 rounded-lg overflow-hidden">
                  <Button
                    onClick={() => toggleStruggle("collective")}
                    variant="ghost"
                    className="w-full flex justify-between items-center p-4 bg-indigo-50 hover:bg-indigo-100 text-left h-auto"
                  >
                    <div className="flex items-center gap-3">
                      <UsersRound className="h-5 w-5 text-indigo-600" />
                      <span className="font-semibold text-lg text-indigo-800">{struggleTypes.collective.title}</span>
                    </div>
                    {expandedStruggle === "collective" ? (
                      <ChevronUp className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-indigo-600" />
                    )}
                  </Button>

                  {expandedStruggle === "collective" && (
                    <div className="p-6 bg-white">
                      <div className="mb-6">
                        <h4 className="font-medium text-indigo-900 mb-3">Ví dụ thực tế đã diễn ra:</h4>
                        <div className="space-y-4">
                          {struggleTypes.collective.examples.map((example, idx) => (
                            <div
                              key={`collective-example-${example.name.replace(/\s/g, "-")}-${idx}`}
                              className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                            >
                              <div className="font-medium text-blue-800">{example.name}</div>
                              <div className="text-blue-700 text-sm mt-1">{example.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-indigo-900 mb-2">Hình thức đấu tranh:</h4>
                        <ul className="space-y-2 list-disc pl-5">
                          {struggleTypes.collective.methods.map((method, idx) => (
                            <li key={`collective-method-${method.substring(0, 10).replace(/\s/g, "-")}-${idx}`} className="text-indigo-700">
                              {method}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Government Role */}
                <div className="border border-indigo-200 rounded-lg overflow-hidden">
                  <Button
                    onClick={() => toggleStruggle("government")}
                    variant="ghost"
                    className="w-full flex justify-between items-center p-4 bg-indigo-50 hover:bg-indigo-100 text-left h-auto"
                  >
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-indigo-600" />
                      <span className="font-semibold text-lg text-indigo-800">{struggleTypes.government.title}</span>
                    </div>
                    {expandedStruggle === "government" ? (
                      <ChevronUp className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-indigo-600" />
                    )}
                  </Button>

                  {expandedStruggle === "government" && (
                    <div className="p-6 bg-white">
                      <ul className="space-y-3">
                        {struggleTypes.government.examples.map((example, idx) => (
                          <li
                            key={`govt-example-${example.substring(0, 10).replace(/\s/g, "-")}-${idx}`}
                            className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700"
                          >
                            {example}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 p-3 bg-purple-50 rounded-lg text-purple-800 font-medium border border-purple-200">
                        {struggleTypes.government.conclusion}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conclusion */}
        <Card className="border-amber-200">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100">
            <CardTitle className="text-2xl text-amber-900 text-center flex items-center justify-center gap-2">
              <Lightbulb className="w-6 h-6" />
              Kết luận
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="p-6 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg border border-amber-300">
              <p className="text-amber-800 text-center text-lg">
                "Tự do" trong kỷ nguyên số thực chất là một ảo tưởng khi người lao động không thực sự sở hữu tư liệu sản xuất hiện đại. Đấu tranh giai
                cấp không biến mất, nó chỉ chuyển hình thái và trở nên tinh vi hơn.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamplePage;
