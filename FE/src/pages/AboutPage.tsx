import { Target, Shield, BookOpen, AlertTriangle, Zap, Brain, Users, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
            Kết luận & Về chúng tôi
          </h1>
          <p className="text-xl text-amber-700 max-w-4xl mx-auto">
            Hiểu để không ảo tưởng – và để đấu tranh đúng cách
          </p>
        </div>

        {/* Main Conclusion */}
        <Card className="mb-12 border-2 border-amber-300 bg-gradient-to-r from-amber-100 to-yellow-100">
          <CardHeader>
            <CardTitle className="text-3xl text-amber-900 text-center flex items-center justify-center gap-3">
              <Target className="w-8 h-8" />
              Lời nhấn mạnh
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <blockquote className="text-2xl font-bold text-amber-900 text-center mb-8">
                "Giai cấp không biến mất, chỉ thay đổi hình thức."
              </blockquote>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-amber-900">🔍 Những gì chúng ta đã học được:</h3>
                  <ul className="space-y-2 text-amber-800">
                    <li>• Từ nô lệ → phong kiến → tư bản → platform: hình thức bóc lột ngày càng tinh vi</li>
                    <li>• "Tự do" trong nền kinh tế số thường chỉ là ảo tưởng</li>
                    <li>• Big Tech là chủ sở hữu "tư liệu sản xuất" mới (platform, thuật toán, dữ liệu)</li>
                    <li>• Creator, Freelancer, Gig worker vẫn bị bóc lột, chỉ khác hình thức</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-amber-900">⚡ Lời kêu gọi:</h3>
                  <ul className="space-y-2 text-amber-800">
                    <li>• Hiểu rõ vị trí thực sự của mình trong hệ thống</li>
                    <li>• Không để bị lừa bởi khẩu hiệu "tự do", "khởi nghiệp"</li>
                    <li>• Tìm hiểu và áp dụng lý thuyết Mác-Lênin vào thực tiễn hiện đại</li>
                    <li>• Đoàn kết để đấu tranh cho quyền lợi chính đáng của người lao động</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-amber-800 text-lg">
                  Chỉ khi hiểu được bản chất của hệ thống, chúng ta mới có thể tìm ra cách thay đổi nó một cách đúng đắn.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <Card className="mb-12 border-amber-200">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
            <CardTitle className="text-2xl text-amber-900 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Sứ mệnh của chúng tôi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <p className="text-amber-800 text-lg leading-relaxed">
                Chúng tôi là một nhóm sinh viên, nghiên cứu sinh và người lao động trẻ quan tâm đến việc ứng dụng 
                lý thuyết Mác-Lênin để phân tích những vấn đề xã hội hiện đại. Mục tiêu của chúng tôi là:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-amber-900 mb-2">Giáo dục</h4>
                  <p className="text-amber-800 text-sm">
                    Phổ biến kiến thức lý thuyết Mác-Lênin một cách dễ hiểu và gắn liền với thực tiễn
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-bold text-amber-900 mb-2">Phân tích</h4>
                  <p className="text-amber-800 text-sm">
                    Sử dụng phương pháp duy vật lịch sử để giải thích các hiện tượng xã hội đương đại
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-amber-900 mb-2">Ứng dụng</h4>
                  <p className="text-amber-800 text-sm">
                    Kết nối lý thuyết với thực tiễn, giúp mọi người hiểu rõ vị trí của mình trong xã hội
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Usage Disclaimer */}
        <Card className="mb-12 border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Minh bạch về việc sử dụng AI
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Cam kết minh bạch và liêm chính học thuật
                </h3>
                <div className="space-y-3 text-blue-800">
                  <p>
                    <strong>AI được sử dụng để:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Tạo sơ đồ, infographic và các yếu tố trực quan</li>
                    <li>Gợi ý cấu trúc câu hỏi và bài quiz tương tác</li>
                    <li>Hỗ trợ tối ưu hóa giao diện người dùng (UX/UI)</li>
                    <li>Kiểm tra lỗi chính tả và ngữ pháp</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-100 p-6 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-900 mb-3">
                  ✅ Nội dung học thuật được đảm bảo:
                </h3>
                <ul className="space-y-2 text-green-800">
                  <li>• <strong>Tất cả lý thuyết Mác-Lênin</strong> được đối chiếu với giáo trình chính thức và văn bản gốc</li>
                  <li>• <strong>Dữ liệu thống kê</strong> được trích dẫn từ nguồn đáng tin cậy (SEC filings, báo cáo chính thức)</li>
                  <li>• <strong>Phân tích case study</strong> dựa trên nghiên cứu thực tế, không phải do AI tạo ra</li>
                  <li>• <strong>Kết luận và quan điểm</strong> là của tác giả, AI chỉ hỗ trợ trình bày</li>
                </ul>
              </div>

              <div className="bg-amber-100 p-6 rounded-lg border border-amber-200">
                <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Trách nhiệm của tác giả:
                </h3>
                <p className="text-amber-800">
                  AI chỉ là công cụ hỗ trợ. Toàn bộ nội dung học thuật, quan điểm phân tích và kết luận 
                  đều do sinh viên/tác giả chịu trách nhiệm chỉnh sửa, kiểm chứng và phê duyệt cuối cùng. 
                  Chúng tôi cam kết duy trì tính chính xác và khách quan trong mọi nội dung được trình bày.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Credits */}
        <Card className="mb-12 border-amber-200">
          <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200">
            <CardTitle className="text-xl text-amber-900">Thông tin kỹ thuật</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-amber-900 mb-3">Frontend:</h4>
                <ul className="space-y-1 text-sm text-amber-800">
                  <li>• React 19 + TypeScript</li>
                  <li>• TailwindCSS + Shadcn/ui</li>
                  <li>• Vite build tool</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-3">Features:</h4>
                <ul className="space-y-1 text-sm text-amber-800">
                  <li>• Speech Recognition (tiếng Việt)</li>
                  <li>• Text-to-Speech</li>
                  <li>• Interactive Quiz</li>
                  <li>• Progressive Web App</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Call to Action */}
        <div className="text-center">
          <Card className="border-2 border-red-300 bg-gradient-to-r from-red-50 to-pink-50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-red-900 mb-4">
                Hành động ngay hôm nay
              </h2>
              <p className="text-red-800 mb-6 text-lg">
                Kiến thức chỉ có ý nghĩa khi được ứng dụng vào thực tiễn. 
                Hãy bắt đầu bằng việc hiểu rõ vị trí của bản thân trong hệ thống hiện tại.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="border-red-300 text-red-700 px-4 py-2">
                  Đọc thêm lý thuyết Mác-Lênin
                </Badge>
                <Badge variant="outline" className="border-red-300 text-red-700 px-4 py-2">
                  Tham gia các tổ chức tiến bộ
                </Badge>
                <Badge variant="outline" className="border-red-300 text-red-700 px-4 py-2">
                  Chia sẻ kiến thức với bạn bè
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;