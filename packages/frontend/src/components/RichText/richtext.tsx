import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, BLOCKS } from "@contentful/rich-text-types";

interface IRichTextProps {
  document: Document;
}

export const RichText = ({ document }: IRichTextProps) => {
  return documentToReactComponents(document, {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p className="block">{children}</p>;
      },
    },
  });
};
