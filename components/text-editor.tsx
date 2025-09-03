"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react'

import { createEditor, Editor, Transforms, Element, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import type { RenderElementProps, RenderLeafProps } from 'slate-react'
import { slateToHtml, htmlToSlate } from '@slate-serializers/html';
import { Element as DomHandlerElement } from 'domhandler';
import { Config } from '@/types/slate'
import { styleToString } from '@/lib/slate'
import { useDebounce } from 'use-debounce'

// import { htmlToSlate, cleanEmptyParagraphs } from '@/lib/html-to-slate';

import { Separator } from './ui/separator'
import { Image as ImageIcon, Redo2, Undo2, Bold, Italic, AlignCenter, AlignJustify, AlignLeft, AlignRight, List, ListOrdered } from "lucide-react"

import type { CustomElementType, CustomEditorType } from '@/types'


// Map Slate element names to HTML tag names
const ELEMENT_NAME_TAG_MAP = {
    paragraph: 'p',
    'bulleted-list': 'ul',
    'numbered-list': 'ol',
    'list-item': 'li',
}

const MARK_ELEMENT_TAG_MAP = {
    bold: ['span'],
    italic: ['em'],
    underline: ['u'],
    strikethrough: ['s'],
    code: ['code'],
}

export const config: Config = {
    markMap: MARK_ELEMENT_TAG_MAP,
    elementMap: ELEMENT_NAME_TAG_MAP,

    elementAttributeTransform: ({ node }) => {
        if (node.align) {
            return {
                style: styleToString({
                    ['text-align']: node.align,
                }),
                class: 'text-slate-700 text-base font-normal max-w-[1120px] mb-4',
            }
        }
        return {
            class: 'text-slate-700 text-base font-normal max-w-[1120px] mb-4',
        }
    },

    elementTransforms: {
        'bulleted-list': ({ children = [] }) => {
            return new DomHandlerElement('ul', { class: 'list-disc mb-4' }, children)
        },
        'numbered-list': ({ children = [] }) => {
            return new DomHandlerElement('ol', { class: 'list-decimal mb-4' }, children)
        },
        'list-item': ({ children = [] }) => {
            return new DomHandlerElement('li', { class: 'ml-4' }, children)
        },
    },

    markTransforms: {
        bold: ({ children = [] }) =>
            new DomHandlerElement('span', { class: 'text-slate-900 text-base font-semibold mb-0' }, children),

        italic: ({ children = [] }) =>
            new DomHandlerElement('em', { class: 'italic text-slate-700 text-base font-normal' }, children),

        code: ({ children = [] }) =>
            new DomHandlerElement(
                'code',
                { class: 'bg-gray-100 px-1 py-0.5 rounded text-sm font-mono' },
                children
            ),
    },

    encodeEntities: false,
    alwaysEncodeBreakingEntities: true,
    alwaysEncodeCodeEntities: false,
    convertLineBreakToBr: false,
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const CustomEditor = {
    isBoldMarkActive(editor: CustomEditorType) {
        const marks = Editor.marks(editor)
        return marks ? marks.bold === true : false
    },

    isItalicMarkActive(editor: CustomEditorType) {
        const marks = Editor.marks(editor)
        return marks ? marks.italic === true : false
    },

    isCodeBlockActive(editor: CustomEditorType) {
        const [match] = Editor.nodes(editor, {
            match: n => Element.isElement(n) && n.type === 'code',
        })
        return !!match
    },

    isAlignBlockActive(editor: CustomEditorType) {
        const [match] = Editor.nodes(editor, {
            match: (n) => Element.isElement(n) && ['center', 'left', 'right', 'justify'].includes(n.type),
        })
        return !!match
    },

    isListBlockActive(editor: Editor, format: string) {
        const [match] = Editor.nodes(editor, {
            match: n => Element.isElement(n) && n.type === format,
        })
        return !!match
    },

    toggleBoldMark(editor: CustomEditorType) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        if (isActive) {
            Editor.removeMark(editor, 'bold')
        } else {
            Editor.addMark(editor, 'bold', true)
        }
    },

    toggleItalicMark(editor: CustomEditorType) {
        const isActive = CustomEditor.isItalicMarkActive(editor)
        if (isActive) {
            Editor.removeMark(editor, 'italic')
        } else {
            Editor.addMark(editor, 'italic', true)
        }
    },

    toggleCodeBlock(editor: CustomEditorType) {
        const isActive = CustomEditor.isCodeBlockActive(editor)
        Transforms.setNodes(
            editor,
            { type: isActive ? 'paragraph' : 'code' },
            { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
        )
    },

    toggleAlignBlock(editor: CustomEditorType, align: 'left' | 'center' | 'right' | 'justify') {
        Transforms.setNodes(
            editor,
            { type: align },
            { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
        )
    },

    toggleListBlock(editor: Editor, format: 'numbered-list' | 'bulleted-list') {
        const isActive = CustomEditor.isListBlockActive(editor, format)
        const isAnyListActive = LIST_TYPES.some(listType =>
            CustomEditor.isListBlockActive(editor, listType)
        )

        if (isAnyListActive) {
            Transforms.unwrapNodes(editor, {
                match: n =>
                    Element.isElement(n) &&
                    LIST_TYPES.includes(n.type),
                split: true,
            })
        }

        const newType = isActive ? 'paragraph' : 'list-item'
        Transforms.setNodes(editor, { type: newType })

        if (!isActive) {
            Transforms.wrapNodes(editor, {
                type: format,
                children: [],
            })
        }
    }
}

const initialValue: CustomElementType[] = [
    {
        type: 'paragraph',
        children: [{ text: 'Start typing here...' }],
    },
]

const TextEditor = ({ onEditorChange, htmlString }: { onEditorChange: (textValue: string) => void, htmlString?: string }) => {
    const [charCount, setCharCount] = useState(0)
    const [editor] = useState(() => withHistory(withImages(withReact(createEditor()))))

    const [textValue, setTextValue] = useState<string>("");
    const [textDebounced] = useDebounce(textValue, 1000);

    const pictureInputRef = useRef<HTMLInputElement>(null);

    const getCharacterCount = useCallback((value: CustomElementType[]) => {
        const text = value.map(n => Node.string(n)).join('\n')
        return text.length
    }, [])

    const handleEditorChange = useCallback((value: CustomElementType[]) => {
        setTextValue(slateToHtml(value, config))
        setCharCount(getCharacterCount(value))
    }, [getCharacterCount])

    useEffect(() => {
        onEditorChange(textDebounced);
    }, [textDebounced])

    useEffect(() => {
        setCharCount(getCharacterCount(initialValue))
    }, [])

    const redoHandler = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
        e.preventDefault()
        editor.redo()
    }

    const undoHandler = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
        e.preventDefault()
        editor.undo()
    }

    const boldHandler = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
        e.preventDefault()
        CustomEditor.toggleBoldMark(editor)
    }

    const italicHandler = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
        e.preventDefault()
        CustomEditor.toggleItalicMark(editor)
    }

    const leftAlignHandler = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
        e.preventDefault()
        CustomEditor.toggleAlignBlock(editor, 'left')
    }

    const rightAlignHandler = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
        e.preventDefault()
        CustomEditor.toggleAlignBlock(editor, 'right')
    }

    const centerAlignHandler = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
        e.preventDefault()
        CustomEditor.toggleAlignBlock(editor, 'center')
    }

    const justifyAlignHandler = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
        e.preventDefault()
        CustomEditor.toggleAlignBlock(editor, 'justify')
    }

    const pictureInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)

            const imageNode = {
                type: "image",
                url,
                children: [{ text: "" }],
            }

            const paragraphNode = {
                type: "paragraph",
                children: [{ text: "" }],
            };
            Transforms.insertNodes(editor, [imageNode, paragraphNode])
        }
    }

    const orderedListHandler = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
        e.preventDefault();
        CustomEditor.toggleListBlock(editor, 'numbered-list')
    }

    const unorderedListHandler = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<SVGSVGElement | HTMLDivElement>) => {
        e.preventDefault();
        CustomEditor.toggleListBlock(editor, 'bulleted-list')
    }


    const renderElement = useCallback((props: RenderElementProps) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            case 'center':
            case 'left':
            case 'right':
            case 'justify':
                return <AlignElement {...props} />
            case "image":
                return <ImageElement {...props} />
            case 'bulleted-list':
                return (
                    <ul {...props.attributes} style={{
                        listStyleType: 'disc',
                        paddingLeft: '20px',
                        margin: '0'
                    }}>
                        {props.children}
                    </ul>
                )
            case 'numbered-list':
                return (
                    <ol {...props.attributes} style={{
                        listStyleType: 'decimal',
                        paddingLeft: '20px',
                        margin: '0'
                    }}>
                        {props.children}
                    </ol>
                )
            case 'list-item':
                return (
                    <li {...props.attributes} style={{
                        display: 'list-item',
                        marginLeft: '0'
                    }}>
                        {props.children}
                    </li>
                )
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return <Leaf {...props} />
    }, [])

    return (
        <>
            <div className="text-editor-tools bg-white border-b border-slate-200 p-4 flex items-center gap-4">
                <div className="tools-group flex items-center gap-1">
                    <Undo2 className={`size-4 cursor-pointer hover:text-blue-500 text-slate-600`} onClick={(e) => undoHandler(e)} />
                    <Redo2 className={`size-4 cursor-pointer hover:text-blue-500 text-slate-600`} onClick={(e) => redoHandler(e)} />
                </div>
                <div className="tools-group flex items-center gap-1">
                    <Bold className={`size-4 cursor-pointer hover:text-blue-500 text-slate-600 `} onClick={(e) => boldHandler(e)} />
                    <Italic className={`size-4 cursor-pointer hover:text-blue-500 text-slate-600`} onClick={(e) => italicHandler(e)} />
                </div>
                <Separator className='border border-slate-200 py-2' orientation='vertical' />
                <ImageIcon className={`size-4 cursor-pointer hover:text-blue-500 text-slate-600`} onClick={() => { pictureInputRef.current && pictureInputRef.current.click(); }} />
                <Separator className='border border-slate-200 py-2' orientation='vertical' />
                <div className="tools-group flex items-center gap-1">
                    <AlignLeft className={`size-4 cursor-pointer hover:text-blue-500 text-slate-600`} onClick={(e) => leftAlignHandler(e)} />
                    <AlignCenter className={`size-4 cursor-pointer hover:text-blue-500 text-slate-600`} onClick={(e) => centerAlignHandler(e)} />
                    <AlignRight className={`size-4 cursor-pointer hover:text-blue-500 text-slate-600`} onClick={(e) => rightAlignHandler(e)} />
                    <AlignJustify className={`size-4 cursor-pointer hover:text-blue-500 text-slate-600`} onClick={(e) => justifyAlignHandler(e)} />
                </div>
                <Separator className='border border-slate-200 py-2' orientation='vertical' />
                <div className="tools-group flex items-center gap-1">
                    <List className={`size-4 cursor-pointer hover:text-blue-500 text-slate-600`} onClick={(e) => unorderedListHandler(e)} />
                    <ListOrdered className={`size-4 cursor-pointer hover:text-blue-500 text-slate-600`} onClick={(e) => orderedListHandler(e)} />
                </div>
            </div>
            <div className="text-area-container">
                <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={pictureInputHandler}
                    ref={pictureInputRef}
                />
                <Slate editor={editor} initialValue={htmlString === '' ? initialValue : htmlToSlate(`${htmlString}`)} onChange={handleEditorChange}>
                    <Editable
                        className='h-[437px] max-h-[437px] overflow-y-scroll p-4 border border-gray-300 rounded'
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onKeyDown={event => {
                            if (!event.ctrlKey) {
                                return
                            }

                            switch (event.key) {
                                case '`': {
                                    event.preventDefault()
                                    CustomEditor.toggleCodeBlock(editor)
                                    break
                                }

                                case "z": {
                                    undoHandler(event)
                                    break
                                }

                                case "y": {
                                    redoHandler(event)
                                    break
                                }

                                case 'b': {
                                    boldHandler(event)
                                    break
                                }

                                case 'i': {
                                    italicHandler(event)
                                    break
                                }

                                case 'l': {
                                    leftAlignHandler(event)
                                    break
                                }

                                case 'e': {
                                    centerAlignHandler(event)
                                    break
                                }

                                case 'r': {
                                    rightAlignHandler(event)
                                    break
                                }

                                case 'j': {
                                    justifyAlignHandler
                                    break
                                }

                                case 'u': {
                                    unorderedListHandler(event)
                                    break
                                }

                                case 'o': {
                                    orderedListHandler(event)
                                    break
                                }
                            }
                        }}
                    />
                </Slate>
            </div>
            <div className="word-counter bg-white px-4 py-6">
                <p className='text-slate-900 text-xs font-normal leading-4'>{charCount} Words</p>
            </div>
        </>
    )
}

