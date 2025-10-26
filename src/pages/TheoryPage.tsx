import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpandableCard from "@/components/ui/expandable-card";
import { Building2, DollarSign, Factory, Globe, TrendingUp } from "lucide-react";

const TheoryPage = () => {
  const leninCharacteristics = [
    {
      id: 1,
      title: "Tập trung sản xuất và độc quyền",
      icon: <Factory className="w-6 h-6" />,
      description: "Sản xuất tập trung vào số ít doanh nghiệp lớn, tạo ra độc quyền",
      examples: [
        "Một số ít công ty kiểm soát toàn bộ ngành công nghiệp",
        "Các tập đoàn khổng lồ thay thế cạnh tranh tự do",
        "Hợp nhất và mua lại để loại bỏ đối thủ"
      ],
      color: "from-blue-100 to-blue-200"
    },
    {
      id: 2,
      title: "Vai trò quyết định của tư bản tài chính",
      icon: <DollarSign className="w-6 h-6" />,
      description: "Sự hợp nhất giữa tư bản ngân hàng và tư bản công nghiệp",
      examples: [
        "Ngân hàng không chỉ cho vay mà còn kiểm soát doanh nghiệp",
        "Tư bản tài chính chi phối nền kinh tế",
        "Tạo ra tầng lớp quý tộc tài chính"
      ],
      color: "from-green-100 to-green-200"
    },
    {
      id: 3,
      title: "Xuất khẩu tư bản",
      icon: <Globe className="w-6 h-6" />,
      description: "Xuất khẩu tư bản trở nên quan trọng hơn xuất khẩu hàng hóa",
      examples: [
        "Đầu tư trực tiếp nước ngoài (FDI)",
        "Kiểm soát thị trường toàn cầu qua vốn đầu tư",
        "Tạo ra sự phụ thuộc về kinh tế"
      ],
      color: "from-purple-100 to-purple-200"
    },
    {
      id: 4,
      title: "Liên minh độc quyền quốc tế",
      icon: <Building2 className="w-6 h-6" />,
      description: "Hình thành các liên minh và cartel toàn cầu",
      examples: [
        "Chia chẻ thị trường thế giới",
        "Thỏa thuận giá cả và sản lượng",
        "Hợp tác để duy trì độc quyền"
      ],
      color: "from-red-100 to-red-200"
    },
    {
      id: 5,
      title: "Phân chia lãnh thổ thế giới",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "Các cường quốc tư bản phân chia thế giới thành các thế lực ảnh hưởng",
      examples: [
        "Kiểm soát tài nguyên và thị trường toàn cầu",
        "Tạo ra các khu vực ảnh hưởng kinh tế",
        "Cạnh tranh để tái phân chia thế giới"
      ],
      color: "from-sky-100 to-blue-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">Lý thuyết độc quyền của V.I. Lenin</h1>
          <p className="text-xl text-blue-700 max-w-4xl mx-auto">
            Hiểu về đặc điểm kinh tế của độc quyền và chủ nghĩa đế quốc theo lý thuyết của V.I. Lenin. 
            Từ "Chủ nghĩa đế quốc, giai đoạn cao nhất của chủ nghĩa tư bản" (1916).
          </p>
        </div>

        {/* Lenin's Context */}
        <Card className="mb-12 border-2 border-blue-300">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-sky-100">
            <CardTitle className="text-2xl text-blue-900 text-center">Bối cảnh lịch sử</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4 text-blue-800">
              <p>
                Vào đầu thế kỷ 20, V.I. Lenin quan sát thấy chủ nghĩa tư bản đã chuyển sang một giai đoạn mới: 
                từ cạnh tranh tự do sang <strong>độc quyền</strong> và <strong>chủ nghĩa đế quốc</strong>.
              </p>
              <p>
                Lenin cho rằng đây là kết quả tất yếu của sự phát triển tư bản: khi vốn tích tụ và tập trung, 
                một số ít tập đoàn sẽ thống trị các ngành kinh tế quan trọng, nắm giữ các phát minh then chốt, 
                nguồn tài chính khổng lồ và khả năng ảnh hưởng đến chính sách nhà nước.
              </p>
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 mt-6">
                <p className="text-center font-semibold text-lg text-blue-900 mb-2">
                  "Chủ nghĩa đế quốc là chủ nghĩa tư bản ở giai đoạn phát triển mà sự thống trị của các độc quyền và tư bản tài chính đã hình thành"
                </p>
                <p className="text-center text-blue-700 text-sm">— V.I. Lenin</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Five Characteristics */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
            5 Đặc điểm kinh tế cơ bản của Chủ nghĩa đế quốc
          </h2>
          <div className="space-y-6">
            {leninCharacteristics.map((char, index) => (
              <ExpandableCard
                key={char.id}
                title={`${index + 1}. ${char.title}`}
                icon={char.icon}
                headerClassName={`bg-gradient-to-r ${char.color}`}
                defaultExpanded={false}
              >
                <div className="space-y-4">
                  <p className="text-blue-800 font-medium">{char.description}</p>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Biểu hiện:</h4>
                    <ul className="space-y-2">
                      {char.examples.map((example, idx) => (
                        <li key={`char-${char.id}-ex-${idx}`} className="text-blue-700 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ExpandableCard>
            ))}
          </div>
        </div>

        {/* Financial Capital */}
        <Card className="mb-12 border-2 border-blue-300">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
            <CardTitle className="text-2xl text-blue-900 text-center">Tư bản tài chính</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-900">Khái niệm</h3>
                  <p className="text-blue-800">
                    Tư bản tài chính là sự hợp nhất giữa tư bản ngân hàng và tư bản công nghiệp, 
                    trong đó các ngân hàng không chỉ cho vay mà còn kiểm soát trực tiếp các doanh nghiệp công nghiệp.
                  </p>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-800 text-sm">
                      <strong>Ví dụ:</strong> J.P. Morgan không chỉ là ngân hàng mà còn kiểm soát các tập đoàn sắt thép, 
                      đường sắt, và nhiều ngành công nghiệp khác ở Mỹ đầu thế kỷ 20.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-900">Vai trò</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Kiểm soát:</strong> Thông qua cổ phần và hội đồng quản trị</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Tập trung quyền lực:</strong> Một số ít người kiểm soát nhiều ngành</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Ảnh hưởng chính trị:</strong> Can thiệp vào chính sách nhà nước</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Quý tộc tài chính:</strong> Tầng lớp ký sinh trùng sống bằng lợi tức</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3 text-center">Đặc điểm của quý tộc tài chính</h4>
                <p className="text-blue-800 text-center">
                  Tầng lớp này không trực tiếp tham gia sản xuất, mà sống dựa vào việc sở hữu tư bản. 
                  Họ thu lợi nhuận từ lãi suất, cổ tức và các khoản đầu tư tài chính, 
                  đồng thời kiểm soát các quyết định kinh tế quan trọng của xã hội.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monopoly Definition */}
        <Card className="mb-12 border-2 border-red-300">
          <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100">
            <CardTitle className="text-2xl text-blue-900 text-center">Độc quyền là gì?</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <p className="text-blue-800 text-lg">
                Theo Lenin, <strong>độc quyền</strong> là sản phẩm tất yếu của sự tập trung sản xuất. 
                Khi các doanh nghiệp nhỏ bị loại bỏ hoặc hợp nhất, chỉ còn lại một số ít tập đoàn lớn 
                kiểm soát toàn bộ ngành sản xuất.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-bold text-red-900 mb-2">Hình thức</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Cartel</li>
                    <li>• Syndicate</li>
                    <li>• Trust</li>
                    <li>• Concern</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                  <h4 className="font-bold text-sky-900 mb-2">Phương thức</h4>
                  <ul className="text-sm text-sky-800 space-y-1">
                    <li>• Thỏa thuận giá cả</li>
                    <li>• Phân chia thị trường</li>
                    <li>• Kiểm soát nguồn nguyên liệu</li>
                    <li>• Kiểm soát công nghệ</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                  <h4 className="font-bold text-sky-900 mb-2">Kết quả</h4>
                  <ul className="text-sm text-sky-800 space-y-1">
                    <li>• Siêu lợi nhuận</li>
                    <li>• Loại bỏ cạnh tranh</li>
                    <li>• Kìm hãm phát triển</li>
                    <li>• Gia tăng bất bình đẳng</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-center">
                  <strong>Điểm quan trọng:</strong> Độc quyền không loại bỏ cạnh tranh, mà chuyển nó lên một tầng mới - 
                  cạnh tranh giữa các độc quyền với nhau để tái phân chia thị trường và lợi nhuận.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lenin Quote */}
        <Card className="border-2 border-blue-300">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-sky-100">
            <CardTitle className="text-2xl text-blue-900 text-center">Trích dẫn từ V.I. Lenin</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <blockquote className="text-2xl font-bold text-blue-900">
                "Nếu cần phải định nghĩa chủ nghĩa đế quốc một cách ngắn gọn nhất, 
                thì phải nói rằng chủ nghĩa đế quốc là giai đoạn độc quyền của chủ nghĩa tư bản"
              </blockquote>
              <footer className="text-blue-700">— V.I. Lenin, "Chủ nghĩa đế quốc, giai đoạn cao nhất của chủ nghĩa tư bản", 1916</footer>
              <div className="mt-6 p-6 bg-gradient-to-r from-blue-100 to-sky-100 rounded-lg">
                <p className="text-blue-800 max-w-3xl mx-auto">
                  Lenin chỉ ra rằng độc quyền không phải là hiện tượng ngẫu nhiên hay do chính sách sai lầm, 
                  mà là kết quả tất yếu của sự phát triển tư bản. Khi tích tụ và tập trung vốn đạt đến một mức độ nhất định, 
                  chỉ một số ít tập đoàn có khả năng thống trị toàn bộ ngành công nghiệp.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TheoryPage;
