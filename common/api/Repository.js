import FormRepository from "./FormRepository";
import GridRepository from "./GridRepository";
import TreeRepository from "./TreeRepository";
import LanguageRepository from "./LanguageRepository";
import CommonRepository from "./CommonRepository";
import AccountRepository from "./AccountRepository";
import MenuRepository from "./MenuRepository";
import ReportsRepository from "./ReportsRepository";

export default $axios => ({
  form: FormRepository($axios),
  grid: GridRepository($axios),
  tree: TreeRepository($axios),
  language: LanguageRepository($axios),
  common: CommonRepository($axios),
  account: AccountRepository($axios),
  menu: MenuRepository($axios),
  reports: ReportsRepository($axios),
});