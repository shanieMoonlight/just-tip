export interface JtOutboxMessageDto {
  id?: string;
  type?: string;
  contentJson?: string;
  createdOnUtc?: string;
  processedOnUtc?: string;
  error?: string;
}
