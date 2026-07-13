import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

const HomePage = () => {
  const [showQR, setShowQR] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const quizUrl = typeof window !== "undefined" ? window.location.origin + "/games" : "http://localhost:5173/games";

  useEffect(() => {
    // Handle scroll progress for the vertical bar
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(scrollTop / docHeight);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Intersection observer for waypoints
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-10% 0px -40% 0px" }
    );

    const sections = ["muc-1-1", "muc-1-2", "muc-2", "muc-3-1", "muc-3-2"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden min-h-screen">
      {/* Vertical Progress Indicator */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-[40] hidden xl:flex flex-col items-center pointer-events-none h-[400px]">
        {/* SVG Path line */}
        <div className="absolute inset-0 w-full flex justify-center">
          <div className="w-[2px] h-full bg-outline-variant/30 relative">
             <div 
               className="absolute top-0 left-0 w-full bg-primary origin-top"
               style={{ height: `${scrollProgress * 100}%` }}
             ></div>
          </div>
        </div>
        
        {/* Ship/Star cursor */}
        <div 
          className="absolute z-10 text-primary transition-all duration-100 ease-linear"
          style={{ top: `${scrollProgress * 100}%`, transform: 'translateY(-50%)' }}
        >
          <span className="material-symbols-outlined text-3xl drop-shadow-md bg-surface rounded-full">stars</span>
        </div>

        {/* Waypoints */}
        <div className="h-full flex flex-col justify-between w-full absolute inset-0 py-0 z-0">
          {[
            { id: "muc-1-1", label: "1.1" },
            { id: "muc-1-2", label: "1.2" },
            { id: "muc-2", label: "2" },
            { id: "muc-3-1", label: "3.1" },
            { id: "muc-3-2", label: "3.2" }
          ].map((waypoint) => (
            <div key={waypoint.id} className="relative flex justify-center group pointer-events-auto">
              <a 
                href={`#${waypoint.id}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 z-10 ring-4 ring-surface ${activeSection === waypoint.id ? 'bg-primary scale-125' : 'bg-outline-variant'}`}
                title={`Mục ${waypoint.label}`}
              ></a>
            </div>
          ))}
        </div>
      </aside>

      {/* QR Code Full-Screen Modal */}
      {showQR && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-6"
          onClick={() => setShowQR(false)}
        >
          <div
            className="bg-surface rounded-3xl p-8 max-w-md w-full mx-auto text-center shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-variant/50 hover:bg-primary/10 flex items-center justify-center transition-colors cursor-pointer z-10"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-lg">close</span>
            </button>
            <div className="mb-6">
              <span className="material-symbols-outlined text-primary text-3xl mb-2 block">qr_code_2</span>
              <h3 className="text-2xl font-bold text-on-surface font-serif">Quét mã QR để chơi game</h3>
            </div>
            <div className="bg-white rounded-xl inline-block mb-6 shadow-inner p-4">
              <QRCodeSVG
                value={quizUrl}
                size={250}
                level="M"
                includeMargin={false}
                fgColor="#1a1a1a"
                bgColor="#ffffff"
              />
            </div>
            <p className="text-sm text-on-surface-variant/70 break-all px-4 mb-4">{quizUrl}</p>
            <Link
              to="/games"
              className="inline-flex justify-center items-center gap-2 bg-primary text-white py-3 px-6 rounded-full font-bold w-full hover:bg-primary/90 transition-colors"
            >
              Tham gia ngay trên máy tính
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      )}
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex justify-between items-center h-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="font-serif text-[#8B0000] font-bold text-3xl">Modern Socialism</div>
          <Link 
            to="/games" 
            className="text-[#8B0000] text-lg font-bold hover:underline hover:decoration-2 underline-offset-8 transition-all uppercase"
          >
            Góc Trò Chơi
          </Link>
        </div>
      </nav>

      <main className="mt-20">
        {/* Hero Section */}
        <section className="relative bg-white py-24 sm:py-32 flex items-center justify-center min-h-[70vh] border-b border-gray-200">
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/docx_images/image2.jpg"
              alt="Poster"
              className="w-full h-full object-cover opacity-5 object-top mix-blend-multiply"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#8B0000] font-serif tracking-widest uppercase text-sm font-bold mb-6"
            >
              Học thuyết Chính trị - Xã hội
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl font-bold text-[#111] font-serif sm:text-6xl leading-tight mb-4"
            >
              Cơ cấu xã hội <br className="hidden sm:block" />
              <span className="text-[#8B0000]">Giai cấp & Liên minh</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-6 text-xl leading-8 text-gray-700 font-serif max-w-3xl mx-auto"
            >
              Tìm hiểu về sự phân tầng, đặc điểm và sự biến đổi của cơ cấu xã hội trong thời kỳ quá độ lên Chủ nghĩa Xã hội ở Việt Nam.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link
                to="/games"
                className="group bg-[#8B0000] border-2 border-[#8B0000] px-8 py-3 text-lg font-serif font-bold text-white hover:bg-white hover:text-[#8B0000] transition-colors flex items-center gap-2"
              >
                Khám phá Trò Chơi
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
              <button
                onClick={() => setShowQR(true)}
                className="group border-2 border-[#8B0000] bg-white px-5 py-3 text-lg font-serif font-bold text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                title="Quét mã QR để chơi trên điện thoại"
              >
                <span className="material-symbols-outlined">qr_code_scanner</span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* MỤC 1.1 */}
        <section id="muc-1-1" className="py-24 border-b border-outline-variant max-w-7xl mx-auto px-6 lg:px-8 bg-surface">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-6">
              Khái niệm và vị trí của cơ cấu xã hội - giai cấp trong cơ cấu xã hội
            </h2>
            <p className="mt-4 text-xl text-on-surface-variant border-l-4 border-primary pl-6 py-2 bg-surface-container-low rounded-r-xl">
              Cơ cấu xã hội – giai cấp là tổng thể các giai cấp, tầng lớp xã hội cùng tồn tại khách quan trong một chế độ xã hội nhất định và những
              mối quan hệ của chúng được hình thành dựa trên những đặc điểm như sở hữu tư liệu sản xuất, sự khác biệt về tổ chức quản lí, về địa vị
              chính trị - xã hội… giữa những giai cấp và tầng lớp đó.
            </p>
          </div>

          <div className="space-y-20">
            {/* Thành phần chủ yếu */}
            <div>
              <h3 className="font-bold text-3xl text-primary mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-4xl">category</span>
                Các thành phần chủ yếu
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { title: "Giai cấp công nhân", desc: "Lực lượng giữ vai trò lãnh đạo thông qua Đảng.", icon: "engineering" },
                  {
                    title: "Giai cấp nông dân",
                    desc: "Lực lượng đông đảo, có vai trò quan trọng trong phát triển nông nghiệp và nông thôn.",
                    icon: "agriculture",
                  },
                  { title: "Tầng lớp trí thức", desc: "Đóng góp vào khoa học, công nghệ, giáo dục và đổi mới sáng tạo.", icon: "school" },
                  {
                    title: "Tầng lớp doanh nhân",
                    desc: "Thúc đẩy sản xuất, kinh doanh, tạo việc làm và phát triển kinh tế.",
                    icon: "business_center",
                  },
                  { title: "Các tầng lớp khác", desc: "Tầng lớp thanh niên, phụ nữ,..", icon: "groups" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant hover:shadow-xl hover:border-primary transition-all duration-300"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:rotate-3 shadow-inner">
                      <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                    </div>
                    <h4 className="text-xl font-bold text-on-surface mb-3">{item.title}</h4>
                    <p className="text-on-surface-variant text-base leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 overflow-hidden rounded-3xl shadow-2xl border border-outline-variant max-w-4xl mx-auto">
                <img
                  src="/assets/docx_images/image3.png"
                  alt="Thành phần chủ yếu"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Đặc điểm */}
            <div className="bg-surface-container-low rounded-3xl p-8 lg:p-12 shadow-inner border border-outline-variant">
              <h3 className="font-bold text-3xl text-primary mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-4xl">star</span>
                Đặc điểm thời kỳ quá độ
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <ul className="space-y-6">
                  {[
                    { title: "Đa dạng về thành phần xã hội", desc: "Tồn tại nhiều giai cấp, tầng lớp khác nhau.", icon: "diversity_3" },
                    {
                      title: "Có sự biến đổi liên tục",
                      desc: "Cơ cấu xã hội thay đổi theo sự phát triển của nền kinh tế và quá trình công nghiệp hóa, hiện đại hóa đất nước.",
                      icon: "update",
                    },
                    {
                      title: "Khác biệt nhưng hợp tác",
                      desc: "Các giai cấp, tầng lớp mặc dù có lợi ích riêng nhưng cùng hướng đến một mục đích chung là xây dựng XHCN.",
                      icon: "handshake",
                    },
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-5 bg-surface p-5 rounded-2xl shadow-sm border border-outline-variant hover:border-secondary transition-colors"
                    >
                      <div className="shrink-0 h-12 w-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <strong className="text-on-surface text-lg block mb-1">{item.title}</strong>
                        <span className="text-on-surface-variant">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="rounded-3xl overflow-hidden shadow-xl border border-outline-variant">
                  <img src="/assets/docx_images/image5.png" alt="Đặc điểm" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Ý nghĩa */}
            <div>
              <h3 className="font-bold text-3xl text-primary mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-4xl">flag</span>Ý nghĩa lịch sử
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { text: "Tạo cơ sở để phát huy sức mạnh đại đoàn kết toàn dân.", icon: "group_add" },
                  { text: "Thúc đẩy phát triển kinh tế gắn liền với công bằng xã hội.", icon: "balance" },
                  { text: "Xây dựng thành công chủ nghĩa xã hội.", icon: "account_balance" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-primary to-tertiary p-1 rounded-3xl shadow-md hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300"
                  >
                    <div className="bg-surface h-full rounded-[23px] p-6 flex flex-col items-center text-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-inner">
                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                      </div>
                      <p className="text-on-surface font-bold text-lg">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MỤC 1.2 */}
        <section id="muc-1-2" className="py-24 border-b border-outline-variant max-w-7xl mx-auto px-6 lg:px-8 bg-surface">
          <div className="mb-20 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
              Sự biến đổi có tính quy luật của cơ cấu xã hội - giai cấp
            </h2>
            <p className="text-xl text-on-surface-variant">
              Sự vận động và phát triển của cơ cấu xã hội - giai cấp trong thời kỳ quá độ luôn tuân theo những quy luật khách quan, gắn liền với sự
              chuyển biến của cơ cấu kinh tế.
            </p>
          </div>

          <div className="space-y-16">
            {/* Quy luật 1 */}
            <div className="group bg-surface-container-lowest rounded-3xl p-8 lg:p-12 border border-outline-variant hover:border-primary/50 hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20">
                  <span className="material-symbols-outlined text-lg">looks_one</span>
                  Quy luật thứ nhất
                </div>
                <h3 className="text-3xl font-bold text-on-surface mb-4 leading-snug">
                  Cơ cấu xã hội - giai cấp biến đổi gắn liền và bị quy định bởi cơ cấu kinh tế
                </h3>
                <p className="text-on-surface-variant mb-8 text-lg">
                  Sự chuyển biến của cơ sở hạ tầng kinh tế là nguyên nhân sâu xa dẫn đến sự thay đổi của cơ cấu xã hội. Tác động được thể hiện rõ qua:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Phương thức sản xuất", "Cơ cấu ngành nghề", "Thành phần kinh tế", "Cơ chế kinh tế"].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-surface p-4 rounded-xl border border-outline-variant shadow-sm hover:border-primary/40 transition-colors"
                    >
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                      <span className="font-bold text-on-surface">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 overflow-hidden rounded-2xl shadow-lg border border-outline-variant h-full">
                <img
                  src="/assets/docx_images/image10.png"
                  alt="Quy luật 1"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[300px]"
                />
              </div>
            </div>

            {/* Quy luật 2 */}
            <div className="group bg-surface-container-lowest rounded-3xl p-8 lg:p-12 border border-outline-variant hover:border-secondary/50 hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-1 lg:order-1 overflow-hidden rounded-2xl shadow-lg border border-outline-variant h-full">
                <img
                  src="/assets/docx_images/image15.png"
                  alt="Quy luật 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[300px]"
                />
              </div>
              <div className="order-2 lg:order-2">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-6 border border-secondary/20">
                  <span className="material-symbols-outlined text-lg">looks_two</span>
                  Quy luật thứ hai
                </div>
                <h3 className="text-3xl font-bold text-on-surface mb-4 leading-snug">
                  Cơ cấu xã hội biến đổi phức tạp, đa dạng, làm xuất hiện các tầng lớp mới
                </h3>
                <p className="text-on-surface-variant mb-6 text-lg">
                  Trong thời kỳ quá độ, sự đa dạng về các thành phần kinh tế tất yếu dẫn đến các hệ quả sâu sắc trong xã hội:
                </p>
                <ul className="space-y-4">
                  {[
                    "Tồn tại nhiều giai cấp, tầng lớp và nhóm người khác nhau.",
                    "Làm xuất hiện các tầng lớp xã hội mới (Doanh nhân, trung lưu mới...).",
                    "Sự đan xen, dịch chuyển vị trí xã hội diễn ra liên tục, năng động.",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 bg-surface p-4 rounded-xl border border-outline-variant shadow-sm hover:-translate-y-1 transition-transform"
                    >
                      <div className="shrink-0 h-8 w-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mt-0.5">
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </div>
                      <span className="text-on-surface font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quy luật 3 */}
            <div className="group bg-surface-container-lowest rounded-3xl p-8 lg:p-12 border border-outline-variant hover:border-tertiary/50 hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-tertiary/10 text-tertiary font-bold text-sm mb-6 border border-tertiary/20">
                  <span className="material-symbols-outlined text-lg">looks_3</span>
                  Quy luật thứ ba
                </div>
                <h3 className="text-3xl font-bold text-on-surface mb-4 leading-snug">
                  Mối quan hệ vừa đấu tranh, vừa liên minh, tiến tới xích lại gần nhau
                </h3>
                <p className="text-on-surface-variant mb-6 text-lg">
                  Cơ cấu không đứng im mà luôn vận động theo xu hướng hội tụ nhằm xây dựng khối đại đoàn kết:
                </p>
                <div className="space-y-4">
                  <div className="bg-surface p-5 rounded-2xl border border-outline-variant hover:border-tertiary/40 hover:shadow-md transition-all flex gap-4">
                    <span className="material-symbols-outlined text-tertiary text-3xl">handshake</span>
                    <div>
                      <strong className="text-on-surface block text-lg mb-1">Vừa đấu tranh, vừa liên minh</strong>
                      <span className="text-on-surface-variant">Giải quyết mâu thuẫn cục bộ, liên kết chặt chẽ dựa trên lợi ích chung.</span>
                    </div>
                  </div>
                  <div className="bg-surface p-5 rounded-2xl border border-outline-variant hover:border-tertiary/40 hover:shadow-md transition-all flex gap-4">
                    <span className="material-symbols-outlined text-tertiary text-3xl">balance</span>
                    <div>
                      <strong className="text-on-surface block text-lg mb-1">Xóa bỏ bất bình đẳng</strong>
                      <span className="text-on-surface-variant">Từng bước xóa bỏ triệt để áp bức, hướng tới công bằng xã hội.</span>
                    </div>
                  </div>
                  <div className="bg-surface p-5 rounded-2xl border border-outline-variant hover:border-tertiary/40 hover:shadow-md transition-all flex gap-4">
                    <span className="material-symbols-outlined text-tertiary text-3xl">group_add</span>
                    <div>
                      <strong className="text-on-surface block text-lg mb-1">Xích lại gần nhau</strong>
                      <span className="text-on-surface-variant">Thu hẹp khoảng cách về tư liệu sản xuất và đời sống tinh thần.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 overflow-hidden rounded-2xl shadow-lg border border-outline-variant h-full">
                <img
                  src="/assets/docx_images/image18.png"
                  alt="Quy luật 3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[300px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* MỤC 2 */}
        <section id="muc-2" className="py-24 border-b border-outline-variant max-w-7xl mx-auto px-6 lg:px-8 bg-surface-container-lowest">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-6">
              Liên minh giai cấp, tầng lớp <br />
              trong thời kỳ quá độ lên CNXH
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-primary to-tertiary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-24">
            {/* Khái niệm & Ví dụ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              <div className="bg-surface p-10 rounded-3xl border border-outline-variant shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
                <div className="absolute -right-10 -top-10 opacity-5">
                  <span className="material-symbols-outlined text-[150px]">hub</span>
                </div>
                <div className="h-16 w-16 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center mb-8 shadow-inner">
                  <span className="material-symbols-outlined text-4xl">hub</span>
                </div>
                <h3 className="font-bold text-3xl text-on-surface mb-4">Khái niệm Liên minh</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed">
                  Là sự kết hợp, hợp tác giữa các cá nhân hoặc tổ chức với một mục đích chung nhằm đạt được một lợi ích cụ thể. Giữa các giai cấp và
                  tầng lớp thường nảy sinh những nhu cầu chung, dẫn đến sự cần thiết phải liên minh để cùng thực hiện.
                </p>
                <div className="mt-8 p-4 bg-surface-container rounded-xl border-l-4 border-primary">
                  <p className="font-semibold text-on-surface italic">
                    "Liên minh giai cấp mang tính phổ biến và là động lực to lớn của cách mạng xã hội chủ nghĩa."
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-2xl text-on-surface mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-3xl">public</span>
                  Các tổ chức liên minh tiêu biểu
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { name: "NATO", img: "image16.png" },
                    { name: "EU", img: "image1.png" },
                    { name: "ASEAN", img: "image17.png" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-surface p-6 rounded-2xl border border-outline-variant text-center hover:border-primary hover:-translate-y-2 transition-all shadow-sm hover:shadow-lg group"
                    >
                      <div className="h-24 flex items-center justify-center mb-4">
                        <img
                          src={`/assets/docx_images/${item.img}`}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <p className="font-extrabold text-lg text-on-surface">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lợi ích của liên minh */}
            <div>
              <div className="text-center mb-16">
                <h3 className="font-bold text-4xl text-on-surface">Lợi ích cốt lõi của Liên minh</h3>
                <p className="text-on-surface-variant mt-4 text-xl">Tạo ra sức mạnh tổng hợp, bảo vệ quyền lợi và thúc đẩy phát triển bền vững.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cột 1 */}
                <div className="bg-gradient-to-br from-surface to-surface-container-low p-10 rounded-3xl border border-outline-variant relative overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full -z-10"></div>
                  <h4 className="font-bold text-2xl text-primary mb-10 flex items-center gap-3">
                    <div className="p-3 bg-primary-container text-on-primary-container rounded-xl">
                      <span className="material-symbols-outlined">groups</span>
                    </div>
                    Đối với mỗi giai cấp, tầng lớp
                  </h4>
                  <ul className="space-y-8">
                    <li className="flex gap-5 group">
                      <div className="shrink-0 h-12 w-12 rounded-full bg-surface border border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-primary">shield_person</span>
                      </div>
                      <div>
                        <strong className="text-xl block text-on-surface mb-1">Bảo vệ quyền lợi chung</strong>
                        <span className="text-on-surface-variant text-base">
                          Tăng sức mạnh tổng hợp, tạo cơ chế đối thoại và củng cố sự tin tưởng lẫn nhau.
                        </span>
                      </div>
                    </li>
                    <li className="flex gap-5 group">
                      <div className="shrink-0 h-12 w-12 rounded-full bg-surface border border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-primary">gavel</span>
                      </div>
                      <div>
                        <strong className="text-xl block text-on-surface mb-1">Tham gia quản lý nhà nước</strong>
                        <span className="text-on-surface-variant text-base">
                          Đảm bảo tính dân chủ và nâng cao hiệu quả hoạch định chính sách xã hội.
                        </span>
                      </div>
                    </li>
                    <li className="flex gap-5 group">
                      <div className="shrink-0 h-12 w-12 rounded-full bg-surface border border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-primary">trending_up</span>
                      </div>
                      <div>
                        <strong className="text-xl block text-on-surface mb-1">Mở rộng cơ hội phát triển</strong>
                        <span className="text-on-surface-variant text-base">
                          Tạo không gian hợp tác và hỗ trợ nhau phát triển toàn diện cho mỗi cá nhân.
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Cột 2 */}
                <div className="bg-gradient-to-br from-surface to-surface-container-low p-10 rounded-3xl border border-outline-variant relative overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-tertiary/5 rounded-bl-full -z-10"></div>
                  <h4 className="font-bold text-2xl text-tertiary mb-10 flex items-center gap-3">
                    <div className="p-3 bg-tertiary-container text-on-tertiary-container rounded-xl">
                      <span className="material-symbols-outlined">language</span>
                    </div>
                    Đối với toàn xã hội
                  </h4>
                  <ul className="space-y-8">
                    <li className="flex gap-5 group">
                      <div className="shrink-0 h-12 w-12 rounded-full bg-surface border border-outline-variant flex items-center justify-center group-hover:border-tertiary transition-colors">
                        <span className="material-symbols-outlined text-tertiary">balance</span>
                      </div>
                      <div>
                        <strong className="text-xl block text-on-surface mb-1">Tạo sự ổn định, thống nhất</strong>
                        <span className="text-on-surface-variant text-base">
                          Giảm thiểu tối đa xung đột, mâu thuẫn và củng cố tinh thần đoàn kết toàn dân.
                        </span>
                      </div>
                    </li>
                    <li className="flex gap-5 group">
                      <div className="shrink-0 h-12 w-12 rounded-full bg-surface border border-outline-variant flex items-center justify-center group-hover:border-tertiary transition-colors">
                        <span className="material-symbols-outlined text-tertiary">rocket_launch</span>
                      </div>
                      <div>
                        <strong className="text-xl block text-on-surface mb-1">Thúc đẩy phát triển KT-XH</strong>
                        <span className="text-on-surface-variant text-base">
                          Huy động hiệu quả các nguồn lực, tạo môi trường đầu tư thuận lợi bền vững.
                        </span>
                      </div>
                    </li>
                    <li className="flex gap-5 group">
                      <div className="shrink-0 h-12 w-12 rounded-full bg-surface border border-outline-variant flex items-center justify-center group-hover:border-tertiary transition-colors">
                        <span className="material-symbols-outlined text-tertiary">security</span>
                      </div>
                      <div>
                        <strong className="text-xl block text-on-surface mb-1">Bảo vệ vững chắc quốc gia</strong>
                        <span className="text-on-surface-variant text-base">
                          Tăng cường sức mạnh tổng hợp, nâng cao vị thế và uy tín trên trường quốc tế.
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MỤC 3.1 */}
        <section id="muc-3-1" className="py-24 border-b border-outline-variant max-w-7xl mx-auto px-6 lg:px-8 bg-surface">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20">
              <span className="material-symbols-outlined text-sm">flag</span>
              Việt Nam
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
              Cơ cấu xã hội – giai cấp trong thời kỳ quá độ ở Việt Nam
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-20">
            {/* Intro & Đặc điểm */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-surface-container-lowest rounded-3xl p-8 lg:p-12 border border-outline-variant shadow-lg hover:shadow-xl transition-all">
              <div className="order-2 lg:order-1">
                <h3 className="font-bold text-3xl text-on-surface mb-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-4xl">psychology_alt</span>
                  Đặc điểm nổi bật
                </h3>
                <ul className="space-y-6">
                  {[
                    "Đảm bảo tính quy luật phổ biến, vừa mang tính đặc thù sâu sắc của xã hội Việt Nam.",
                    "Vị trí, vai trò của các giai cấp ngày càng được khẳng định rõ nét trong công cuộc đổi mới.",
                    "Tính năng động và sự đan xen lợi ích tạo động lực mạnh mẽ cho phát triển toàn diện.",
                  ].map((text, i) => (
                    <li key={i} className="flex gap-4 group">
                      <div className="shrink-0 h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                        <span className="material-symbols-outlined text-sm">done_all</span>
                      </div>
                      <span className="text-on-surface-variant text-lg leading-relaxed pt-1">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2 overflow-hidden rounded-2xl shadow-md border border-outline-variant h-full">
                <img
                  src="/assets/docx_images/image2.jpg"
                  alt="Cơ cấu XH-GC ở VN"
                  className="w-full h-full object-cover min-h-[300px] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Các giai cấp, tầng lớp (Grid layout) */}
            <div>
              <div className="text-center mb-16">
                <h3 className="font-bold text-3xl md:text-4xl text-on-surface">Các giai cấp, tầng lớp cơ bản</h3>
                <p className="text-on-surface-variant mt-4 text-xl">Lực lượng nòng cốt tạo nên sức mạnh tổng hợp của đất nước</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Giai cấp công nhân */}
                <div className="bg-surface rounded-3xl border border-outline-variant overflow-hidden hover:border-primary hover:shadow-2xl transition-all duration-300 group flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src="/assets/docx_images/image8.png"
                      alt="Giai cấp công nhân"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                    <div className="absolute bottom-4 left-6 px-4 py-1 bg-primary text-on-primary rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      Lãnh đạo cách mạng
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h4 className="font-bold text-2xl text-on-surface mb-4">Giai cấp công nhân</h4>
                    <ul className="space-y-3 text-on-surface-variant text-sm flex-1">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-base mt-0.5">check</span>Lãnh đạo cách mạng qua Đảng CSVN.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-base mt-0.5">check</span>Đại diện phương thức sản xuất tiên tiến.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-base mt-0.5">check</span>Giữ vị trí tiên phong xây dựng CNXH.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-base mt-0.5">check</span>Nòng cốt trong liên minh công - nông -
                        trí.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Giai cấp nông dân */}
                <div className="bg-surface rounded-3xl border border-outline-variant overflow-hidden hover:border-secondary hover:shadow-2xl transition-all duration-300 group flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src="/assets/docx_images/image13.png"
                      alt="Giai cấp nông dân"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                    <div className="absolute bottom-4 left-6 px-4 py-1 bg-secondary text-on-secondary rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      Nền tảng chiến lược
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h4 className="font-bold text-2xl text-on-surface mb-4">Giai cấp nông dân</h4>
                    <ul className="space-y-3 text-on-surface-variant text-sm flex-1">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-secondary text-base mt-0.5">check</span>Vị trí chiến lược trong CNH, HĐH nông
                        nghiệp.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-secondary text-base mt-0.5">check</span>Cốt lõi giữ gìn bản sắc văn hoá & môi
                        trường.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-secondary text-base mt-0.5">check</span>Chủ thể chính phát triển nông thôn
                        mới.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Đội ngũ trí thức */}
                <div className="bg-surface rounded-3xl border border-outline-variant overflow-hidden hover:border-tertiary hover:shadow-2xl transition-all duration-300 group flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src="/assets/docx_images/image4.png"
                      alt="Đội ngũ trí thức"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                    <div className="absolute bottom-4 left-6 px-4 py-1 bg-tertiary text-on-tertiary rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      Lao động sáng tạo
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h4 className="font-bold text-2xl text-on-surface mb-4">Đội ngũ trí thức</h4>
                    <ul className="space-y-3 text-on-surface-variant text-sm flex-1">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-tertiary text-base mt-0.5">check</span>Đặc biệt quan trọng trong CNH, HĐH &
                        hội nhập.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-tertiary text-base mt-0.5">check</span>Tiên phong nghiên cứu, ứng dụng khoa
                        học.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-tertiary text-base mt-0.5">check</span>Bộ phận không thể tách rời của liên
                        minh.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Đội ngũ doanh nhân */}
                <div className="bg-surface rounded-3xl border border-outline-variant overflow-hidden hover:border-primary hover:shadow-2xl transition-all duration-300 group flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src="/assets/docx_images/image11.png"
                      alt="Đội ngũ doanh nhân"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                    <div className="absolute bottom-4 left-6 px-4 py-1 bg-primary text-on-primary rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      Phát triển kinh tế
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h4 className="font-bold text-2xl text-on-surface mb-4">Đội ngũ doanh nhân</h4>
                    <ul className="space-y-3 text-on-surface-variant text-sm flex-1">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-base mt-0.5">check</span>
                        <strong>Tầng lớp đặc biệt:</strong> Chủ trương xây dựng vững mạnh.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-base mt-0.5">check</span>
                        <strong>Đóng góp tích cực:</strong> Thực hiện chiến lược KT-XH.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-base mt-0.5">check</span>
                        <strong>Phát triển nhanh:</strong> Qui mô & vai trò không ngừng tăng.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Phụ nữ Việt Nam */}
                <div className="bg-surface rounded-3xl border border-outline-variant overflow-hidden hover:border-secondary hover:shadow-2xl transition-all duration-300 group flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src="/assets/docx_images/image12.png"
                      alt="Phụ nữ Việt Nam"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                    <div className="absolute bottom-4 left-6 px-4 py-1 bg-secondary text-on-secondary rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      Đóng góp to lớn
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h4 className="font-bold text-2xl text-on-surface mb-4">Phụ nữ Việt Nam</h4>
                    <ul className="space-y-3 text-on-surface-variant text-sm flex-1">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-secondary text-base mt-0.5">check</span>Lực lượng đông đảo, đóng góp mọi mặt
                        kinh tế.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-secondary text-base mt-0.5">check</span>Thể hiện vai trò xuất sắc ở mọi lĩnh
                        vực.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-secondary text-base mt-0.5">check</span>Gìn giữ hạnh phúc và giáo dục gia
                        đình.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Đội ngũ thanh niên */}
                <div className="bg-surface rounded-3xl border border-outline-variant overflow-hidden hover:border-tertiary hover:shadow-2xl transition-all duration-300 group flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src="/assets/docx_images/image9.png"
                      alt="Đội ngũ thanh niên"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                    <div className="absolute bottom-4 left-6 px-4 py-1 bg-tertiary text-on-tertiary rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      Lực lượng xung kích
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h4 className="font-bold text-2xl text-on-surface mb-4">Đội ngũ thanh niên</h4>
                    <ul className="space-y-3 text-on-surface-variant text-sm flex-1">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-tertiary text-base mt-0.5">check</span>
                        <strong>Tâm trong:</strong> Đạo đức, yêu nước, tự hào dân tộc.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-tertiary text-base mt-0.5">check</span>
                        <strong>Trí sáng:</strong> Trau dồi tri thức, nhạy bén công nghệ.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-tertiary text-base mt-0.5">check</span>
                        <strong>Hoài bão lớn:</strong> Dám nghĩ dám làm, cống hiến hết mình.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MỤC 3.2 */}
        <section id="muc-3-2" className="py-24 border-b border-outline-variant max-w-7xl mx-auto px-6 lg:px-8 bg-surface-container-lowest">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-6">
              Liên minh giai cấp, tầng lớp <br />ở Việt Nam
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-primary to-tertiary mx-auto rounded-full"></div>
            <p className="text-xl text-on-surface-variant mt-6">
              Sự đoàn kết gắn bó chặt chẽ trên mọi lĩnh vực đời sống, tạo nền tảng vững chắc cho sự phát triển của Chủ nghĩa Xã hội.
            </p>
          </div>

          <div className="space-y-24">
            {/* Lĩnh vực Kinh tế */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -left-8 -top-8 text-[120px] text-primary/5 material-symbols-outlined z-0 pointer-events-none">payments</div>
                <div className="relative z-10">
                  <h3 className="font-bold text-3xl text-primary mb-6 flex items-center gap-4">
                    <div className="p-3 bg-primary-container text-on-primary-container rounded-2xl">
                      <span className="material-symbols-outlined text-3xl">trending_up</span>
                    </div>
                    Liên minh Kinh tế
                  </h3>
                  <ul className="space-y-5 bg-surface p-8 rounded-3xl border border-outline-variant shadow-sm">
                    <li className="flex gap-4">
                      <span className="material-symbols-outlined text-primary">stop_circle</span>
                      <span className="text-on-surface-variant text-lg">
                        Được thực hiện qua các khâu của các quá trình kinh tế, các lĩnh vực, địa bàn, vùng miền cả nước.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="material-symbols-outlined text-primary">stop_circle</span>
                      <span className="text-on-surface-variant text-lg">
                        Từng bước hình thành quan hệ sản xuất XHCN trong quá trình thực hiện liên minh.
                      </span>
                    </li>
                    <li className="flex gap-4">
                      <span className="material-symbols-outlined text-primary">stop_circle</span>
                      <span className="text-on-surface-variant text-lg font-bold">
                        Nhà nước có vai trò đặc biệt quan trọng trong liên minh kinh tế.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-3xl overflow-hidden border-4 border-surface shadow-2xl relative group h-full">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img
                    src="/assets/docx_images/image19.png"
                    alt="Liên minh kinh tế"
                    className="w-full h-full object-cover min-h-[300px] group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Lĩnh vực Chính trị */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-1 lg:order-1">
                <div className="rounded-3xl overflow-hidden border-4 border-surface shadow-2xl relative group h-full">
                  <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img
                    src="/assets/docx_images/image7.png"
                    alt="Liên minh chính trị"
                    className="w-full h-full object-cover min-h-[300px] group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="order-2 lg:order-2 relative">
                <div className="absolute -right-8 -bottom-8 text-[120px] text-secondary/5 material-symbols-outlined z-0 pointer-events-none">
                  account_balance
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-3xl text-secondary mb-6 flex items-center gap-4">
                    <div className="p-3 bg-secondary-container text-on-secondary-container rounded-2xl">
                      <span className="material-symbols-outlined text-3xl">policy</span>
                    </div>
                    Liên minh Chính trị
                  </h3>
                  <div className="bg-surface p-8 rounded-3xl border border-outline-variant shadow-sm">
                    <p className="text-secondary font-bold text-lg mb-6 italic border-l-4 border-secondary pl-4">
                      "Mục đích: Tạo khối đại đoàn kết toàn dân, đập tan âm mưu thù địch, bảo vệ vững chắc XHCN."
                    </p>
                    <ul className="space-y-4 text-on-surface-variant">
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary">check_circle</span> Giữ vững lập trường chính trị giai cấp công
                        nhân.
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary">check_circle</span> Giữ vững sự lãnh đạo của Đảng.
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary">check_circle</span> Phát huy quyền làm chủ của nhân dân.
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary">check_circle</span> Xây dựng Đảng và Nhà nước trong sạch vững mạnh.
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary">check_circle</span> Đấu tranh chống lại mọi âm mưu thù địch.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Lĩnh vực Văn hóa, tư tưởng */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 relative">
                <div className="absolute -left-8 -top-8 text-[120px] text-tertiary/5 material-symbols-outlined z-0 pointer-events-none">palette</div>
                <div className="relative z-10">
                  <h3 className="font-bold text-3xl text-tertiary mb-6 flex items-center gap-4">
                    <div className="p-3 bg-tertiary-container text-on-tertiary-container rounded-2xl">
                      <span className="material-symbols-outlined text-3xl">menu_book</span>
                    </div>
                    Liên minh Văn hóa
                  </h3>
                  <div className="bg-surface p-8 rounded-3xl border border-outline-variant shadow-sm mb-6">
                    <p className="text-tertiary font-bold text-lg mb-6 italic border-l-4 border-tertiary pl-4">
                      "Mục đích: Xây dựng nền văn hóa tiên tiến, đậm đà bản sắc dân tộc."
                    </p>
                    <ul className="space-y-4 text-on-surface-variant">
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-tertiary mt-1">star</span>{" "}
                        <span>Gắn tăng trưởng kinh tế với phát triển văn hóa, thực hiện tiến bộ xã hội.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-tertiary mt-1">star</span>{" "}
                        <span>Xây dựng con người Việt Nam phát triển toàn diện.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-tertiary mt-1">star</span>{" "}
                        <span>Nâng cao chất lượng nguồn nhân lực, xóa đói giảm nghèo.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-tertiary mt-1">star</span>{" "}
                        <span>Nâng cao dân trí, thực hiện tốt an sinh xã hội.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-tertiary mt-1">star</span>{" "}
                        <span>Nâng cao chất lượng cuộc sống cho nhân dân.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                <div className="rounded-3xl overflow-hidden border border-outline-variant shadow-lg hover:-translate-y-2 transition-transform duration-300">
                  <img src="/assets/docx_images/image18.png" alt="Liên minh văn hóa 1" className="w-full h-full object-cover min-h-[250px]" />
                </div>
                <div className="rounded-3xl overflow-hidden border border-outline-variant shadow-lg hover:-translate-y-2 transition-transform duration-300 sm:mt-12">
                  <img src="/assets/docx_images/image19.png" alt="Liên minh văn hóa 2" className="w-full h-full object-cover min-h-[250px]" />
                </div>
              </div>
            </div>

            {/* Phương hướng cơ bản */}
            <div className="bg-gradient-to-r from-primary to-secondary p-1 rounded-3xl shadow-xl mt-16">
              <div className="bg-surface p-10 lg:p-16 rounded-[22px] relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute left-0 bottom-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="text-center mb-12">
                    <span className="material-symbols-outlined text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
                      explore
                    </span>
                    <h3 className="font-extrabold text-3xl md:text-4xl text-on-surface mb-4">5 Phương hướng cơ bản</h3>
                    <p className="text-xl text-on-surface-variant">Xây dựng cơ cấu xã hội – giai cấp và tăng cường liên minh trong thời kỳ quá độ</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { icon: "factory", text: "Đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước." },
                      { icon: "account_balance", text: "Xây dựng hệ thống chính sách xã hội hiệu quả, toàn diện liên quan đến cơ cấu XH-GC." },
                      { icon: "diversity_3", text: "Tạo sự đồng thuận và phát huy tinh thần đoàn kết thống nhất giữa các lực lượng." },
                      { icon: "storefront", text: "Hoàn thiện thể chế kinh tế thị trường định hướng XHCN, phát triển khoa học công nghệ." },
                      {
                        icon: "published_with_changes",
                        text: "Đổi mới hoạt động của Đảng, Nhà nước, Mặt trận Tổ quốc nhằm tăng cường khối đại đoàn kết.",
                      },
                    ].map((ph, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-5 items-start p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant hover:border-primary/50 transition-colors ${idx === 4 ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""}`}
                      >
                        <div className="shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-md font-bold text-xl">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-on-surface font-medium text-lg leading-snug">{ph.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-outline-variant flex justify-end">
              <a
                href="https://www.studocu.vn/vn/document/hoc-vien-hang-khong-viet-nam/chu-nghia-xa-hoi-khoa-hoc/lien-minh-giai-cap-trong-thoi-ki-qua-do-len-chu-nghia-xa-hoi/66431338?sid=586239631783853144"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline bg-primary/10 px-4 py-2 rounded-lg"
              >
                <span className="material-symbols-outlined text-sm">link</span>
                Nguồn tham khảo: Tài liệu Học viện Hàng không Việt Nam
              </a>
            </div>
          </div>
        </section>

        {/* TEAM & TOOLS SECTION */}
        <section className="py-16 bg-surface-container-highest">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Column - Team Members */}
            <div className="lg:col-span-7">
              <span className="text-on-surface-variant font-bold text-sm tracking-wider uppercase block mb-2 font-body">ĐỘI NGŨ THỰC HIỆN</span>
              <h2 className="font-display-lg text-4xl text-on-surface mb-8 pb-3 border-b-2 border-primary inline-block font-bold">Thành viên nhóm</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Nguyễn Phạm Thu Hà", id: "SE184261", init: "NH" },
                  { name: "Quách Hữu Khang", id: "SE184031", init: "QK" },
                  { name: "Trần Nhật Tân", id: "SE184055", init: "TN" },
                  { name: "Trần Quốc Phú", id: "SE173106", init: "TP" },
                  { name: "Trần Bá Thành", id: "HE171047", init: "TT" },
                ].map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-surface border border-outline-variant rounded-lg p-5 flex items-center gap-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-primary transition-all duration-200"
                  >
                    <div className="w-12 h-12 bg-primary-container rounded flex items-center justify-center shrink-0">
                      <span className="text-on-primary-container font-bold text-base font-body">{member.init}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface text-base leading-snug font-body">{member.name}</span>
                      <span className="text-on-surface-variant text-xs font-mono mt-0.5">{member.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Tools */}
            <div className="lg:col-span-5">
              <span className="text-on-surface-variant font-bold text-sm tracking-wider uppercase block mb-2 font-body">CÔNG CỤ HỖ TRỢ</span>
              <h2 className="font-display-lg text-4xl text-on-surface mb-8 pb-3 border-b-2 border-primary inline-block font-bold">AI & Tools</h2>

              <div className="flex flex-col gap-4">
                <div className="bg-surface border border-outline-variant rounded-lg p-5 flex items-center gap-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-primary transition-all duration-200">
                  <div className="w-12 h-12 bg-primary-container rounded flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-primary-container text-2xl">code</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-on-surface text-base leading-snug font-body">GitHub Copilot</span>
                    <span className="text-on-surface-variant text-sm mt-0.5 font-body">Trợ lý AI lập trình, hỗ trợ viết code và debug</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface w-full py-8 border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 w-full max-w-7xl mx-auto">
          <div className="font-headline-md text-headline-md text-on-surface mb-4 md:mb-0">Modern Socialism</div>
          <div className="text-body-md text-on-surface-variant text-center md:text-right">
            © 2024 Institute for Social Science. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
