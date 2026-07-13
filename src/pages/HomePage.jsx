import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant shadow-sm">
        <div className="flex justify-between items-center h-16 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="font-display-lg text-primary tracking-tight font-bold text-xl">
            Modern Socialism
          </div>
          <Link to="/games" className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all">
            GÓC TRÒ CHƠI
          </Link>
        </div>
      </nav>

      <main className="mt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 flex items-center justify-center min-h-[70vh] border-b border-outline-variant">
          <div className="absolute inset-0 z-0">
            <img src="/assets/docx_images/image2.jpg" alt="Poster" className="w-full h-full object-cover opacity-20 object-top" />
            <div className="absolute inset-0 bg-gradient-to-b from-surface/80 to-surface"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h1 className="font-display-lg text-4xl md:text-6xl text-primary mb-8 font-bold uppercase">
              Cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên Chủ nghĩa xã hội ở Việt Nam
            </h1>
            <div className="flex justify-center mt-8">
              <Link to="/games" className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all text-lg">Khám phá Trò Chơi</Link>
            </div>
          </div>
        </section>

        {/* MỤC 1.1 */}
        <section className="py-16 border-b border-outline-variant max-w-5xl mx-auto px-6">
          <h2 className="text-4xl text-primary font-bold mb-8">Khái niệm và vị trí của cơ cấu xã hội - giai cấp trong cơ cấu xã hội</h2>
          
          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-2xl text-secondary mb-2">Khái niệm:</h3>
              <p>Cơ cấu xã hội – giai cấp là tổng thể các giai cấp, tầng lớp xã hội cùng tồn tại khách quan trong một chế độ xã hội nhất định và những mối quan hệ của chúng được hình thành dựa trên những đặc điểm như sở hữu tư liệu sản xuất, sự khác biệt về tổ chức quản lí, về địa vị chính trị - xã hội… giữa những giai cấp và tầng lớp đó.</p>
            </div>

            <div>
              <h3 className="font-bold text-2xl text-secondary mb-2">Gồm có các thành phần chủ yếu:</h3>
              <ul className="list-disc pl-8 space-y-2">
                <li><strong>Giai cấp công nhân:</strong> Lực lượng giữ vai trò lãnh đạo thông qua Đảng.</li>
                <li><strong>Giai cấp nông dân:</strong> Lực lượng đông đảo, có vai trò quan trọng trong phát triển nông nghiệp và nông thôn.</li>
                <li><strong>Tầng lớp trí thức:</strong> Đóng góp vào khoa học, công nghệ, giáo dục và đổi mới sáng tạo.</li>
                <li><strong>Tầng lớp doanh nhân:</strong> Thúc đẩy sản xuất, kinh doanh, tạo việc làm và phát triển kinh tế.</li>
                <li><strong>Các tầng lớp khác:</strong> Tầng lớp thanh niên, phụ nữ,..</li>
              </ul>
              <div className="my-6">
                <img src="/assets/docx_images/image1.png" alt="Thành phần chủ yếu" className="rounded-xl shadow-md max-h-96 mx-auto object-cover" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-2xl text-secondary mb-2">Đặc điểm của cơ cấu xã hội trong thời kỳ quá độ:</h3>
              <ul className="list-disc pl-8 space-y-2">
                <li><strong>Đa dạng về thành phần xã hội:</strong> Tồn tại nhiều giai cấp, tầng lớp khác nhau.</li>
                <li><strong>Có sự biến đổi liên tục:</strong> Cơ cấu xã hội thay đổi theo sự phát triển của nền kinh tế và quá trình công nghiệp hóa, hiện đại hóa đất nước.</li>
                <li><strong>Vừa có khác biệt về lợi ích nhưng cũng vừa hợp tác:</strong> Các giai cấp, tầng lớp mặc dù có lợi ích riêng nhưng cùng hướng đến một mục đích chung là xây dựng XHCN</li>
              </ul>
              <div className="my-6">
                <img src="/assets/docx_images/image2.png" alt="Đặc điểm" className="rounded-xl shadow-md max-h-96 mx-auto object-cover" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-2xl text-secondary mb-2">Ý nghĩa:</h3>
              <ul className="list-disc pl-8 space-y-2">
                <li>Tạo cơ sở để phát huy sức mạnh đại đoàn kết toàn dân.</li>
                <li>Thúc đẩy phát triển kinh tế gắn liền với công bằng xã hội.</li>
                <li>Xây dựng thành công chủ nghĩa xã hội.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* MỤC 1.2 */}
        <section className="py-16 border-b border-outline-variant max-w-5xl mx-auto px-6 bg-surface-container-lowest">
          <h2 className="text-4xl text-primary font-bold mb-8">Sự biến đổi có tính quy luật của cơ cấu xã giai cấp trong thời quá độ lên chủ nghĩa xã hội</h2>
          
          <div className="space-y-12 text-lg">
            {/* Quy luật 1 */}
            <div>
              <h3 className="font-bold text-3xl text-secondary mb-4">Quy luật 1</h3>
              <div className="my-6">
                <img src="/assets/docx_images/image3.png" alt="Quy luật 1" className="rounded-xl shadow-md max-h-96 mx-auto object-cover" />
              </div>
              <p className="font-bold mb-4">Cơ cấu xã hội - giai cấp biến đổi gắn liền và bị quy định bởi cơ cấu kinh tế của thời kỳ quá độ lên CNXH.</p>
              <p className="mb-2">Sự chuyển biến của cơ sở hạ tầng kinh tế là nguyên nhân sâu xa dẫn đến sự thay đổi của cơ cấu xã hội - giai cấp. Tác động được thể hiện như sau:</p>
              <ul className="list-disc pl-8 space-y-1">
                <li>Phương thức sản xuất</li>
                <li>Cơ cấu ngành nghề</li>
                <li>Thành phần kinh tế</li>
                <li>Cơ cấu kinh tế</li>
                <li>Cơ chế kinh tế</li>
              </ul>
              <p className="mt-2 font-bold text-tertiary">=&gt; Cơ cấu xã hội giai cấp</p>
            </div>

            {/* Quy luật 2 */}
            <div>
              <h3 className="font-bold text-3xl text-secondary mb-4">Quy luật 2</h3>
              <div className="my-6">
                <img src="/assets/docx_images/image4.png" alt="Quy luật 2" className="rounded-xl shadow-md max-h-96 mx-auto object-cover" />
              </div>
              <p className="font-bold mb-4">Cơ cấu xã hội - giai cấp biến đổi phức tạp, đa dạng, làm xuất hiện các tầng lớp xã hội mới.</p>
              <p className="mb-2">Trong thời kỳ quá độ, nền kinh tế tồn tại nhiều thành phần kinh tế và nhiều ngành nghề khác nhau.</p>
              <p className="mb-2">Sự đa dạng về kinh tế này tất yếu dẫn đến hệ quả:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Tồn tại nhiều giai cấp, tầng lớp và nhóm người khác nhau trong xã hội.</li>
                <li>Làm xuất hiện các tầng lớp xã hội mới (ví dụ: Đội ngũ doanh nhân, tầng lớp trung lưu mới, những người khởi nghiệp...).</li>
                <li>Sự đan xen, dịch chuyển vị trí xã hội giữa các nhóm dân cư diễn ra liên tục và năng động.</li>
              </ul>
            </div>

            {/* Quy luật 3 */}
            <div>
              <h3 className="font-bold text-3xl text-secondary mb-4">Quy luật 3</h3>
              <div className="my-6">
                <img src="/assets/docx_images/image5.jpg" alt="Quy luật 3" className="rounded-xl shadow-md max-h-96 mx-auto object-cover" />
              </div>
              <p className="font-bold mb-4">Biến đổi trong mối quan hệ vừa đấu tranh, vừa liên minh, từng bước xóa bỏ bất bình đẳng, tiến tới xích lại gần nhau.</p>
              <p className="mb-2">Cơ cấu xã hội - giai cấp không đứng im mà luôn vận động theo xu hướng hội tụ nhằm xây dựng khối đại đoàn kết.</p>
              <ul className="list-disc pl-8 space-y-2">
                <li><strong>Vừa đấu tranh, vừa liên minh:</strong> Nhằm giải quyết các mâu thuẫn cục bộ, đồng thời liên kết chặt chẽ dựa trên lợi ích chung của sự nghiệp xây dựng Chủ nghĩa Xã hội.</li>
                <li><strong>Xóa bỏ bất bình đẳng:</strong> Quá trình phát triển kinh tế đi đôi với tiến bộ, công bằng xã hội, từng bước xóa bỏ triệt để áp bức, bóc lột.</li>
                <li><strong>Xích lại gần nhau:</strong> Các giai cấp, tầng lớp dần thu hẹp khoảng cách về tư liệu sản xuất, tính chất lao động và đời sống tinh thần.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* MỤC 2 */}
        <section className="py-16 border-b border-outline-variant max-w-5xl mx-auto px-6">
          <h2 className="text-4xl text-primary font-bold mb-8">Liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên CNXH</h2>
          
          <div className="space-y-8 text-lg">
            <div>
              <h3 className="font-bold text-2xl text-secondary mb-2">Thế nào là liên minh và Liên minh giai cấp, tầng lớp là gì ?</h3>
              <p>Liên minh là sự kết hợp, hợp tác giữa các cá nhân hoặc tổ chức với một mục đích chung nhằm đạt được một lợi ích hoặc mục tiêu cụ thể.</p>
            </div>

            <div>
              <h3 className="font-bold text-2xl text-secondary mb-2">Ví dụ về liên minh:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 text-center font-bold">
                <div>
                  <p className="mb-2">NATO</p>
                  <img src="/assets/docx_images/image6.png" alt="NATO" className="rounded-xl shadow-sm h-40 mx-auto object-contain" />
                </div>
                <div>
                  <p className="mb-2">EU</p>
                  <img src="/assets/docx_images/image7.png" alt="EU" className="rounded-xl shadow-sm h-40 mx-auto object-contain" />
                </div>
                <div>
                  <p className="mb-2">ASEAN</p>
                  <img src="/assets/docx_images/image8.png" alt="ASEAN" className="rounded-xl shadow-sm h-40 mx-auto object-contain" />
                </div>
              </div>
              <p className="mb-2 mt-6">Ở mỗi thời đại lịch sử, mỗi giai cấp và tầng lớp đều có vị trí và vai trò nhất định. Do nhu cầu cuộc sống và đặc biệt là trong các cuộc cách mạng xã hội, giữa các giai cấp và tầng lớp thường nảy sinh những nhu cầu và lợi ích chung.</p>
              <p className="font-bold text-tertiary">-&gt; Điều đó khiến cho họ phải tìm cách liên minh, hợp tác với nhau để thực hiện những nhu cầu và lợi ích chung đó.</p>
            </div>

            <div>
              <h3 className="font-bold text-2xl text-secondary mb-2">Những loại hình liên minh:</h3>
              <ul className="list-disc pl-8 space-y-2 mb-4">
                <li>Các giai cấp, tầng lớp có lợi ích cơ bản không đối kháng (liên minh chiến lược)</li>
                <li>Sau này, có thể các giai cấp, tầng lớp có lợi ích cơ bản đối kháng nhau nhưng có lúc lại xuất hiện những lợi ích chung (liên minh sách lược)</li>
              </ul>
              <p className="font-bold bg-surface-container p-4 rounded-lg border border-outline-variant">=&gt; Liên minh giai cấp, tầng lớp, cũng như như đấu tranh giai cấp, tầng lớp đều mang tính phổ biến và là một động lực của cách mạng xã hội, hơn nữa là động lực to lớn, không chỉ trong cách mạng, mà trong sự phát triển xã hội nói chung. Điều này được thể hiện cao nhất và rõ nhất trong cách mạng xã hội chủ nghĩa</p>
            </div>

            <div>
              <h3 className="font-bold text-3xl text-secondary mb-6 mt-12 border-b pb-2">Những lợi ích của liên minh giai cấp, tầng lớp</h3>
              
              <h4 className="font-bold text-2xl text-primary mb-4">Đối với mỗi giai cấp, tầng lớp:</h4>
              <div className="space-y-6 ml-4 mb-8">
                <div>
                  <p className="font-bold text-xl mb-2 text-tertiary">Nâng cao vị thế, bảo vệ quyền lợi:</p>
                  <ul className="list-disc pl-8 space-y-2">
                    <li><strong>Tăng cường sức mạnh tổng hợp:</strong> Khi đoàn kết, các giai cấp, tầng lớp sẽ có tiếng nói chung lớn hơn, dễ dàng hơn trong việc đàm phán, bảo vệ quyền lợi và lợi ích hợp pháp của mình.</li>
                    <li><strong>Tạo cơ chế đối thoại:</strong> Liên minh tạo ra một diễn đàn để các giai cấp, tầng lớp có thể trao đổi, lắng nghe ý kiến của nhau, từ đó giải quyết mâu thuẫn, bất đồng.</li>
                    <li><strong>Tăng cường sự tin tưởng:</strong> Khi các giai cấp, tầng lớp thấy được lợi ích chung và sự công bằng trong quá trình hợp tác, sự tin tưởng lẫn nhau sẽ được củng cố.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-xl mb-2 text-tertiary">Tham gia vào quá trình quản lý nhà nước:</p>
                  <ul className="list-disc pl-8 space-y-2">
                    <li><strong>Đảm bảo tính dân chủ:</strong> Sự tham gia của nhiều giai cấp, tầng lớp vào quá trình quản lý nhà nước giúp cho các chính sách được đưa ra phù hợp hơn với nguyện vọng của nhân dân.</li>
                    <li><strong>Nâng cao hiệu quả quản lý:</strong> Nhờ có sự đóng góp ý kiến của nhiều tầng lớp xã hội, quá trình hoạch định và thực hiện chính sách sẽ được hoàn thiện hơn, tránh được những sai sót không đáng có.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-xl mb-2 text-tertiary">Có cơ hội phát triển:</p>
                  <ul className="list-disc pl-8 space-y-2">
                    <li><strong>Mở rộng cơ hội:</strong> Liên minh tạo ra nhiều cơ hội hợp tác, hỗ trợ lẫn nhau giữa các giai cấp, tầng lớp, từ đó mở rộng không gian phát triển cho mỗi cá nhân.</li>
                  </ul>
                </div>
              </div>

              <h4 className="font-bold text-2xl text-primary mb-4">Đối với xã hội</h4>
              <div className="space-y-6 ml-4">
                <div>
                  <p className="font-bold text-xl mb-2 text-tertiary">Tạo ra sự ổn định, thống nhất:</p>
                  <ul className="list-disc pl-8 space-y-2">
                    <li><strong>Giảm thiểu xung đột:</strong> Khi các giai cấp, tầng lớp cùng hướng tới mục tiêu chung, các xung đột, mâu thuẫn xã hội sẽ được giảm thiểu.</li>
                    <li><strong>Tăng cường đoàn kết:</strong> Liên minh giúp tăng cường tình đoàn kết, gắn bó giữa các thành viên trong xã hội.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-xl mb-2 text-tertiary">Thúc đẩy sự phát triển kinh tế - xã hội:</p>
                  <ul className="list-disc pl-8 space-y-2">
                    <li><strong>Tăng cường nguồn lực:</strong> Khi các giai cấp, tầng lớp cùng nhau đóng góp, nguồn lực xã hội sẽ được huy động một cách hiệu quả.</li>
                    <li><strong>Tạo môi trường đầu tư thuận lợi:</strong> Một xã hội ổn định, thống nhất sẽ thu hút đầu tư, tạo điều kiện cho kinh tế phát triển.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-xl mb-2 text-tertiary">Bảo vệ độc lập, chủ quyền quốc gia:</p>
                  <ul className="list-disc pl-8 space-y-2">
                    <li><strong>Tăng cường sức mạnh quốc gia:</strong> Khi toàn dân đoàn kết, chung sức, đất nước sẽ có sức mạnh tổng hợp lớn để đối phó với mọi thách thức.</li>
                    <li><strong>Nâng cao vị thế quốc tế:</strong> Một đất nước ổn định, phát triển sẽ có vị thế ngày càng cao trên trường quốc tế.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MỤC 3.1 */}
        <section className="py-16 border-b border-outline-variant max-w-5xl mx-auto px-6 bg-surface-container-lowest">
          <h2 className="text-4xl text-primary font-bold mb-8">Cơ cấu xã hội – giai cấp trong thời kì quá độ lên chủ nghĩa xã hội ở Việt Nam</h2>
          
          <div className="space-y-8 text-lg">
            <div className="my-6">
              <img src="/assets/docx_images/image9.png" alt="Cơ cấu XH-GC ở VN" className="rounded-xl shadow-md w-full max-h-96 object-cover" />
            </div>

            <div>
              <h3 className="font-bold text-2xl text-secondary mb-2">Đặc điểm:</h3>
              <ul className="list-disc pl-8 space-y-2">
                <li>Sự biến đổi của cơ cấu xã hội - giai cấp vừa đảm bảo tính quy luật phổ biến, vừa mang tính đặc thù sâu sắc của xã hội Việt Nam.</li>
                <li>Vị trí, vai trò của các giai cấp, tầng lớp xã hội ngày càng được khẳng định và thể hiện rõ nét trong công cuộc đổi mới.</li>
                <li>Tính năng động và sự đan xen lợi ích giữa các tầng lớp tạo nên động lực mạnh mẽ cho sự phát triển toàn diện của đất nước.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-3xl text-secondary mb-6 border-b pb-2">Các giai cấp, tầng lớp cơ bản trong TKQD lên CNXH ở Việt Nam:</h3>
              
              <div className="space-y-12">
                <div>
                  <h4 className="font-bold text-2xl text-primary mb-2">Giai cấp công nhân (Lực lượng lãnh đạo cách mạng):</h4>
                  <div className="my-4">
                    <img src="/assets/docx_images/image10.png" alt="Giai cấp công nhân" className="rounded-xl shadow-md max-h-80 mx-auto object-cover" />
                  </div>
                  <ul className="list-disc pl-8 space-y-2">
                    <li>Là giai cấp lãnh đạo cách mạng thông qua đội tiền phong là Đảng Cộng sản Việt Nam.</li>
                    <li>Đại diện cho phương thức sản xuất tiên tiến và lực lượng sản xuất hiện đại.</li>
                    <li>Giữ vị trí tiên phong trong sự nghiệp xây dựng chủ nghĩa xã hội.</li>
                    <li>Là lực lượng nòng cốt trong liên minh giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-2xl text-primary mb-2">Giai cấp nông dân (Lực lượng nền tảng và chiến lược):</h4>
                  <div className="my-4">
                    <img src="/assets/docx_images/image11.png" alt="Giai cấp nông dân" className="rounded-xl shadow-md max-h-80 mx-auto object-cover" />
                  </div>
                  <ul className="list-disc pl-8 space-y-2">
                    <li>Có vị trí chiến lược đặc biệt quan trọng trong sự nghiệp công nghiệp hoá, hiện đại hoá nông nghiệp, nông thôn.</li>
                    <li>Đóng vai trò cốt lõi trong việc giữ gìn, phát huy bản sắc văn hoá dân tộc và bảo vệ môi trường sinh thái.</li>
                    <li>Là chủ thể chính của quá trình phát triển kinh tế nông thôn và xây dựng nông thôn mới.</li>
                    <li>Hướng tới phát triển toàn diện, đẩy mạnh ứng dụng khoa học công nghệ, hiện đại hóa nông nghiệp.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-2xl text-primary mb-2">Đội ngũ trí thức (Lực lượng lao động sáng tạo đặc biệt):</h4>
                  <div className="my-4">
                    <img src="/assets/docx_images/image12.png" alt="Đội ngũ trí thức" className="rounded-xl shadow-md max-h-80 mx-auto object-cover" />
                  </div>
                  <ul className="list-disc pl-8 space-y-2">
                    <li>Là lực lượng lao động đặc biệt quan trọng trong sự nghiệp công nghiệp hóa, hiện đại hóa đất nước và hội nhập quốc tế.</li>
                    <li>Tiên phong trong việc nghiên cứu, ứng dụng khoa học, xây dựng nền tảng cho kinh tế tri thức vững mạnh.</li>
                    <li>Là một bộ phận không thể tách rời, củng cố vững chắc khối liên minh công - nông - trí thức.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-2xl text-primary mb-2">Đội ngũ doanh nhân (Lực lượng phát triển kinh tế mạnh mẽ):</h4>
                  <div className="my-4">
                    <img src="/assets/docx_images/image13.png" alt="Đội ngũ doanh nhân" className="rounded-xl shadow-md max-h-80 mx-auto object-cover" />
                  </div>
                  <ul className="list-disc pl-8 space-y-2">
                    <li><strong>Tầng lớp đặc biệt</strong> - Là tầng lớp xã hội đặc biệt được Đảng ta chủ trương xây dựng thành một đội ngũ vững mạnh.</li>
                    <li><strong>Đóng góp tích cực</strong> - Đóng góp tích cực vào việc thực hiện chiến lược phát triển kinh tế - xã hội.</li>
                    <li><strong>Phát triển nhanh</strong> - Đang phát triển nhanh cả về số lượng và qui mô với vai trò không ngừng tăng lên.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-2xl text-primary mb-2">Phụ nữ Việt Nam (Lực lượng quan trọng có đóng góp to lớn):</h4>
                  <div className="my-4">
                    <img src="/assets/docx_images/image14.png" alt="Phụ nữ Việt Nam" className="rounded-xl shadow-md max-h-80 mx-auto object-cover" />
                  </div>
                  <ul className="list-disc pl-8 space-y-2">
                    <li>Là một lực lượng vô cùng quan trọng và đông đảo trong đội ngũ những người lao động, đóng góp vào mọi mặt của nền kinh tế.</li>
                    <li>Phụ nữ ngày càng thể hiện vai trò xuất sắc và vị thế vững chắc của mình trong mọi lĩnh vực của đời sống xã hội.</li>
                    <li>Tiếp tục phát huy truyền thống tốt đẹp, là người gìn giữ ngọn lửa hạnh phúc và định hướng giáo dục trong gia đình.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-2xl text-primary mb-2">Đội ngũ thanh niên (Lực lượng xung kích trong xây dựng và bảo vệ Tổ quốc):</h4>
                  <div className="my-4">
                    <img src="/assets/docx_images/image15.png" alt="Đội ngũ thanh niên" className="rounded-xl shadow-md max-h-80 mx-auto object-cover" />
                  </div>
                  <ul className="list-disc pl-8 space-y-2">
                    <li>Là rường cột của nước nhà, chủ nhân tương lai của đất nước.</li>
                    <li><strong>Tâm trong</strong> - Luôn tu dưỡng đạo đức cách mạng, có lối sống trong sạch, lành mạnh, đề cao lòng yêu nước và tinh thần tự hào dân tộc.</li>
                    <li><strong>Trí sáng</strong> - Không ngừng học tập, rèn luyện, trau dồi tri thức, làm chủ khoa học công nghệ, nhạy bén và không ngừng đổi mới sáng tạo.</li>
                    <li><strong>Hoài bão lớn</strong> - Dám nghĩ, dám làm, có khát vọng vươn lên mạnh mẽ, sẵn sàng cống hiến tuổi trẻ vì mục tiêu phát triển và bảo vệ đất nước.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MỤC 3.2 */}
        <section className="py-16 border-b border-outline-variant max-w-5xl mx-auto px-6">
          <h2 className="text-4xl text-primary font-bold mb-8">Liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam</h2>
          
          <div className="space-y-10 text-lg">
            <div>
              <h3 className="font-bold text-2xl text-secondary mb-4">Liên minh trên lĩnh vực kinh tế:</h3>
              <ul className="list-disc pl-8 space-y-2">
                <li>Được thực hiện qua các khâu của các quá trình kinh tế, các lĩnh vực kinh tế, các địa bàn, vùng, miền trong cả nước</li>
                <li>Từng bước hình thành quan hệ sản xuất XHCN trong quá trình thực hiện liên minh</li>
                <li>Nhà nước có vai trò quan trọng trong liên minh kinh tế.</li>
              </ul>
              <div className="my-6">
                <img src="/assets/docx_images/image16.png" alt="Liên minh kinh tế" className="rounded-xl shadow-md max-h-80 mx-auto object-cover" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-2xl text-secondary mb-4">Liên minh trên lĩnh vực chính trị :</h3>
              <p className="mb-2">Mục đích của liên minh là tạo khối đại đoàn kết toàn dân, đập tan âm mưu thù địch, bảo vệ vững chắc XHCN.</p>
              <p className="mb-2">Thực hiện liên minh trên lĩnh vực chính trị, cần phải:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Giữ vững lập trường chính trị - tư tưởng của giai cấp công công nhân</li>
                <li>Giữ vững sự lãnh đạo của Đảng</li>
                <li>Phát huy quyền làm chủ của nhân dân</li>
                <li>Xây dựng Đảng và NN trong sạch vững mạnh</li>
                <li>Đấu tranh chống lại mọi âm mưu thù địch</li>
              </ul>
              <div className="my-6">
                <img src="/assets/docx_images/image17.png" alt="Liên minh chính trị" className="rounded-xl shadow-md max-h-80 mx-auto object-cover" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-2xl text-secondary mb-4">Liên minh trên lĩnh vực văn hóa, tư tưởng :</h3>
              <p className="mb-2">Mục đích của liên minh văn hóa xã hội là xây dựng nền VH tiên tiến đậm đà bản sắc dân tộc.</p>
              <p className="mb-2">Để thực hiện liên minh trên lĩnh vực văn hóa xã hội, cần phải:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Gắn tăng trưởng kinh tế với phát triển văn hóa, con người và thực hiện tiến bộ, công bằng xã hội.</li>
                <li>Xây dựng và phát triển văn hóa và con người Việt Nam phát triển toàn diện.</li>
                <li>Nâng cao chất lượng nguồn nhân lực, xóa đói giảm nghèo</li>
                <li>Nâng cao dân trí, thực hiện tốt an sinh xã hội</li>
                <li>Nâng cao chất lượng cuộc sống cho nhân dân</li>
              </ul>
              <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <img src="/assets/docx_images/image18.png" alt="Liên minh văn hóa 1" className="rounded-xl shadow-md h-64 w-full object-cover" />
                <img src="/assets/docx_images/image19.png" alt="Liên minh văn hóa 2" className="rounded-xl shadow-md h-64 w-full object-cover" />
              </div>
            </div>

            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant mt-8">
              <h3 className="font-bold text-2xl text-primary mb-4">Phương hướng cơ bản để xây dựng cơ cấu xã hội – giai cấp và tăng cường liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên CNXH ở Việt Nam:</h3>
              <p className="font-bold mb-4">Bao gồm 5 phương hướng :</p>
              <ul className="list-decimal pl-8 space-y-3 font-medium">
                <li>Đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước</li>
                <li>Xây dựng và thực hiện hệ thống chính sách xã hội hiệu quả và toàn diện, nhất là các chính sách liên quan đến cơ cấu xã hội – giai cấp.</li>
                <li>Tạo sự đồng thuận và phát huy tinh thần đoàn kết thống nhất giữa các lực lượng trong khối liên minh và toàn xã hội.</li>
                <li>Hoàn thiện thể chế kinh tế thị trường định hướng xã hội chủ nghĩa và đẩy mạnh phát triển khoa học và công nghệ, tạo điều kiện thuận lợi để các chủ thể trong các khối liên minh phát triển</li>
                <li>Đổi mới hoạt động của Đảng, Nhà nước, Mặt trận Tổ quốc Việt Nam nhằm tăng cường khối liên minh và xây dựng khối đại đoàn kết toàn dân.</li>
              </ul>
            </div>
            
            <p className="text-sm text-on-surface-variant italic mt-8 text-right">Nguồn : https://www.studocu.vn/vn/document/hoc-vien-hang-khong-viet-nam/chu-nghia-xa-hoi-khoa-hoc/lien-minh-giai-cap-trong-thoi-ki-qua-do-len-chu-nghia-xa-hoi/66431338?sid=586239631783853144</p>
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
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface w-full py-8 border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 w-full max-w-7xl mx-auto">
          <div className="font-headline-md text-headline-md text-on-surface mb-4 md:mb-0">
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
