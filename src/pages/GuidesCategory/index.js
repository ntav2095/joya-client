// main
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

// components
import NotFound from "../NotFound";
import GuidesCategory from "./GuidesCategory";

function GuidesCategoryProxy() {
  const { t } = useTranslation();
  const { categoryPath } = useParams();

  const MAP = [
    {
      category: "trai-nghiem",
      categoryPath: "trai-nghiem-kham-pha",
      label: t("guidesPage.title.experiences"),
      bannerKey: "experience",
      pageTitle: t("pageTitles.guides.experiences"),
    },
    {
      category: "diem-den",
      categoryPath: "diem-den-hap-dan",
      label: t("guidesPage.title.nicePlaces"),
      bannerKey: "destination",
      pageTitle: t("pageTitles.guides.nicePlaces"),
    },
    {
      category: "nhat-ky",
      categoryPath: "nhat-ky-hanh-trinh",
      label: t("guidesPage.title.diaries"),
      bannerKey: "diary",
      pageTitle: t("pageTitles.guides.diaries"),
    },
    {
      category: "cam-nang",
      categoryPath: "cam-nang-du-lich",
      label: t("guidesPage.title.handbooks"),
      bannerKey: "handbook",
      pageTitle: t("pageTitles.guides.handbooks"),
    },
  ];

  const guideItem = MAP.find((item) => item.categoryPath === categoryPath);

  if (!guideItem) return <NotFound />;

  return <GuidesCategory {...guideItem} />;
}

export default GuidesCategoryProxy;
