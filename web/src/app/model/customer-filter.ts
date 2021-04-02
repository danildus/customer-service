export class CustomerFilter {
  fieldName?: string;
  fieldValue?: string;
  itemLength?: number;
  page = 0;
  limit = 10;

  getFieldName(): string {
    return this.fieldName as string;
  }

  getFieldValue(): string {
    return this.fieldValue as string;
  }

  getItemLength(): number {
    return this.itemLength as number;
  }

  getPage(): number {
    return this.page as number;
  }

  getLimit(): number {
    return this.limit as number;
  }

  setFieldName(fieldName: string): void {
    this.fieldName = fieldName;
  }

  setFieldValue(fieldValue: string): void {
    this.fieldValue = fieldValue;
  }

  setItemLength(itemLength?: number): void {
    this.itemLength = itemLength;
  }

  setPage(page: number): void {
    this.page = page;
  }

  setLimit(limit: number): void {
    this.limit = limit;
  }
}

