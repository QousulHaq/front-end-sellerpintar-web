// "use client";
// // htmlToSlate.ts
// import { Descendant, Text } from "slate";

// /**
//  * Mengubah string HTML menjadi object Slate.js
//  * @param htmlString - String HTML yang akan dikonversi
//  * @returns Array of Slate nodes
//  */
// function htmlToSlate(htmlString: string): Descendant[] {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlString, "text/html");

//   return parseNodes(doc.body.childNodes);
// }

// /**
//  * Parse DOM nodes menjadi Slate nodes
//  */
// function parseNodes(nodes: NodeListOf<ChildNode> | NodeList): Descendant[] {
//   const slateNodes: Descendant[] = [];

//   Array.from(nodes).forEach((node) => {
//     const slateNode = parseNode(node);
//     if (slateNode) {
//       slateNodes.push(slateNode);
//     }
//   });

//   return slateNodes;
// }

// /**
//  * Parse single DOM node menjadi Slate node
//  */
// function parseNode(node: Node): Descendant | null {
//   // Text node
//   if (node.nodeType === Node.TEXT_NODE) {
//     const text = node.textContent ?? "";
//     if (text.trim() === "") return null;
//     return { text };
//   }

//   // Element node
//   if (node.nodeType === Node.ELEMENT_NODE) {
//     const el = node as Element;
//     const tagName = el.tagName.toLowerCase();

//     switch (tagName) {
//       case "p":
//         return {
//           type: "paragraph",
//           children: parseInlineNodes(el.childNodes),
//         } as Descendant;

//       case "ul":
//         return {
//           type: "bulleted-list",
//           children: parseNodes(el.childNodes).filter(Boolean),
//         } as Descendant;

//       case "ol":
//         return {
//           type: "numbered-list",
//           children: parseNodes(el.childNodes).filter(Boolean),
//         } as Descendant;

//       case "li":
//         return {
//           type: "list-item",
//           children: parseInlineNodes(el.childNodes),
//         } as Descendant;

//       case "h1":
//         return {
//           type: "heading-one",
//           children: parseInlineNodes(el.childNodes),
//         } as Descendant;

//       case "h2":
//         return {
//           type: "heading-two",
//           children: parseInlineNodes(el.childNodes),
//         } as Descendant;

//       case "h3":
//         return {
//           type: "heading-three",
//           children: parseInlineNodes(el.childNodes),
//         } as Descendant;

//       case "blockquote":
//         return {
//           type: "quote",
//           children: parseNodes(el.childNodes).filter(Boolean),
//         } as Descendant;

//       default:
//         return null;
//     }
//   }

//   return null;
// }

// /**
//  * Parse inline nodes (untuk children dalam paragraph, heading, dll)
//  */
// function parseInlineNodes(nodes: NodeListOf<ChildNode> | NodeList): Text[] {
//   const children: Text[] = [];

//   Array.from(nodes).forEach((node) => {
//     if (node.nodeType === Node.TEXT_NODE) {
//       const text = node.textContent ?? "";
//       if (text !== "") {
//         children.push({ text });
//       }
//     } else if (node.nodeType === Node.ELEMENT_NODE) {
//       const inlineNode = parseInlineNode(node as Element);
//       if (inlineNode) {
//         children.push(...inlineNode);
//       }
//     }
//   });

//   return children.length > 0 ? children : [{ text: "" }];
// }

// /**
//  * Parse inline element menjadi text node dengan marks/formatting
//  */
// function parseInlineNode(element: Element): Text[] {
//   const tagName = element.tagName.toLowerCase();
//   const text = element.textContent ?? "";

//   if (text === "") return [];

//   const marks: Partial<Text> = {};

//   if (
//     tagName === "strong" ||
//     tagName === "b" ||
//     element.classList.contains("font-bold") ||
//     element.classList.contains("font-semibold")
//   ) {
//     (marks as any).bold = true;
//   }

//   if (
//     tagName === "em" ||
//     tagName === "i" ||
//     element.classList.contains("italic")
//   ) {
//     (marks as any).italic = true;
//   }

//   if (tagName === "u" || element.classList.contains("underline")) {
//     (marks as any).underline = true;
//   }

//   if (tagName === "code") {
//     (marks as any).code = true;
//   }

//   // Jika ada nested children
//   if (element.children.length > 0) {
//     return parseInlineNodes(element.childNodes);
//   }

//   return [{ text, ...marks }];
// }

// /**
//  * Membersihkan empty paragraphs
//  */
// function cleanEmptyParagraphs(nodes: Descendant[]): Descendant[] {
//   return nodes.filter((node: any) => {
//     if (node.type === "paragraph") {
//       const hasContent = node.children.some(
//         (child: any) => child.text && child.text.trim() !== ""
//       );
//       return hasContent;
//     }
//     return true;
//   });
// }

// export { htmlToSlate, cleanEmptyParagraphs };
