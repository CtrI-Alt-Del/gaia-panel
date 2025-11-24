export function renderMarkdownContent(content: string) {
  return (
    <div className="markdown-content prose prose-sm max-w-none dark:prose-invert">
      {/* Conteúdo markdown será renderizado aqui */}
      {content}
    </div>
  )
}
