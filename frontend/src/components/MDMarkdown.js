import MDEditor from '@uiw/react-md-editor';
import katex from 'katex';
import 'katex/dist/katex.css';
import React from 'react';

export default function MDMarkdown(props) {
  return (
    <MDEditor.Markdown source={props.source || ''}
      components={{
        code: ({ inline, children, className }) => {
          const txt = children[0] || "";
          if (inline) {
            if (typeof txt === "string" && /^\$\$(.*)\$\$/.test(txt)) {
              const html = katex.renderToString(
                txt.replace(/^\$\$(.*)\$\$/, "$1"),
                {
                  throwOnError: false
                }
              );
              return <code dangerouslySetInnerHTML={{ __html: html }} />;
            }
            return <code>{txt}</code>;
          }
          if (
            typeof txt === "string" &&
            typeof className === "string" &&
            /^language-katex/.test(className.toLocaleLowerCase())
          ) {
            const html = katex.renderToString(txt, {
              throwOnError: false
            });
            return <code dangerouslySetInnerHTML={{ __html: html }} />;
          }
          return <code className={String(className)}>{txt}</code>;
        }
      }}
    />
  )
}