export default TextEditor

const withImages = (editor: Editor) => {
    const { isVoid } = editor
    editor.isVoid = (element) => {
        return element.type === "image" ? true : isVoid(element)
    }
    return editor
}

const CodeElement = (props: RenderElementProps) => {
    return (
        <pre {...props.attributes} style={{
            backgroundColor: '#f4f4f4',
            padding: '10px',
            borderRadius: '4px',
            fontFamily: 'monospace'
        }}>
            <code>{props.children}</code>
        </pre>
    )
}

const AlignElement = (props: RenderElementProps) => {
    const style: React.CSSProperties = {}

    return (
        <p {...props.attributes} style={{ ...style, textAlign: props.element.type }}>
            {props.children}
        </p>
    )
}

const DefaultElement = (props: RenderElementProps) => {
    return <p {...props.attributes}>{props.children}</p>
}

const ImageElement = ({ attributes, children, element }: RenderElementProps) => {
    const el = element as CustomElementType
    const style: React.CSSProperties = {}

    if (el.type === 'center') {
        style.display = 'block'
        style.margin = '0 auto'
    }
    if (el.type === 'right') {
        style.display = 'block'
        style.marginLeft = 'auto'
    }
    if (el.type === 'left') {
        style.display = 'block'
        style.marginRight = 'auto'
    }

    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <img src={el.url} alt="" className="max-w-xs my-2" style={style} />
            </div>
            {children}
        </div>
    )
}

const Leaf = (props: RenderLeafProps) => {
    const style: React.CSSProperties = {}

    if (props.leaf.bold) {
        style.fontWeight = 'bold'
    }
    if (props.leaf.italic) {
        style.fontStyle = 'italic'
    }
    return (
        <span
            {...props.attributes}
            style={style}
        >
            {props.children}
        </span>
    )
}