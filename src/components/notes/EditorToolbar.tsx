import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Table2,
  Link2,
  Image,
  Code,
  CodeSquare,
  CheckSquare,
  GitBranch,
  GanttChart,
  BarChart3,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface EditorToolbarProps {
  onFormat: (format: string) => void;
}

export function EditorToolbar({ onFormat }: EditorToolbarProps) {
  const toolGroups = [
    {
      label: 'Text Formatting',
      tools: [
        { icon: Bold, label: 'Bold', format: '**', shortcut: '⌘+B' },
        { icon: Italic, label: 'Italic', format: '_', shortcut: '⌘+I' },
        { icon: Underline, label: 'Underline', format: '__', shortcut: '⌘+U' },
      ],
    },
    {
      label: 'Headings',
      tools: [
        { icon: Heading1, label: 'Heading 1', format: '# ', shortcut: '⌘+1' },
        { icon: Heading2, label: 'Heading 2', format: '## ', shortcut: '⌘+2' },
        { icon: Heading3, label: 'Heading 3', format: '### ', shortcut: '⌘+3' },
      ],
    },
    {
      label: 'Lists',
      tools: [
        { icon: List, label: 'Bullet List', format: '- ', shortcut: '⌘+L' },
        { icon: ListOrdered, label: 'Numbered List', format: '1. ', shortcut: '⌘+O' },
        { icon: CheckSquare, label: 'Task List', format: '- [ ] ', shortcut: '⌘+T' },
      ],
    },
    {
      label: 'Content',
      tools: [
        { icon: Quote, label: 'Blockquote', format: '> ', shortcut: '⌘+Q' },
        { icon: Link2, label: 'Link', format: '[](url)', shortcut: '⌘+K' },
        { icon: Image, label: 'Image', format: '![](url)', shortcut: '⌘+P' },
      ],
    },
    {
      label: 'Code',
      tools: [
        { icon: Code, label: 'Inline Code', format: '`', shortcut: '⌘+E' },
        { 
          icon: CodeSquare, 
          label: 'Code Block', 
          format: '\n```\n\n```\n', 
          shortcut: '⌘+⇧+E' 
        },
      ],
    },
    {
      label: 'Advanced',
      tools: [
        { 
          icon: Table2, 
          label: 'Table', 
          format: '\n| Header 1 | Header 2 |\n| --------- | --------- |\n| Cell 1 | Cell 2 |\n', 
          shortcut: '⌘+⇧+T' 
        },
        { 
          icon: GitBranch, 
          label: 'Mermaid Flowchart', 
          format: '\n```mermaid\ngraph TD\nA[Start] --> B[End]\n```\n',
          shortcut: '⌘+⇧+F' 
        },
        { 
          icon: GanttChart, 
          label: 'Mermaid Gantt', 
          format: '\n```mermaid\ngantt\ntitle Project Timeline\ndateFormat YYYY-MM-DD\nsection Tasks\nTask 1 :2024-01-01, 30d\nTask 2 :2024-02-01, 20d\n```\n',
          shortcut: '⌘+⇧+G' 
        },
        { 
          icon: BarChart3, 
          label: 'Mermaid Chart', 
          format: '\n```mermaid\npie title Distribution\n"A" : 40\n"B" : 30\n"C" : 30\n```\n',
          shortcut: '⌘+⇧+C' 
        },
      ],
    },
  ];

  return (
    <div className="flex items-center gap-1 p-2 bg-muted rounded-md mb-2 overflow-x-auto">
      {toolGroups.map((group, groupIndex) => (
        <div key={group.label} className="flex items-center">
          {groupIndex > 0 && (
            <Separator orientation="vertical" className="mx-2 h-8" />
          )}
          <div className="flex items-center gap-1">
            {group.tools.map((tool) => (
              <Tooltip key={tool.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onFormat(tool.format)}
                    className="h-8 w-8"
                  >
                    <tool.icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>
                    {tool.label}{' '}
                    <span className="text-muted-foreground ml-2">{tool.shortcut}</span>
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}