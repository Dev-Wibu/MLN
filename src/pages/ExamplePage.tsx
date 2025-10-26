import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpandableCard from "@/components/ui/expandable-card";
import { AlertTriangle, Briefcase, ChevronDown, ChevronUp, Database, Globe, TrendingDown, Users } from "lucide-react";
import { useState } from "react";

const ExamplePage = () => {
  const [expandedImpact, setExpandedImpact] = useState<string | null>(null);
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  const toggleImpact = (id: string) => {
    setExpandedImpact(expandedImpact === id ? null : id);
  };

  const toggleCase = (id: string) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  const impacts = {
    laborMarket: {
      id: "labor",
      title: "Tác động đến thị trường lao động",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-100 to-blue-200",
      summary: "AI đang thay đổi cơ bản cấu trúc lao động và tạo ra sự phân hóa mới",
      details: [
        {
          subtitle: "Thay thế lao động tri thức",
          description: "AI không chỉ thay thế lao động chân tay mà còn đe dọa cả lao động tri thức",
          examples: [
            "ChatGPT có thể thay thế content writer, copywriter, customer service",
            "GitHub Copilot thay thế lập trình viên junior",
            "Midjourney/DALL-E thay thế designer đồ họa",
            "Ước tính 300 triệu việc làm toàn cầu bị ảnh hưởng (Goldman Sachs, 2023)"
          ]
        },
        {
          subtitle: "Phân hóa lao động mới",
          description: "Tạo ra sự phân hóa giữa ai biết sử dụng AI và ai không",
          examples: [
            "Những người thành thạo AI tools có năng suất cao hơn 40%",
            "Lương của AI engineer cao gấp 2-3 lần lập trình viên thông thường",
            "Xuất hiện 'tầng lớp quý tộc AI' - những người kiểm soát mô hình AI"
          ]
        },
        {
          subtitle: "Gig economy và precarization",
          description: "Tăng cường xu hướng việc làm bấp bênh, không ổn định",
          examples: [
            "AI giúp doanh nghiệp dễ dàng outsource và gig work",
            "Không cần nhân viên toàn thời gian, chỉ cần freelancer + AI",
            "Mất quyền lợi bảo hiểm, phúc lợi xã hội"
          ]
        }
      ]
    },
    startups: {
      id: "startup",
      title: "Tác động đến startup và doanh nghiệp nhỏ",
      icon: <Briefcase className="w-6 h-6" />,
      color: "from-green-100 to-green-200",
      summary: "Hàng rào gia nhập cao tạo ra bất công trong cạnh tranh",
      details: [
        {
          subtitle: "Chi phí R&D khổng lồ",
          description: "Chỉ có các tập đoàn lớn mới đủ tiền đầu tư vào AI tiên tiến",
          examples: [
            "Huấn luyện GPT-4: ~100 triệu USD",
            "Chi phí GPU: H100 giá 25,000-40,000 USD/chip, cần hàng nghìn chip",
            "Startup nhỏ không thể cạnh tranh về mặt công nghệ"
          ]
        },
        {
          subtitle: "Phụ thuộc vào Big Tech",
          description: "Startup phải dựa vào API của các công ty lớn",
          examples: [
            "Startup AI chỉ là 'wrapper' của OpenAI API",
            "Giá API có thể tăng đơn phương (OpenAI đã tăng giá nhiều lần)",
            "Big Tech có thể copy feature và giết chết startup bất cứ lúc nào"
          ]
        },
        {
          subtitle: "M&A để loại bỏ đối thủ",
          description: "Các tập đoàn lớn mua lại startup tiềm năng",
          examples: [
            "Google mua DeepMind (500 triệu USD)",
            "Microsoft mua Nuance (20 tỷ USD)",
            "Meta mua hàng chục AI startup nhỏ",
            "Startup có 2 lựa chọn: bán cho Big Tech hoặc chết"
          ]
        }
      ]
    },
    personalData: {
      id: "data",
      title: "Vấn đề dữ liệu cá nhân",
      icon: <Database className="w-6 h-6" />,
      color: "from-purple-100 to-purple-200",
      summary: "Dữ liệu cá nhân trở thành 'dầu mỏ mới' bị khai thác",
      details: [
        {
          subtitle: "Khai thác dữ liệu miễn phí",
          description: "Người dùng 'cho không' dữ liệu, Big Tech kiếm lời",
          examples: [
            "ChatGPT được huấn luyện từ dữ liệu internet công cộng (không xin phép)",
            "Mọi cuộc trò chuyện với AI đều được lưu và dùng để cải thiện model",
            "Facebook, Google thu thập mọi hành vi người dùng"
          ]
        },
        {
          subtitle: "Quyền sở hữu tri thức",
          description: "Ai sở hữu dữ liệu và tri thức được tạo ra?",
          examples: [
            "Nghệ sĩ bức xúc vì tác phẩm bị dùng để train AI mà không được trả tiền",
            "Stack Overflow: lập trình viên chia sẻ kiến thức miễn phí, GitHub Copilot bán lại",
            "Vấn đề bản quyền chưa được giải quyết rõ ràng"
          ]
        },
        {
          subtitle: "Giám sát và kiểm soát",
          description: "AI tạo điều kiện cho giám sát đại trà",
          examples: [
            "AI nhận diện khuôn mặt (facial recognition) ở Trung Quốc",
            "Phân tích tâm lý, dự đoán hành vi từ dữ liệu",
            "Nguy cơ 'surveillance capitalism' (tư bản giám sát)"
          ]
        }
      ]
    },
    globalCompetition: {
      id: "global",
      title: "Cạnh tranh toàn cầu",
      icon: <Globe className="w-6 h-6" />,
      color: "from-red-100 to-red-200",
      summary: "Cuộc chiến AI giữa các cường quốc và sự phụ thuộc công nghệ",
      details: [
        {
          subtitle: "Phân hóa quốc gia",
          description: "Khoảng cách AI giữa các nước ngày càng lớn",
          examples: [
            "Mỹ và Trung Quốc dẫn đầu, châu Âu đuổi theo, phần còn lại bị bỏ lại",
            "Việt Nam phụ thuộc hoàn toàn vào AI từ nước ngoài",
            "Các nước nghèo không có cơ hội phát triển AI riêng"
          ]
        },
        {
          subtitle: "Chủ quyền công nghệ",
          description: "Các nước mất chủ quyền khi phụ thuộc AI nước ngoài",
          examples: [
            "Dữ liệu công dân qua AI của nước ngoài (vấn đề an ninh quốc gia)",
            "Quyết định quan trọng phụ thuộc vào AI không tự chủ",
            "Bị 'cấm vận công nghệ' (như Mỹ cấm xuất chip AI sang Trung Quốc)"
          ]
        },
        {
          subtitle: "Chủ nghĩa đế quốc AI",
          description: "AI trở thành công cụ của chủ nghĩa đế quốc mới",
          examples: [
            "Mỹ dùng AI để duy trì bá quyền công nghệ",
            "Trung Quốc dùng AI để mở rộng ảnh hưởng (Vành đai, Con đường)",
            "Các nước nhỏ trở thành 'thuộc địa kỹ thuật số'"
          ]
        }
      ]
    }
  };

  const realCases = [
    {
      id: "writers-strike",
      title: "Đình công của biên kịch Hollywood (2023)",
      description: "Writers Guild of America đình công đòi quyền lợi trước AI",
      icon: <TrendingDown className="w-6 h-6 text-red-600" />,
      details: {
        situation: "Các studio muốn dùng AI để viết kịch bản, thay thế biên kịch",
        struggle: "11,500 biên kịch đình công 148 ngày (May-Sep 2023)",
        result: "Thắng lợi một phần: Studio phải công khai khi dùng AI, biên kịch có quyền từ chối",
        lesson: "Đấu tranh tập thể vẫn có hiệu quả trong kỷ nguyên AI"
      }
    },
    {
      id: "artists-lawsuit",
      title: "Nghệ sĩ kiện Stability AI, Midjourney (2023)",
      description: "Hàng ngàn nghệ sĩ kiện các công ty AI vì vi phạm bản quyền",
      icon: <AlertTriangle className="w-6 h-6 text-sky-600" />,
      details: {
        situation: "AI được train trên hàng triệu tác phẩm nghệ thuật không xin phép",
        struggle: "Class action lawsuit của nghệ sĩ chống lại Stability AI, Midjourney, DeviantArt",
        result: "Vụ kiện đang diễn ra, chưa có kết quả cuối cùng",
        lesson: "Vấn đề quyền sở hữu tri thức trong kỷ nguyên AI chưa được giải quyết"
      }
    },
    {
      id: "eu-ai-act",
      title: "EU AI Act - Quy định đầu tiên về AI",
      description: "Châu Âu dẫn đầu trong việc quy định AI",
      icon: <Users className="w-6 h-6 text-blue-600" />,
      details: {
        situation: "Không có quy định toàn cầu về AI, Big Tech tự do làm gì muốn",
        struggle: "EU thông qua AI Act (2024) - luật đầu tiên trên thế giới",
        result: "Cấm một số ứng dụng AI nguy hiểm, yêu cầu minh bạch thuật toán",
        lesson: "Cần can thiệp của nhà nước để kiểm soát độc quyền AI"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
            Tác động của độc quyền AI
          </h1>
          <p className="text-xl text-blue-700 max-w-4xl mx-auto">
            Phân tích toàn diện về ảnh hưởng của độc quyền AI đến thị trường lao động, 
            doanh nghiệp nhỏ, dữ liệu cá nhân và cạnh tranh toàn cầu.
          </p>
        </div>

        {/* Four Main Impacts */}
        <div className="mb-12 space-y-6">
          {Object.values(impacts).map((impact) => (
            <div key={impact.id} className="border border-blue-200 rounded-lg overflow-hidden">
              <Button
                onClick={() => toggleImpact(impact.id)}
                variant="ghost"
                className="w-full flex justify-between items-center p-6 bg-blue-50 hover:bg-blue-100 text-left h-auto"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-gradient-to-r ${impact.color} rounded-full`}>
                    {impact.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-blue-900">{impact.title}</h2>
                    <p className="text-sm text-blue-700 mt-1">{impact.summary}</p>
                  </div>
                </div>
                {expandedImpact === impact.id ? (
                  <ChevronUp className="h-6 w-6 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-blue-600 flex-shrink-0" />
                )}
              </Button>

              {expandedImpact === impact.id && (
                <div className="p-6 bg-white space-y-6">
                  {impact.details.map((detail, idx) => (
                    <div key={idx} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="font-bold text-blue-900 mb-2">{detail.subtitle}</h3>
                      <p className="text-blue-800 mb-3">{detail.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-900 text-sm">Ví dụ cụ thể:</h4>
                        <ul className="space-y-1">
                          {detail.examples.map((example, exIdx) => (
                            <li key={exIdx} className="text-sm text-blue-700 flex items-start">
                              <span className="mr-2">•</span>
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Real World Cases */}
        <Card className="mb-12 border-2 border-blue-300">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
            <CardTitle className="text-2xl text-blue-900 text-center">
              Các trường hợp thực tế
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-blue-800 text-center mb-6">
              Một số ví dụ về cách mọi người đang đối phó với độc quyền AI
            </p>

            <div className="space-y-4">
              {realCases.map((caseStudy) => (
                <div key={caseStudy.id} className="border border-blue-200 rounded-lg overflow-hidden">
                  <Button
                    onClick={() => toggleCase(caseStudy.id)}
                    variant="ghost"
                    className="w-full flex justify-between items-center p-4 bg-blue-50 hover:bg-blue-100 text-left h-auto"
                  >
                    <div className="flex items-center gap-3">
                      {caseStudy.icon}
                      <div>
                        <h3 className="font-bold text-blue-900">{caseStudy.title}</h3>
                        <p className="text-sm text-blue-700">{caseStudy.description}</p>
                      </div>
                    </div>
                    {expandedCase === caseStudy.id ? (
                      <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    )}
                  </Button>

                  {expandedCase === caseStudy.id && (
                    <div className="p-6 bg-white space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">Tình huống:</h4>
                          <p className="text-sm text-gray-800">{caseStudy.details.situation}</p>
                        </div>
                        
                        <div className="p-3 bg-sky-50 rounded-lg">
                          <h4 className="font-semibold text-sky-900 mb-2">Đấu tranh:</h4>
                          <p className="text-sm text-sky-800">{caseStudy.details.struggle}</p>
                        </div>
                        
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-900 mb-2">Kết quả:</h4>
                          <p className="text-sm text-green-800">{caseStudy.details.result}</p>
                        </div>
                        
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Bài học:</h4>
                          <p className="text-sm text-blue-800">{caseStudy.details.lesson}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Synthesis */}
        <ExpandableCard
          title="Tổng hợp: Mối liên hệ giữa các tác động"
          headerClassName="bg-gradient-to-r from-purple-100 to-pink-100"
          className="mb-12"
          defaultExpanded={false}
        >
          <div className="space-y-6">
            <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-bold text-purple-900 mb-3">Vòng luẩn quẩn của độc quyền AI</h3>
              <div className="space-y-3 text-purple-800">
                <p className="flex items-start">
                  <span className="font-bold mr-2">1.</span>
                  <span><strong>Big Tech độc quyền công nghệ</strong> → Startup không thể cạnh tranh</span>
                </p>
                <p className="flex items-start">
                  <span className="font-bold mr-2">2.</span>
                  <span><strong>Startup phụ thuộc Big Tech</strong> → Big Tech càng mạnh</span>
                </p>
                <p className="flex items-start">
                  <span className="font-bold mr-2">3.</span>
                  <span><strong>Big Tech kiểm soát dữ liệu</strong> → AI càng tốt → Độc quyền càng mạnh</span>
                </p>
                <p className="flex items-start">
                  <span className="font-bold mr-2">4.</span>
                  <span><strong>AI thay thế lao động</strong> → Người lao động phụ thuộc AI của Big Tech</span>
                </p>
                <p className="flex items-start">
                  <span className="font-bold mr-2">5.</span>
                  <span><strong>Quốc gia phụ thuộc công nghệ nước ngoài</strong> → Mất chủ quyền</span>
                </p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-100 to-sky-100 rounded-lg border border-blue-300">
              <p className="text-blue-900 font-semibold text-center mb-2">
                Kết luận theo quan điểm Mác-Lênin:
              </p>
              <p className="text-blue-800 text-center">
                Độc quyền AI là biểu hiện điển hình của <strong>"chủ nghĩa đế quốc giai đoạn cao nhất"</strong> trong kỷ nguyên số. 
                Nó thể hiện đầy đủ các đặc điểm mà Lenin mô tả: tập trung sản xuất, tư bản tài chính, 
                xuất khẩu tư bản, và ảnh hưởng chính trị toàn cầu.
              </p>
            </div>
          </div>
        </ExpandableCard>

        {/* Conclusion */}
        <Card className="border-2 border-blue-300">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-sky-100">
            <CardTitle className="text-2xl text-blue-900 text-center">
              Đánh giá tổng thể
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
                  <div className="text-3xl font-bold text-red-900 mb-2">⚠️</div>
                  <h4 className="font-bold text-red-900 mb-2">Nguy cơ</h4>
                  <p className="text-sm text-red-800">
                    Quyền lực tập trung, bất bình đẳng gia tăng, 
                    phụ thuộc công nghệ
                  </p>
                </div>
                
                <div className="p-4 bg-sky-50 rounded-lg border border-sky-200 text-center">
                  <div className="text-3xl font-bold text-sky-900 mb-2">⚖️</div>
                  <h4 className="font-bold text-sky-900 mb-2">Thách thức</h4>
                  <p className="text-sm text-sky-800">
                    Cân bằng giữa đổi mới công nghệ và công bằng xã hội
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                  <div className="text-3xl font-bold text-green-900 mb-2">💪</div>
                  <h4 className="font-bold text-green-900 mb-2">Hành động</h4>
                  <p className="text-sm text-green-800">
                    Cần quy định nhà nước, đoàn kết quốc tế, 
                    đầu tư AI công
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <p className="text-blue-900 text-center italic">
                  "Không có gì tự nhiên hoặc tất yếu về việc một số ít công ty kiểm soát AI. 
                  Đây là kết quả của cấu trúc kinh tế tư bản và có thể được thay đổi thông qua hành động tập thể và chính sách công."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamplePage;
