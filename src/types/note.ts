export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic?: boolean;
  shareId?: string;
  exportSettings?: ExportSettings;
}

export interface ExportSettings {
  template: 'minimal' | 'elegant' | 'professional';
  pageSize: 'a4' | 'letter' | 'legal';
  orientation: 'portrait' | 'landscape';
  includeMetadata: boolean;
  includeWatermark: boolean;
  backgroundColor?: string;
  accentColor?: string;
}

export type ExportFormat = 'pdf' | 'image' | 'markdown';