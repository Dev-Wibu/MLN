import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpandableCard from "@/components/ui/expandable-card";
import { ArrowRight, BookOpen, Factory, Info, Users } from "lucide-react";
import { useState } from "react";

const TheoryPage = () => {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const historicalExamples = [
    {
      id: "slavery",
      title: "Chế độ nô lệ",
      period: "Thời cổ đại",
      description: "Chủ nô sở hữu trực tiếp người lao động, chiếm đoạt toàn bộ sản phẩm lao động.",
      characteristics: ["Sở hữu con người", "Không có tiền lương", "Bóc lột trực tiếp 100%"],
    },
    {
      id: "feudalism",
      title: "Chế độ phong kiến",
      period: "Thời trung cổ",
      description: "Địa chủ sở hữu đất đai, nông dân phải nộp tô thuế .",
      characteristics: ["Sở hữu đất đai", "Tô thuế", "Bóc lột thông qua địa tô"],
    },
    {
      id: "capitalism",
      title: "Chủ nghĩa tư bản",
      period: "Thời hiện đại",
      description: "Tư bản gia sở hữu tư liệu sản xuất, chiếm đoạt giá trị thặng dư từ công nhân.",
      characteristics: ["Sở hữu tư liệu sản xuất", "Tiền lương", "Bóc lột giá trị thặng dư"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">Lý thuyết nền tảng</h1>
          <p className="text-xl text-amber-700 max-w-4xl mx-auto">
            Hiểu về khái niệm giai cấp, bóc lột và tư liệu sản xuất theo quan điểm Mác-Lênin. Từ lý thuyết cổ điển đến ứng dụng trong xã hội số hiện
            đại.
          </p>
        </div>

        {/* Core Concepts */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <ExpandableCard
            title="Khái niệm Giai cấp"
            icon={<Users className="w-6 h-6" />}
            headerClassName="bg-gradient-to-r from-blue-100 to-blue-200"
            defaultExpanded={false}
          >
            <p className="text-amber-800 mb-4">Giai cấp được xác định bởi mối quan hệ với tư liệu sản xuất:</p>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>
                • <strong>Giai cấp thống trị:</strong> Sở hữu tư liệu sản xuất
              </li>
              <li>
                • <strong>Giai cấp bị trị:</strong> Chỉ có sức lao động
              </li>
              <li>
                • <strong>Mâu thuẫn giai cấp:</strong> Xung đột lợi ích không thể hòa giải
              </li>
            </ul>
          </ExpandableCard>

          <ExpandableCard
            title="Tư liệu sản xuất"
            icon={<Factory className="w-6 h-6" />}
            headerClassName="bg-gradient-to-r from-red-100 to-red-200"
            defaultExpanded={false}
          >
            <p className="text-amber-800 mb-4">Những gì cần thiết để sản xuất ra của cải:</p>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>
                • <strong>Truyền thống:</strong> Đất đai, nhà máy, máy móc
              </li>
              <li>
                • <strong>Hiện đại:</strong> Nền tảng số, thuật toán, dữ liệu
              </li>
              <li>
                • <strong>Quyền kiểm soát:</strong> Ai sở hữu quyết định luật chơi
              </li>
            </ul>
          </ExpandableCard>

          <ExpandableCard
            title="Bóc lột"
            icon={<BookOpen className="w-6 h-6" />}
            headerClassName="bg-gradient-to-r from-purple-100 to-purple-200"
            defaultExpanded={false}
          >
            <p className="text-amber-800 mb-4">Chiếm đoạt giá trị do người khác tạo ra:</p>
            <ul className="space-y-2 text-sm text-amber-700">
              <li>
                • <strong>Giá trị thặng dư:</strong> Chênh lệch giữa tạo ra và nhận về
              </li>
              <li>
                • <strong>Hình thức ẩn giấu:</strong> Qua cơ chế thị trường
              </li>
              <li>
                • <strong>Tái sản xuất:</strong> Duy trì và mở rộng sự bóc lột
              </li>
            </ul>
          </ExpandableCard>
        </div>

        {/* Historical Comparison Infographic */}
        <ExpandableCard
          title="So sánh: Xã hội truyền thống vs. Xã hội số"
          headerClassName="bg-gradient-to-r from-amber-100 to-yellow-100"
          className="mb-12"
          defaultExpanded={false}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Society */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-amber-900 text-center mb-6">XÃ HỘI TƯ BẢN TRUYỀN THỐNG</h3>
              <div className="space-y-4">
                <div className="bg-red-100 p-4 rounded-lg">
                  <div className="font-semibold text-red-800 mb-2">Giai cấp tư bản</div>
                  <div className="text-sm text-red-700">Sở hữu nhà máy, máy móc, vốn</div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-amber-600" />
                </div>
                <div className="bg-blue-100 p-4 rounded-lg">
                  <div className="font-semibold text-blue-800 mb-2">Giai cấp công nhân</div>
                  <div className="text-sm text-blue-700">Bán sức lao động, nhận tiền lương</div>
                </div>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="text-amber-700 border-amber-300">
                  Bóc lột rõ ràng • Mâu thuẫn dễ nhận thấy
                </Badge>
              </div>
            </div>

            {/* Digital Society */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-amber-900 text-center mb-6">XÃ HỘI SỐ HIỆN NAY</h3>
              <div className="space-y-4">
                <div className="bg-purple-100 p-4 rounded-lg">
                  <div className="font-semibold text-purple-800 mb-2">Big Tech</div>
                  <div className="text-sm text-purple-700">Sở hữu nền tảng, thuật toán, dữ liệu</div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-amber-600" />
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <div className="font-semibold text-green-800 mb-2">"Tự do lao động"</div>
                  <div className="text-sm text-green-700">Creator, Freelancer, Gig worker</div>
                </div>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="text-amber-700 border-amber-300">
                  Bóc lột ẩn giấu • Tự do ảo tưởng
                </Badge>
              </div>
            </div>
          </div>
        </ExpandableCard>

        {/* Historical Examples Modal Trigger */}
        <ExpandableCard
          title="Lịch sử các hình thức bóc lột"
          headerClassName="bg-gradient-to-r from-yellow-100 to-orange-100"
          className="mb-12"
          defaultExpanded={false}
        >
          <p className="text-amber-800 text-center mb-6">Xem ví dụ lịch sử để hiểu rõ hơn về sự tiến hóa của các hình thức bóc lột</p>
          <div className="grid md:grid-cols-3 gap-4">
            {historicalExamples.map((example) => (
              <Button
                key={example.id}
                onClick={() => setSelectedExample(selectedExample === example.id ? null : example.id)}
                variant={selectedExample === example.id ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-start space-y-2"
              >
                <div className="font-semibold">{example.title}</div>
                <div className="text-xs opacity-70">{example.period}</div>
              </Button>
            ))}
          </div>

          {/* Selected Example Details */}
          {selectedExample && (
            <div className="mt-6 p-6 bg-amber-50 rounded-lg border border-amber-200">
              {(() => {
                const example = historicalExamples.find((e) => e.id === selectedExample);
                if (!example) return null;
                return (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="w-5 h-5 text-amber-600" />
                      <h3 className="text-lg font-bold text-amber-900">{example.title}</h3>
                      <Badge variant="secondary">{example.period}</Badge>
                    </div>
                    <p className="text-amber-800 mb-4">{example.description}</p>
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-2">Đặc điểm:</h4>
                      <ul className="space-y-1">
                        {example.characteristics.map((char, idx) => (
                          <li key={`${example.id}-char-${idx}`} className="text-sm text-amber-700">
                            • {char}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </ExpandableCard>

        {/* Lenin Quote */}
        <Card className="border-2 border-amber-300">
          <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
            <CardTitle className="text-2xl text-amber-900 text-center">Trích dẫn từ V.I. Lenin</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center">
              <blockquote className="text-2xl font-bold text-amber-900 mb-4">"Chính trị là biểu hiện tập trung của kinh tế"</blockquote>
              <footer className="text-amber-700">— V.I. Lenin, 1919</footer>
              <p className="text-amber-800 mt-4 max-w-2xl mx-auto">
                Để hiểu được bản chất của quyền lực trong xã hội, ta phải hiểu được cấu trúc kinh tế. Trong kỷ nguyên số, việc kiểm soát dữ liệu và
                thuật toán chính là việc kiểm soát tư liệu sản xuất mới.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TheoryPage;
