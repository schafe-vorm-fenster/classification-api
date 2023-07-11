import { getLogger } from "../../../logging/log-util";
import { RuralEventClassification } from "../../types/api.types";

import { classifyByTag } from "./classifyByTag";

export const classifyByTags = async (
  tags: string[]
): Promise<RuralEventClassification[]> => {
  const log = getLogger("classifyByTags");

  // filter for unique tags
  const uniqueTagList = tags.filter(
    (tag, index) => tags.indexOf(tag) === index
  );

  // run classifyByTag on each tag in tagList in parallel by Promise.all
  let classificationList: RuralEventClassification[] = (await Promise.all(
    uniqueTagList
      .map(async (tag) => {
        let classificationByTag: RuralEventClassification | null = null;
        try {
          classificationByTag = await classifyByTag(tag as string);
        } catch (error: Error | any) {
          log.warn(error, error?.message);
        }
        return classificationByTag;
      })
      .filter((classification) => classification !== null)
  )) as RuralEventClassification[];

  return classificationList;
};
