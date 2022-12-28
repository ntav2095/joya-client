import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  vi: {
    translation: {
      header: {
        home: "Trang chủ",
        about: "Về công ty",
        contact: "Liên hệ",
        viTours: "Tours trong nước",
        euTours: "Tours châu âu",
        visaService: "Visa",
        travelHandbook: "Cẩm nang du lịch",
        intro: "Giới thiệu",
      },
      homeMain: {
        title1: "Dịch vụ đẳng cấp",
        title2: "Hành trình ấn tượng",
        title3: "Đối tác tin cậy",
        titleTourChauAu: "DU LỊCH CHÂU ÂU",
        titleTourTrongNuoc: "DU LỊCH TRONG NƯỚC",
        titleCamNang: "GUIDES",
        session1:
          "Chúng tôi cam kết đem lại cho quý khách những dịch vụ uy tín nhất về lữ hành, khách sạn và nghỉ dưỡng, đảm bảo các tiêu chuẩn quốc tế về an toàn trong toàn bộ hành trình.",
        session2:
          "Không chỉ là khám phá những địa danh nổi tiếng hay thắng cảnh độc đáo, hành trình cùng JOYA còn đem tới những trải nghiệm đáng nhớ về phong tục, văn hóa, ẩm thực và nhiều câu chuyện lịch sử thú vị xoay quanh các điểm đến.",
        session3:
          "Với đội ngũ nhân viên chuyên nghiệp và chu đáo, JOYA luôn sẵn sàng hỗ trợ quý khách trong mọi trường hợp và tận tình chăm sóc khách hàng xuyên suốt các hành trình.",
      },
      tourlist: {
        title: "Danh sách tour châu Âu",
        sort: {},
      },
      footer: {
        collum1: [
          "CÔNG TY CỔ PHẦN JOYA",
          "Địa chỉ: Hoa Sữa 11-52 Vinhomes Riveside, Long Biên, Hà Nội.",
          "Điện thoại: 123456789 | Hotline : 123456789",
          "Email: info@joya.vn",
          "Website: joya.vn",
          "",
          "GIẤY PHÉP KINH DOANH DỊCH VỤ LỮ HÀNH QUỐC TẾ",
          "Số GP/No: 79-042/2022/TCDL-GP LHQT",
          "Do TCDL cấp ngày 30/10/2022",
        ],
        collum2: [
          "DU LỊCH",
          "Du lịch châu Âu",
          "Du lịch trong nước",
          "Guides",
          "Dịch vụ visa",
        ],
        collum3: [
          "ĐIỀU KHOẢN",
          "Điều kiện đăng ký",
          "Điều kiện hủy đối",
          "Thông tin cần lưu ý",
          "Phương thức thanh toán",
          "Bảo mật dữ liệu khách hàng",
        ],
      },
      errorMessage: {
        offline: "Bạn đang offline. Vui lòng kiểm tra kết nối internet.",
        networkError: "Lỗi kết nối: có thể server đã sập.",
      },
    },
  },
  en: {
    translation: {
      header: {
        home: "Home",
        about: "Company",
        contact: "Contact",
        viTours: "VN Tours",
        euTours: "EU Tours",
        visaService: "Visa",
        travelHandbook: "Travel handbook",
        intro: "About",
      },
      tourlist: {
        title: "EUROPEAN TOURS",
      },
      homeMain: {
        title1: "High-quality service",
        title2: "Impressive journey",
        title3: "Reliable partner",
        titleTourChauAu: "EUROPEAN TOURS",
        titleTourTrongNuoc: "VIET NAM TOURS",
        titleCamNang: "GUIDES",
        session1:
          "We are committed to providing you with the most prestigious services in travel, hotel and resort, ensuring international standards of safety during the entire journey.",
        session2:
          "Not only discovering famous landmarks or unique sights, the journey with JOYA also brings memorable experiences about customs, culture, cuisine and many interesting historical stories revolving around the destinations.",
        session3:
          "With a team of professional and attentive staff, JOYA is always ready to support you in all cases and take care of customers throughout the journey.",
      },
      footer: {
        collum1: [
          "CÔNG TY CỔ PHẦN JOYA",
          "Địa chỉ: Hoa Sữa 11-52 Vinhomes Riveside, Long Biên, Hà Nội.",
          "Điện thoại: 123456789 | Hotline : 123456789",
          "Email: info@joya.vn",
          "Website: joya.vn",
          "",
          "GIẤY PHÉP KINH DOANH DỊCH VỤ LỮ HÀNH QUỐC TẾ",
          "Số GP/No: 79-042/2022/TCDL-GP LHQT",
          "Do TCDL cấp ngày 30/10/2022",
        ],
        collum2: [
          "DU LỊCH",
          "Du lịch châu Âu",
          "Du lịch trong nước",
          "Guides",
          "Dịch vụ visa",
        ],
        collum3: [
          "ĐIỀU KHOẢN",
          "Điều kiện đăng ký",
          "Điều kiện hủy đối",
          "Thông tin cần lưu ý",
          "Phương thức thanh toán",
          "Bảo mật dữ liệu khách hàng",
        ],
      },
      errorMessage: {
        offline: "You are offline. Please check your internet connection.",
        networkError: "Network error: server maybe die.",
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources,
    lng: "vi", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
