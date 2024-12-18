import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Note, ExportFormat, ExportSettings } from '@/types/note';
import { exportNote } from '@/lib/export';
import { toggleNoteVisibility, generateShareLink } from '@/lib/sharing';
import { Share2, Download, Settings, Link2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NoteActionsProps {
  note: Note;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
}

export function NoteActions({ note, onUpdateNote }: NoteActionsProps) {
  const { toast } = useToast();
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('pdf');
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    template: 'minimal',
    pageSize: 'a4',
    orientation: 'portrait',
    includeMetadata: true,
    includeWatermark: false,
  });

  const handleShare = () => {
    const updates = toggleNoteVisibility(note);
    onUpdateNote(note.id, updates);

    if (updates.isPublic && updates.shareId) {
      const shareLink = generateShareLink(updates.shareId);
      navigator.clipboard.writeText(shareLink);
      toast({
        title: 'Share link copied!',
        description: 'The link has been copied to your clipboard.',
      });
    }
  };

  const handleExport = async () => {
    try {
      const result = await exportNote(note, exportFormat, exportSettings);

      if (result instanceof Blob) {
        const url = URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${note.title}.${exportFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        const blob = new Blob([result], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${note.title}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      toast({
        title: 'Export successful!',
        description: `Your note has been exported as ${exportFormat.toUpperCase()}.`,
      });
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'There was an error exporting your note. Please try again.',
        variant: 'destructive',
      });
    }

    setShowExportDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleShare}>
            <Link2 className="h-4 w-4 mr-2" />
            {note.isPublic ? 'Disable sharing' : 'Share note'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowExportDialog(true)}>
            <Download className="h-4 w-4 mr-2" />
            Export note
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdateNote(note.id, { exportSettings })}>
            <Settings className="h-4 w-4 mr-2" />
            Export settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Note</DialogTitle>
            <DialogDescription>
              Choose your export format and customize the output settings.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Format</Label>
              <Select
                value={exportFormat}
                onValueChange={(value) => setExportFormat(value as ExportFormat)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Template</Label>
              <Select
                value={exportSettings.template}
                onValueChange={(value) =>
                  setExportSettings({ ...exportSettings, template: value as any })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="elegant">Elegant</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Include metadata</Label>
              <Switch
                checked={exportSettings.includeMetadata}
                onCheckedChange={(checked) =>
                  setExportSettings({ ...exportSettings, includeMetadata: checked })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport}>Export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}