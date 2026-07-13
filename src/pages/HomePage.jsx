import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-outline-variant rounded-lg mb-4 overflow-hidden bg-surface shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 bg-surface-container-low hover:bg-surface-container transition-colors text-left"
      >
        <span className="font-headline-md text-on-surface font-bold text-lg">{title}</span>
        <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-outline-variant text-on-surface-variant font-body-md space-y-3 bg-surface">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden min-h-screen">
      {/* Top Navigation Bar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant shadow-sm"
      >
        <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight font-bold">
            Modern Socialism
          </div>
          <Link to="/games" className="bg-primary text-on-primary px-6 py-2 font-label-uppercase rounded-lg hover:opacity-90 active:opacity-80 transition-all cursor-pointer font-bold">
            GÓC TRÒ CHƠI
          </Link>
        </div>
      </motion.nav>

      <main className="mt-16">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative py-20 md:py-32 overflow-hidden flex items-center justify-center min-h-[70vh]"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img src="/assets/docx_images/image2.jpg" alt="Poster" className="w-full h-full object-cover opacity-20 object-top" />
            <div className="absolute inset-0 bg-gradient-to-b from-surface/80 to-surface"></div>
          </div>
          
          <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display-lg text-4xl md:text-6xl text-primary mb-stack-md max-w-5xl mx-auto font-bold uppercase"
            >
              Cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên Chủ nghĩa xã hội ở Việt Nam
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center mt-8"
            >
              <Link to="/games" className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all text-lg">Khám phá Trò Chơi</Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Thúc đẩy sự phát triển kinh tế - xã hội & Bảo vệ độc lập */}
        <section className="py-stack-lg">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center"
            >
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="font-display-lg text-3xl text-primary font-bold border-l-4 border-primary pl-4">Thúc đẩy sự phát triển kinh tế - xã hội</h2>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-secondary">trending_up</span>
                    <div>
                      <strong className="text-on-surface block">Tăng cường nguồn lực:</strong>
                      <span className="text-on-surface-variant">Khi các giai cấp, tầng lớp cùng nhau đóng góp, nguồn lực xã hội sẽ được huy động một cách hiệu quả.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-secondary">handshake</span>
                    <div>
                      <strong className="text-on-surface block">Tạo môi trường đầu tư thuận lợi:</strong>
                      <span className="text-on-surface-variant">Một xã hội ổn định, thống nhất sẽ thu hút đầu tư, tạo điều kiện cho kinh tế phát triển.</span>
                    </div>
                  </li>
                </ul>

                <h2 className="font-display-lg text-3xl text-tertiary font-bold border-l-4 border-tertiary pl-4 mt-8">Bảo vệ độc lập, chủ quyền quốc gia</h2>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-tertiary">security</span>
                    <div>
                      <strong className="text-on-surface block">Tăng cường sức mạnh quốc gia:</strong>
                      <span className="text-on-surface-variant">Khi toàn dân đoàn kết, chung sức, đất nước sẽ có sức mạnh tổng hợp lớn để đối phó với mọi thách thức.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="material-symbols-outlined text-tertiary">public</span>
                    <div>
                      <strong className="text-on-surface block">Nâng cao vị thế quốc tế:</strong>
                      <span className="text-on-surface-variant">Một đất nước ổn định, phát triển sẽ có vị thế ngày càng cao trên trường quốc tế.</span>
                    </div>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                <img src="/assets/docx_images/image1.png" alt="Đại đoàn kết 1" className="rounded-xl shadow-md w-full h-48 object-cover" />
                <img src="/assets/docx_images/image3.png" alt="Đại đoàn kết 2" className="rounded-xl shadow-md w-full h-48 object-cover mt-8" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Cơ cấu xã hội – giai cấp */}
        <section className="py-stack-lg bg-surface-container-low border-y border-outline-variant">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-stack-lg max-w-4xl mx-auto">
              <h2 className="font-display-lg text-4xl text-on-surface font-bold mb-4">Cơ cấu xã hội – giai cấp trong thời kì quá độ lên chủ nghĩa xã hội ở Việt Nam</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              
              <div className="bg-surface p-6 rounded-xl border border-outline-variant text-left shadow-sm inline-block">
                <h3 className="font-bold text-lg text-primary mb-3">Đặc điểm:</h3>
                <ul className="list-disc pl-5 space-y-2 text-on-surface-variant">
                  <li>Sự biến đổi của cơ cấu xã hội - giai cấp vừa đảm bảo tính quy luật phổ biến, vừa mang tính đặc thù sâu sắc của xã hội Việt Nam.</li>
                  <li>Vị trí, vai trò của các giai cấp, tầng lớp xã hội ngày càng được khẳng định và thể hiện rõ nét trong công cuộc đổi mới.</li>
                  <li>Tính năng động và sự đan xen lợi ích giữa các tầng lớp tạo nên động lực mạnh mẽ cho sự phát triển toàn diện của đất nước.</li>
                </ul>
              </div>
            </div>
            
            <h3 className="font-headline-lg text-2xl text-center mb-8 font-bold">Các giai cấp, tầng lớp cơ bản</h3>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Công nhân */}
              <motion.div variants={itemVariants} className="bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src="/assets/docx_images/image4.png" alt="Công nhân" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="font-bold text-xl text-primary mb-3 flex items-center gap-2"><span className="material-symbols-outlined">engineering</span> Giai cấp công nhân</h4>
                  <p className="text-sm text-secondary font-bold mb-2 uppercase">(Lực lượng lãnh đạo cách mạng)</p>
                  <ul className="space-y-2 text-on-surface-variant text-sm">
                    <li>• Là giai cấp lãnh đạo cách mạng thông qua đội tiền phong là Đảng Cộng sản Việt Nam.</li>
                    <li>• Đại diện cho phương thức sản xuất tiên tiến và lực lượng sản xuất hiện đại.</li>
                    <li>• Giữ vị trí tiên phong trong sự nghiệp xây dựng chủ nghĩa xã hội.</li>
                    <li>• Là lực lượng nòng cốt trong liên minh giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức.</li>
                  </ul>
                </div>
              </motion.div>

              {/* Nông dân */}
              <motion.div variants={itemVariants} className="bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src="/assets/docx_images/image5.png" alt="Nông dân" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="font-bold text-xl text-primary mb-3 flex items-center gap-2"><span className="material-symbols-outlined">agriculture</span> Giai cấp nông dân</h4>
                  <p className="text-sm text-secondary font-bold mb-2 uppercase">(Lực lượng nền tảng và chiến lược)</p>
                  <ul className="space-y-2 text-on-surface-variant text-sm">
                    <li>• Có vị trí chiến lược đặc biệt quan trọng trong sự nghiệp CNH, HĐH nông nghiệp, nông thôn.</li>
                    <li>• Đóng vai trò cốt lõi trong việc giữ gìn, phát huy bản sắc văn hoá dân tộc và bảo vệ môi trường sinh thái.</li>
                    <li>• Là chủ thể chính của quá trình phát triển kinh tế nông thôn và xây dựng nông thôn mới.</li>
                    <li>• Hướng tới phát triển toàn diện, đẩy mạnh ứng dụng KHCN, hiện đại hóa nông nghiệp.</li>
                  </ul>
                </div>
              </motion.div>

              {/* Trí thức */}
              <motion.div variants={itemVariants} className="bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src="/assets/docx_images/image6.png" alt="Trí thức" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="font-bold text-xl text-primary mb-3 flex items-center gap-2"><span className="material-symbols-outlined">school</span> Đội ngũ trí thức</h4>
                  <p className="text-sm text-secondary font-bold mb-2 uppercase">(Lực lượng lao động sáng tạo đặc biệt)</p>
                  <ul className="space-y-2 text-on-surface-variant text-sm">
                    <li>• Là lực lượng lao động đặc biệt quan trọng trong sự nghiệp CNH, HĐH đất nước và hội nhập quốc tế.</li>
                    <li>• Tiên phong trong việc nghiên cứu, ứng dụng khoa học, xây dựng nền tảng cho kinh tế tri thức vững mạnh.</li>
                    <li>• Là một bộ phận không thể tách rời, củng cố vững chắc khối liên minh công - nông - trí thức.</li>
                  </ul>
                </div>
              </motion.div>

              {/* Doanh nhân */}
              <motion.div variants={itemVariants} className="bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src="/assets/docx_images/image7.png" alt="Doanh nhân" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="font-bold text-xl text-primary mb-3 flex items-center gap-2"><span className="material-symbols-outlined">business_center</span> Đội ngũ doanh nhân</h4>
                  <p className="text-sm text-secondary font-bold mb-2 uppercase">(Lực lượng phát triển kinh tế mạnh mẽ)</p>
                  <ul className="space-y-2 text-on-surface-variant text-sm">
                    <li>• <strong>Tầng lớp đặc biệt:</strong> Là tầng lớp xã hội đặc biệt được Đảng ta chủ trương xây dựng thành một đội ngũ vững mạnh.</li>
                    <li>• <strong>Đóng góp tích cực:</strong> Đóng góp tích cực vào việc thực hiện chiến lược phát triển kinh tế - xã hội.</li>
                    <li>• <strong>Phát triển nhanh:</strong> Đang phát triển nhanh cả về số lượng và qui mô với vai trò không ngừng tăng lên.</li>
                  </ul>
                </div>
              </motion.div>

              {/* Phụ nữ */}
              <motion.div variants={itemVariants} className="bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src="/assets/docx_images/image8.png" alt="Phụ nữ" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="font-bold text-xl text-primary mb-3 flex items-center gap-2"><span className="material-symbols-outlined">face_4</span> Phụ nữ Việt Nam</h4>
                  <p className="text-sm text-secondary font-bold mb-2 uppercase">(Lực lượng quan trọng có đóng góp to lớn)</p>
                  <ul className="space-y-2 text-on-surface-variant text-sm">
                    <li>• Là một lực lượng vô cùng quan trọng và đông đảo trong đội ngũ những người lao động, đóng góp vào mọi mặt của nền kinh tế.</li>
                    <li>• Phụ nữ ngày càng thể hiện vai trò xuất sắc và vị thế vững chắc của mình trong mọi lĩnh vực của đời sống xã hội.</li>
                    <li>• Tiếp tục phát huy truyền thống tốt đẹp, là người gìn giữ ngọn lửa hạnh phúc và định hướng giáo dục trong gia đình.</li>
                  </ul>
                </div>
              </motion.div>

              {/* Thanh niên */}
              <motion.div variants={itemVariants} className="bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src="/assets/docx_images/image9.png" alt="Thanh niên" className="w-full h-48 object-cover object-top" />
                <div className="p-6">
                  <h4 className="font-bold text-xl text-primary mb-3 flex items-center gap-2"><span className="material-symbols-outlined">groups</span> Đội ngũ thanh niên</h4>
                  <p className="text-sm text-secondary font-bold mb-2 uppercase">(Lực lượng xung kích)</p>
                  <ul className="space-y-2 text-on-surface-variant text-sm">
                    <li>• Là rường cột của nước nhà, chủ nhân tương lai của đất nước.</li>
                    <li>• <strong>Tâm trong:</strong> Luôn tu dưỡng đạo đức cách mạng, có lối sống trong sạch, lành mạnh.</li>
                    <li>• <strong>Trí sáng:</strong> Không ngừng học tập, rèn luyện, làm chủ KHCN, đổi mới sáng tạo.</li>
                    <li>• <strong>Hoài bão lớn:</strong> Dám nghĩ, dám làm, có khát vọng vươn lên mạnh mẽ.</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Liên minh giai cấp */}
        <section className="py-stack-lg">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display-lg text-4xl text-primary font-bold mb-6">Liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <img src="/assets/docx_images/image10.png" alt="Liên minh" className="rounded-xl object-cover h-32 w-full shadow-sm" />
                <img src="/assets/docx_images/image11.png" alt="Liên minh" className="rounded-xl object-cover h-32 w-full shadow-sm" />
                <img src="/assets/docx_images/image12.png" alt="Liên minh" className="rounded-xl object-cover h-32 w-full col-span-2 shadow-sm" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Accordion title="Liên minh trên lĩnh vực kinh tế" defaultOpen={true}>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Được thực hiện qua các khâu của các quá trình kinh tế, các lĩnh vực kinh tế, các địa bàn, vùng, miền trong cả nước.</li>
                  <li>Từng bước hình thành quan hệ sản xuất XHCN trong quá trình thực hiện liên minh.</li>
                  <li>Nhà nước có vai trò quan trọng trong liên minh kinh tế.</li>
                </ul>
              </Accordion>
              
              <Accordion title="Liên minh trên lĩnh vực chính trị">
                <p className="mb-2"><strong>Mục đích:</strong> Tạo khối đại đoàn kết toàn dân, đập tan âm mưu thù địch, bảo vệ vững chắc XHCN.</p>
                <p className="mb-2"><strong>Để thực hiện, cần phải:</strong></p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Giữ vững lập trường chính trị - tư tưởng của giai cấp công công nhân.</li>
                  <li>Giữ vững sự lãnh đạo của Đảng.</li>
                  <li>Phát huy quyền làm chủ của nhân dân.</li>
                  <li>Xây dựng Đảng và Nhà nước trong sạch vững mạnh.</li>
                  <li>Đấu tranh chống lại mọi âm mưu thù địch.</li>
                </ul>
              </Accordion>
              
              <Accordion title="Liên minh trên lĩnh vực văn hóa, tư tưởng">
                <p className="mb-2"><strong>Mục đích:</strong> Xây dựng nền VH tiên tiến đậm đà bản sắc dân tộc.</p>
                <p className="mb-2"><strong>Để thực hiện, cần phải:</strong></p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Gắn tăng trưởng kinh tế với phát triển văn hóa, con người và thực hiện tiến bộ, công bằng xã hội.</li>
                  <li>Xây dựng và phát triển văn hóa và con người Việt Nam phát triển toàn diện.</li>
                  <li>Nâng cao chất lượng nguồn nhân lực, xóa đói giảm nghèo.</li>
                  <li>Nâng cao dân trí, thực hiện tốt an sinh xã hội.</li>
                  <li>Nâng cao chất lượng cuộc sống cho nhân dân.</li>
                </ul>
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* 5 Phương hướng */}
        <section className="py-stack-lg bg-primary text-on-primary">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <h2 className="font-display-lg text-4xl font-bold mb-8 text-center max-w-4xl mx-auto">Phương hướng cơ bản để xây dựng cơ cấu xã hội – giai cấp và tăng cường liên minh</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
                <Accordion title="1. Đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước">
                  <p>Phát triển kinh tế, đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước tạo nền tảng vật chất kỹ thuật vững chắc cho khối liên minh.</p>
                </Accordion>
                <Accordion title="2. Xây dựng chính sách xã hội hiệu quả">
                  <p>Xây dựng và thực hiện hệ thống chính sách xã hội hiệu quả và toàn diện, nhất là các chính sách liên quan đến cơ cấu xã hội – giai cấp.</p>
                </Accordion>
                <Accordion title="3. Tạo sự đồng thuận và đoàn kết">
                  <p>Tạo sự đồng thuận và phát huy tinh thần đoàn kết thống nhất giữa các lực lượng trong khối liên minh và toàn xã hội.</p>
                </Accordion>
                <Accordion title="4. Hoàn thiện thể chế kinh tế thị trường">
                  <p>Hoàn thiện thể chế kinh tế thị trường định hướng xã hội chủ nghĩa và đẩy mạnh phát triển khoa học và công nghệ, tạo điều kiện thuận lợi để các chủ thể trong các khối liên minh phát triển.</p>
                </Accordion>
                <Accordion title="5. Đổi mới hoạt động Đảng, Nhà nước">
                  <p>Đổi mới hoạt động của Đảng, Nhà nước, Mặt trận Tổ quốc Việt Nam nhằm tăng cường khối liên minh và xây dựng khối đại đoàn kết toàn dân.</p>
                </Accordion>
              </div>
              <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                <img src="/assets/docx_images/image13.png" alt="Phương hướng" className="rounded-xl object-cover h-40 w-full shadow-lg border border-primary-container" />
                <img src="/assets/docx_images/image14.png" alt="Phương hướng" className="rounded-xl object-cover h-40 w-full shadow-lg border border-primary-container" />
                <img src="/assets/docx_images/image15.png" alt="Phương hướng" className="rounded-xl object-cover h-40 w-full shadow-lg border border-primary-container" />
              </div>
            </div>
          </div>
        </section>

        {/* Thư viện Ảnh & Đội ngũ */}
        <section className="py-stack-lg bg-surface-container-highest">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="mb-16">
              <h2 className="font-display-lg text-4xl text-on-surface font-bold mb-8 text-center border-b-2 border-primary pb-4 inline-block mx-auto">Thư viện Hình ảnh Thực tiễn</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <img src="/assets/docx_images/image16.png" className="rounded-lg shadow-sm w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer" alt="Thực tiễn 1" />
                <img src="/assets/docx_images/image17.png" className="rounded-lg shadow-sm w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer" alt="Thực tiễn 2" />
                <img src="/assets/docx_images/image18.png" className="rounded-lg shadow-sm w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer" alt="Thực tiễn 3" />
                <img src="/assets/docx_images/image19.png" className="rounded-lg shadow-sm w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer" alt="Thực tiễn 4" />
              </div>
            </div>

            {/* TEAM & TOOLS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-outline-variant pt-16">
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
                    { name: "Trần Bá Thành", id: "HE171047", init: "TT" }
                  ].map((member, idx) => (
                    <div key={idx} className="bg-surface border border-outline-variant rounded-lg p-5 flex items-center gap-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-primary transition-all duration-200">
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
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface w-full py-stack-md border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
          <div className="font-headline-md text-headline-md text-on-surface mb-stack-sm md:mb-0">
            Modern Socialism
          </div>
          <div className="text-body-md text-on-surface-variant text-center md:text-right">
            © 2024 Institute for Social Science. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
