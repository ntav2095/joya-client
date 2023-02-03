// main
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  selectGuidesExperiences,
  selectGuidesHandbooks,
  selectGuidesNicePlaces,
  selectGuidesDiaries,
} from "../../store/guides.slice";

// components
import NotFound from "../NotFound";
import GuidesCategory from "./GuidesCategory";

function GuidesCategoryProxy() {
  const { t } = useTranslation();
  const experiences = useSelector(selectGuidesExperiences);
  const handbooks = useSelector(selectGuidesHandbooks);
  const nicePlaces = useSelector(selectGuidesNicePlaces);
  const diaries = useSelector(selectGuidesDiaries);
  const location = useLocation();
  console.log(location);

  const MAP = [
    {
      categoryPath: "trai-nghiem-kham-pha",
      label: t("guidesPage.title.experiences"),
      bannerKey: "experience",
      pageTitle: t("pageTitles.guides.experiences"),
      articles: experiences,
    },
    {
      categoryPath: "diem-den-hap-dan",
      label: t("guidesPage.title.nicePlaces"),
      bannerKey: "destination",
      pageTitle: t("pageTitles.guides.nicePlaces"),
      articles: nicePlaces,
    },
    {
      categoryPath: "nhat-ky-hanh-trinh",
      label: t("guidesPage.title.diaries"),
      bannerKey: "diary",
      pageTitle: t("pageTitles.guides.diaries"),
      articles: diaries,
    },
    {
      categoryPath: "cam-nang-du-lich",
      label: t("guidesPage.title.handbooks"),
      bannerKey: "handbook",
      pageTitle: t("pageTitles.guides.handbooks"),
      articles: handbooks,
    },
  ];

  const guideItem = MAP.find((item) =>
    location.pathname.startsWith(`/guides/${item.categoryPath}`)
  );
  if (!guideItem) return <NotFound />;

  return <GuidesCategory {...guideItem} />;
}

export default GuidesCategoryProxy;
