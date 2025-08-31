// TypeScript users only add this code
import { BaseEditor, BaseElement, BaseText, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomElementType = BaseElement & { type: 'paragraph' | 'code' | 'center' | 'left' | 'right' | 'justify' | 'image' | 'bulleted-list' | 'numbered-list' | 'list-item'; children: CustomTextType[]; url?: string }
export type CustomTextType = BaseText & { text: string, bold?: boolean, italic?: boolean }
export type CustomEditorType = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditorType
        Element: CustomElementType
        Text: CustomTextType
    }
}