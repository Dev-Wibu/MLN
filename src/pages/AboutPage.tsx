import { AlertCircle, BookOpen, Brain, Lightbulb, Shield, Target, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ExpandableCard from '@/components/ui/expandable-card';

const AboutPage = () => {
  const awarenessPoints = [
    {
      id: 1,
      title: "Nhận thức về bản chất độc quyền AI",
      icon: <Brain className="w-6 h-6" />,
      color: "from-blue-100 to-blue-200",
      insights: [
        "AI không phải là 'công nghệ trung lập' - nó phản ánh lợi ích của người kiểm soát nó",
        "Big Tech không phát triển AI 'vì nhân loại' - mục tiêu là lợi nhuận và quyền lực",
        "Độc quyền AI không phải ngẫu nhiên - là kết quả tất yếu của tích tụ tư bản",
        "'Dân chủ hóa AI' là khẩu hiệu - thực tế quyền lực vẫn tập trung"
      ]
    },
    {
      id: 2,
      title: "Hiểu vị trí của bản thân",
      icon: <Target className="w-6 h-6" />,
      color: "from-green-100 to-green-200",
      insights: [
        "Sinh viên là người lao động tri thức tương lai - sẽ bị ảnh hưởng trực tiếp bởi AI",
        "Không phải 'chủ doanh nghiệp AI' mà là người lao động phụ thuộc vào công cụ AI",
        "Nguy cơ: AI thay thế hoặc giảm giá trị lao động tri thức",
        "Cơ hội: Nếu hiểu rõ và tổ chức tốt, có thể đấu tranh cho quyền lợi"
      ]
    },
    {
      id: 3,
      title: "Phê phán tư duy 'tư bản công nghệ'",
      icon: <AlertCircle className="w-6 h-6" />,
      color: "from-purple-100 to-purple-200",
      insights: [
        "'Đổi mới sáng tạo' thường chỉ là cái cớ để tập trung quyền lực",
        "'Startup unicorn' chỉ là exception, phần lớn thất bại hoặc bị thâu tóm",
        "Tư tưởng 'tự do khởi nghiệp' che giấu thực tế phụ thuộc vào Big Tech",
        "'Văn hóa làm việc tech' (làm việc 996, không công đoàn) là bóc lột mới"
      ]
    }
  ];

  const actionOrientations = [
    {
      category: "Học tập và nghiên cứu",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      actions: [
        {
          title: "Nắm vững lý thuyết Mác-Lênin",
          description: "Đọc các tác phẩm cổ điển và áp dụng vào phân tích hiện đại",
          specifics: [
            "'Chủ nghĩa đế quốc, giai đoạn cao nhất của CNTB' - V.I. Lenin",
            "'Tư bản' của K. Marx - hiểu về giá trị thặng dư và tích tụ tư bản",
            "Các nghiên cứu hiện đại về 'platform capitalism', 'surveillance capitalism'"
          ]
        },
        {
          title: "Học AI một cách phê phán",
          description: "Không chỉ học kỹ thuật mà còn hiểu bối cảnh xã hội-chính trị",
          specifics: [
            "AI Ethics: Ai được lợi, ai bị thiệt từ AI?",
            "Data Justice: Quyền sở hữu và kiểm soát dữ liệu",
            "Algorithmic Bias: AI phản ánh và khuếch đại bất bình đẳng xã hội như thế nào"
          ]
        },
        {
          title: "Nghiên cứu lịch sử đấu tranh công nghệ",
          description: "Học từ các cuộc đấu tranh trước đây",
          specifics: [
            "Phong trào Free Software (Richard Stallman, FSF)",
            "Đấu tranh chống độc quyền Microsoft (1990s)",
            "Cambridge Analytica và phong trào quyền riêng tư dữ liệu"
          ]
        }
      ]
    },
    {
      category: "Hành động cá nhân",
      icon: <Shield className="w-6 h-6 text-green-600" />,
      actions: [
        {
          title: "Bảo vệ dữ liệu cá nhân",
          description: "Giảm sự phụ thuộc vào Big Tech",
          specifics: [
            "Sử dụng open-source alternatives (Linux, Firefox, Signal)",
            "Hạn chế chia sẻ dữ liệu không cần thiết",
            "Hiểu rõ privacy policy trước khi dùng dịch vụ"
          ]
        },
        {
          title: "Ủng hộ công nghệ mở và phi tập trung",
          description: "Tham gia và đóng góp cho cộng đồng open source",
          specifics: [
            "Đóng góp code cho các dự án open-source AI",
            "Chia sẻ kiến thức miễn phí, không để Big Tech độc quyền tri thức",
            "Sử dụng và phát triển AI models mở (như Llama, Mistral)"
          ]
        },
        {
          title: "Phát triển nhận thức giai cấp",
          description: "Không tự coi mình là 'entrepreneur' khi thực chất là lao động",
          specifics: [
            "Nhận ra lợi ích chung với người lao động khác, không với Big Tech",
            "Không ảo tưởng về 'làm giàu từ AI' khi thực chất là làm thuê cho platform",
            "Hiểu rằng 'tự do làm việc' thường chỉ là 'tự do bị bóc lột'"
          ]
        }
      ]
    },
    {
      category: "Hành động tập thể",
      icon: <Users className="w-6 h-6 text-purple-600" />,
      actions: [
        {
          title: "Tham gia và xây dựng tổ chức",
          description: "Sức mạnh nằm ở tập thể, không phải cá nhân",
          specifics: [
            "Tham gia công đoàn tech workers (nếu có)",
            "Tham gia các nhóm nghiên cứu, tổ chức tiến bộ",
            "Xây dựng mạng lưới sinh viên quan tâm đến vấn đề này"
          ]
        },
        {
          title: "Vận động chính sách",
          description: "Yêu cầu nhà nước can thiệp để kiểm soát độc quyền",
          specifics: [
            "Ủng hộ luật chống độc quyền công nghệ",
            "Yêu cầu minh bạch thuật toán AI",
            "Đòi quyền sở hữu dữ liệu cá nhân và chia sẻ lợi nhuận từ dữ liệu"
          ]
        },
        {
          title: "Đoàn kết quốc tế",
          description: "Độc quyền AI là vấn đề toàn cầu, cần giải pháp toàn cầu",
          specifics: [
            "Kết nối với phong trào công nghệ tiến bộ toàn cầu",
            "Học hỏi từ các cuộc đấu tranh ở nước khác (EU AI Act, California AB5)",
            "Ủng hộ phát triển AI công (public AI) thay vì AI tư nhân"
          ]
        }
      ]
    }
  ];

  const studentRoles = [
    {
      role: "Nghiên cứu viên phê phán",
      description: "Nghiên cứu về tác động xã hội của AI, không chỉ kỹ thuật",
      importance: "Tạo cơ sở lý luận cho đấu tranh và chính sách"
    },
    {
      role: "Nhà phát triển có trách nhiệm",
      description: "Phát triển AI phục vụ lợi ích công, không chỉ lợi nhuận",
      importance: "Tạo ra các giải pháp thay thế cho Big Tech"
    },
    {
      role: "Người tổ chức cộng đồng",
      description: "Kết nối và vận động sinh viên, người lao động tech",
      importance: "Xây dựng lực lượng đấu tranh tập thể"
    },
    {
      role: "Nhà hoạt động chính sách",
      description: "Vận động cho các chính sách công nghệ tiến bộ",
      importance: "Tạo khung pháp lý để kiểm soát độc quyền"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
            Nhận thức và hành động
          </h1>
          <p className="text-xl text-blue-700 max-w-4xl mx-auto">
            Định hướng cho sinh viên trong môi trường AI phát triển nhanh nhưng bị chi phối bởi "nhà tư bản công nghệ"
          </p>
        </div>

        {/* Quote */}
        <Card className="mb-12 border-2 border-red-300 bg-gradient-to-r from-red-50 to-pink-50">
          <CardContent className="p-8">
            <blockquote className="text-2xl font-bold text-red-900 text-center mb-4">
              "Không có gì nguy hiểm hơn là tự phụ về kiến thức và thiếu nhận thức về bối cảnh xã hội"
            </blockquote>
            <p className="text-red-800 text-center">
              Trong kỷ nguyên AI, sinh viên cần vừa nắm vững công nghệ, vừa hiểu rõ bản chất giai cấp của nó.
            </p>
          </CardContent>
        </Card>

        {/* Awareness Points */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
            Ba nhận thức cơ bản
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {awarenessPoints.map((point) => (
              <ExpandableCard
                key={point.id}
                title={point.title}
                icon={point.icon}
                headerClassName={`bg-gradient-to-r ${point.color}`}
                defaultExpanded={false}
              >
                <ul className="space-y-3">
                  {point.insights.map((insight, idx) => (
                    <li key={idx} className="text-blue-800 flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </ExpandableCard>
            ))}
          </div>
        </div>

        {/* Action Orientations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
            Định hướng hành động
          </h2>
          <div className="space-y-8">
            {actionOrientations.map((category, idx) => (
              <ExpandableCard
                key={idx}
                title={category.category}
                icon={category.icon}
                headerClassName="bg-gradient-to-r from-blue-100 to-sky-100"
                defaultExpanded={false}
              >
                <div className="space-y-6">
                  {category.actions.map((action, actionIdx) => (
                    <div key={actionIdx} className="p-4 bg-white rounded-lg border border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        {action.title}
                      </h4>
                      <p className="text-blue-800 mb-3">{action.description}</p>
                      <div className="pl-4 space-y-2">
                        {action.specifics.map((specific, specIdx) => (
                          <div key={specIdx} className="text-sm text-blue-700 flex items-start">
                            <span className="mr-2">→</span>
                            <span>{specific}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ExpandableCard>
            ))}
          </div>
        </div>

        {/* Student Roles */}
        <Card className="mb-12 border-2 border-blue-300">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
            <CardTitle className="text-2xl text-blue-900 text-center">
              Vai trò sinh viên trong kỷ nguyên AI
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-blue-800 text-center mb-6">
              Sinh viên không chỉ là người tiêu dùng công nghệ thụ động, mà có thể đóng nhiều vai trò tích cực
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {studentRoles.map((item, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3 mb-3">
                    <Badge className="bg-blue-600 text-white">{idx + 1}</Badge>
                    <h4 className="font-bold text-blue-900">{item.role}</h4>
                  </div>
                  <p className="text-blue-800 mb-2">{item.description}</p>
                  <p className="text-sm text-blue-700 italic">
                    <strong>Tầm quan trọng:</strong> {item.importance}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Long-term Vision */}
        <Card className="mb-12 border-2 border-green-300">
          <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
            <CardTitle className="text-2xl text-blue-900 text-center flex items-center justify-center gap-2">
              <Lightbulb className="w-6 h-6" />
              Tầm nhìn dài hạn
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-900 mb-3 text-center">AI công (Public AI) thay vì AI tư nhân</h3>
                <p className="text-green-800 mb-4">
                  Thay vì để Big Tech độc quyền AI, chúng ta cần xây dựng AI công cộng, 
                  thuộc sở hữu và kiểm soát của cộng đồng.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Đặc điểm:</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Mã nguồn mở, minh bạch</li>
                      <li>• Quản lý dân chủ</li>
                      <li>• Phục vụ lợi ích công, không phải lợi nhuận</li>
                      <li>• Dữ liệu thuộc về người đóng góp</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Ví dụ hiện tại:</h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Wikipedia - tri thức công</li>
                      <li>• Linux - hệ điều hành công</li>
                      <li>• Hugging Face - AI models mở</li>
                      <li>• Cần mở rộng và nhân rộng!</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-100 to-sky-100 rounded-lg border border-blue-300">
                <h3 className="font-bold text-blue-900 mb-3 text-center">
                  Từ "Độc quyền AI" đến "AI vì nhân dân"
                </h3>
                <p className="text-blue-800 text-center">
                  Đây không phải là utopia, mà là mục tiêu có thể đạt được nếu chúng ta có nhận thức đúng đắn, 
                  tổ chức chặt chẽ và đấu tranh kiên quyết. Lịch sử đã chứng minh rằng khi đại đa số giác ngộ và đoàn kết, 
                  độc quyền có thể bị đánh bại.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-white">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
              Bắt đầu hành động ngay hôm nay
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-6 bg-white rounded-lg border border-blue-200">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="font-bold text-blue-900 mb-2">Học tập</h3>
                <p className="text-sm text-blue-800">
                  Đọc Lenin, Marx, và các nghiên cứu hiện đại về platform capitalism
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg border border-blue-200">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="font-bold text-blue-900 mb-2">Kết nối</h3>
                <p className="text-sm text-blue-800">
                  Tham gia các tổ chức, nhóm nghiên cứu về công nghệ và xã hội
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg border border-blue-200">
                <div className="text-4xl mb-3">💪</div>
                <h3 className="font-bold text-blue-900 mb-2">Hành động</h3>
                <p className="text-sm text-blue-800">
                  Đóng góp cho open source, vận động chính sách, nâng cao nhận thức
                </p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg border border-red-300">
              <p className="text-red-900 text-center text-lg font-semibold">
                "Kiến thức mà không có hành động chỉ là lý thuyết suông. Hành động mà không có kiến thức chỉ là manh động. 
                Hãy kết hợp cả hai để tạo ra thay đổi thực sự!"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-8 text-blue-700">
          <p className="text-sm">
            Website này là công cụ giáo dục, nhằm phân tích hiện tượng độc quyền AI từ góc độ lý thuyết Mác-Lênin. 
            Mọi nội dung đều được nghiên cứu và kiểm chứng kỹ lưỡng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
